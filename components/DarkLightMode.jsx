"use client";
import { useState, useEffect } from "react";
import "/styles/darkLightMode.css";

export default function DarklightMode() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!theme) return null; // Avoid rendering toggle until theme is set

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
