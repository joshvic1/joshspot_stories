import { useMemo, useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Reactions from "/components/StoryCard/Reactions";
import CommentIcon from "/components/StoryCard/CommentIcon";
import ShareIcon from "/components/StoryCard/ShareIcon";
import "/styles/storycard.css";
import { usePathname } from "next/navigation";
import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";

// Defining my custom emoji avatar
const emojiAvatars = [
  "🦁",
  "🐼",
  "👻",
  "🐸",
  "🦊",
  "😈",
  "🐵",
  "🤖",
  "🐙",
  "🐶",
  "👽",
];

const categoryColors = {
  love: "#ff5e78",
  sex: "#ff9f43",
  relationship: "#6a89cc",
  heartbreak: "#e55039",
};

export default function StoryCard({ story, onRemoveFavorite, isFavoritePage }) {
  const { content, category, createdAt } = story;
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const borderColor = categoryColors[category] || "#999";

  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav._id === story._id));
  }, [story._id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((s) => s._id !== story._id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);

      if (isFavoritePage && onRemoveFavorite) {
        onRemoveFavorite(story._id); // Trigger UI removal
      }
    } else {
      favorites.push(story);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const isLong = content.length > 200;
  const displayedText =
    expanded || !isLong ? content : content.slice(0, 200) + "...";

  const emojiAvatar = useMemo(() => {
    const index = Math.floor(Math.random() * emojiAvatars.length);
    return emojiAvatars[index];
  }, [story._id]);

  return (
    <div className="story-card">
      <div className="story-card-v2">
        {/* 🔖 Favorite icon */}
        <div className="favorite-icon" onClick={toggleFavorite}>
          {isFavorite ? (
            <div className="tooltip">
              <FaBookmark size={20} color="var(--text-color)" />
              <span className="tooltip-text">Remove from Favorite</span>
            </div>
          ) : (
            <div className="tooltip">
              <FiBookmark size={20} color="#aaa" />
              <span className="tooltip-text">Add to Favorite</span>
            </div>
          )}
        </div>

        <div className="story-header">
          <div className="emoji-avatar">{emojiAvatar}</div>

          <div className="meta-info">
            <span className="category" style={{ color: borderColor }}>
              {category}
            </span>
            <span className="time">{timeAgo}</span>
          </div>
        </div>

        <p className="story-content">
          {displayedText}{" "}
          {isLong && (
            <button
              className="expand-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less ▲" : "Show More ▼"}
            </button>
          )}
        </p>

        <div className="story-meta">
          <div className="meta-item">
            <Reactions storyId={story._id} />
            <div className="meta-item">
              <CommentIcon storyId={story._id} />
            </div>
          </div>
          <div className="meta-item">
            <ShareIcon story={story} />
          </div>
        </div>
      </div>
    </div>
  );
}
