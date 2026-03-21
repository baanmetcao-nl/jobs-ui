import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inloggen voor werkgevers",
  description:
    "Log in op uw werkgeversprofiel bij Baan met CAO. Beheer uw vacatures, bekijk statistieken en ontvang sollicitaties.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://baanmetcao.nl/werkgevers/inloggen",
  },
};

export default function InloggenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
