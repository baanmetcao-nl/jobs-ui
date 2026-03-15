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
  metadataBase: new URL("https://baanmetcao.nl"),
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
    url: "https://baanmetcao.nl",
    siteName: "Baan met CAO",
    title: "Baan met CAO - Vacatures met eerlijke arbeidsvoorwaarden",
    description:
      "Ontdek vacatures met CAO, eerlijke salarissen en goede arbeidsvoorwaarden. Werk met zekerheid.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baan met CAO - Vacatures met eerlijke arbeidsvoorwaarden",
    description:
      "Ontdek vacatures met CAO, eerlijke salarissen en goede arbeidsvoorwaarden.",
    images: ["/opengraph-image"],
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
      nl: "https://baanmetcao.nl",
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
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="/silktide-consent/silktide-consent-manager.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Baan met CAO",
              url: "https://baanmetcao.nl",
              logo: "https://baanmetcao.nl/logo.png",
              description:
                "Ontdek vacatures met CAO, eerlijke salarissen en goede arbeidsvoorwaarden. Werk met zekerheid.",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "info@baanmetcao.nl",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "NL",
                addressLocality: "Nederland",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Baan met CAO",
              url: "https://baanmetcao.nl",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://baanmetcao.nl/?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
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
