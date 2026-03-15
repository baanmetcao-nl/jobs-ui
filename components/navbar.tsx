import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Search,
  X,
  ChevronDown,
  LogIn,
  Briefcase,
  LayoutDashboard,
  Building2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWerkgeversOpen, setIsWerkgeversOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("employer-token") !== null);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsWerkgeversOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
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
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Contact
              </Link>
            </nav>
          </div>
          {!isHomePage && !isEmployerFlow && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md"
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
          )}
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setIsWerkgeversOpen(!isWerkgeversOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                Werkgevers
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${isWerkgeversOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isWerkgeversOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border py-1 z-50">
                  <Link
                    href="/werkgevers"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsWerkgeversOpen(false)}
                  >
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    Waarom Baan met CAO
                  </Link>
                  <Link
                    href="/plaats-vacature"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsWerkgeversOpen(false)}
                  >
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    Plaats vacature
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsWerkgeversOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/werkgevers/inloggen"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsWerkgeversOpen(false)}
                    >
                      <LogIn className="w-4 h-4 text-gray-400" />
                      Inloggen
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Link href="/plaats-vacature">
              <Button className="hidden md:inline-flex bg-[#F1592A] hover:bg-[#e04d1f] text-white">
                Plaats vacature
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
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
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="border-t pt-2 mt-2">
              <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Werkgevers
              </p>
              <Link
                href="/werkgevers"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Waarom Baan met CAO
              </Link>
              <Link
                href="/plaats-vacature"
                className="block px-4 py-2 text-sm font-medium text-[#F1592A] hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Plaats vacature
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/werkgevers/inloggen"
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inloggen
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
