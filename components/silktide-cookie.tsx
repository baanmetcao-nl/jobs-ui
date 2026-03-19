"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SilktideCookieBanner() {
  const isE2E = process.env.NEXT_PUBLIC_E2E === "true";

  useEffect(() => {
    if (isE2E) return;
    if (typeof window === "undefined") return;

    // wacht tot script geladen is
    const initSilktide = () => {
      if (!window.silktideCookieBannerManager) return;
      window.silktideCookieBannerManager.updateCookieBannerConfig({
        background: { showBackground: true },
        cookieIcon: { position: "bottomRight" },
        cookieTypes: [
          {
            id: "necessary",
            name: "Necessary",
            description: "<p>These cookies are required.</p>",
            required: true,
          },
          {
            id: "analytics",
            name: "Analytics",
            description: "<p>Analytics cookies.</p>",
            required: true,
          },
          {
            id: "advertising",
            name: "Advertising",
            description: "<p>Advertising cookies.</p>",
            required: false,
          },
        ],
        position: { banner: "bottomRight" },
      });
    };

    // check elke 100ms tot script geladen is
    const interval = setInterval(() => {
      if (window.silktideCookieBannerManager) {
        clearInterval(interval);
        initSilktide();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (isE2E) return null;

  return (
    <Script
      src="/silktide-consent/silktide-consent-manager.js"
      strategy="afterInteractive"
    />
  );
}
