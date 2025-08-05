"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiPlus, FiMenu } from "react-icons/fi";
import DarkLightMode from "/components/DarkLightMode";
import SearchBar from "./Layout/SearchBar";
import "/styles/topHeader.css";
import MobileSideBar from "./MobileSideBar";

export default function TopHeader({ stories }) {
  const [theme, setTheme] = useState("light");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("theme") || "light");
      window.addEventListener("storage", () => {
        setTheme(localStorage.getItem("theme") || "light");
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoSrc = isMobile
    ? "/mobilelogo.png"
    : theme === "dark"
    ? "/logo2.png"
    : "/logo1.png";

  return (
    <header className="top-header">
      <div className="header-left">
        <Link href="/">
          <img src={logoSrc} alt="Logo" className="header-logo" />
        </Link>
      </div>

      <div className="header-center">
        <SearchBar stories={stories} />
      </div>

      <div className="header-right">
        <Link href="/submit" className="submit-button">
          {isMobile ? <FiPlus size={18} /> : "Submit Story"}
        </Link>

        <div className="dark-toggle">
          <DarkLightMode />
        </div>

        {isMobile && (
          <button className="mobile-menu-icon" aria-label="Open menu">
            <MobileSideBar />
          </button>
        )}
      </div>
    </header>
  );
}
