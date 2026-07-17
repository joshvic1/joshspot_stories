"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/whatsapp-select.css";

export default function WhatsAppSelectionPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  /*
   * TikTok's base pixel normally handles PageView automatically.
   * This tracks that the visitor actually viewed this page's content.
   */
  useEffect(() => {
    trackTikTokEvent("ViewContent", {
      content_name: "WhatsApp name selection page",
      content_type: "landing_page",
      page_name: "whatsapp_selection",
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

    /*
     * Do not send the visitor's actual name to TikTok.
     * A person's name is personal information.
     */
    const eventProperties = {
      form_name: "whatsapp_name_form",
      page_name: "whatsapp_selection",
      destination: "/blog",
      registration_method: "name_form",
    };

    // The visitor successfully submitted the form.
    trackTikTokEvent("SubmitForm", eventProperties);

    // Fire this only if submitting this form genuinely completes
    // the registration or access process.
    trackTikTokEvent("CompleteRegistration", eventProperties);

    /*
     * Give TikTok a moment to send the browser events before
     * Next.js changes the route.
     */
    window.setTimeout(() => {
      router.push("/blog");
    }, 350);
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
