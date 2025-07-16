"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import BackButton from "@/components/BackToPrev";
import "./submissions.css";
import "/styles/storycard.css";
import ConfirmPopup from "@/components/ConfirmPopup";

export default function SubmissionsPage() {
  const [stories, setStories] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myStories")) || [];
    const sorted = stored.sort((a, b) => b.time - a.time);
    setStories(sorted);
  }, []);

  const handleClear = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    localStorage.removeItem("my_submissions");
    setMySubmissions([]);
    setShowConfirm(false);
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  return (
    <MainLayout>
      <div className="submissions-header mx-7 my-9">
        <h1 className="text-2xl font-bold"> My Submitted Stories</h1>
        <button onClick={handleClear} className="clear-button">
          Clear My Submissions
        </button>

        {showConfirm && (
          <ConfirmPopup
            message="This will not delete your story, it will only clear this submission list. Press OK to proceed."
            onConfirm={confirmClear}
            onCancel={cancelClear}
          />
        )}
      </div>
      <div className="submissions-container">
        {stories.length === 0 ? (
          <p className="empty-text">
            You haven't submitted any stories on this device.
          </p>
        ) : (
          <ul className="story-list">
            {stories.map((story, i) => (
              <li key={i} className="story-card-v2">
                <div className="story-header">
                  <div className="emoji-avatar">✍️</div>
                  <div className="meta-info">
                    <span className="category">{story.category}</span>
                    <span className="time">
                      {new Date(story.time).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="story-content">{story.content}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BackButton />
    </MainLayout>
  );
}
