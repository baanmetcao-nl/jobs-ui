import { JobsResponse } from "@/app/types";
import { nicheSeo } from "@/lib/niches";
import { notFound } from "next/navigation";
import Script from "next/script";
import Filters from "@/app/filters";
import JobList from "@/app/job-list";
import Link from "next/link";
import { fetchJobCount, fetchJobs } from "@/lib/api/jobs";
import { locations } from "@/lib/locations";
import { capitalize } from "@/lib/utils";

const LIMIT = 10;

export async function generateMetadata(props: {
  params: Promise<{ categorie: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const data = getNicheFromSlug(params.categorie);
  if (!data) return {};

  const { config } = data;

  const page = Number(searchParams.page ?? "1");

  const base = `/vacatures/${config.slug}`;
  const canonical = page <= 1 ? base : `${base}?page=${page}`;

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      type: "website",
    },
  };
}

function getNicheFromSlug(slug: string) {
  const entry = Object.entries(nicheSeo).find(
    ([_, config]) => config.slug === slug,
  );

  if (!entry) return null;

  return {
    niche: entry[0],
    config: entry[1],
  };
}

export async function generateStaticParams() {
  return Object.values(nicheSeo).map((n) => ({
    categorie: n.slug,
  }));
}

export default async function NichePage({
  params,
  searchParams,
}: {
  params: Promise<{ categorie: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    contract?: string;
    location?: string;
    workplace?: string;
  }>;
}) {
  const { categorie } = await params;
  const sp = await searchParams;
  const data = getNicheFromSlug(categorie);
  if (!data) return notFound();

  const { niche, config } = data;

  const page = Math.max(0, Number(sp.page) || 0);
  const offset = page * LIMIT;

  const jobCountResponse: { count: number } = await fetchJobCount({
    contract: sp.contract,
    niches: niche,
  });

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: sp.search,
    contract: sp.contract,
    location: sp.location,
    workplace: sp.workplace,
    niches: niche,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.heading,
    description: config.description,
    url: `https://baanmetcao.nl/vacatures/${config.slug}`,
    numberOfItems: jobsResponse.pagination.totalCount,
    itemListElement: jobsResponse.data.map((job: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://baanmetcao.nl/vacature/${job.id}/${job.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        id="category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline">
            Vacatures
          </Link>{" "}
          › {config.heading}
        </nav>

        <h1 className="text-3xl font-bold mb-4">{config.heading}</h1>

        <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
          {config.intro}
        </p>

        <Filters
          jobCount={jobsResponse.data.length}
          totalJobCount={jobCountResponse.count}
          showNicheFilter={false}
        />

        <JobList jobsResponse={jobsResponse} page={page} />

        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">
            {config.heading} per stad
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <Link
                key={loc}
                href={`/vacatures/${config.slug}/${loc}`}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-sm transition"
              >
                <span className="font-medium text-gray-900">
                  {config.heading} in {capitalize(loc)}
                </span>

                <div className="text-sm text-gray-500 mt-1">
                  Bekijk vacatures →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
