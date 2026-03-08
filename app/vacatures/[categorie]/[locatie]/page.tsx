import { notFound } from "next/navigation";
import { nicheSeo } from "@/lib/niches";
import { fetchJobs, fetchJobCount } from "@/lib/api/jobs";
import { JobsResponse } from "@/app/types";
import Script from "next/script";
import JobList from "@/app/job-list";
import Filters from "@/app/filters";
import { NoJobsFound } from "@/components/noJobsFound";
import { getLocationName } from "@/lib/locations";

const LIMIT = 10;

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

  const locations = ["amsterdam", "rotterdam", "utrecht", "den-haag", "remote"];

  return niches.flatMap((niche) =>
    locations.map((locatie) => ({
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
    contract?: string;
    seniorities?: string;
    workplace?: string;
  }>;
}) {
  const { categorie, locatie } = await params;
  const sp = await searchParams;

  const data = getNicheFromSlug(categorie);
  if (!data) return notFound();

  const { niche, config } = data;

  const pageNumber = Math.max(0, Number(sp.page) || 0);
  const offset = pageNumber * LIMIT;
  const cityName = getLocationName(locatie);

  const jobCountResponse: { count: number } = await fetchJobCount({
    niches: [niche],
    location: [cityName],
  });

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: sp.search,
    contract: sp.contract,
    seniorities: sp.seniorities ? [sp.seniorities] : undefined,
    workplace: sp.workplace,
    niches: [niche],
    location: [cityName],
  });

  const hasJobs = jobsResponse.pagination.totalCount > 0;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${config.heading} in ${cityName} | Baan met CAO`,
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
        id="location-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <h1 className="text-3xl font-bold mb-6">
          {config.heading} in {cityName}
        </h1>

        {hasJobs ? (
          <>
            <Filters
              jobCount={jobsResponse.data.length}
              totalJobCount={jobCountResponse.count}
              showLocationFilter={false}
              showNicheFilter={false}
            />

            <JobList jobsResponse={jobsResponse} page={0} />
          </>
        ) : (
          <NoJobsFound config={config} />
        )}
      </main>
    </div>
  );
}
