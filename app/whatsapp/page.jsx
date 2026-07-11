"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/whatsapp-select.css";

export default function WhatsAppSelectionPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const year = new Date().getFullYear();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (typeof window !== "undefined" && window.ttq?.track) {
      window.ttq.track("ClickButton", {
        button_name: "submit_name",
        page: "whatsapp",
      });
    }

    router.push("/blog");
  };

  return (
    <main className="wa-page">
      <section className="wa-panel">
        <h1>Enter your name to continue</h1>
        <p className="wa-subtitle">Type your name below to continue</p>

        <form className="wa-name-form" onSubmit={handleSubmit}>
          <label htmlFor="visitor-name">Your name</label>
          <input
            id="visitor-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            required
          />
          <button type="submit">Submit</button>
        </form>

        <footer>
          copyright {year} all rights reserved |{" "}
          <Link href="/privacy">Privacy policy</Link> | Terms and conditions
          apply
        </footer>
      </section>
    </main>
  );
}
