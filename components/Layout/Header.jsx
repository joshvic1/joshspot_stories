"use client";
import "/styles/storypage.css";
import { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiBookmark,
  FiBell,
  FiPlusCircle,
  FiMessageCircle,
  FiEdit2,
  FiZap,
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiMoreVertical,
} from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import DarklightMode from "../DarkLightMode";
import "../../styles/sidebar.css";

export default function Header(setChatOpen, setChatExpanded) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", icon: <FiHome />, href: "/" },
    { label: "My Stories", icon: <FiEdit2 />, href: "/submissions" },
    { label: "Submit Anonymous", icon: <FiPlusCircle />, href: "/submit" },
    { label: "Exclusive Stories", icon: <FiZap />, href: "/exclusive" },
    { label: "Saved", icon: <FiBookmark />, href: "/favorites" },
    { label: "Notifications", icon: <FiBell />, href: "/notifications" },
  ];
  return (
    <div>
      <div className="scrolling-text-bar">
        <div className="scrolling-text">
          New Confessions & Stories every day on Joshspot Stories. Stay tuned!
          New Confessions & Stories every day on Joshspot Stories. Stay tuned!
        </div>
      </div>

      <img src="/logo-desktop.png" alt="Logo" className="logo" />
      <div className="mobile-header">
        <div>
          <img src="/logoMobile.png" alt="Logo" className="logoMobile" />
        </div>
        <div>
          <button
            className="mobile-special-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="inner-icon">
              <HiMenuAlt2 />
            </span>
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
      </div>
    </div>
  );
}
