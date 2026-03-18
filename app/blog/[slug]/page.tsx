import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPost, formatDate } from "../data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Baan met CAO`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "Baan met CAO",
      locale: "nl_NL",
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <section className="relative py-10 md:py-14 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzek0zNiA0OGMxLjY1NyAwIDMtMS4zNDMgMy0zcy0xLjM0My0zLTMtMy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgM3pNNiAzNmMwLTEuNjU3LTEuMzQzLTMtMy0zcy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgMyAzLTEuMzQzIDMtM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-[#F1592A]/20 text-[#F1592A] border-[#F1592A]/30">
              {post.category}
            </Badge>
            <span className="flex items-center text-sm text-gray-400">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center text-sm text-gray-400">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              {post.readTime} leestijd
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={630}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {post.content.map((section, i) => (
              <div key={i} className={i > 0 ? "mt-10" : ""}>
                {section.heading && (
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-gray-600 leading-relaxed mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item, k) => (
                      <li key={k} className="flex items-start gap-3">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F1592A] mt-2.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Op zoek naar een baan met CAO?
              </h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Bekijk duizenden vacatures bij werkgevers die onder een
                collectieve arbeidsovereenkomst vallen.
              </p>
              <Link href="/" prefetch={false}>
                <Button
                  size="lg"
                  className="bg-[#F1592A] hover:bg-[#e04d1f] text-white gap-2 px-8"
                >
                  Bekijk vacatures
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Andere artikelen
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden h-full flex flex-col">
                    <div className="relative h-40">
                      <Image
                        src={related.image}
                        alt={related.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 border-0 text-xs w-fit mb-3"
                      >
                        {related.category}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#F1592A] transition-colors mb-3 leading-snug">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex-1 line-clamp-2">
                        {related.description}
                      </p>
                      <span className="mt-4 text-sm text-[#F1592A] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Lezen
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
