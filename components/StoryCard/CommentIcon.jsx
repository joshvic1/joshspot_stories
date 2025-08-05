"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMessageSquare } from "react-icons/fi";
import "/styles/storycard.css";

export default function CommentIcon({ storyId }) {
  const [commentCount, setCommentCount] = useState(0);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/all-stories/${storyId}/comment`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCommentCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [storyId]);

  return (
    <Link href={`/story/${storyId}`} className="comment-icon" title="Comment">
      <FiMessageSquare /> {commentCount}{" "}
      {commentCount <= 1 ? "Reply" : "Replies"}
    </Link>
  );
}
