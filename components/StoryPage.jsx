"use client";
import CategoryTabs from "./Layout/CategoryTabs";
import StoryList from "./Layout/StoryList";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "/styles/storypage.css";

export default function StoryPage({ selectedCategory }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const [categoryStories, setCategoryStories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFetchingCategory, setIsFetchingCategory] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://joshspot-backend-2.onrender.com/";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 👉 Fetch featured stories independently on mount
  useEffect(() => {
    const loadFeaturedStories = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/all-stories?featured=true&limit=10`
        );
        const data = await res.json();
        setFeaturedStories(data.stories || []);
      } catch (err) {
        console.error("Error loading featured stories:", err);
        setFeaturedStories([]);
      }
    };

    loadFeaturedStories();
  }, []);

  // 👉 Build query string for category stories
  const buildStoryUrl = (pageNum) => {
    const categoryQuery =
      category && category !== "all" ? `&category=${category}` : "";
    return `${baseUrl}/api/all-stories?page=${pageNum}&limit=10${categoryQuery}`;
  };

  // 👉 Fetch category stories
  useEffect(() => {
    const loadStories = async () => {
      setIsFetchingCategory(true);
      setLoading(false);
      setPage(2); // Reset for pagination
      setHasMore(true);

      try {
        const res = await fetch(buildStoryUrl(1));
        const data = await res.json();
        setCategoryStories(data.stories || []);
        setHasMore(data.hasMore ?? false);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setCategoryStories([]);
        setHasMore(false);
      }

      setIsFetchingCategory(false);
    };

    loadStories();
  }, [category]);

  // 👉 Load more stories on scroll or button click
  const loadMoreStories = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const res = await fetch(buildStoryUrl(page));
      const data = await res.json();

      if (data.stories?.length > 0) {
        setCategoryStories((prev) => [...prev, ...data.stories]);
        setPage((prev) => prev + 1);
        setHasMore(data.hasMore ?? false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more error:", err);
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <main className="story-wrapper">
      <div className="story-main-content">
        <CategoryTabs selectedCategory={selectedCategory} />
        <StoryList
          featuredStories={category === "all" ? featuredStories : []}
          filteredStories={categoryStories}
          hasMounted={hasMounted}
          loading={loading}
          isFetchingCategory={isFetchingCategory}
          hasMore={hasMore}
          loadMoreStories={loadMoreStories}
        />
      </div>
    </main>
  );
}
