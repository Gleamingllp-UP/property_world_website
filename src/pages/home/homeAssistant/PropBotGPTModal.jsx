import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, InputGroup, Badge } from "react-bootstrap";
import { X, Send, Paintbrush } from "lucide-react"; // ✅ Lucide icons
import "./PropBotGPTModal.css";
import { property_world_logo } from "../../../assets/images";
import TermsModal from "./TermsModal";
import { useSelector } from "react-redux";
import LoginModal from "../../auth/login/LoginModal";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { io } from "socket.io-client";

function PropBotGPTModal({ show, handleClose }) {
  const [showTerms, setShowTerms] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const quickButtons = [
    "Find a Property",
    "Search by Location",
    "Investment Advice",
    "Estimate Property Value",
    "Compare Properties",
    "Request a Callback",
    "Book a Viewing",
    "Ask a Question",
  ];

  const handleLogin = () => {
    setModalShow(true);
  };

  const socketRef = useRef(null);
  const chatRef = useRef(null);

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { userData } = useSelector((store) => store?.user);
  const userId = userData?._id;

  // 🔌 Establish socket connection
  useEffect(() => {
    if (!show) return;
    socketRef.current = io(import.meta.env.VITE_SOCKET_IO_URL, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to PropBot:", socketRef.current.id);

      // Initiate chat session
      socketRef.current.emit("chat:init", { userId }, ({ sessionId }) => {
        setSessionId(sessionId);

        // Fetch previous chat history
        socketRef.current.emit("chat:history", { userId }, ({ messages }) => {
          console.log("messages", messages);

          setMessages(messages || []);
        });
      });
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [show, userId]);

  // 📤 Send message
  const sendMessage = () => {
    if (!input.trim() || !sessionId) return;

    const userMsg = {
      role: "user",
      message: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);

    socketRef.current.emit(
      "chat:message",
      { sessionId, message: input },
      ({ messages: botMessages }) => {
        console.log("object", botMessages);
        if (Array.isArray(botMessages)) {
          const formatted = botMessages.map((msg) => ({
            ...msg,
            timestamp: new Date(),
          }));
          setMessages((prev) => [...prev, ...formatted]);
        }
      }
    );

    setInput("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
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
            <div className="fw-semibold text-muted">PropBot</div>
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

      <Modal.Body className="text-center overflow-auto">
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
          <h5 className="fw-bold mb-2">Say Hello to PropBot</h5>
          <p className="text-muted small mb-4">
            Chat with the UAE’s first AI-Powered property search assistant and
            browse homes stress free!
          </p>
          <div className="d-flex mb-3">
            <div
              className="bg-light small rounded shadow-sm p-2 px-3"
              style={{ maxWidth: "75%" }}
            >
              Alright! Let’s start a new conversation. What can I help you with?
            </div>
          </div>

          <div
            className="mb-3 bg-light shadow-sm rounded p-2 px-3"
            style={{
              width: "fit-content",
              maxWidth: "75%",
            }}
          >
            <p className="text-start small mb-2">
              In order to continue this conversation, please log in to your
              PropertyWorld account:
            </p>
            <div className="d-flex justify-content-start align-items-center gap-3">
              <Button
                style={{
                  backgroundColor: "#e9012b",
                  borderColor: "#e9012b",
                }}
                className="px-4 py-1"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                variant="outline-primary"
                className="px-4 py-1"
                onClick={() => navigate(pageRoutes.SIGN_UP)}
              >
                Signup
              </Button>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
            {quickButtons &&
              quickButtons?.map((btn, idx) => (
                <Badge
                  key={idx}
                  pill
                  bg="light"
                  className="border border-secondary-subtle text-dark fw-bold py-2 px-3 cursor-pointer"
                >
                  {btn}
                </Badge>
              ))}
          </div>

          <div
            className="p-3"
            style={{ maxHeight: "400px", overflowY: "auto" }}
            ref={chatRef}
          >
            {messages.map((msg, index) => {
              return msg.role === "user" ? (
                <div className="d-flex justify-content-end mb-3" key={index}>
                  <div
                    className="text-white  small rounded shadow-sm p-2 px-3"
                    style={{ maxWidth: "75%", backgroundColor: "#e9012b" }}
                  >
                    <div className="text-start">
                      <strong>{msg.role === "user" ? "You" : "PropBot"}</strong>
                    </div>
                    {msg.message}
                  </div>
                </div>
              ) : (
                <div className="d-flex mb-3" key={index}>
                  <div
                    className="bg-light small rounded shadow-sm p-2 px-3"
                    style={{ maxWidth: "75%" }}
                  >
                    <div className="text-start">
                      <strong>{msg.role === "user" ? "You" : "PropBot"}</strong>
                    </div>
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Body>

      <div className="px-3 py-2 pb-0 d-flex align-items-stretch gap-2">
        <Button
          variant="outline-secondary"
          className="rounded px-4 d-flex align-items-center justify-content-center gap-2 action_btn"
          style={{ flexBasis: "20%" }}
          onClick={() => alert("Chat cleared")}
        >
          <Paintbrush size={20} />
          <span className="fw-medium">Clear Chat</span>
        </Button>

        <InputGroup style={{ flexBasis: "80%" }}>
          <Form.Control
            placeholder="Ask me anything about UAE real estate."
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
          <span>Review PropBot</span>
          <Button
            variant="link"
            className="p-1 text-decoration-none small"
            onClick={() => setShowTerms(true)}
          >
            Terms
          </Button>
        </div>

        <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
        <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
    </Modal>
  );
}

export default PropBotGPTModal;
