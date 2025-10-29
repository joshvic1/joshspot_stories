"use client";

import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import StoryImageCard from "@/components/StoryImageCard";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const PAGE_LIMIT = 10;
const WORDS_PER_IMAGE = 30;

// Break story into chunks of 30 words for images
function chunkByWords(text, size = WORDS_PER_IMAGE) {
  if (!text) return [""];
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }
  return chunks.length ? chunks : [text];
}

export default function ReviewPage() {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [titleMap, setTitleMap] = useState({}); // { storyId: "Generated Title" }
  const [busyIds, setBusyIds] = useState({}); // track loading per item

  const cardRefs = useRef({}); // { storyId: [ref1, ref2...] }

  // Fetch stories
  async function fetchStories(pageNum) {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `${baseUrl}/api/admin-stories?page=${pageNum}&limit=${PAGE_LIMIT}`
      );
      if (!res.ok) throw new Error("Failed to fetch stories");

      const data = await res.json();
      setStories(Array.isArray(data.stories) ? data.stories : []);
      setHasMore(Boolean(data.hasMore));
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.message || "Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStories(page);
  }, [page]);
  // Approve / Unapprove Story
  async function onTogglePublic(story) {
    setBusyIds((m) => ({ ...m, [story._id]: true }));
    try {
      const res = await fetch(`${baseUrl}/api/story/${story._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic: !story.isPublic }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated?.error || "Failed to update story");

      setStories((arr) => arr.map((s) => (s._id === story._id ? updated : s)));
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to update story");
    } finally {
      setBusyIds((m) => ({ ...m, [story._id]: false }));
    }
  }

  // Generate Story Title with AI
  async function onGenerateTitle(story) {
    setBusyIds((m) => ({ ...m, [story._id]: true }));
    try {
      const res = await fetch(`${baseUrl}/api/ai/generate-title`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: story.content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to generate title");

      setTitleMap((m) => ({ ...m, [story._id]: (data.title || "").trim() }));
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to generate title");
    } finally {
      setBusyIds((m) => ({ ...m, [story._id]: false }));
    }
  }

  // Copy Text to Clipboard
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text || "");
    } catch (e) {
      alert("Copy failed");
    }
  }

  // Export Story to Images
  async function onGenerateImages(story) {
    const chunks = chunkByWords(story.content);
    cardRefs.current[story._id] = cardRefs.current[story._id] || [];

    // allow hidden nodes render first
    setTimeout(async () => {
      const nodes = cardRefs.current[story._id] || [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        try {
          const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 2 });

          const link = document.createElement("a");
          link.download = `story-${story._id}-page-${i + 1}.png`;
          link.href = dataUrl;
          link.click();
        } catch (err) {
          console.error("Image export failed", err);
          alert("Image export failed");
        }
      }
    }, 80);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#130a20] to-[#2a1447] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* HEADER */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Story Review & Approvals
            </h1>
            <p className="text-sm opacity-80">
              Approve, generate titles, copy, export as image.
            </p>
          </div>
          <span className="text-xs opacity-70">Dark Luxury • Joshspot</span>
        </header>

        {errorMsg && (
          <div className="mb-4 bg-red-600/20 border border-red-500/40 text-red-100 px-4 py-3 rounded-xl">
            {errorMsg}
          </div>
        )}

        {loading && (
          <div className="mb-4 animate-pulse text-sm opacity-80">Loading…</div>
        )}

        {!loading && stories.length === 0 && (
          <div className="text-sm opacity-80">No stories found.</div>
        )}

        <div className="space-y-4">
          {stories.map((story) => {
            const title = titleMap[story._id];
            const chunks = chunkByWords(story.content);

            return (
              <div
                key={story._id}
                className="rounded-2xl border border-white/10 p-4 bg-gradient-to-br from-[#1a1027] to-[#301a51] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                {/* STORY HEADER */}
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs opacity-70">
                    {new Date(story.createdAt).toLocaleString()}
                  </div>
                  <span className="text-xs inline-flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full border border-white/10 ${
                        story.isPublic ? "bg-green-600" : "bg-yellow-600"
                      } text-white`}
                    >
                      {story.isPublic ? "Public" : "Private"}
                    </span>
                    <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
                      {story.category}
                    </span>
                  </span>
                </div>

                {/* STORY TEXT */}
                <p className="whitespace-pre-wrap leading-7 mt-3 text-sm">
                  {story.content}
                </p>

                {/* ACTION BUTTONS */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => copyText(story.content)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  >
                    📋 Copy Story
                  </button>

                  <button
                    disabled={!!busyIds[story._id]}
                    onClick={() => onGenerateTitle(story)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
                  >
                    {busyIds[story._id] ? "Generating…" : "✨ Generate Title"}
                  </button>
                  {title && (
                    <div className="flex items-center gap-2 border border-white/15 rounded-lg px-2 py-1 bg-white/5">
                      <span className="text-sm font-medium truncate max-w-[60vw] md:max-w-[40vw]">
                        {title}
                      </span>
                      <button
                        onClick={() => copyText(title)}
                        className="text-xs underline"
                      >
                        Copy
                      </button>
                    </div>
                  )}

                  <button
                    disabled={!!busyIds[story._id]}
                    onClick={() => onTogglePublic(story)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
                  >
                    {story.isPublic
                      ? "⛔ Unapprove (Private)"
                      : "✅ Approve (Public)"}
                  </button>

                  <button
                    onClick={() => onGenerateImages(story)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  >
                    🖼️ Generate Images
                  </button>
                </div>

                {/* Hidden nodes for exporting story images */}
                <div className="sr-only" aria-hidden="true">
                  {chunks.map((text, idx) => (
                    <div
                      key={idx}
                      ref={(el) => {
                        if (el) {
                          if (!cardRefs.current[story._id]) {
                            cardRefs.current[story._id] = [];
                          }
                          cardRefs.current[story._id][idx] = el;
                        }
                      }}
                    >
                      <StoryImageCard
                        title={title || ""}
                        text={text}
                        category={story.category}
                        index={idx}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm opacity-80">Page {page}</span>

          <button
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline Component - You can move to separate file
function StoryImageCard({ title, text, category, index }) {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        padding: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #1a1027, #3b245f)",
        color: "white",
        borderRadius: 32,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {category}
        </div>
        <div style={{ fontSize: 20, opacity: 0.7 }}>Joshspot TV</div>
      </div>

      <div>
        {title && title.trim().length > 0 && (
          <h2
            style={{
              fontSize: 56,
              lineHeight: 1.1,
              fontWeight: 800,
              marginBottom: 24,
            }}
          >
            {title}
          </h2>
        )}
        <p style={{ fontSize: 38, lineHeight: 1.35, whiteSpace: "pre-wrap" }}>
          {text}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 20, opacity: 0.85 }}>Part {index + 1}</div>
        <div style={{ fontSize: 22, opacity: 0.9 }}>
          joshspot.tv • @joshspot_tv
        </div>
      </div>
    </div>
  );
}
