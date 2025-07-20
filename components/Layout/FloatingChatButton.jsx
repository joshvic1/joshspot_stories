"use client";

import {
  FiMessageCircle,
  FiX,
  FiTrash2,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import "../../styles/joshspotai.css";
import "/app/globals.css";

export default function FloatingChatButton({
  isChatOpen,
  setIsChatOpen,
  isChatExpanded,
  setIsChatExpanded,
}) {
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("joshspot_ai_chat") || "[]");
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMessages = JSON.parse(
        localStorage.getItem("joshspot_ai_chat") || "[]"
      );
      if (storedMessages.length === 0) {
        const welcomeMessage = {
          sender: "ai",
          text: "Hey, I'm JoshspotAI, your safest space to pour out your mind and get advice without fear of judging, it's just between me and you. No third party.",
        };
        setMessages([welcomeMessage]);
      } else {
        setMessages(storedMessages);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("joshspot_ai_chat", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageHistory: updatedMessages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
        }),
      });

      const data = await res.json();
      const aiMessage = { sender: "ai", text: data.reply };
      setTimeout(() => {
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("joshspot_ai_chat");
  };

  return (
    <>
      <div
        className="floating-chat-btn joshspot-ai-modal"
        onClick={() => {
          setIsChatOpen(!isChatOpen);
          setIsChatExpanded(false);
        }}
        title="Chat with Joshspot AI"
      >
        {isChatOpen ? <FiX /> : <FiMessageCircle />}
      </div>

      {isChatOpen && (
        <div
          className={`chatbox-container ${isChatExpanded ? "expanded" : ""}`}
        >
          <div className="chatbox-header">
            <span>JOSHSPOT AI</span>
            <div className="chatbox-header-icons">
              <button
                onClick={() => setIsChatExpanded(!isChatExpanded)}
                className="expand-btn"
              >
                {isChatExpanded ? (
                  <FiMinimize2 size={16} />
                ) : (
                  <FiMaximize2 size={16} />
                )}
              </button>
              <button onClick={clearChat} className="clear-btn">
                <FiTrash2 size={16} />
              </button>
              <button
                onClick={() => {
                  setIsChatOpen(false);
                  setIsChatExpanded(false);
                }}
                className="clear-btn"
              >
                <FiX />
              </button>
            </div>
          </div>

          <div className="chatbox-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message ai typing">
                Joshspot AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Type something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
