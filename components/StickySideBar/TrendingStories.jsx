"use client";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { FaFire } from "react-icons/fa";

export default function TrendingSidebar() {
  const [trendingStories, setTrendingStories] = useState([]);
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/trending-stories`);
        const data = await res.json();
        setTrendingStories(data.stories || []);
      } catch (err) {
        console.error("Failed to fetch trending stories:", err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="trending-sidebar">
      <h3 className="sidebar-title">
        <FaFire style={{ marginRight: 5 }} />
        Trending Stories
      </h3>
      <ul className="trending-list">
        {trendingStories.map((story, index) => (
          <li
            key={story._id}
            className="trending-item"
            onClick={() => router.push(`/story/${story._id}`)}
          >
            <span className="emoji">
              {["🔥", "🚀", "💥", "🌟", "👀"][index]}
            </span>
            <div className="trending-info">
              <p className="trending-title">{story.content.slice(0, 40)}...</p>
              <p className="trending-time">
                {formatDistanceToNow(new Date(story.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
