import { JobsResponse } from "@/app/types";
import { nicheSeo } from "@/lib/niches";
import { notFound } from "next/navigation";
import Script from "next/script";
import Filters from "@/app/filters";
import JobList from "@/app/job-list";
import Link from "next/link";
import { fetchJobs } from "@/lib/api/jobs";
import { locations } from "@/lib/locations";
import { capitalize } from "@/lib/utils";

const LIMIT = 10;

function toArray<T>(value: T | T[] | undefined): T[] | undefined {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return undefined;
}

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
    contracts?: string;
    seniorities?: string;
    locations?: string;
    workplace?: string;
  }>;
}) {
  const { categorie } = await params;
  const sp = await searchParams;
  const data = getNicheFromSlug(categorie);
  if (!data) return notFound();

  const { niche, config } = data;

  const page = Math.max(1, Number(sp.page) || 1);
  const offset = (page - 1) * LIMIT;

  let jobsResponse: JobsResponse = {
    data: [],
    pagination: { limit: 10, offset: 0, totalCount: 0, hasMore: false },
  };

  const locationValues = toArray(sp.locations);
  const senioritiesValues = toArray(sp.seniorities);

  try {
    jobsResponse = await fetchJobs({
      limit: LIMIT,
      offset,
      search: sp.search,
      contracts: sp.contracts,
      seniorities: senioritiesValues,
      locations: locationValues,
      workplace: sp.workplace,
      niches: [niche],
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }

  const hasJobs = jobsResponse.pagination.totalCount > 0;
  const totalJobCount = jobsResponse.pagination.totalCount;

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

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Vacatures",
        item: "https://baanmetcao.nl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.heading,
        item: `https://baanmetcao.nl/vacatures/${categorie}`,
      },
    ],
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
      <Script
        id="category-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <nav className="text-sm text-gray-500 mb-4">
          <Link prefetch={false} href="/" className="hover:underline">
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
          totalJobCount={totalJobCount}
          showNicheFilter={false}
        />

        <JobList jobsResponse={jobsResponse} page={page - 1} />

        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">
            {config.heading} per stad
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <Link
                prefetch={false}
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
