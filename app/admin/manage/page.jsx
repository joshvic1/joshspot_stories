"use client";

import { useEffect, useState } from "react";

export default function ManageStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const res = await fetch("/api/admin-stories");
      const data = await res.json();
      setStories(data.stories);
    };
    fetchStories();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin-stories/${id}`, { method: "DELETE" });
    setStories(stories.filter((story) => story._id !== id));
  };

  const toggleFeatured = async (id, isFeatured) => {
    await fetch(`/api/admin-stories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isFeatured: !isFeatured }),
    });
    setStories(
      stories.map((story) =>
        story._id === id ? { ...story, isFeatured: !isFeatured } : story
      )
    );
  };

  return (
    <div>
      <h1>Manage Stories</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {stories.map((story) => (
          <div
            key={story._id}
            style={{ border: "1px solid #ddd", padding: "10px" }}
          >
            <p>{story.content}</p>
            <p>Category: {story.category}</p>
            <p>Featured: {story.isFeatured ? "Yes" : "No"}</p>
            {story.media && (
              <>
                {story.media.endsWith(".mp4") ? (
                  <video width="200" controls src={story.media} />
                ) : (
                  <img src={story.media} width="200" />
                )}
              </>
            )}
            <button onClick={() => handleDelete(story._id)}>Delete</button>
            <button onClick={() => toggleFeatured(story._id, story.isFeatured)}>
              {story.isFeatured ? "Unfeature" : "Feature"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
