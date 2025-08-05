"use client";

import { useState, useEffect } from "react";
import "/app/globals.css";
import Sidebar from "./SideBar";
import FloatingChatButton from "./FloatingChatButton";
import TopHeader from "../TopHeader";
import SearchBar from "./SearchBar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [stories, setStories] = useState([]);
  const [mounted, setMounted] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchStories = async () => {
      const res = await fetch(
        `${BACKEND_URL}/api/all-stories?page=1&limit=100`
      );
      const data = await res.json();
      setStories(data.stories || []);
    };

    fetchStories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 827);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isMobile ? 0 : sidebarOpen ? 200 : 60;
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="layout-root">
      <TopHeader stories={stories} />
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
