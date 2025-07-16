"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import "/styles/reactions.css";

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

  const handleReaction = async () => {
    let newReaction = null;
    let previousType = userReaction;

    // Toggle love
    if (userReaction === "love") {
      previousType = "love";
      newReaction = null;
    } else {
      newReaction = "love";
    }

    try {
      const res = await axios.post(`/api/all-stories/${storyId}/reactions`, {
        type: newReaction,
        previousType,
      });
      setReactions(res.data.reactions);
      setUserReaction(newReaction);
      if (newReaction) {
        localStorage.setItem(localStorageKey, newReaction);
      } else {
        localStorage.removeItem(localStorageKey);
      }
    } catch (error) {
      console.error("Reaction failed", error);
    }
  };

  return (
    <div className="reaction-group">
      <button
        className={`reaction-pill ${userReaction === "love" ? "reacted" : ""}`}
        onClick={handleReaction}
      >
        <FiHeart className="emoji" />
        <span className="count">{reactions.love || 0}</span>
      </button>
    </div>
  );
}
