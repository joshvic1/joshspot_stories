import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Joshspot Stories",
  description: "Your Story. Your Confession. Your Experience. Anonymous",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1759270581850188"
          crossorigin="anonymous"
        ></script>

        <meta name="theme-color" content="#431845" />
        <meta name="msapplication-navbutton-color" content="#431845" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* OneSignal SDK */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="beforeInteractive"
        />

        <Script id="onesignal-init" strategy="beforeInteractive">
          {`
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      OneSignalDeferred.push(async function(OneSignal) {
        await OneSignal.init({
          appId: "258b3939-f36a-47ea-b9b0-926192f8cf39",
          safari_web_id: "web.onesignal.auto.2510e921-2066-4b3b-be25-8e0e09bd836c",
          notifyButton: {
            enable: true,
          },
        });
      });
    `}
        </Script>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}; 
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.load=function(e,n){
                var r="https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i=ttq._i||{};
                ttq._i[e]=[];
                ttq._t=ttq._t||{};
                ttq._t[e]=+new Date;
                ttq._o=ttq._o||{};
                ttq._o[e]=n||{};
                var s=d.createElement("script");
                s.type="text/javascript";
                s.async=true;
                s.src=r+"?sdkid="+e+"&lib="+t;
                var x=d.getElementsByTagName("script")[0];
                x.parentNode.insertBefore(s,x);
              };
              ttq.load('D68FNF3C77U5Q2MP8CMG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
