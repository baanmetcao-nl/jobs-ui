import { nicheSeo } from "@/lib/niches";
import { notFound } from "next/navigation";
import Script from "next/script";
import Filters from "@/app/filters";
import JobList from "@/app/job-list";
import Link from "next/link";
import { fetchJobs } from "@/lib/api/jobs";
import { getLocationName, locations } from "@/lib/locations";
import { capitalize } from "@/lib/utils";
import { JobsResponse } from "@/app/types";
import { NoJobsFound } from "@/components/noJobsFound";

const LIMIT = 10;

function toArray<T>(value: T | T[] | undefined): T[] | undefined {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return undefined;
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
  const niches = Object.values(nicheSeo);

  const locationSlugs = [
    "amsterdam",
    "rotterdam",
    "utrecht",
    "den-haag",
    "remote",
  ];

  return niches.flatMap((niche) =>
    locationSlugs.map((locatie) => ({
      categorie: niche.slug,
      locatie,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string; locatie: string }>;
}) {
  const { categorie, locatie } = await params;

  const data = getNicheFromSlug(categorie);
  if (!data) return {};

  const { config } = data;
  const cityName = getLocationName(locatie);

  return {
    title: `${config.heading} in ${cityName}`,
    description: `Bekijk de nieuwste ${config.heading.toLowerCase()} in ${cityName}.`,
    alternates: {
      canonical: `/vacatures/${categorie}/${locatie}`,
    },
  };
}

export default async function LocationPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorie: string; locatie: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    contracts?: string;
    seniorities?: string;
    workplace?: string;
  }>;
}) {
  const { categorie, locatie } = await params;
  const sp = await searchParams;

  const data = getNicheFromSlug(categorie);
  if (!data) return notFound();

  const { niche, config } = data;

  const page = Math.max(1, Number(sp.page) || 1);
  const offset = (page - 1) * LIMIT;
  const cityName = getLocationName(locatie);

  let jobsResponse: JobsResponse = {
    data: [],
    pagination: { limit: 10, offset: 0, totalCount: 0, hasMore: false },
  };

  const senioritiesValues = toArray(sp.seniorities);

  try {
    jobsResponse = await fetchJobs({
      limit: LIMIT,
      offset,
      search: sp.search,
      contracts: sp.contracts,
      seniorities: senioritiesValues,
      locations: [cityName],
      workplace: sp.workplace,
      niches: [niche],
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }

  const hasJobs = jobsResponse.pagination.totalCount > 0;
  const totalJobCount = jobsResponse.pagination.totalCount;

  const structuredData = hasJobs
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${config.heading} in ${cityName} | Baan met CAO`,
        numberOfItems: jobsResponse.pagination.totalCount,
        itemListElement: jobsResponse.data.map((job: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://baanmetcao.nl/vacature/${job.id}/${job.slug}`,
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {structuredData && (
        <Script
          id="location-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <nav className="text-sm text-gray-500 mb-4">
          <Link prefetch={false} href="/" className="hover:underline">
            Vacatures
          </Link>{" "}
          ›{" "}
          <Link
            prefetch={false}
            href={`/vacatures/${categorie}`}
            className="hover:underline"
          >
            {config.heading}
          </Link>{" "}
          › {cityName}
        </nav>

        <h1 className="text-3xl font-bold mb-4">
          {config.heading} in {cityName}
        </h1>

        {hasJobs ? (
          <>
            <Filters
              jobCount={jobsResponse.data.length}
              totalJobCount={totalJobCount}
              showLocationFilter={false}
              showNicheFilter={false}
            />

            <JobList jobsResponse={jobsResponse} page={page} />

            <div className="mt-16">
              <h2 className="text-xl font-semibold mb-6">
                Andere locaties voor {config.heading}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {locations
                  .filter((loc) => loc !== locatie)
                  .map((loc) => (
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
          </>
        ) : (
          <NoJobsFound config={config} />
        )}
      </main>
    </div>
  );
}
