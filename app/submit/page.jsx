"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/Layout/MainLayout";
import "./submit.css";
import BackButton from "@/components/BackToPrev";

const categories = ["love", "sex", "relationship", "heartbreak"];

export default function SubmitPage() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("public");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (popupMessage) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        setPopupMessage("");
        if (popupMessage === "Story submitted successfully!") {
          router.push("/");
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, category, type }),
    });

    setLoading(false);

    if (res.ok) {
      setPopupMessage("Story submitted successfully!");
      setContent("");
      setCategory("");
      setType("public");
    } else {
      setPopupMessage("Error submitting story.");
    }
  };

  return (
    <MainLayout>
      <BackButton className="back" />
      <main className="submit-container">
        <div className="submit-form-wrapper">
          <h2 className="submit-title">📨 Submit Anonymous Story</h2>
          <form onSubmit={handleSubmit} className="submit-form">
            <textarea
              placeholder="Write your anonymous story here..."
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

            {/* <div className="radio-group">
              <label>How should we post it?</label>
              <div className="radio-options">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    checked={type === "public"}
                    onChange={() => setType("public")}
                  />
                  Post Publicly
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="expert"
                    checked={type === "expert"}
                    onChange={() => setType("expert")}
                  />
                  Send to Joshspot AI
                </label>
              </div>
            </div> */}

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Anonymously"}
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
