export default function StoryImageCard({ title, text, category, index }) {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        padding: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #1a1027, #3b245f)",
        color: "white",
        borderRadius: 32,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {category}
        </div>
        <div style={{ fontSize: 20, opacity: 0.7 }}>Joshspot TV</div>
      </div>

      <div>
        {title && title.trim().length > 0 && (
          <h2
            style={{
              fontSize: 56,
              lineHeight: 1.1,
              fontWeight: 800,
              marginBottom: 24,
            }}
          >
            {title}
          </h2>
        )}
        <p style={{ fontSize: 38, lineHeight: 1.35, whiteSpace: "pre-wrap" }}>
          {text}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 20, opacity: 0.85 }}>Part {index + 1}</div>
        <div style={{ fontSize: 22, opacity: 0.9 }}>
          joshspot.tv • @joshspot_tv
        </div>
      </div>
    </div>
  );
}
