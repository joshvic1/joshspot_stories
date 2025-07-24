"use client";
import { useState, useEffect } from "react";
import "/styles/darkLightMode.css";

export default function DarklightMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    window.dispatchEvent(new Event("storage"));
  }, [theme]);

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
