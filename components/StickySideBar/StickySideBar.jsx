"use client";
import React from "react";
import TrendingStories from "./TrendingStories";
import JoinExclusive from "./JoinExclusive";

export default function SidebarSticky() {
  return (
    <aside className="sticky-sidebar">
      <div className="sidebar-scroll">
        <div className="sidebar-box invite-box">
          <JoinExclusive />
        </div>
        <div className="sidebar-box trending-sidebar">
          <TrendingStories />
        </div>
      </div>
      <footer className="sidebar-footer">© Joshspot Stories 2025</footer>
    </aside>
  );
}
