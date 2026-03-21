import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();

    const params = new URLSearchParams(window.location.search);

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    const url = `/?${params.toString()}`;

    router.push(url);
  };

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isEmployerFlow =
    pathname.startsWith("/werkgevers") ||
    pathname.startsWith("/plaats-vacature") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/bevestiging") ||
    pathname.startsWith("/bedrijf");

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-nav.svg"
                alt="Job Board Logo"
                width={160}
                height={62}
                className="h-8 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                prefetch={false}
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Alle vacatures
              </Link>
              <Link
                href="/over-ons"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Over ons
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Blog
              </Link>
            </nav>
          </div>
          {!isHomePage && !isEmployerFlow && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl gap-2"
            >
              <div className="relative flex-1">
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
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
              className="shrink-0 md:hidden text-black"
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
          <div className="md:hidden border-t py-4 space-y-2">
            <Link
              prefetch={false}
              href="/"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Alle vacatures
            </Link>
            <Link
              href="/over-ons"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Over ons
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
