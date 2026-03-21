import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Baan met CAO. Heb je vragen over vacatures, wil je samenwerken, of heb je feedback? We reageren meestal binnen 24 uur.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - Baan met CAO",
    description:
      "Neem contact op met Baan met CAO. We reageren meestal binnen 24 uur.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
