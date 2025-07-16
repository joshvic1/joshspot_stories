"use client";
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import StoryCard from "@/components/StoryCard/StoryCard";
import BackButton from "@/components/BackToPrev";
import "/styles/favorites.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((story) => story._id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <MainLayout>
      <div className="favorites-container">
        <h2 className="fav-title">❤️ Favorite Stories</h2>
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
