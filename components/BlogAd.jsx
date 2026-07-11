"use client";

import { useEffect } from "react";

const AD_SLOTS = ["6799955443", "1835403377", "6736376262"];

export default function BlogAd({ index = 0 }) {
  const slot = AD_SLOTS[index % AD_SLOTS.length];

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <aside className="blog-ad" aria-label="Advertisement">
      <div className="blog-ad-label">ADVERTISEMENT</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-1759270581850188"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
