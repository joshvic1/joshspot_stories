"use client";
import "/styles/storypage.css";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  FiHome,
  FiBookmark,
  FiBell,
  FiPlusCircle,
  FiMessageCircle,
  FiEdit2,
  FiZap,
  FiX,
} from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import DarklightMode from "/components/DarkLightMode";

export default function MobileSideBar({ setChatOpen, setChatExpanded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const toggleWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!toggleWrapperRef.current) return;
      const rect = toggleWrapperRef.current.getBoundingClientRect();
      setIsFixed(rect.top <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", icon: <FiHome />, href: "/" },
    { label: "My Stories", icon: <FiEdit2 />, href: "/submissions" },
    { label: "Submit Anonymous", icon: <FiPlusCircle />, href: "/submit" },
    { label: "Exclusive Stories", icon: <FiZap />, href: "/exclusive" },
    { label: "Saved", icon: <FiBookmark />, href: "/favorites" },
    { label: "Notifications", icon: <FiBell />, href: "/notifications" },
  ];

  return (
    <div ref={toggleWrapperRef} className="mobile-toggle-wrapper">
      <button
        className={`mobile-special-toggle ${isFixed ? "fixed" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="inner-icon">{isOpen ? <FiX /> : <HiMenuAlt2 />}</span>
      </button>

      {isOpen && (
        <aside className="mobile-sidebar">
          <nav className="mobile-sidebar-nav">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="mobile-sidebar-link"
                onClick={() => setIsOpen(false)}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            ))}
            <button
              className="mobile-sidebar-link"
              onClick={() => {
                setChatOpen(true);
                setChatExpanded(true);
                setIsOpen(false);
              }}
            >
              <span className="icon">
                <FiMessageCircle />
              </span>
              <span className="label">Joshspot AI</span>
            </button>
            <div className="dark-toggle-wrapper">
              <DarklightMode />
            </div>
          </nav>
        </aside>
      )}
    </div>
  );
}
