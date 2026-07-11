"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/whatsapp-select.css";

const faces = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=80",
];

export default function WhatsAppSelectionPage() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const year = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((current) => (current + 1) % faces.length);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const visibleFaces = useMemo(
    () => Array.from({ length: 4 }, (_, index) => faces[(offset + index) % faces.length]),
    [offset]
  );

  const goToBlog = () => router.push("/blog");

  return (
    <main className="wa-page">
      <section className="wa-panel">
        <p className="wa-kicker">whatsapp chat with me</p>
        <div className="wa-online">
          <span />
          ONLINE NOW
        </div>

        <div className="wa-face-row">
          {visibleFaces.map((face, index) => (
            <img src={face} alt="" key={`${face}-${index}`} />
          ))}
        </div>

        <h1>Are you a male or female?</h1>

        <div className="wa-choice-grid">
          <button type="button" onClick={goToBlog}>
            MALE
          </button>
          <button type="button" onClick={goToBlog}>
            FEMALE
          </button>
        </div>

        <div className="wa-action-stack">
          <button type="button" onClick={goToBlog}>
            Start chatting
          </button>
          <button type="button" onClick={goToBlog}>
            Join whatsapp group
          </button>
        </div>

        <footer>
          copyright {year} all rights reserved |{" "}
          <Link href="/privacy">Privacy policy</Link> | Terms and conditions apply
        </footer>
      </section>
    </main>
  );
}
