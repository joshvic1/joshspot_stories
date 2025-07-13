"use client";
import { formatDistanceToNow } from "date-fns";
import Reactions from "@/components/StoryCard/Reactions";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import ShareIcon from "@/components/StoryCard/ShareIcon";
import { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import "/styles/singleStoryPage.css";
import BackButton from "../BackToPrev";

const categoryColors = {
  love: "#ff5e78",
  sex: "#ff9f43",
  relationship: "#6a89cc",
  heartbreak: "#e55039",
};

export default function StoryPageClient({ story }) {
  const { _id, content, category, createdAt } = story;
  const [refreshKey, setRefreshKey] = useState(0);
  const displayedStory = content.replace(/[\r\n]+/g, " ");
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const borderColor = categoryColors[category] || "#999";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sidebarWidth = isMobile ? 0 : sidebarOpen ? 200 : 10;
  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1); // forces CommentList to reload
  };

  return (
    <MainLayout>
      <div
        style={{
          flexGrow: 1,
          paddingLeft: `${sidebarWidth}px`,
          transition: "padding-left 0.3s ease",
        }}
      >
        <BackButton className="back" />
        <div className="individual-story">
          <div className="story-meta">
            <span style={{ color: borderColor }} className="story-category">
              {category}
            </span>
            <span className="story-time">{timeAgo}</span>
          </div>

          <p className="story-full-content">{displayedStory}</p>

          <div className="story-meta-icons">
            <Reactions storyId={_id} />
            <ShareIcon story={story} />
          </div>

          <hr />

          <h3>Comments</h3>
          <CommentForm storyId={_id} onCommentAdded={handleCommentAdded} />
          <CommentList key={refreshKey} storyId={_id} />
        </div>
      </div>
    </MainLayout>
  );
}
