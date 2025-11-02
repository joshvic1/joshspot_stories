import { useState } from "react";

export default function EditStoryOverlay({
  storyId,
  initialText,
  onClose,
  onSave,
}) {
  const [text, setText] = useState(initialText || "");
  const [saving, setSaving] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Card */}
      <div className="bg-[#1b1030] w-[90%] max-w-lg rounded-2xl p-6 shadow-xl border border-white/10">
        <h2 className="text-lg font-semibold mb-3">✏️ Edit Story</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 bg-black/30 border border-white/20 p-3 rounded-lg text-sm outline-none resize-none focus:border-purple-400"
          placeholder="Edit your story here..."
        />

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              await onSave(text);
              setSaving(false);
            }}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
