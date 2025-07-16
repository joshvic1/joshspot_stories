"use client";
import Header from "./Layout/Header";
import CategoryTabs from "./Layout/CategoryTabs";
import SearchBar from "./Layout/SearchBar";
import StoryList from "./Layout/StoryList";
import FloatingSubmitButton from "./Layout/FloatingSubmitButton";
import { useState, useEffect, useRef } from "react";
import StoryCard from "./StoryCard/StoryCard";
import "../styles/storypage.css";

const categories = [
  "all",
  "love",
  "sex",
  "relationship",
  "heartbreak",
  "others",
];

export default function StoryPage({
  featuredStories,
  regularStories,
  selectedCategory,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stories, setStories] = useState(regularStories);
  const [filteredStories, setFilteredStories] = useState(regularStories);
  const [page, setPage] = useState(2); // first page already loaded
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const observerRef = useRef(null);

  // Handle search filtering
  useEffect(() => {
    const filtered = stories.filter((story) =>
      story.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStories(filtered);
  }, [searchTerm, stories]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Infinite loading
  const loadMoreStories = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/all-stories?page=${page}&limit=10`);
      const data = await res.json();

      if (data.stories && data.stories.length > 0) {
        const updated = [...stories, ...data.stories];
        setStories(updated);
        setFilteredStories(
          updated.filter((story) =>
            story.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setPage((prev) => prev + 1);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more stories:", err);
    }
    setLoading(false);
  };

  // Observer to detect scroll bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreStories();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [observerRef.current, hasMore]);

  return (
    <main className="story-wrapper">
      <div className="story-header-bg">
        <Header />
        <CategoryTabs selectedCategory={selectedCategory} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <StoryList
        featuredStories={featuredStories}
        filteredStories={filteredStories}
        hasMounted={hasMounted}
        loading={loading}
      />

      <FloatingSubmitButton />
    </main>
  );
}
