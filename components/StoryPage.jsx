"use client";
import Header from "./Layout/Header";
import CategoryTabs from "./Layout/CategoryTabs";
import StoryList from "./Layout/StoryList";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "/styles/storypage.css";

export default function StoryPage({ featuredStories, selectedCategory }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const [categoryStories, setCategoryStories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFetchingCategory, setIsFetchingCategory] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch category stories
  useEffect(() => {
    const fetchStories = async () => {
      setIsFetchingCategory(true);
      setLoading(false);
      setPage(2); // Reset to next page
      setHasMore(true);

      try {
        const url =
          category === "all"
            ? `/api/all-stories?page=1&limit=10`
            : `/api/all-stories?category=${category}&page=1&limit=10`;

        const res = await fetch(url);
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

    fetchStories();
  }, [category]);

  // Load more on click
  const loadMoreStories = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const url =
        category === "all"
          ? `/api/all-stories?page=${page}&limit=10`
          : `/api/all-stories?category=${category}&page=${page}&limit=10`;

      const res = await fetch(url);
      const data = await res.json();

      if (data?.stories?.length > 0) {
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
        <Header />
        <CategoryTabs selectedCategory={selectedCategory} />
        <StoryList
          featuredStories={featuredStories}
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
