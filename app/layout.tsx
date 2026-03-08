import type { Metadata } from "next";
import "../styles/globals.css";
import { Header } from "@/components/header";
import { Inter } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import SilktideCookieBanner from "@/components/silktide-cookie";
import { Footer } from "@/components/footer";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baan met CAO - Vacatures met eerlijke arbeidsvoorwaarden",
    template: "%s | Baan met CAO",
  },
  description:
    "Ontdek vacatures met CAO, eerlijke salarissen en goede arbeidsvoorwaarden. Werk met zekerheid.",
  keywords: [
    "vacatures",
    "baan met CAO",
    "werk",
    "arbeidsvoorwaarden",
    "Nederland",
  ],
  authors: [{ name: "Baan met CAO" }],
  creator: "Baan met CAO",
  publisher: "Baan met CAO",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://baanmcao.nl",
    siteName: "Baan met CAO",
    title: "Baan met CAO - Vacatures met eerlijke arbeidsvoorwaarden",
    description:
      "Ontdek vacatures met CAO, eerlijke salarissen en goede arbeidsvoorwaarden. Werk met zekerheid.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Baan met CAO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baan met CAO - Vacatures met eerlijke arbeidsvoorwaarden",
    description:
      "Ontdek vacatures met CAO, eerlijke salarissen en goede arbeidsvoorwaarden.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    languages: {
      nl: "https://baanmcao.nl",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        {/* CSS van Silktide Consent Manager */}
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="/silktide-consent/silktide-consent-manager.css"
        />
      </head>
      <body className={`flex flex-col min-h-screen ${interFont.className}`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SilktideCookieBanner />
      </body>
      <GoogleAnalytics gaId="G-7ZJVYSSG4N" />
      <GoogleTagManager gtmId="GTM-59VXWLNR" />
    </html>
  );
}
