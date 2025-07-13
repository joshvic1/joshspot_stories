"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "/styles/commentList.css";

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

// Deterministic emoji for a comment based on its ID
function getEmojiAvatar(commentId) {
  let sum = 0;
  for (let i = 0; i < commentId.length; i++) {
    sum += commentId.charCodeAt(i);
  }
  return emojiAvatars[sum % emojiAvatars.length];
}

export default function CommentList({ storyId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/all-stories/${storyId}/comment`);
        setComments(res.data);
      } catch (err) {
        console.error("Error loading comments", err);
      }
    };

    fetchComments();
  }, [storyId]);

  if (comments.length === 0)
    return <p className="no-comments">💬 No comments yet. Be the first!</p>;

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment._id} className="comment-item">
          <div className="comment-bubble">
            <div className="comment-avatar">{getEmojiAvatar(comment._id)}</div>
            <div className="comment-text-block">
              <p className="comment-text">{comment.text}</p>
              <span className="comment-time">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
