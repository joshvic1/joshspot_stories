"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    const res = await fetch("/api/all-stories");
    const data = await res.json();
    setStories(data);
    setLoading(false);
  };

  const toggleFeatured = async (id, current) => {
    await fetch("/api/toggle-feature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isFeatured: !current }),
    });

    fetchStories(); // Refresh after update
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if (loading) return <p className="p-4">Loading stories...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Pin/Unpin Stories</h1>

      {stories.map((story) => (
        <div key={story._id} className="bg-white p-4 rounded shadow space-y-2">
          <p>{story.content}</p>
          <div className="text-sm text-gray-500 flex justify-between items-center">
            <span className="capitalize">{story.category}</span>
            <button
              onClick={() => toggleFeatured(story._id, story.isFeatured)}
              className={`py-1 px-3 rounded ${
                story.isFeatured ? "bg-red-500" : "bg-green-600"
              } text-white`}
            >
              {story.isFeatured ? "Unpin" : "Pin as Featured"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
