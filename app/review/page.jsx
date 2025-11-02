"use client";

import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import PinGate from "@/components/PinGate";
import StoryImageCard from "@/components/StoryImageCard";
import EditStoryOverlay from "@/components/EditStoryOverlay";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const PAGE_LIMIT = 10;
const WORDS_PER_IMAGE = 65;

// ---------- HELPERS ----------
function chunkByWords(text, size = WORDS_PER_IMAGE) {
  if (!text) return [""];

  const words = text.trim().split(/\s+/).filter(Boolean);
  const result = [];

  for (let i = 0; i < words.length; i += size) {
    result.push(words.slice(i, i + size).join(" "));
  }
  return result.length ? result : [text];
}

function clsx(...args) {
  return args.filter(Boolean).join(" ");
}

export default function ReviewPage() {
  // ---------- ALL HOOKS AT TOP ----------
  const [unlocked, setUnlocked] = useState(false);

  // Data
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // UI
  const [titleMap, setTitleMap] = useState({});
  const [busyIds, setBusyIds] = useState({});
  const [feedback, setFeedback] = useState({});
  const [expanded, setExpanded] = useState({});

  // Edit State
  const [editingStory, setEditingStory] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Refs
  const cardRefs = useRef({});

  async function onEditStory(story) {
    setEditingStory(story);
    setEditingText(story.content || "");
  }

  async function onSaveEditedStory(newText) {
    if (!editingStory) return;

    try {
      setBusyIds((prev) => ({ ...prev, [editingStory._id]: true }));

      const res = await fetch(`${baseUrl}/api/story/${editingStory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newText }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated?.error || "Failed");

      // Update UI immediately
      setStories((arr) =>
        arr.map((s) =>
          s._id === editingStory._id ? { ...s, content: newText } : s
        )
      );

      setEditingStory(null); // Close modal
      showInline(editingStory._id, "edited"); // Feedback message
    } catch {
      showInline(editingStory._id, "edited", "Failed");
    } finally {
      setBusyIds((prev) => ({ ...prev, [editingStory._id]: false }));
    }
  }

  // ---------- FETCH STORIES ----------
  async function fetchStories(pageNum) {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `${baseUrl}/api/admin-stories?page=${pageNum}&limit=${PAGE_LIMIT}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Failed to fetch stories");

      const data = await res.json();
      setStories(Array.isArray(data.stories) ? data.stories : []);
      setHasMore(Boolean(data.hasMore));
    } catch (err) {
      setErrorMsg(err?.message || "Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStories(page);
  }, [page]);
  // ---------- INLINE FEEDBACK ----------
  const showInline = (id, key, value = true, ttl = 1500) => {
    setFeedback((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [key]: value },
    }));

    setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        [id]: { ...(prev[id] || {}), [key]: false },
      }));
    }, ttl);
  };

  // ---------- ACTIONS ----------
  async function onTogglePublic(story) {
    setBusyIds((prev) => ({ ...prev, [story._id]: true }));

    try {
      const res = await fetch(`${baseUrl}/api/story/${story._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic: !story.isPublic }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated?.error || "Failed");

      setStories((arr) => arr.map((s) => (s._id === story._id ? updated : s)));
      showInline(
        story._id,
        "toggled",
        updated.isPublic ? "Approved ✓" : "Unapproved ✓"
      );
    } catch {
      showInline(story._id, "toggled", "Failed");
    } finally {
      setBusyIds((prev) => ({ ...prev, [story._id]: false }));
    }
  }

  async function onGenerateTitle(story) {
    setBusyIds((prev) => ({ ...prev, [story._id]: true }));

    try {
      const res = await fetch(`${baseUrl}/api/generate-title`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: story.content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");

      const title = (data.title || "").trim();
      setTitleMap((prev) => ({ ...prev, [story._id]: title }));
      showInline(story._id, "titled");
    } catch {
      showInline(story._id, "titled", "Failed");
    } finally {
      setBusyIds((prev) => ({ ...prev, [story._id]: false }));
    }
  }

  async function copyText(text, id, key = "copied") {
    try {
      await navigator.clipboard.writeText(text || "");
      showInline(id, key);
    } catch {
      showInline(id, key, "Failed");
    }
  }

  async function onGenerateImages(story) {
    const chunks = chunkByWords(story.content, WORDS_PER_IMAGE);
    const renderRoot = document.getElementById("render-root");

    if (!renderRoot) {
      alert("Render container missing");
      return;
    }

    // Clear previous render
    renderRoot.innerHTML = "";

    // Import react-dom/client dynamically (client side only)
    const { createRoot } = await import("react-dom/client");

    // Mount each chunk as a separate StoryImageCard
    const mounts = [];
    chunks.forEach((text, idx) => {
      const wrapper = document.createElement("div");
      wrapper.style.display = "block";
      wrapper.style.marginBottom = "40px";
      renderRoot.appendChild(wrapper);

      const root = createRoot(wrapper);
      root.render(
        <StoryImageCard
          title={(titleMap[story._id] || "").trim()}
          text={text}
          category={story.category}
          index={idx}
        />
      );

      mounts.push({ wrapper, root });
    });

    // Wait for elements to fully render
    setTimeout(async () => {
      try {
        for (let i = 0; i < mounts.length; i++) {
          const node = mounts[i].wrapper;

          const dataUrl = await htmlToImage.toPng(node, {
            pixelRatio: 2,
            cacheBust: true,
          });

          const a = document.createElement("a");
          a.download = `story-${story._id}-page-${i + 1}.png`;
          a.href = dataUrl;
          a.click();
        }

        showInline(story._id, "images", true);
      } catch (err) {
        console.error("Export failed:", err);
        showInline(story._id, "images", "Failed");
      } finally {
        // Cleanup
        mounts.forEach(({ root }) => root.unmount());
        renderRoot.innerHTML = "";
      }
    }, 450);
  }

  // ---------- UI ----------
  return (
    // Loockkkk overlay
    <div className="min-h-screen w-full bg-gradient-to-b from-[#120a1f] to-[#2a1447] text-white relative overflow-hidden">
      {!unlocked && (
        <div className="fixed inset-0 h-screen overflow-hidden flex items-center justify-center bg-black/60 backdrop-blur-xl z-50">
          <PinGate onUnlock={() => setUnlocked(true)} />
        </div>
      )}

      {/* MAIN UI */}
      <div
        className={unlocked ? "opacity-100" : "opacity-0 pointer-events-none"}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-2">Review & Approvals</h1>
          <p className="text-sm text-white/70 mb-6">
            Approve, generate titles, copy content, export as story images. (
            {PAGE_LIMIT} per page)
          </p>

          {errorMsg && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {errorMsg}
            </div>
          )}

          {/* CARD GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading && <div className="text-sm opacity-80">Loading…</div>}
            {!loading && stories.length === 0 && (
              <div className="text-sm opacity-80 col-span-full">
                No stories found.
              </div>
            )}
            {stories.map((story) => {
              const title = titleMap[story._id];
              const isExpanded = !!expanded[story._id];
              const isLong = (story.content || "").length > 200;
              const displayText =
                isExpanded || !isLong
                  ? story.content
                  : story.content.slice(0, 200) + "…";

              const chunks = chunkByWords(story.content);

              return (
                <div
                  key={story._id}
                  className="rounded-2xl border border-white/10 bg-[#1b1030]/80 backdrop-blur-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                >
                  {/* META */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs text-white/70">
                      {new Date(story.createdAt).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={clsx(
                          "px-2 py-1 rounded-full border border-white/10",
                          story.isPublic
                            ? "bg-green-600 text-white"
                            : "bg-yellow-600 text-white"
                        )}
                      >
                        {story.isPublic ? "Public" : "Private"}
                      </span>
                      <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="mt-3">
                    <p className="whitespace-pre-wrap leading-7 text-sm text-white/95">
                      {displayText}
                    </p>

                    {isLong && (
                      <button
                        onClick={() =>
                          setExpanded((prev) => ({
                            ...prev,
                            [story._id]: !isExpanded,
                          }))
                        }
                        className="mt-2 text-xs text-white/80 underline underline-offset-4 hover:text-white"
                      >
                        {isExpanded ? "View less" : "View more"}
                      </button>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onEditStory(story)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() =>
                          copyText(story.content, story._id, "copied")
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition"
                      >
                        📋 Copy Story
                      </button>

                      <button
                        disabled={!!busyIds[story._id]}
                        onClick={() => onGenerateTitle(story)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
                      >
                        ✨{" "}
                        {busyIds[story._id] ? "Generating…" : "Generate Title"}
                      </button>

                      {title && (
                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2 py-1">
                          <span className="text-sm font-medium truncate max-w-[44vw] md:max-w-[18vw]">
                            {title}
                          </span>
                          <button
                            onClick={() =>
                              copyText(title, story._id, "titleCopied")
                            }
                            className="text-xs underline"
                          >
                            Copy
                          </button>
                        </div>
                      )}

                      <button
                        disabled={!!busyIds[story._id]}
                        onClick={() => onTogglePublic(story)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
                      >
                        {story.isPublic ? "⛔ Unapprove" : "✅ Approve"}
                      </button>

                      <button
                        onClick={() => onGenerateImages(story)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition"
                      >
                        🖼️ Export Images
                      </button>
                    </div>

                    {/* FEEDBACK */}
                    <div className="min-h-[20px] text-xs flex flex-wrap gap-3">
                      {feedback[story._id]?.copied && (
                        <span className="text-emerald-300">✓ Copied</span>
                      )}
                      {feedback[story._id]?.titleCopied && (
                        <span className="text-emerald-300">✓ Title Copied</span>
                      )}
                      {feedback[story._id]?.titled &&
                        feedback[story._id]?.titled !== "Failed" && (
                          <span className="text-emerald-300">
                            ✓ Title Generated
                          </span>
                        )}
                      {feedback[story._id]?.titled === "Failed" && (
                        <span className="text-red-300">✗ Title Failed</span>
                      )}
                      {feedback[story._id]?.toggled && (
                        <span
                          className={
                            feedback[story._id]?.toggled === "Failed"
                              ? "text-red-300"
                              : "text-emerald-300"
                          }
                        >
                          {feedback[story._id]?.toggled}
                        </span>
                      )}
                      {feedback[story._id]?.images &&
                        feedback[story._id]?.images !== "Failed" && (
                          <span className="text-emerald-300">
                            ✓ Images Ready
                          </span>
                        )}
                      {feedback[story._id]?.images === "Failed" && (
                        <span className="text-red-300">✗ Export Failed</span>
                      )}
                    </div>
                  </div>

                  {/* HIDDEN IMAGE EXPORT CARDS */}
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

            {/* Hidden offscreen render container for StoryImageCard exports */}
            <div
              id="render-root"
              style={{
                position: "fixed",
                top: "-10000px",
                left: "-10000px",
                width: "auto",
                height: "auto",
                overflow: "visible",
                zIndex: -9999,
                padding: 0,
                margin: 0,
              }}
            />
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-white/80">Page {page}</span>
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
      {editingStory && (
        <EditStoryOverlay
          storyId={editingStory._id}
          initialText={editingText}
          onClose={() => setEditingStory(null)}
          onSave={onSaveEditedStory}
        />
      )}
    </div>
  );
}
