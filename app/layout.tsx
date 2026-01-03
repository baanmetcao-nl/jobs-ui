import type { Metadata } from "next";
import "../styles/globals.scss";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";

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
      <body>
        <Header />
        {children}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p>
                &copy; 2026 Baan met CAO. Hetzelfde werk, betere voorwaarden.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
