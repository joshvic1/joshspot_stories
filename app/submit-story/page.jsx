// =============================
// frontend/app/submit-review/page.jsx – JSX version
// =============================
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/Layout/MainLayout";
import BackButton from "@/components/BackToPrev";
import "./submit-review.css";

const categories = ["love", "sex", "relationship", "heartbreak", "others"];

export default function SubmitReviewPage() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const submitStory = async ({ content, category }) => {
    try {
      const response = await fetch(`${baseUrl}/api/submit-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, category }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit story");
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    if (popupMessage) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        setPopupMessage("");
        if (popupMessage === "Story submitted for review!") router.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
    if (linkRegex.test(content)) {
      setPopupMessage("Links are not allowed.");
      return;
    }
    if (!category) {
      setPopupMessage("Please select a category.");
      return;
    }

    setLoading(true);
    const res = await submitStory({ content, category });
    setLoading(false);

    if (res.success) {
      setPopupMessage("Story submitted for review!");
      setContent("");
      setCategory("");
    } else {
      setPopupMessage(res.error || "Error submitting story.");
    }
  };

  return (
    <MainLayout>
      <BackButton className="back" />
      <main className="submit-container">
        <div className="submit-form-wrapper">
          <h2 className="submit-title">📨 Submit Story (Private Review)</h2>
          <form onSubmit={handleSubmit} className="submit-form">
            <textarea
              placeholder="Write your story here... (submitted as PRIVATE)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
            />

            <div className="radio-group">
              <label>Select a Category:</label>
              <div className="radio-options emoji-radio">
                {categories.map((cat) => {
                  const emojis = {
                    love: "❤️",
                    sex: "🍑",
                    relationship: "💑",
                    heartbreak: "💔",
                    others: "🌟",
                  };
                  return (
                    <label
                      key={cat}
                      className={`emoji-option ${
                        category === cat ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={category === cat}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                      <span>
                        {emojis[cat]}{" "}
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit for Review (Private)"}
            </button>
          </form>

          {showPopup && (
            <div
              className={`toast-popup ${
                popupMessage.includes("Error") ? "error" : "success"
              }`}
            >
              {popupMessage}
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
