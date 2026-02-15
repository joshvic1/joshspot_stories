"use client";
import { formatDistanceToNow } from "date-fns";
import Reactions from "@/components/StoryCard/Reactions";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import ShareIcon from "@/components/StoryCard/ShareIcon";
import { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import "@/styles/singleStoryPage.css";
import BackButton from "../BackToPrev";
import AdsenseInline from "@/components/AdsenseInline";
import Link from "next/link";

const categoryColors = {
  love: "#ff5e78",
  sex: "#ff9f43",
  relationship: "#6a89cc",
  heartbreak: "#e55039",
};

export default function StoryPageClient({ story }) {
  const { _id, content, category, createdAt } = story;

  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ Split story using shortcode
  const storyParts = content?.split("[ad]") || [];

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const borderColor = categoryColors[category] || "#999";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sidebarWidth = isMobile ? 0 : sidebarOpen ? 200 : 10;

  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1);
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

          {/* ✅ Story Content with shortcode ads */}
          <div className="story-full-content">
            {storyParts.map((part, index) => {
              const sections = part.split("[readmore]");

              return (
                <div key={index}>
                  {sections.map((section, i) => (
                    <div key={i}>
                      {section.split("\n").map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}

                      {/* Insert Read More button */}
                      {i < sections.length - 1 && (
                        <div style={{ textAlign: "center", margin: "30px 0" }}>
                          <a
                            href="/"
                            style={{
                              backgroundColor: "#6a89cc",
                              color: "#fff",
                              padding: "12px 24px",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            Read More Stories →
                          </a>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Insert Ad between [ad] */}
                  {index < storyParts.length - 1 && (
                    <AdsenseInline slot="6027685473" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="story-meta-icons">
            <Reactions storyId={_id} />
            <ShareIcon story={story} />
          </div>
          <Link
            href="/"
            style={{
              backgroundColor: "#6a89cc",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Read More Stories →
          </Link>

          <hr />

          {/* ✅ Strong ad before comments */}
          <AdsenseInline slot="6027685473" />

          <h3>Comments</h3>
          <CommentForm storyId={_id} onCommentAdded={handleCommentAdded} />

          <CommentList key={refreshKey} storyId={_id} />
        </div>
      </div>
    </MainLayout>
  );
}
