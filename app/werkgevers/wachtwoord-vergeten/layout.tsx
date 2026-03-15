import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wachtwoord vergeten",
  description:
    "Vraag een nieuw wachtwoord aan voor je werkgeversaccount bij Baan met CAO.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://baanmetcao.nl/werkgevers/wachtwoord-vergeten",
  },
};

export default function WachtwoordVergetenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
