"use client";
import React from "react";

export default function AboutPage() {
  return (
    <main className="about-page text-gray-200 bg-[var(--background-color)] min-h-screen py-16 px-6 md:px-20">
      <section className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">
          About Joshspot TV Stories
        </h1>

        <p className="text-lg leading-relaxed text-[var(--text-color)]">
          Joshspot TV Stories began as a simple WhatsApp TV — a small community
          where people came not just to read stories, but to *feel something*.
          What started as short, relatable tales shared among friends has grown
          into one of Nigeria’s most engaging digital storytelling platforms,
          reaching thousands of readers across WhatsApp, Twitter, Instagram,
          Telegram, and TikTok every single day.
        </p>

        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
          Behind Joshspot TV is a passion for real, raw storytelling — stories
          that reflect everyday emotions, modern relationships, love,
          heartbreak, choices, mistakes, and the beauty hidden in imperfection.
          Each post, each story, and each caption is crafted to connect with
          people on a deeply personal level — to make readers laugh, reflect,
          cry, and most importantly, *remember*.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mt-8">
          Our Journey
        </h2>

        <p className="text-lg leading-relaxed text-[var(--text-color)]">
          When we started, we had no idea what this would become. There were no
          big sponsors or investors — just consistency, creativity, and a
          burning desire to make something people could relate to. We wrote
          stories through late nights, built a loyal fan base from scratch, and
          slowly turned a simple WhatsApp platform into a brand that now
          collaborates with advertisers, creators, and storytellers from across
          the country.
        </p>

        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
          Over the years, Joshspot TV Stories has evolved beyond just “stories.”
          We’ve built a *community*. A space where young people can share their
          experiences, learn from others, and find comfort knowing that they’re
          not alone in their feelings or struggles. Our goal has always been to
          bridge that emotional gap — between content and connection.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mt-8">
          What Makes Us Different
        </h2>

        <ul className="list-disc pl-6 space-y-4 text-[var(--text-color)]">
          <li>
            <strong>Authenticity:</strong> Every story is drawn from real-life
            experiences — relatable, emotional, and grounded in truth.
          </li>
          <li>
            <strong>Community:</strong> Our readers are more than an audience;
            they are part of the story. Their reactions, comments, and
            engagement shape what we create.
          </li>
          <li>
            <strong>Consistency:</strong> We post new content daily across all
            platforms, maintaining the same storytelling quality that built our
            reputation.
          </li>
          <li>
            <strong>Connection:</strong> Joshspot TV isn’t about viral content.
            It’s about *impact*. We want our stories to stay with you long after
            you’ve read them.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mt-8">
          Our Vision
        </h2>

        <p className="text-lg leading-relaxed text-[var(--text-color)]">
          We envision a world where storytelling doesn’t just entertain — it
          inspires, teaches, and connects people from different walks of life.
          Joshspot TV Stories aims to become Africa’s biggest hub for digital
          stories and emotional entertainment, where writers, brands, and
          readers coexist in one creative ecosystem.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mt-8">
          For Our Readers & Advertisers
        </h2>

        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
          To our loyal readers — you’re the reason we exist. Your messages,
          reactions, and constant support keep us going. Every like, share, and
          comment fuels the heart of Joshspot TV.
          <br />
          And to our advertisers — thank you for trusting our platform to tell
          your stories. You’re not just promoting your brands here; you’re
          connecting with real people who genuinely engage with what we create.
        </p>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-xl shadow-md mt-10">
          <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-3">
            Join The Movement
          </h3>
          <p className="text-[var(--text-color)] leading-relaxed">
            Joshspot TV is more than a platform — it’s a movement of emotions,
            creativity, and truth. Whether you’re a reader, storyteller,
            influencer, or brand, there’s space for you in this story.
          </p>
          <p className="mt-4 text-[var(--text-muted)] italic">
            “Stories that touch. Emotions that last. A platform that connects.”
          </p>
        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-12">
          © {new Date().getFullYear()} Joshspot TV Stories — Created with love,
          passion, and storytelling.
        </p>
      </section>
    </main>
  );
}
