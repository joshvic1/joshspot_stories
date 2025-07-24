"use client";
import "/styles/storypage.css";
import "../../styles/sidebar.css";
import { useEffect, useState } from "react";
import MobileSideBar from "../MobileSideBar";

export default function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("theme") || "light");
      window.addEventListener("storage", () => {
        setTheme(localStorage.getItem("theme") || "light");
      });
    }
  }, []);

  const logoSrcMobile = theme === "dark" ? "/logo2.png" : "/logo1.png";
  const logoSrcDesktop = theme === "dark" ? "/logo3.png" : "/logo4.png";

  return (
    <div>
      {/* <div className="scrolling-text-bar">
        <div className="scrolling-text">
          New Confessions & Stories every day on Joshspot Stories. Stay tuned!
          New Confessions & Stories every day on Joshspot Stories. Stay tuned!
        </div>
      </div> */}

      {/* Desktop Logo */}
      {/* <img src={logoSrcDesktop} alt="Logo" className="logo" /> */}

      {/* Mobile Logo */}
      {/* <div className="mobile-header">
        <div>
          <img src={logoSrcMobile} alt="Logo" className="logoMobile" />
        </div> */}
      <div className="mobile-toggle-wrapper">
        <MobileSideBar />
      </div>
    </div>
  );
}
