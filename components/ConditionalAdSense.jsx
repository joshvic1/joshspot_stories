"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function ConditionalAdSense() {
  const pathname = usePathname();

  // Disable AdSense on the Nigeria page
  if (pathname === "/Nigeria" || pathname.startsWith("/Nigeria/")) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=1759270581850188"
      crossOrigin="anonymous"
    />
  );
}
