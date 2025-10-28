// =============================
// frontend/app/review/page.jsx – Loginless mini-dashboard (JSX)
// =============================
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Check, X, Copy, Image as ImageIcon, Wand2 } from "lucide-react";
import html2canvas from "html2canvas";
import StoryImageTemplate from "@/components/StoryImageTemplate";

const PAGE_SIZE = 10;
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Split text into 30-word chunks
function chunkByWords(text, wordsPerChunk = 30) {
  const words = text.trim().split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    chunks.push(words.slice(i, i + wordsPerChunk).join(" "));
  }
  return chunks.length ? chunks : [text];
}

function useClipboard() {
  const [copied, setCopied] = useState(null);
  const copy = async (txt) => {
    await navigator.clipboard.writeText(txt);
    setCopied(txt);
    setTimeout(() => setCopied(null), 1500);
  };
  return { copied, copy };
}

export default function ReviewDashboard() {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { copy } = useClipboard();

  const fetchStories = async (reset = false) => {
    setLoading(true);
    const res = await fetch(
      `${baseUrl}/api/review-stories?page=${
        reset ? 1 : page
      }&limit=${PAGE_SIZE}`
    );
    const data = await res.json();
    setLoading(false);

    if (reset) {
      setStories(data.stories || []);
      setPage(2);
    } else {
      setStories((prev) => [...prev, ...(data.stories || [])]);
      setPage((p) => p + 1);
    }
    setHasMore(data.hasMore);
  };

  useEffect(() => {
    fetchStories(true);
  }, []);

  const toggleVisibility = async (id) => {
    const res = await fetch(`${baseUrl}/api/story/${id}/toggle-visibility`, {
      method: "PATCH",
    });
    const data = await res.json();
    if (data.story) {
      setStories((arr) => arr.map((s) => (s._id === id ? data.story : s)));
    }
  };

  const generateTitle = async (content, category) => {
    const res = await fetch(`${baseUrl}/api/generate-title`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, category }),
    });
    const data = await res.json();
    return data.title;
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">
          🛠️ Review Submissions (Loginless)
        </h1>
        <p className="text-sm opacity-70 mb-6">
          Stories submitted via the private form. Approve to publish, generate
          titles, copy text, or export story cards as images.
        </p>

        <div className="space-y-6">
          {stories.map((s) => (
            <StoryReviewCard
              key={s._id}
              story={s}
              onCopy={copy}
              onToggle={() => toggleVisibility(s._id)}
              onGenerateTitle={generateTitle}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => fetchStories(false)}
              className="px-4 py-2 rounded-lg border hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

// Card component
function StoryReviewCard({ story, onCopy, onToggle, onGenerateTitle }) {
  const [title, setTitle] = useState("");
  const [genBusy, setGenBusy] = useState(false);
  const chunks = useMemo(
    () => chunkByWords(story.content, 30),
    [story.content]
  );
  const cardRefs = useRef([]);

  const handleGenerate = async () => {
    setGenBusy(true);
    const t = await onGenerateTitle(story.content, story.category);
    setTitle(t);
    setGenBusy(false);
  };

  const downloadCard = async (idx) => {
    const node = cardRefs.current[idx];
    if (!node) return;
    const canvas = await html2canvas(node, {
      backgroundColor: null,
      scale: 2,
    });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `story-${story._id}-${idx + 1}.png`;
    link.click();
  };

  return (
    <div className="rounded-2xl border p-4 shadow-sm bg-[var(--bg-card)] text-[var(--text-color)]">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="px-2 py-1 text-xs rounded-full border">
          {story.category}
        </span>
        <span className="px-2 py-1 text-xs rounded-full border">
          {story.isPublic ? "Public" : "Private"}
        </span>
        <span className="ml-auto text-xs opacity-70">
          {new Date(story.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="whitespace-pre-wrap text-[15px] leading-6 mb-3">
        {story.content}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
          onClick={() => onCopy(story.content)}
        >
          <Copy size={16} /> Copy story
        </button>

        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
          onClick={handleGenerate}
          disabled={genBusy}
        >
          <Wand2 size={16} /> {genBusy ? "Generating..." : "Generate title"}
        </button>

        {title && (
          <>
            <span className="text-sm italic px-2 py-1 bg-[var(--accent-lighter)] rounded">
              {title}
            </span>
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
              onClick={() => onCopy(title)}
            >
              <Copy size={16} /> Copy title
            </button>
          </>
        )}

        <button
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
            story.isPublic ? "text-red-500" : "text-green-600"
          }`}
          onClick={onToggle}
        >
          {story.isPublic ? <X size={16} /> : <Check size={16} />}{" "}
          {story.isPublic
            ? "Unapprove (Make Private)"
            : "Approve (Make Public)"}
        </button>
      </div>

      {/* Image templates */}
      <div className="space-y-3">
        {chunks.map((chunk, idx) => (
          <div key={idx} className="space-y-2">
            <StoryImageTemplate
              refCb={(el) => (cardRefs.current[idx] = el)}
              title={title || "Story"}
              content={chunk}
              footerTag="@Joshspot TV"
            />
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
              onClick={() => downloadCard(idx)}
            >
              <ImageIcon size={16} /> Download image{" "}
              {chunks.length > 1 ? `(${idx + 1}/${chunks.length})` : ""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
