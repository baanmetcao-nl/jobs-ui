import { Job, JobsResponse } from "@/app/types";
import { notFound } from "next/navigation";
import JobDetails from "./job-details";
import Script from "next/script";

export const revalidate = 3600;

async function getJob(id: string) {
  const res = await fetch(
    `https://jobs-dry-breeze-1010.fly.dev/api/jobs/${id}`,
  );

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Failed to fetch job");

  return res.json();
}

async function getRelatedJobs(niches: string[]): Promise<JobsResponse> {
  const params = new URLSearchParams();
  params.append("limit", "3");

  niches.forEach((niche) => params.append("niches", niche));

  const res = await fetch(
    `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`,
  );
  if (!res.ok) throw new Error("Failed to fetch related jobs");

  return res.json();
}

async function getRelatedCompanyJobs(companyId: string): Promise<JobsResponse> {
  const params = new URLSearchParams();
  params.append("limit", "3");
  params.append("companyIds", companyId);

  const res = await fetch(
    `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`,
  );

  if (!res.ok) throw new Error("Failed to fetch company jobs");

  return res.json();
}

export async function generateMetadata(props: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const params = await props.params;

  const job = await getJob(params.id);

  return {
    title: `${job.title} in ${job.city} | ${job.company.name}`,
    description: job.description.slice(0, 155),
    alternates: {
      canonical: `/vacatures/${job.id}/${params.slug}`,
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
