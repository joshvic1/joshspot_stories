"use client";

import { useEffect, useState } from "react";

export default function ManageStories() {
  const [stories, setStories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);
  const [editForm, setEditForm] = useState({
    content: "",
    category: "",
    media: "",
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const limit = 5;

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  const fetchStories = async (pageNumber) => {
    const res = await fetch(
      `/api/admin-stories?page=${pageNumber}&limit=${limit}`
    );
    const data = await res.json();
    setStories(data.stories);
    setHasMore(data.hasMore);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/admin-stories/${id}`, { method: "DELETE" });
    setStories(stories.filter((story) => story._id !== id));
  };

  const toggleFeatured = async (id, isFeatured) => {
    await fetch(`/api/admin-stories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !isFeatured }),
    });
    setStories(
      stories.map((story) =>
        story._id === id ? { ...story, isFeatured: !isFeatured } : story
      )
    );
  };

  const startEditing = (story) => {
    setEditingStory(story._id);
    setEditForm({
      content: story.content,
      category: story.category,
      media: story.media || "",
    });
  };

  const cancelEditing = () => {
    setEditingStory(null);
    setEditForm({ content: "", category: "", media: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`/api/story/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      const updated = await res.json();
      setStories(stories.map((s) => (s._id === id ? updated : s)));
      cancelEditing();
    } else {
      alert("Failed to update story");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Manage Stories
      </h1>

      <div className="flex flex-col gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            {editingStory === story._id ? (
              <div className="space-y-3">
                <textarea
                  name="content"
                  value={editForm.content}
                  onChange={handleEditChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Story content"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="media"
                  placeholder="Media URL"
                  value={editForm.media}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleUpdate(story._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-800 whitespace-pre-line">
                  {story.content}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Category:</strong> {story.category}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Featured:</strong> {story.isFeatured ? "Yes" : "No"}
                </p>

                {story.media && (
                  <div className="mt-3">
                    {story.media.endsWith(".mp4") ? (
                      <video
                        width="250"
                        controls
                        src={story.media}
                        className="rounded-lg shadow-sm"
                      />
                    ) : (
                      <img
                        src={story.media}
                        alt="Story media"
                        className="w-64 rounded-lg shadow-sm"
                      />
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleFeatured(story._id, story.isFeatured)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {story.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                  <button
                    onClick={() => startEditing(story)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
