"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "/styles/reactions.css";

const reactionTypes = {
  love: "❤️",
  heartbreak: "💔",
  thumbsdown: "👎",
};

export default function Reactions({ storyId }) {
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const localStorageKey = `reaction-${storyId}`;

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const res = await axios.get(`/api/all-stories/${storyId}/reactions`);
        setReactions(res.data.reactions || {});
      } catch (error) {
        console.error("Failed to fetch reactions", error);
      }
    };

    const savedReaction = localStorage.getItem(localStorageKey);
    if (savedReaction) setUserReaction(savedReaction);

    fetchReactions();
  }, [storyId]);

  const handleReaction = async (type) => {
    if (userReaction) return;

    try {
      const res = await axios.post(`/api/all-stories/${storyId}/reactions`, {
        type,
      });
      setReactions(res.data.reactions);
      setUserReaction(type);
      localStorage.setItem(localStorageKey, type);
    } catch (error) {
      console.error("Reaction failed", error);
    }
  };

  return (
    <div className="reaction-group">
      {Object.entries(reactionTypes).map(([type, emoji]) => (
        <button
          key={type}
          className={`reaction-pill ${userReaction === type ? "reacted" : ""}`}
          onClick={() => handleReaction(type)}
        >
          <span className="emoji">{emoji}</span>
          <span className="count">{reactions[type] || 0}</span>
        </button>
      ))}
    </div>
  );
}
