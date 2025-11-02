export default function StoryImageCard({ title, text, category, index }) {
  const W = 1080;
  const H = 1080;

  return (
    <div
      style={{
        width: W,
        height: H,
        position: "relative",
        overflow: "hidden",
        background: "#000", // Solid to avoid white edge on export
        color: "#fff",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* OUTER BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1200px 900px at 20% 0%, rgba(102,51,153,0.55), transparent 60%), radial-gradient(1000px 800px at 85% 100%, rgba(0,0,0,0.9), #000 70%)",
        }}
      />

      {/* ABSTRACT BLOBS */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(140,77,255,0.45), transparent 60%)",
          filter: "blur(70px)",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160,
          right: -140,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,60,210,0.35), transparent 65%)",
          filter: "blur(110px)",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 140,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(102,51,153,0.35), transparent 65%)",
          filter: "blur(70px)",
          opacity: 0.6,
        }}
      />

      {/* MAIN CONTENT CARD */}
      <div
        style={{
          position: "absolute",
          inset: 48,
          borderRadius: 40,
          background:
            "linear-gradient(155deg, rgba(102,51,153,0.95) 0%, rgba(29,14,48,0.98) 55%, rgba(9,6,18,1) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
          padding: "56px 64px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* WATERMARK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <div
            style={{
              fontSize: "180px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.5)",
              opacity: 0.06,
              transform: "rotate(-22deg)",
              whiteSpace: "nowrap",
              textShadow: "0 0 35px rgba(0,0,0,0.55)",
              letterSpacing: "-4px",
              mixBlendMode: "overlay",
              filter: "blur(1px)",
            }}
          >
            @joshspot_tv
          </div>
        </div>

        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: "#E9D8FF",
            textShadow: "0 2px 14px rgba(0,0,0,0.35)",
            marginBottom: 12,
            zIndex: 2,
          }}
        >
          JOSHSPOT TV — ANONYMOUS STORIES
        </div>

        {/* CATEGORY PILL */}
        <div
          style={{
            alignSelf: "center",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#F8F7FA",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(6px)",
            marginBottom: 28,
            zIndex: 2,
          }}
        >
          {category || "STORY"}
        </div>

        {/* CENTER SECTION: Title + Text Always Centered */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          {title?.trim() && (
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                lineHeight: 1.2,
                color: "#FFFFFF",
                marginBottom: 22,
                textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                maxWidth: "90%",
              }}
            >
              {title}
            </div>
          )}

          <div
            style={{
              fontSize: 34,
              lineHeight: 1.42,
              color: "rgba(255,255,255,0.96)",
              whiteSpace: "pre-wrap",
              textShadow: "0 1px 8px rgba(0,0,0,0.35)",
              wordBreak: "break-word",
              maxWidth: "90%",
            }}
          >
            {text}
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 18,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.9)",
            zIndex: 2,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700 }}>Page {index + 1}</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            joshspot.tv • @joshspot_tv
          </div>
        </div>
      </div>
    </div>
  );
}
