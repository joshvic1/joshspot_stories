"use client";
import { useEffect } from "react";

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function (OneSignal) {
        await OneSignal.init({
          appId: "258b3939-f36a-47ea-b9b0-926192f8cf39",
          notifyButton: {
            enable: true,
          },
        });
      });
    }
  }, []);

  return null;
}
