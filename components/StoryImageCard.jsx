export default function StoryImageCard({
  title,
  text,
  category,
  index,
  totalParts = 1,
  backgroundImage,
}) {
  const W = 1080;
  const H = 1080;
  const highlightWords = [
    "love",
    "years",
    "year",
    "months",
    "month",
    "relationship",
    "marriage",
    "pregnant",
    "cheated",
    "heartbreak",
    "facebook",
    "accepted",
    "forgive",
    "forgave",
    "restarted",
    "hardship",
    "family",
    "moved",
    "confessed",
  ];

  const renderHighlightedText = (value) =>
    String(value || "")
      .split(/(\s+)/)
      .map((part, partIndex) => {
        const clean = part.toLowerCase().replace(/[^a-z]/g, "");
        const isHighlighted = highlightWords.includes(clean);

        return (
          <span
            key={`${part}-${partIndex}`}
            style={{ color: isHighlighted ? "#6B368B" : "#050308" }}
          >
            {part}
          </span>
        );
      });

  return (
    <div
      style={{
        width: W,
        height: H,
        position: "relative",
        overflow: "hidden",
        background: "#efe4fb",
        color: "#050308",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          crossOrigin="anonymous"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(244,232,255,0.98) 0%, rgba(244,232,255,0.94) 39%, rgba(244,232,255,0.56) 59%, rgba(244,232,255,0.08) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(79,34,106,0.2) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 34,
          right: 28,
          top: 74,
          height: 3,
          background: "#6B368B",
          opacity: 0.82,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 30,
          fontSize: 30,
          fontWeight: 900,
          letterSpacing: 2,
        }}
      >
        JOSHSPOT MEDIA
      </div>
      <div
        style={{
          position: "absolute",
          right: 36,
          top: 30,
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: 1.3,
        }}
      >
        STORY PART {index + 1}
      </div>

      <div
        style={{
          position: "absolute",
          left: 34,
          top: 100,
          width: 80,
          height: 76,
          borderRadius: 14,
          background: "linear-gradient(145deg, #8E43C7, #4C1F72)",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 54,
          fontWeight: 900,
        }}
      >
        {index + 1}
      </div>

      <div
        style={{
          position: "absolute",
          left: 36,
          top: title?.trim() ? 196 : 198,
          width: 532,
          maxHeight: 760,
          overflow: "hidden",
        }}
      >
        {title?.trim() && (
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.18,
              fontWeight: 900,
              color: "#6B368B",
              marginBottom: 18,
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.28,
            fontWeight: 900,
            color: "#050308",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {renderHighlightedText(text)}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 82,
          background: "linear-gradient(90deg, #4D246F, #6B368B)",
          display: "flex",
          alignItems: "center",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            marginLeft: 30,
            borderRadius: 10,
            background: "#FFFFFF",
            color: "#6B368B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 35,
            fontWeight: 900,
            fontStyle: "italic",
          }}
        >
          J
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 4,
            marginLeft: 16,
          }}
        >
          JOSHSPOT TV
        </div>
        <div
          style={{
            width: 1,
            height: 48,
            background: "rgba(255,255,255,0.5)",
            marginLeft: 30,
          }}
        />
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 5,
            marginLeft: 30,
          }}
        >
          STORIES THAT CONNECT US
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: 28,
            fontSize: 15,
            fontWeight: 800,
            opacity: 0.85,
          }}
        >
          {index + 1}/{totalParts}
        </div>
      </div>
    </div>
  );
}
