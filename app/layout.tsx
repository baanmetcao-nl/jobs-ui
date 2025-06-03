import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
