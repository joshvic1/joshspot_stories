"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/whatsapp-select.css";

export default function GenderSelectionPage() {
  const router = useRouter();

  const [selectedGender, setSelectedGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const viewContentTracked = useRef(false);
  const redirectTimer = useRef(null);

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
    if (viewContentTracked.current) return;

    viewContentTracked.current = true;

    trackTikTokEvent("ViewContent", {
      content_name: "Gender selection page",
      page_name: "gender_selection",
      page_url: window.location.href,
    });

    return () => {
      if (redirectTimer.current) {
        window.clearTimeout(redirectTimer.current);
      }
    };
  }, []);

  const redirectToBlog = () => {
    redirectTimer.current = window.setTimeout(() => {
      router.push("/blog");
    }, 450);
  };

  const handleGenderSelect = (gender) => {
    if (isSubmitting) return;

    setSelectedGender(gender);
    setIsSubmitting(true);

    trackTikTokEvent("ClickButton", {
      button_name: `${gender.toLowerCase()}_gender_option`,
      button_text: gender,
      selected_gender: gender.toLowerCase(),
      page_name: "gender_selection",
      destination: "/blog",
    });

    trackTikTokEvent("SubmitForm", {
      form_name: "gender_selection_form",
      selected_gender: gender.toLowerCase(),
      page_name: "gender_selection",
      destination: "/blog",
    });

    trackTikTokEvent("CompleteRegistration", {
      registration_method: "gender_selection",
      selected_gender: gender.toLowerCase(),
      page_name: "gender_selection",
      destination: "/blog",
    });

    redirectToBlog();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedGender || isSubmitting) return;

    setIsSubmitting(true);

    trackTikTokEvent("ClickButton", {
      button_name: "submit_gender",
      button_text: "Submit",
      selected_gender: selectedGender.toLowerCase(),
      page_name: "gender_selection",
      destination: "/blog",
    });

    trackTikTokEvent("SubmitForm", {
      form_name: "gender_selection_form",
      selected_gender: selectedGender.toLowerCase(),
      page_name: "gender_selection",
      destination: "/blog",
    });

    trackTikTokEvent("CompleteRegistration", {
      registration_method: "gender_selection",
      selected_gender: selectedGender.toLowerCase(),
      page_name: "gender_selection",
      destination: "/blog",
    });

    redirectToBlog();
  };

  return (
    <main className="wa-page">
      <section className="wa-panel">
        <p className="wa-kicker">Just one quick question</p>

        <h1>What&apos;s your gender?</h1>

        <p className="wa-subtitle">
          Select one of the options below to continue
        </p>

        <form className="wa-gender-form" onSubmit={handleSubmit}>
          <div className="wa-gender-options">
            <button
              type="button"
              className={`wa-gender-button wa-male ${
                selectedGender === "Male" ? "wa-selected" : ""
              }`}
              onClick={() => handleGenderSelect("Male")}
              disabled={isSubmitting && selectedGender !== "Male"}
              aria-pressed={selectedGender === "Male"}
            >
              <span className="wa-gender-icon">♂</span>
              <span>Male</span>
            </button>

            <button
              type="button"
              className={`wa-gender-button wa-female ${
                selectedGender === "Female" ? "wa-selected" : ""
              }`}
              onClick={() => handleGenderSelect("Female")}
              disabled={isSubmitting && selectedGender !== "Female"}
              aria-pressed={selectedGender === "Female"}
            >
              <span className="wa-gender-icon">♀</span>
              <span>Female</span>
            </button>
          </div>

          <button
            className="wa-submit-button"
            type="submit"
            disabled={!selectedGender || isSubmitting}
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
