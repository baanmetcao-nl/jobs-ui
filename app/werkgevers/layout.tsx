import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacature plaatsen - Bereik werkzoekenden met CAO-voorkeur",
  description:
    "Plaats uw vacature op Baan met CAO en bereik duizenden werkzoekenden die specifiek zoeken naar banen met goede arbeidsvoorwaarden. Vanaf €299 per vacature.",
  keywords: [
    "vacature plaatsen",
    "personeel werven",
    "werkgevers",
    "CAO vacatures",
    "recruitment",
    "vacatureplatform",
  ],
  openGraph: {
    title: "Vacature plaatsen - Bereik werkzoekenden met CAO-voorkeur",
    description:
      "Plaats uw vacature op Baan met CAO en bereik duizenden werkzoekenden die specifiek zoeken naar banen met goede arbeidsvoorwaarden.",
    url: "https://baanmetcao.nl/werkgevers",
    siteName: "Baan met CAO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vacature plaatsen - Bereik werkzoekenden met CAO-voorkeur",
    description:
      "Plaats uw vacature op Baan met CAO en bereik duizenden werkzoekenden die specifiek zoeken naar banen met goede arbeidsvoorwaarden.",
  },
  alternates: {
    canonical: "https://baanmetcao.nl/werkgevers",
  },
};

export default function WerkgeversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
