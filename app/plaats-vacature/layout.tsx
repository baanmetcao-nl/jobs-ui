import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacature plaatsen",
  robots: { index: false, follow: false },
};

export default function PlaatsVacatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
