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
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import "../../styles/sidebar.css";
import DarklightMode from "../DarkLightMode";

const Sidebar = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen && setSidebarOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        // For desktop, sync initial sidebar state to MainLayout
        setSidebarOpen && setSidebarOpen(isOpen);
      } else {
        // On mobile, close sidebar by default
        setIsOpen(false);
        setSidebarOpen && setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Home", icon: <FiHome />, href: "/" },
    { label: "My Stories", icon: <FiEdit2 />, href: "/submissions" },
    { label: "Submit Anonymous", icon: <FiPlusCircle />, href: "/submit" },
    { label: "JoshspotAI", icon: <FiMessageCircle />, href: "/ai" },
    { label: "Exclusive Stories", icon: <FiZap />, href: "/exclusive" },
    { label: "Saved", icon: <FiBookmark />, href: "/favorites" },
    { label: "Notifications", icon: <FiBell />, href: "/notifications" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button className="mobile-toggle-btn" onClick={() => setIsOpen(true)}>
          <FiMenu />
        </button>
      )}

      {/* Sidebar (Desktop or Mobile Drawer) */}
      <aside className={`sidebar ${isOpen ? "expanded" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isMobile ? <FiX /> : isOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`sidebar-link ${item.className || ""}`}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <span className="icon">{item.icon}</span>
              {(isOpen || isMobile) && (
                <span className="label">{item.label}</span>
              )}
            </Link>
          ))}
          <div className="dark-toggle-wrapper">
            <DarklightMode />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
