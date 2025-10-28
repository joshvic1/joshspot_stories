"use client";
import React from "react";

export default function StoryImageTemplate({
  title,
  content,
  footerTag = "",
  refCb,
}) {
  return (
    <div
      ref={refCb || undefined}
      style={{
        width: 1080,
        height: 1350,
        borderRadius: 24,
        padding: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, rgba(107,54,139,1) 0%, rgba(18,18,18,1) 100%)",
        color: "#fff",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 20,
          }}
        >
          JS
        </div>
        <div style={{ fontSize: 28, opacity: 0.9, fontWeight: 600 }}>
          Joshspot Stories
        </div>
      </div>

      {/* Body */}
      <div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            background: "rgba(0,0,0,0.25)",
            borderRadius: 20,
            padding: 24,
            backdropFilter: "blur(2px)",
          }}
        >
          {content}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 22, opacity: 0.9 }}>{footerTag}</div>
        <div style={{ fontSize: 18, opacity: 0.7 }}>
          joshspot.tv • #Relatable
        </div>
      </div>
    </div>
  );
}
