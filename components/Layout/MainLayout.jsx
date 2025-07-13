"use client";

import { useState, useEffect } from "react";
import "/app/globals.css";
import Sidebar from "./SideBar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {!isMobile && (
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <div
        className="main-content-wrapper"
        style={{
          flexGrow: 1,
          paddingLeft: `${sidebarWidth}px`,
          transition: "padding-left 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
