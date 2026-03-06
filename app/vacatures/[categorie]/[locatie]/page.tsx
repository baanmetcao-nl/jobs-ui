import { notFound } from "next/navigation";
import { nicheSeo } from "@/lib/niches";
import { fetchJobs, fetchJobCount } from "@/lib/api/jobs";
import { JobsResponse } from "@/app/types";
import Script from "next/script";
import JobList from "@/app/job-list";
import Filters from "@/app/filters";
import { capitalize } from "@/lib/utils";

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

  return {
    title: `${config.heading} in ${locatie}`,
    description: `Bekijk de nieuwste ${config.heading.toLowerCase()} in ${locatie}.`,
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
  searchParams: Promise<{ page?: string }>;
}) {
  const { categorie, locatie } = await params;
  const { page } = await searchParams;

  const data = getNicheFromSlug(categorie);
  if (!data) return notFound();

  const { niche, config } = data;

  const pageNumber = Math.max(0, Number(page) || 0);
  const offset = pageNumber * LIMIT;

  const jobCountResponse: { count: number } = await fetchJobCount({
    niches: niche,
    location: locatie,
  });

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    niches: niche,
    location: locatie,
  });

  if (jobsResponse.pagination.totalCount === 0) {
    return notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${config.heading} in ${locatie}`,
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
          {config.heading} in {capitalize(locatie)}
        </h1>

        <Filters
          jobCount={jobsResponse.data.length}
          totalJobCount={jobCountResponse.count}
          showLocationFilter={false}
          showNicheFilter={false}
        />
        <JobList jobsResponse={jobsResponse} page={0} />
      </main>
    </div>
  );
}
