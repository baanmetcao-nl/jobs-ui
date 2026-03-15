import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bedrijfsprofiel",
  description:
    "Bekijk het bedrijfsprofiel en openstaande vacatures op Baan met CAO.",
  robots: { index: false, follow: false },
};

export default function BedrijfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
