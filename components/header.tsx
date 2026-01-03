"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Search, Shield, TrendingUp, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  if (isHomePage) {
    return (
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Baan met CAO"
                width={300}
                height={120}
                className="h-36 w-auto"
                priority
              />
            </div>

            <p className="text-lg md:text-xl mb-8 text-gray-300 font-light">
              Ontdek vacatures bij werkgevers die een CAO hanteren. Meer
              zekerheid, betere arbeidsvoorwaarden en eerlijke beloning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-[#F1592A]/20 rounded-full p-2">
                    <Shield className="h-5 w-5 text-[#F1592A]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Gegarandeerde Rechten
                </h3>
                <p className="text-gray-400 text-sm">
                  CAO-beschermde arbeidsvoorwaarden
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-blue-500/20 rounded-full p-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  1,200+ Vacatures
                </h3>
                <p className="text-gray-400 text-sm">Dagelijks nieuwe kansen</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-green-500/20 rounded-full p-2">
                    <Users className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Vertrouwde Partners
                </h3>
                <p className="text-gray-400 text-sm">Alleen CAO-werkgevers</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-header.png"
                alt="Job Board Logo"
                width={160}
                height={62}
                className="h-8 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Alle vacatures
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Over ons
              </Link>
            </nav>
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-md"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Zoek vacatures..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Alle vacatures
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Over ons
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
