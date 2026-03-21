import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bevestiging",
  robots: { index: false, follow: false },
};

export default function BevestigingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
