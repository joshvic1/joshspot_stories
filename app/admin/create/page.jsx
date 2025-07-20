"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "/app/admin/styles/createStory.css";

export default function CreateStory() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("others");
  const [isFeatured, setIsFeatured] = useState(false);
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMedia(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let mediaUrl = "";
    if (media) {
      const formData = new FormData();
      formData.append("file", media);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      mediaUrl = uploadData.url;
    }

    await fetch("/api/admin-create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, category, isFeatured, media: mediaUrl }),
    });

    setLoading(false);
    router.push("/admin/manage");
  };

  return (
    <div className="create-container">
      <h1>Create Story</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <textarea
          rows="6"
          placeholder="Write your story here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="love">Love</option>
          <option value="sex">Sex</option>
          <option value="relationship">Relationship</option>
          <option value="heartbreak">Heartbreak</option>
          <option value="others">Others</option>
        </select>

        <label>
          Upload Image or Video
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </label>

        {preview &&
          (media?.type?.includes("video") ? (
            <video controls src={preview} />
          ) : (
            <img src={preview} alt="Preview" />
          ))}

        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Mark as Featured
        </label>

        <button disabled={loading}>
          {loading ? "Saving..." : "Create Story"}
        </button>
      </form>
    </div>
  );
}
