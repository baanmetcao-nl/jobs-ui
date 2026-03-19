import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts, formatDate } from "./data";

export const metadata: Metadata = {
  title: "Blog | Baan met CAO",
  description:
    "Tips over solliciteren, arbeidsrecht, CAO's en carriere. Alles wat je moet weten als werkzoekende op de Nederlandse arbeidsmarkt.",
  keywords: [
    "sollicitatietips",
    "cao uitleg",
    "arbeidsrecht blog",
    "carriere advies",
    "werkzoekende tips",
    "salaris onderhandelen",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Baan met CAO",
    description:
      "Tips over solliciteren, arbeidsrecht, CAO's en carriere voor werkzoekenden.",
    url: "/blog",
    siteName: "Baan met CAO",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Baan met CAO",
    description:
      "Tips over solliciteren, arbeidsrecht, CAO's en carriere voor werkzoekenden.",
  },
};

export default function BlogPage() {
  return (
    <>
      <section className="relative py-12 md:py-16 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzek0zNiA0OGMxLjY1NyAwIDMtMS4zNDMgMy0zcy0xLjM0My0zLTMtMy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgM3pNNiAzNmMwLTEuNjU3LTEuMzQzLTMtMy0zcy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgMyAzLTEuMzQzIDMtM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="bg-[#F1592A]/20 text-[#F1592A] border-[#F1592A]/30 mb-6 text-sm px-4 py-1">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Kennis voor <span className="text-[#F1592A]">werkzoekenden</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Tips over solliciteren, arbeidsrecht en je carriere. Alles wat je
            moet weten om de beste baan te vinden.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 sm:h-52">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        data-testid="category-badge"
                        className="bg-white/90 text-gray-700 border-0 text-xs backdrop-blur-sm shadow-sm"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-900 group-hover:text-[#F1592A] transition-colors mb-2 leading-snug text-lg">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">
                      {post.description}
                    </p>
                    <span className="text-sm text-[#F1592A] font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Lees artikel
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Op zoek naar een baan met goede voorwaarden?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Bekijk duizenden vacatures bij werkgevers met een CAO. Transparante
            salarissen en eerlijke arbeidsvoorwaarden.
          </p>
          <Link href="/" prefetch={false}>
            <Button
              size="lg"
              className="bg-[#F1592A] hover:bg-[#e04d1f] text-white gap-2 text-base px-8 py-6 font-semibold"
            >
              Bekijk alle vacatures
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
