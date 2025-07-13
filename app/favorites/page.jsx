"use client";
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import StoryCard from "@/components/StoryCard/StoryCard";
import BackButton from "@/components/BackToPrev";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((story) => story._id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated); // Instantly update the UI
  };

  return (
    <MainLayout>
      <div style={{ padding: "2rem" }}>
        <h2 className="text-2xl font-bold mb-4">❤️ Favorite Stories</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onRemoveFavorite={removeFromFavorites}
              isFavoritePage
            />
          ))
        )}
      </div>
      <BackButton className="back" />
    </MainLayout>
  );
}
