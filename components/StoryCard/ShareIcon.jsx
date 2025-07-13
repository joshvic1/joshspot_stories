import React, { useState } from "react";
import { FaShareAlt, FaTwitter, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import "/styles/shareIcon.css";

const ShareIcon = ({ storyId }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const baseUrl = "https://yourwebsite.com/story/";

  const storyUrl = `${baseUrl}${storyId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(storyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-wrapper">
      <button onClick={() => setOpen(!open)} className="share-btn">
        <FaShareAlt />
      </button>

      {open && (
        <div className="share-menu">
          <button onClick={handleCopy} className="share-item">
            <LuCopy />
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              storyUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-item"
          >
            <FaWhatsapp /> WhatsApp
          </a>

          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(
              storyUrl
            )}&text=Check+out+this+story`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-item"
          >
            <FaTwitter /> Twitter
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              storyUrl
            )}&text=Interesting+Story`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-item"
          >
            <FaTelegram /> Telegram
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareIcon;
