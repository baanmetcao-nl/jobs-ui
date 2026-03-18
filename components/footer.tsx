import { nicheSeo } from "@/lib/niches";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-white mt-0">
            Vacature categorieën
          </h2>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-gray-300 text-sm">
            {Object.values(nicheSeo).map((niche) => (
              <li key={niche.slug}>
                <Link
                  prefetch={false}
                  href={`/vacatures/${niche.slug}`}
                  className="hover:text-white hover:underline"
                >
                  {niche.heading}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>&copy; 2026 Baan met CAO. Hetzelfde werk, betere voorwaarden.</p>
            <div className="flex gap-4">
              <Link
                prefetch={false}
                href="/algemene-voorwaarden"
                className="hover:text-white hover:underline"
              >
                Algemene voorwaarden
              </Link>
              <Link
                prefetch={false}
                href="/privacy"
                className="hover:text-white hover:underline"
              >
                Privacybeleid
              </Link>
              <Link
                prefetch={false}
                href="/blog"
                className="hover:text-white hover:underline"
              >
                Blog
              </Link>
              <Link
                prefetch={false}
                href="/contact"
                className="hover:text-white hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
