import { fetchJobs } from "@/lib/utils";
import { JobsResponse } from "@/app/types";
import { nicheSeo } from "@/lib/niches";
import { notFound } from "next/navigation";
import Script from "next/script";
import Filters from "@/app/filters";
import JobList from "@/app/job-list";

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
  return Object.values(nicheSeo).map((n) => ({
    slug: n.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const data = getNicheFromSlug(params.slug);
  if (!data) return {};

  const { config } = data;

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `/vacatures/categorie/${config.slug}`,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `/vacatures/categorie/${config.slug}`,
      type: "website",
    },
  };
}

export default async function NichePage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    contract?: string;
    location?: string;
    workplace?: string;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const data = getNicheFromSlug(params.slug);
  if (!data) return notFound();

  const { niche, config } = data;

  const page = Math.max(0, Number(searchParams.page) || 0);
  const offset = page * LIMIT;

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: searchParams.search,
    contract: searchParams.contract,
    location: searchParams.location,
    workplace: searchParams.workplace,
    niches: niche,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.heading,
    numberOfItems: jobsResponse.pagination.totalCount,
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
          <a href="/vacatures" className="hover:underline">
            Vacatures
          </a>{" "}
          › {config.heading}
        </nav>

        <h1 className="text-3xl font-bold mb-4">{config.heading}</h1>

        <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
          {config.intro}
        </p>

        <Filters
          jobCount={jobsResponse.data.length}
          totalJobCount={jobsResponse.pagination.totalCount}
        />

        <JobList jobsResponse={jobsResponse} page={page} />
      </main>
    </div>
  );
}
