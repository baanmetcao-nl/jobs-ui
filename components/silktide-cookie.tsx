"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SilktideCookieBanner() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;

    // wacht tot script geladen is
    const initSilktide = () => {
      if (!w.silktideCookieBannerManager) return;
      w.silktideCookieBannerManager.updateCookieBannerConfig({
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
      if ((window as any).silktideCookieBannerManager) {
        clearInterval(interval);
        initSilktide();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        id="silktide-consent-manager-css"
        href="/silktide-consent/silktide-consent-manager.css"
      />
      <Script
        src="/silktide-consent/silktide-consent-manager.js"
        strategy="afterInteractive" // pas laden nadat pagina interactief is
      />
    </>
  );
}
