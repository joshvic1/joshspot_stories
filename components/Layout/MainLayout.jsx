"use client";

import { useState, useEffect } from "react";
import "/app/globals.css";
import Sidebar from "./SideBar";
import FloatingChatButton from "./FloatingChatButton";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isMobile ? 0 : sidebarOpen ? 200 : 60;

  return (
    <div className="layout-container">
      {!isMobile && (
        <Sidebar
          isOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setChatOpen={setIsChatOpen}
          setChatExpanded={setIsChatExpanded}
        />
      )}

      <FloatingChatButton
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        isChatExpanded={isChatExpanded}
        setIsChatExpanded={setIsChatExpanded}
      />

      <main
        className="main-content"
        style={{
          paddingLeft: `${sidebarWidth}px`,
        }}
      >
        {children}
      </main>

      {isChatOpen && (
        <div className={`chat-overlay ${isChatExpanded ? "expanded" : ""}`}>
          <button
            className="chat-close-btn"
            onClick={() => {
              setIsChatOpen(false);
              setIsChatExpanded(false);
            }}
          ></button>
        </div>
      )}
    </div>
  );
}
