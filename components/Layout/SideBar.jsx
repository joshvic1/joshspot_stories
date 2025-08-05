"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiHome,
  FiBookmark,
  FiMenu,
  FiX,
  FiBell,
  FiPlusCircle,
  FiMessageCircle,
  FiEdit2,
  FiZap,
} from "react-icons/fi";
import "../../styles/sidebar.css";

const Sidebar = ({ setSidebarOpen, setChatOpen, setChatExpanded }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen && setSidebarOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 827;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen && setSidebarOpen(isOpen);
      } else {
        setIsOpen(false);
        setSidebarOpen && setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Home", icon: <FiHome />, href: "/", title: "Home" },
    { label: "My Stories", icon: <FiEdit2 />, href: "/submissions" },
    { label: "Submit Anonymous", icon: <FiPlusCircle />, href: "/submit" },
    { label: "Exclusive Stories", icon: <FiZap />, href: "/exclusive" },
    { label: "Saved", icon: <FiBookmark />, href: "/favorites" },
    { label: "Notifications", icon: <FiBell />, href: "/notifications" },
  ];

  return (
    <>
      {isMobile && (
        <button className="mobile-toggle-btn" onClick={() => setIsOpen(true)}>
          <FiMenu />
        </button>
      )}

      <aside className={`sidebar ${isOpen ? "expanded" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isMobile ? <FiX /> : isOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div className="tooltip-wrapper" key={index}>
              <Link
                href={item.href}
                className={`sidebar-link ${item.className || ""}`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="icon">{item.icon}</span>
                {(isOpen || isMobile) && (
                  <span className="label">{item.label}</span>
                )}
              </Link>
              {!isOpen && !isMobile && (
                <span className="tooltip-sidebar">{item.label}</span>
              )}
            </div>
          ))}

          <div className="tooltip-wrapper">
            <button
              className="sidebar-link"
              onClick={() => {
                setChatOpen(true);
                setChatExpanded(true);
                if (isMobile) setIsOpen(false);
              }}
            >
              <span className="icon">
                <FiMessageCircle />
              </span>
              {(isOpen || isMobile) && (
                <span className="label">Joshspot AI</span>
              )}
            </button>
            {!isOpen && !isMobile && (
              <span className="tooltip-sidebar">Joshspot AI</span>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
