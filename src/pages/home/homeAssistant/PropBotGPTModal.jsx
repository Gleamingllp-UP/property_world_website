import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Button, Form, InputGroup, Badge } from "react-bootstrap";
import { X, Send, Paintbrush } from "lucide-react";
import "./PropBotGPTModal.css";
import { property_world_logo } from "../../../assets/images";
import TermsModal from "./TermsModal";
import { useSelector } from "react-redux";
import LoginModal from "../../auth/login/LoginModal";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { io } from "socket.io-client";
import dayjs from "dayjs";
import { formatDateHeader } from "../../../helper/function/formatDateHeader";
import { formatDate } from "../../../helper/formateDate/formatedDate";
import ClearChatModal from "./ClearChatModal";
import { showToast } from "../../../utils/toast/toast";
import { showWarningToast } from "../../../utils/toast/ToastMessages";
import DOMPurify from "dompurify";
import LanguageSelectorModal from "./LanguageSelectorModal";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import PropertyListMessage from "./PropertyListMessage";

function PropBotGPTModal({ show, handleClose }) {
  const [showTerms, setShowTerms] = useState(false);
  const [showClearChat, setShowClearChat] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [showLanguagePrompt, setShowLanguagePrompt] = useState(true);

  const navigate = useNavigate();
  const quickButtons = [
    "find_property",
    "search_location",
    "investment_advice",
    "estimate_value",
    "compare_properties",
    "request_callback",
    "book_viewing",
    "ask_question",
  ];

  const handleLogin = () => {
    setModalShow(true);
  };

  const socketRef = useRef(null);
  const chatRef = useRef(null);
  const modalBodyRef = useRef(null);

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const { i18n, t } = useTranslation();
  const { userData } = useSelector((store) => store?.user);
  const userId = userData?._id;

  // 🔌 Establish socket connection
  useEffect(() => {
    if (!show || !userId) return;
    if (socketRef.current) return;
    socketRef.current = io(import.meta.env.VITE_SOCKET_IO_URL, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      // console.log("Connected to PropBot:", socketRef.current.id);
      showToast("Connected to PropBot");

      socketRef.current.emit(
        "chat:init",
        { userId, language: "en" },
        ({ sessionId, showLanguagePrompt, language: prevLanguage }) => {
          console.log(
            "sessionId, showLanguagePrompt ",
            sessionId,
            showLanguagePrompt,
            prevLanguage
          );

          setIsBotTyping(true);
          setSessionId(sessionId);
          i18n.changeLanguage(prevLanguage);
          document.documentElement.dir = prevLanguage === "ar" ? "rtl" : "ltr";
          setShowLanguagePrompt(showLanguagePrompt);

          socketRef.current.emit(
            "chat:history",
            { userId },
            ({ messages, isNew }) => {
              console.log("messages", messages);

              let allMessages = messages || [];

              if (isNew) {
                allMessages = [
                  {
                    role: "bot",
                    type: "text",
                    message: `👋 Hello! I'm PropBot, your AI assistant for UAE real estate. Ask me anything!`,
                    timestamp: new Date(),
                  },
                  ...allMessages,
                ];
              }

              const historyMsgs = (allMessages || [])?.map((m) => ({
                ...m,
                _history: true,
                done: true,
              }));

              setMessages(historyMsgs);

              setIsBotTyping(false);
            }
          );
        }
      );
    });

    const socket = socketRef.current;

    socket.on("connect_error", () => {
      showToast("Failed to connect to PropBot. Check your network.", "error");
    });

    socket.on("reconnect_attempt", (attempt) => {
      showWarningToast(`Trying to reconnect to PropBot (${attempt})`);
    });

    socket.on("reconnect_failed", () => {
      showToast(
        "Unable to reconnect to PropBot. Please refresh the page.",
        "error"
      );
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // Server manually disconnected client
        socket.connect(); // Try to reconnect manually
      }
      showWarningToast(`You were disconnected from PropBot.`);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
      setMessages([]);
    };
  }, [i18n, show, userId]);

  function findLastBot(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].role === "bot" && !list[i].done) return i;
    }
    return -1;
  }

  useEffect(() => {
    const sock = socketRef.current;
    if (!sock) return;

    const handleStream = (rawMsg) => {
      // ignore user echoes if backend ever sends them
      if (rawMsg.role === "user") return;

      const msg = {
        ...rawMsg,
        role: rawMsg.role || "bot",
        done: rawMsg.done === true,
        timestamp: new Date(),
        _streaming: true,
      };

      const { done, type } = msg;

      // loader control
      if (msg.role === "bot") {
        if (!done) setIsBotTyping(true);
        if (done) setIsBotTyping(false);
      }

      setMessages((prev) => {
        const updated = [...prev];

        // ---------- typing ----------
        if (type === "typing") {
          const i = findLastBot(updated);
          if (i > -1 && !updated[i].done && updated[i].type === "typing") {
            updated[i].message = msg.message;
          } else {
            updated.push({ ...msg, done: false });
          }
          return updated;
        }

        // ---------- normal text final ----------
        if (type === "text" && msg.done) {
          const i = findLastBot(updated);
          if (i > -1 && updated[i].type === "typing") {
            updated[i].type = "text";
            updated[i].message = msg.message;
            updated[i].done = true;
          } else {
            updated.push({ ...msg, done: true });
          }
          return updated;
        }

        // ---------- property results final ----------
        if (type === "property_results") {
          // prune trailing bot typing bubbles so we don't duplicate the header
          let j = updated.length - 1;
          while (j >= 0) {
            const m = updated[j];
            if (m.role !== "bot") break;
            if (m.type !== "typing") break;
            if (m.done) break; // shouldn't happen, but safety
            // drop this pre-header typing bubble
            updated.splice(j, 1);
            j--;
          }

          // push final structured property message
          updated.push({
            role: "bot",
            type: "property_results",
            message: msg.message || null,
            subMessage: msg.subMessage || null,
            link: msg.link || null,
            linkText: msg.linkText || null,
            totalProperties:
              typeof msg.totalProperties === "number"
                ? msg.totalProperties
                : null,
            data: Array.isArray(msg.data) ? msg.data : [],
            done: msg.done,
            timestamp: msg.timestamp,
          });

          return updated;
        }

        // ---------- fallback ----------
        updated.push(msg);
        return updated;
      });
    };

    sock.on("chat:stream", handleStream);
    return () => sock.off("chat:stream", handleStream);
  }, [show, userId]);

  //Send message
  // const sendMessage = () => {
  //   if (!input.trim() || !sessionId) return;

  //   const userMsg = {
  //     role: "user",
  //     message: input,
  //     timestamp: new Date(),
  //   };

  //   setMessages((prev) => [...prev, userMsg]);
  //   setIsBotTyping(true);
  //   socketRef.current.emit(
  //     "chat:message",
  //     { sessionId, message: input },
  //     ({ messages: botMessages }) => {
  //       console.log("object", botMessages);
  //       if (Array.isArray(botMessages)) {
  //         const formatted = botMessages.map((msg) => ({
  //           ...msg,
  //           timestamp: new Date(),
  //         }));
  //         setMessages((prev) => [...prev, ...formatted]);
  //       }
  //       setIsBotTyping(false);
  //     }
  //   );

  //   setInput("");
  // };

  const sendMessage = () => {
    if (!input.trim() || !sessionId) return;

    const userMsg = { role: "user", message: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Bot will start streaming soon
    setIsBotTyping(true);

    socketRef.current.emit("chat:message", { sessionId, message: input });
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    if (modalBodyRef.current) {
      setTimeout(() => {
        modalBodyRef.current.scrollTop = modalBodyRef.current.scrollHeight;
      }, 0);
    }
  }, [messages, isBotTyping]);

  const groupedMessages = messages.reduce((acc, msg) => {
    const dateKey = dayjs(msg?.timestamp).startOf("day").format("YYYY-MM-DD");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(msg);
    return acc;
  }, {});

  //Clear chat
  const handleClearChat = useCallback(() => {
    if (!sessionId || !socketRef.current) return;
    setIsBotTyping(true);
    socketRef.current.emit(
      "chat:clear",
      { sessionId },
      ({ success, messages, errMessage }) => {
        if (success) {
          setMessages(messages || []);
        } else {
          showToast(
            errMessage ?? "Failed to clear chat. Please try again.",
            "error"
          );
        }

        setShowClearChat(false);
      }
    );
    setIsBotTyping(false);
  }, [sessionId, socketRef, setMessages, setShowClearChat]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="propbot-modal-dialog"
      contentClassName="propbot-modal-content"
      backdrop="static"
      keyboard={false}
      centered={false}
    >
      <Modal.Header className="border-bottom py-2 bg-light">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img
              src={property_world_logo}
              alt="PropBot Logo"
              style={{ width: "24px", height: "24px", objectFit: "contain" }}
            />
            <div className="fw-semibold text-muted">{t("bot_name")}</div>
            <LanguageDropdown
              socket={socketRef.current}
              sessionId={sessionId}
            />
          </div>

          <Button
            variant="light"
            onClick={handleClose}
            className="border-0 p-1 bg-none"
          >
            <X size={20} />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="text-center overflow-auto" ref={modalBodyRef}>
        <div className="my-3">
          <div className="d-flex justify-content-center mb-3">
            <div className="p-1">
              <img
                src={property_world_logo}
                alt="PropBot"
                width="100"
                height="100"
              />
            </div>
          </div>
          <h5 className="fw-bold mb-2"> {t("hello_propbot")}</h5>
          <p className="text-muted small mb-4">{t("chat_intro")}</p>

          {userData && userData?.role === "guest" && (
            <div
              className="mb-3 bg-light shadow-sm rounded p-2 px-3"
              style={{
                width: "fit-content",
                maxWidth: "75%",
              }}
            >
              <p className="text-start small mb-2">{t("login_prompt")}</p>
              <div className="d-flex justify-content-start align-items-center gap-3">
                <Button
                  style={{
                    backgroundColor: "#e9012b",
                    borderColor: "#e9012b",
                  }}
                  className="px-4 py-1"
                  onClick={handleLogin}
                >
                  {t("login")}
                </Button>
                <Button
                  variant="outline-primary"
                  className="px-4 py-1"
                  onClick={() => navigate(pageRoutes.SIGN_UP)}
                >
                  {t("signup")}
                </Button>
              </div>
            </div>
          )}

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
            {quickButtons &&
              quickButtons?.map((btn, idx) => (
                <Badge
                  key={idx}
                  pill
                  bg="light"
                  className="border border-secondary-subtle text-dark fw-bold py-2 px-3 cursor-pointer"
                >
                  {t(btn)}
                </Badge>
              ))}
          </div>

          <div
            className="p-3 scroll-smooth "
            style={{ maxHeight: "400px", overflowY: "auto" }}
            ref={chatRef}
          >
            {Object.entries(groupedMessages)?.map(([date, msgs], idx) => (
              <div key={`group-${date + idx}`}>
                <div className="date-divider">
                  <span>{formatDateHeader(date)}</span>
                </div>

                {msgs?.map((msg, index) => {
                  const isUser = msg?.role === "user";

                  return (
                    <div
                      key={index}
                      className={`d-flex mb-3 ${
                        isUser ? "justify-content-end" : ""
                      }`}
                    >
                      <div
                        className={`small rounded shadow-sm p-2 px-3 ${
                          isUser ? "text-white" : "bg-light"
                        }`}
                        style={{
                          maxWidth: "75%",
                          backgroundColor: isUser ? "#e9012b" : "",
                        }}
                      >
                        {/* Show property cards or text */}
                        {msg?.type === "property_results" ? (
                          <PropertyListMessage
                            msg={msg}
                            autoAnimate={!!msg._streaming && !msg._history}
                          />
                        ) : (
                          <div className="text-start">
                            {msg.type === "typing" ? (
                              <>
                                {msg.message}
                                <span className="typing-dots">...</span>
                              </>
                            ) : (
                              msg.message
                            )}
                          </div>
                        )}

                        {/* Timestamp */}
                        <div
                          className={`text-end small mt-1 ${
                            isUser ? "text-white-50" : "text-muted"
                          }`}
                        >
                          {formatDate(msg?.timestamp, "time")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Show loader if bot is typing */}
            {isBotTyping && (
              <div className="d-flex mb-3">
                <div
                  className="bg-light small rounded shadow-sm p-2 px-3 d-flex flex-column align-items-start"
                  style={{ maxWidth: "75%" }}
                >
                  <div className="message-loader-2">
                    <div className="loader-bar-2"></div>
                    <div className="loader-bar-2"></div>
                    <div className="loader-bar-2"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>

      <div className="px-3 py-2 pb-0 d-flex align-items-stretch gap-2">
        <Button
          variant="outline-secondary"
          className="rounded px-4 d-flex align-items-center justify-content-center gap-2 action_btn"
          style={{ flexBasis: "20%" }}
          onClick={() => setShowClearChat(true)}
        >
          <Paintbrush size={20} />
          <span className="fw-medium"> {t("clear_chat")}</span>
        </Button>

        <InputGroup style={{ flexBasis: "80%" }}>
          <Form.Control
            placeholder={t("ask_me_anything")}
            aria-label="User message"
            className="chat-input no-focus small"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <Button
            style={{
              backgroundColor: "#e9012b",
            }}
            className="d-flex align-items-center justify-content-center"
            onClick={() => sendMessage()}
          >
            <Send size={18} />
          </Button>
        </InputGroup>
      </div>
      <>
        <div className="d-flex justify-content-end align-items-center small px-3 mb-2">
          <span>{t("review_propbot")}</span>
          <Button
            variant="link"
            className="p-1 text-decoration-none small"
            onClick={() => setShowTerms(true)}
          >
            {t("terms")}
          </Button>
        </div>

        <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
        <ClearChatModal
          show={showClearChat}
          onHide={() => setShowClearChat(false)}
          onConfirm={() => handleClearChat()}
        />
        <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
        {showLanguagePrompt && (
          <LanguageSelectorModal
            show={showLanguagePrompt}
            socket={socketRef.current}
            sessionId={sessionId}
            onSelect={(lang) => {
              i18n.changeLanguage(lang);
              document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
              setShowLanguagePrompt(false);
            }}
          />
        )}
      </>
    </Modal>
  );
}

export default PropBotGPTModal;
