"use client";
import { useEffect } from "react";

export default function AdsenseAd({ type }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  const ads = {
    ad1: {
      slot: "1835403377",
      format: "autorelaxed",
    },
    ad2: {
      slot: "6799955443",
      format: "auto",
    },
    ad3: {
      slot: "6736376262",
      format: "fluid",
      layout: "-6t+ed+2i-1n-4w",
    },
  };

  const ad = ads[type];

  return (
    <div style={{ margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1759270581850188"
        data-ad-slot={ad.slot}
        data-ad-format={ad.format}
        data-ad-layout-key={ad.layout || undefined}
        data-full-width-responsive="true"
      />
    </div>
  );
}
