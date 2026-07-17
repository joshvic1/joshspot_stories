"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/whatsapp-select.css";

export default function WhatsAppSelectionPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const viewContentTracked = useRef(false);
  const year = new Date().getFullYear();

  const trackTikTokEvent = (eventName, properties = {}) => {
    if (
      typeof window !== "undefined" &&
      window.ttq &&
      typeof window.ttq.track === "function"
    ) {
      window.ttq.track(eventName, properties);
    }
  };

  useEffect(() => {
    /*
     * React Strict Mode may run effects twice during development.
     * This prevents duplicate ViewContent events.
     */
    if (viewContentTracked.current) return;

    viewContentTracked.current = true;

    trackTikTokEvent("ViewContent", {
      content_name: "WhatsApp name selection page",
      page_name: "whatsapp_selection",
      page_url: window.location.href,
    });
  }, []);

  const handleButtonClick = () => {
    trackTikTokEvent("ClickButton", {
      button_name: "submit_name",
      button_text: "Submit",
      page_name: "whatsapp_selection",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedName = name.trim();

    if (!cleanedName || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const eventProperties = {
      form_name: "whatsapp_name_form",
      page_name: "whatsapp_selection",
      destination: "/blog",
    };

    trackTikTokEvent("SubmitForm", eventProperties);

    trackTikTokEvent("CompleteRegistration", {
      ...eventProperties,
      registration_method: "name_form",
    });

    /*
     * Small delay gives TikTok time to send the events
     * before Next.js changes the page.
     */
    window.setTimeout(() => {
      router.push("/blog");
    }, 500);
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
            disabled={isSubmitting}
          />

          <button
            type="submit"
            onClick={handleButtonClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Submit"}
          </button>
        </form>

        <footer>
          Copyright {year}. All rights reserved |{" "}
          <Link href="/privacy">Privacy policy</Link> | Terms and conditions
          apply
        </footer>
      </section>
    </main>
  );
}
