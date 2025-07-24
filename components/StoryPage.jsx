"use client";
import Header from "./Layout/Header";
import CategoryTabs from "./Layout/CategoryTabs";
import StoryList from "./Layout/StoryList";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import "../styles/storypage.css";

export default function StoryPage({
  featuredStories,
  regularStories,
  selectedCategory,
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch stories based on category
  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setPage(2);
      setHasMore(true);

      try {
        const url =
          category === "all"
            ? `/api/all-stories?page=1&limit=10`
            : `/api/category-stories?category=${category}&page=1&limit=10`;

        const res = await fetch(url);
        const data = await res.json();

        if (Array.isArray(data.stories)) {
          setStories(data.stories);
          setFilteredStories(data.stories);
          setHasMore(data.hasMore ?? false);
        } else {
          setStories([]);
          setFilteredStories([]);
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching stories:", err);
        setStories([]);
        setFilteredStories([]);
        setHasMore(false);
      }

      setLoading(false);
    };

    fetchStories();
  }, [category]);

  // Infinite Scroll
  const loadMoreStories = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const url =
        category === "all"
          ? `/api/all-stories?page=${page}&limit=10`
          : `/api/category-stories?category=${category}&page=${page}&limit=10`;

      const res = await fetch(url);
      const data = await res.json();

      if (data?.stories?.length > 0) {
        const updated = [...stories, ...data.stories];
        setStories(updated);
        setFilteredStories(updated);
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

  // Observe last element for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreStories();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [observerRef.current, stories, hasMore]);

  return (
    <main className="story-wrapper">
      <Header />
      <CategoryTabs selectedCategory={selectedCategory} />
      <StoryList
        featuredStories={featuredStories}
        filteredStories={filteredStories}
        hasMounted={hasMounted}
        loading={loading}
      />
      <div ref={observerRef} />
    </main>
  );
}
