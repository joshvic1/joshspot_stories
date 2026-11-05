"use client";

import { useEffect, useRef, useState } from "react";
import { Gift } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./nigeria.module.css";

const SHARE_TARGET = 20;
const FINAL_URL = "https://joshspot.com";
// Set this to an image in /public when the banner is ready.
const BANNER_IMAGE =
  "https://pub-e0ff826b0e9843069a4df3548bc6fa39.r2.dev/tiklink-pages/1793887178813-961f6516-3f71-446b-97f8-a1406ea17e5f";
const COMMENTS = [
  {
    name: "Ada O.",
    initials: "AO",
    text: "The green design is lovely 💚",
    reply: "A little Nigerian colour for your day!",
    reactions: { icons: "👍 💚", count: 24 },
    color: "#7365a9",
  },
  {
    name: "Tunde A.",
    initials: "TA",
    text: "So this is a gift challenge demo?",
    reply: "Yes! It is just for fun; no cash is distributed.",
    color: "#b76c3e",
  },
  {
    name: "Zainab B.",
    initials: "ZB",
    text: "Can I use made-up details?",
    reply: "Absolutely. Please use sample details for this demo.",
    color: "#398b89",
  },
  {
    name: "Chidi E.",
    initials: "CE",
    text: "That progress animation is smooth ✨",
    reactions: { icons: "👍", count: 8 },
    color: "#546fbb",
  },
  {
    name: "Amaka N.",
    initials: "AN",
    text: "Where does the last step take me?",
    reply: "To Joshspot once the counter reaches 20 clicks.",
    color: "#b25d87",
  },
  {
    name: "Bola K.",
    initials: "BK",
    text: "Simple and easy to follow 👌",
    reactions: { icons: "👍 💚", count: 16 },
    color: "#397e65",
  },
  {
    name: "Ibrahim S.",
    initials: "IS",
    text: "Just checking this out on my phone.",
    color: "#a27645",
  },
  {
    name: "Ngozi U.",
    initials: "NU",
    text: "Can I pause these moving comments to read?",
    reply: "Yes, hover over them or focus the comments area.",
    reactions: { icons: "👍", count: 5 },
    color: "#8b679c",
  },
  {
    name: "Seyi M.",
    initials: "SM",
    text: "The gift icon is a nice touch 🎁",
    reactions: { icons: "💚", count: 12 },
    color: "#4b83a5",
  },
  {
    name: "Fatima A.",
    initials: "FA",
    text: "I like how clean the page looks.",
    color: "#b4677e",
  },
  {
    name: "Emeka C.",
    initials: "EC",
    text: "Does the progress bar count actual messages?",
    reply: "It counts WhatsApp button clicks. Messages are not verified.",
    reactions: { icons: "👍", count: 19 },
    color: "#5c7c46",
  },
  {
    name: "Aisha D.",
    initials: "AD",
    text: "That shade of green 💚",
    reactions: { icons: "💚 ✨", count: 31 },
    color: "#99744f",
  },
  {
    name: "Kunle W.",
    initials: "KW",
    text: "Taking a moment to read through everything.",
    color: "#696faa",
  },
  {
    name: "Esther I.",
    initials: "EI",
    text: "Will my bank details be saved here?",
    reply: "No. The fields are cleared when you continue.",
    reactions: { icons: "👍", count: 14 },
    color: "#3f8986",
  },
  {
    name: "Musa G.",
    initials: "MG",
    text: "The WhatsApp button is easy to spot.",
    reactions: { icons: "👍", count: 6 },
    color: "#aa754b",
  },
  {
    name: "Chiamaka P.",
    initials: "CP",
    text: "The little loading animation looks nice ✨",
    color: "#9672a9",
  },
  {
    name: "Damilola T.",
    initials: "DT",
    text: "Can I use sample information to try this?",
    reply: "Yes, use sample details to explore the page.",
    color: "#577e9a",
  },
  {
    name: "Blessing E.",
    initials: "BE",
    text: "A calm, simple layout. I like it.",
    reactions: { icons: "💚", count: 9 },
    color: "#a5637c",
  },
  {
    name: "Yusuf L.",
    initials: "YL",
    text: "Reading the replies helped answer my questions.",
    reactions: { icons: "👍 💚", count: 11 },
    color: "#548572",
  },
  {
    name: "Uche F.",
    initials: "UF",
    text: "Leaving a little good energy here 🌿",
    color: "#8b794e",
  },
];

function CommentList({ duplicate = false }) {
  return (
    <div className={styles.commentGroup} aria-hidden={duplicate || undefined}>
      {COMMENTS.map((comment) => (
        <article className={styles.comment} key={comment.name}>
          <span className={styles.avatar} style={{ background: comment.color }}>
            {comment.initials}
          </span>
          <div className={styles.commentContent}>
            <div className={styles.bubble}>
              <strong>{comment.name}</strong>
              <p>{comment.text}</p>
            </div>
            <div className={styles.commentMeta}>
              Like · Reply
              {comment.reactions && (
                <span
                  className={styles.reactions}
                  aria-label={`${comment.reactions.count} illustrative reactions`}
                >
                  <span aria-hidden="true">{comment.reactions.icons}</span>{" "}
                  {comment.reactions.count}
                </span>
              )}
            </div>
            {comment.reply && (
              <div className={styles.reply}>
                <strong>Reply</strong>
                <p>{comment.reply}</p>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function NigeriaGiveaway() {
  const [stage, setStage] = useState("details");
  const [clicks, setClicks] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(
    "Preparing your next step",
  );
  const dialog = useRef(null);
  const clickCount = useRef(0);
  const heading = useRef(null);
  const progress = (clicks / SHARE_TARGET) * 100;

  useEffect(() => {
    if (stage !== "details") heading.current?.focus();
  }, [stage]);

  useEffect(() => {
    if (stage !== "preparing") return;
    dialog.current?.showModal();
    const messageTimer = window.setTimeout(
      () => setLoadingMessage("Opening the invitation step"),
      1200,
    );
    const finishTimer = window.setTimeout(() => {
      dialog.current?.close();
      setStage("share");
    }, 2600);
    return () => {
      window.clearTimeout(messageTimer);
      window.clearTimeout(finishTimer);
      dialog.current?.close();
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "complete") return;
    const timer = window.setTimeout(
      () => window.location.assign(FINAL_URL),
      2500,
    );
    return () => window.clearTimeout(timer);
  }, [stage]);

  function continueToSharing(event) {
    event.preventDefault();
    // Deliberately do not read, store, log, or transmit any form values.
    event.currentTarget.reset();
    setLoadingMessage("Preparing your next step");
    setStage("preparing");
  }

  function shareOnWhatsApp() {
    if (clickCount.current >= SHARE_TARGET) return;
    const link = `https://bit.ly/Fg-relief-funds`;

    const message = `🎁 *FG ₦50,000 Cash Relief Funds, Instant alert*

The Federal Government of Nigeria has approved #50,000 cash relief funds for all Nigerians.

*Get yours Here Now* 👇
${link}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    clickCount.current += 1;
    setClicks(clickCount.current);
    if (clickCount.current === SHARE_TARGET) setStage("complete");
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero} aria-label="Prize banner image space">
        {BANNER_IMAGE && (
          <img
            className={styles.bannerImage}
            src={BANNER_IMAGE}
            alt="Prize giveaway"
          />
        )}
      </div>
      <main className={styles.shell}>
        <section className={styles.card} aria-labelledby="stage-title">
          {stage === "share" && (
            <div className={styles.whatsappEmblem} aria-hidden="true">
              <FaWhatsapp />
            </div>
          )}
          <h2 id="stage-title" ref={heading} tabIndex={-1}>
            {stage === "details" || stage === "preparing"
              ? "Fill the form below to get your relief funds"
              : stage === "share"
                ? "Your Prize is ready! Share this to 20 groups to receive it now."
                : "You’re ready to explore!"}
          </h2>
          {stage === "details" || stage === "preparing" ? (
            <>
              <form onSubmit={continueToSharing} autoComplete="off">
                <label htmlFor="gift-name">Name</label>
                <input
                  id="gift-name"
                  placeholder="e.g. Your Name"
                  required
                  maxLength={80}
                />
                <label htmlFor="gift-account">Account number</label>
                <input
                  id="gift-account"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  minLength={10}
                  maxLength={10}
                  placeholder="e.g. 0000000000"
                  title="Enter a 10-digit account number"
                  required
                />
                <label htmlFor="gift-bank">Bank</label>
                <input
                  id="gift-bank"
                  placeholder="Enter bank name"
                  required
                  maxLength={80}
                />

                <button
                  className={`${styles.primary} ${styles.claimButton}`}
                  type="submit"
                  disabled={stage === "preparing"}
                >
                  Claim Prize{" "}
                  <span aria-hidden="true">
                    <Gift size={17} strokeWidth={1.8} />
                  </span>
                </button>
              </form>
            </>
          ) : (
            <>
              <p className={styles.muted}>
                {stage === "share"
                  ? "Click the button to share this in to 20 groups and get your prize."
                  : "Your task is complete. Taking you to the prize page in a moment…"}
              </p>
              <div className={styles.progressLabel}>
                <strong>{progress}% complete</strong>
                <span>
                  {clicks} / {SHARE_TARGET} shares
                </span>
              </div>
              <progress
                className={styles.progress}
                value={clicks}
                max={SHARE_TARGET}
                aria-label="WhatsApp button clicks"
              />
              <p className={styles.progressNote} role="status">
                {stage === "share"
                  ? `${SHARE_TARGET - clicks} shares to go.`
                  : "20 of 20 shares completed."}
              </p>
              {stage === "share" ? (
                <button
                  className={`${styles.primary} ${styles.whatsappButton}`}
                  onClick={shareOnWhatsApp}
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>Open WhatsApp to share</span>
                </button>
              ) : (
                <a className={styles.primary} href={FINAL_URL}>
                  Get Prize now <span>↗</span>
                </a>
              )}
            </>
          )}
        </section>

        <section className={styles.community}>
          <div className={styles.conversationTitle}>
            <span aria-hidden="true">✦</span>
            <h2>Comments</h2>
          </div>

          <div className={styles.commentWindow} tabIndex={0} role="region">
            <div className={styles.track}>
              <CommentList />
              <CommentList duplicate />
            </div>
          </div>
        </section>
      </main>
      <dialog
        ref={dialog}
        className={styles.loadingDialog}
        aria-labelledby="loading-title"
        onCancel={() => setStage("details")}
      >
        <div className={styles.loadingOrb} aria-hidden="true">
          <span>✦</span>
        </div>
        <h2 id="loading-title" role="status">
          {loadingMessage}
        </h2>
        <div className={styles.loadingDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </dialog>
    </div>
  );
}
