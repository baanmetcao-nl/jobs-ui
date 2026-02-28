import type { Metadata } from "next";
import "../styles/globals.scss";
import { Header } from "@/components/header";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import SilktideCookieBanner from "@/components/silktide-cookie";

export const metadata: Metadata = {
  title: "Baan met CAO",
  description: "Hetzelfde werk, betere voorwaarden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* CSS van Silktide Consent Manager */}
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="/silktide-consent/silktide-consent-manager.css"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p>
                &copy; 2026 Baan met CAO. Hetzelfde werk, betere voorwaarden.
              </p>
            </div>
          </div>
        </footer>
        <SilktideCookieBanner />
      </body>
      <GoogleAnalytics gaId="G-7ZJVYSSG4N" />
      <GoogleTagManager gtmId="GTM-59VXWLNR" />
    </html>
  );
}
