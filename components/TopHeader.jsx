// components/TopHeader.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import DarkLightMode from "/components/DarkLightMode";
import SearchBar from "./Layout/SearchBar";
import "/styles/TopHeader.css";

export default function TopHeader({
  searchTerm,
  setSearchTerm,
  stories,
  onSearch,
}) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("theme") || "light");
      window.addEventListener("storage", () => {
        setTheme(localStorage.getItem("theme") || "light");
      });
    }
  }, []);

  const logoSrc = theme === "dark" ? "/logo2.png" : "/logo1.png";

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
          Submit Story
        </Link>
        <DarkLightMode />
      </div>
    </header>
  );
}
