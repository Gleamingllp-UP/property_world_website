import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const PropBotChat = () => {
  const socketRef = useRef(null);
  const chatRef = useRef(null);

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { userData } = useSelector((store) => store?.user);
  const userId = userData?._id;

  // 🔌 Establish socket connection
  useEffect(() => {
    socketRef.current = io("http://localhost:4000/propbot", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to PropBot:", socketRef.current.id);

      // Initiate chat session
      socketRef.current.emit("chat:init", { userId }, ({ sessionId }) => {
        setSessionId(sessionId);

        // Fetch previous chat history
        socketRef.current.emit("chat:history", { userId }, ({ messages }) => {
        console.log("messages",messages)

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
  }, [userId]);

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
        console.log("object",botMessages)
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

  // 📜 Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container" style={styles.container}>
      <div className="chat-box" ref={chatRef} style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#dcf8c6" : "#f1f0f0",
            }}
          >
            <div style={styles.sender}>
              <strong>{msg.role === "user" ? "You" : "PropBot"}</strong>
            </div>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: 600,
    margin: "50px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    background: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    height: 400,
    overflowY: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    border: "1px solid #ddd",
    borderRadius: 5,
    background: "#fff",
  },
  message: {
    padding: "10px 15px",
    borderRadius: 15,
    maxWidth: "80%",
    wordBreak: "break-word",
    fontSize: 14,
  },
  sender: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  inputBox: {
    display: "flex",
    marginTop: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default PropBotChat;
