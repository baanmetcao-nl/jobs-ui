import { Contract, Job, JobsResponse } from "@/app/types";
import { notFound } from "next/navigation";
import JobDetails from "./job-details";
import Script from "next/script";
import { ALLOWED_CONTRACTS } from "@/lib/contracts";
import { cache } from "react";
import { backendFetch } from "@/lib/api/backend";

export const revalidate = 3600;
export const dynamic = "force-static";

const getJob = cache(async function getJob(id: string) {
  const res = await backendFetch(`/api/jobs/${id}`);

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Failed to fetch job");

  return res.json();
});

const getRelatedJobs = cache(async function getRelatedJobs(
  niches: string[],
): Promise<JobsResponse> {
  const params = new URLSearchParams();
  params.append("limit", "3");

  ALLOWED_CONTRACTS.forEach((c) => params.append("contracts", c));

  niches.forEach((niche) => params.append("niches", niche));

  const res = await backendFetch(`/api/jobs?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch related jobs");

  return res.json();
});

const getRelatedCompanyJobs = cache(async function getRelatedCompanyJobs(
  companyId: string,
): Promise<JobsResponse> {
  const params = new URLSearchParams();
  params.append("limit", "3");
  params.append("companyIds", companyId);

  ALLOWED_CONTRACTS.forEach((c) => params.append("contracts", c));

  const res = await backendFetch(`/api/jobs?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch company jobs");

  return res.json();
});

export async function generateMetadata(props: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const params = await props.params;

  const job = await getJob(params.id);

  return {
    title: `${job.title} in ${job.city} | ${job.company.name}`,
    description: job.description.slice(0, 155),
    alternates: {
      canonical: `/vacature/${job.id}/${params.slug}`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const params = await props.params;

  const job = await getJob(params.id);

  const [relatedJobs, relatedCompanyJobs] = await Promise.all([
    getRelatedJobs(job.niches),
    getRelatedCompanyJobs(job.company.id),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: job.company.name,
      value: job.id,
    },
    datePosted: job.publishedAt,
    employmentType: job.contract?.toUpperCase(),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      logo: job.company.logoUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressCountry: "NL",
      },
    },
    baseSalary: job.salary?.min
      ? {
          "@type": "MonetaryAmount",
          currency: job.salary.currency,
          value: {
            "@type": "QuantitativeValue",
            minValue: job.salary.min,
            maxValue: job.salary.max,
            unitText: job.salary.interval,
          },
        }
      : undefined,
  };

  return (
    <>
      <Script
        id="job-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <JobDetails
        job={job}
        relatedCompanyJobs={relatedCompanyJobs.data}
        relatedJobs={relatedJobs.data}
      />
    </>
  );
}
