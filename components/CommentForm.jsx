"use client";
import { useState } from "react";
import axios from "axios";

import "/styles/commentForm.css";

export default function CommentForm({ storyId, onCommentAdded }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(`/api/all-stories/${storyId}/comment`, {
        text,
      });
      onCommentAdded(res.data.comment);
      setText("");
    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitComment} className="comment-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a comment..."
        disabled={loading}
        className="comment-input"
      />
      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <span className="arrow">&#8594;</span> // Right arrow
        )}
      </button>
    </form>
  );
}
