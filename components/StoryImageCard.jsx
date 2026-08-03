import { Montserrat } from "next/font/google";

const exportFont = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900"],
});

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
  const accent = "#B46CFF";
  const accentSoft = "#E5D2FF";
  const deepPurple = "#2B073F";
  const wordCount = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  const textFontSize = wordCount > 62 ? 39 : wordCount > 52 ? 41 : wordCount > 40 ? 44 : 48;
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
    "hurt",
    "lost",
    "virginity",
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
            style={{ color: isHighlighted ? accent : "#FFFFFF" }}
          >
            {part}
          </span>
        );
      });

  return (
    <div
      className={exportFont.className}
      style={{
        width: W,
        height: H,
        position: "relative",
        overflow: "hidden",
        background: "#030104",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(850px 720px at 72% 28%, rgba(180,108,255,0.38), transparent 62%), radial-gradient(760px 620px at 18% 56%, rgba(72,15,111,0.9), transparent 68%), linear-gradient(135deg, #09020f 0%, #240638 46%, #050107 100%)",
        }}
      />

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
            "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(8,2,14,0.82) 35%, rgba(43,7,63,0.32) 56%, rgba(0,0,0,0.02) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(800px 620px at 18% 44%, rgba(116,36,171,0.28), transparent 66%), linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.48) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 46,
          right: 48,
          top: 104,
          height: 2,
          background: accent,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 54,
          fontSize: 27,
          fontWeight: 900,
          letterSpacing: 5,
          color: accent,
          textShadow: `0 2px 18px ${deepPurple}`,
        }}
      >
        JOSHSPOT MEDIA
      </div>
      <div
        style={{
          position: "absolute",
          right: 58,
          top: 54,
          fontSize: 25,
          fontWeight: 900,
          letterSpacing: 5,
          color: accent,
          textShadow: `0 2px 18px ${deepPurple}`,
        }}
      >
        STORY PART {index + 1}
      </div>

      <div
        style={{
          position: "absolute",
          left: 58,
          top: 158,
          width: 86,
          height: 84,
          borderRadius: 14,
          background: `linear-gradient(145deg, ${accentSoft}, ${accent})`,
          color: "#160326",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          fontWeight: 900,
          fontFamily: "Georgia, 'Times New Roman', serif",
          boxShadow: "0 18px 36px rgba(0,0,0,0.45)",
        }}
      >
        {index + 1}
      </div>

      <div
        style={{
          position: "absolute",
          left: 58,
          top: title?.trim() ? 260 : 272,
          width: 560,
          maxHeight: 685,
          overflow: "hidden",
        }}
      >
        {title?.trim() && (
          <div
            style={{
              fontSize: 27,
              lineHeight: 1.12,
              fontWeight: 900,
              color: accent,
              marginBottom: 18,
              textShadow: "0 3px 16px rgba(0,0,0,0.82)",
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            fontSize: textFontSize,
            lineHeight: 1.2,
            fontWeight: 900,
            color: "#FFFFFF",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            letterSpacing: 0,
            WebkitFontSmoothing: "antialiased",
            textRendering: "geometricPrecision",
            textShadow:
              "0 4px 16px rgba(0,0,0,0.9), 0 1px 1px rgba(0,0,0,0.98)",
          }}
        >
          {renderHighlightedText(text)}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 86,
          height: 2,
          background: accent,
          opacity: 0.75,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 86,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.99), rgba(25,5,38,0.99))",
          display: "flex",
          alignItems: "center",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            marginLeft: 54,
            borderRadius: 10,
            background: `linear-gradient(145deg, ${accentSoft}, ${accent})`,
            color: "#160326",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 35,
            fontWeight: 900,
            fontStyle: "italic",
            boxShadow: `0 0 0 2px rgba(255,255,255,0.26) inset`,
          }}
        >
          J
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 900,
            letterSpacing: 5,
            marginLeft: 20,
            color: accent,
          }}
        >
          JOSHSPOT TV
        </div>
        <div
          style={{
            width: 1,
            height: 46,
            background: "rgba(180,108,255,0.68)",
            marginLeft: 32,
          }}
        />
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 5,
            marginLeft: 34,
            color: "#FFFFFF",
          }}
        >
          STORIES THAT CONNECT US
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: 30,
            fontSize: 15,
            fontWeight: 800,
            color: accent,
            opacity: 0.95,
          }}
        >
          {index + 1}/{totalParts}
        </div>
      </div>
    </div>
  );
}
