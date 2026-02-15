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
            position: "bottom-left",
          },

          promptOptions: {
            slidedown: {
              enabled: true,
              autoPrompt: true,
              timeDelay: 5, // seconds after page load
              pageViews: 1,

              prompts: [
                {
                  type: "push",
                  autoPrompt: true,
                  text: {
                    actionMessage:
                      "Get hot relationship stories, secrets & confessions before anyone else 😈",
                    acceptButton: "Yes, Notify me🔥",
                    cancelButton: "No",
                  },
                },
              ],
            },
          },
        });
      });
    }
  }, []);

  return null;
}
