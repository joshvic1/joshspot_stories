"use client";

import { useEffect, useRef, useState } from "react";

const REVIEW_PIN = process.env.NEXT_PUBLIC_REVIEW_PIN;

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const cardRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // auto-unlock if already validated in this tab
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("review_ok") === "1"
    ) {
      onUnlock?.();
    }
  }, [onUnlock]);

  useEffect(() => {
    // autofocus
    inputRef.current?.focus();
  }, []);

  const submit = (e) => {
    e.preventDefault();

    // missing env guard
    if (!REVIEW_PIN) {
      setError("PIN not set. Add NEXT_PUBLIC_REVIEW_PIN in .env.local");
      shake();
      return;
    }

    if (pin.trim() === REVIEW_PIN.trim()) {
      setError("");
      setUnlocking(true);

      // tiny delay for nice UX before switching
      setTimeout(() => {
        sessionStorage.setItem("review_ok", "1");
        onUnlock?.();
      }, 350);
    } else {
      setError("Incorrect PIN. Try again.");
      shake();
      // light haptic feedback (supported browsers/devices)
      if (navigator?.vibrate) navigator.vibrate(60);
      // select all for quick retype
      inputRef.current?.select();
    }
  };

  const shake = () => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove("animate-shake");
    // reflow to restart animation
    // eslint-disable-next-line no-unused-expressions
    cardRef.current.offsetHeight;
    cardRef.current.classList.add("animate-shake");
  };

  return (
    <div
      ref={cardRef}
      className={[
        "w-full max-w-sm",
        "rounded-2xl border border-white/15",
        "bg-white/10 backdrop-blur-xl",
        "shadow-[0_10px_50px_rgba(124,58,237,0.25)]",
        "p-6 relative overflow-hidden",
        unlocking ? "opacity-70" : "opacity-100",
        "transition",
      ].join(" ")}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -z-10 -right-20 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-[80px]" />
      <div className="pointer-events-none absolute -z-10 -left-16 -bottom-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-[90px]" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LockIcon className="text-violet-300" />
          <h1 className="text-lg font-semibold tracking-tight">
            Joshspot Review
          </h1>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/60">
          Private
        </span>
      </div>

      <p className="mt-1 text-xs text-white/70">
        Authorized reviewers only. Enter your PIN to continue.
      </p>

      {/* Form */}
      <form onSubmit={submit} className="mt-4 space-y-3">
        <label className="text-xs text-white/70">PIN</label>
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 outline-none placeholder:text-white/40 focus:border-violet-300/50"
        />

        <button
          type="submit"
          disabled={unlocking}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 hover:bg-white/15 hover:border-violet-300/40 transition disabled:opacity-60"
        >
          {unlocking ? (
            <>
              <Spinner className="h-4 w-4" /> Unlocking…
            </>
          ) : (
            <>
              <KeyIcon /> Unlock
            </>
          )}
        </button>

        {error && (
          <div className="text-xs text-red-200 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {!REVIEW_PIN && (
          <p className="text-[11px] text-amber-200/90 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
            <strong>Setup needed:</strong> Add{" "}
            <code>NEXT_PUBLIC_REVIEW_PIN</code> to <code>.env.local</code>, then
            restart.
          </p>
        )}
      </form>

      {/* Watermark */}
      <div className="mt-5 text-[10px] tracking-wider text-white/50">
        joshspot.tv • @joshspot_tv
      </div>

      {/* Local styles for shake animation */}
      <style jsx>{`
        @keyframes shake {
          10% {
            transform: translateX(-3px);
          }
          20% {
            transform: translateX(3px);
          }
          30% {
            transform: translateX(-3px);
          }
          40% {
            transform: translateX(3px);
          }
          50% {
            transform: translateX(-2px);
          }
          60% {
            transform: translateX(2px);
          }
          70% {
            transform: translateX(-1px);
          }
          80% {
            transform: translateX(1px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}

/* ---------- Icons (inline SVGs) ---------- */
function LockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="currentColor"
        d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm-6 8v-3h2v3h-2zm3-8H10V6a2 2 0 0 1 4 0v2z"
      />
    </svg>
  );
}

function KeyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="currentColor"
        d="M14.5 4A5.5 5.5 0 0 0 9 9.5c0 .87.2 1.69.57 2.41L2 19.5V22h2.5l2-2H9v-2.5h2.5l1.66-1.66c.72.37 1.54.56 2.41.56A5.5 5.5 0 1 0 14.5 4zm0 9A3.5 3.5 0 1 1 18 9.5 3.5 3.5 0 0 1 14.5 13z"
      />
    </svg>
  );
}

function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" className="animate-spin" {...props}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
