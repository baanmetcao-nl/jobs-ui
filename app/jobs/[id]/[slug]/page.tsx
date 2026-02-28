import { Job, JobsResponse } from "@/app/types";
import { notFound } from "next/navigation";
import JobDetails from "./job-details";
import Script from "next/script";

const CACHE_TIME = 7 * 24 * 60 * 60;

async function getJob(id: string) {
  const singleJob = await fetch(
    `https://jobs-dry-breeze-1010.fly.dev/api/jobs/${id}`,
    {
      next: { revalidate: 0 },
    },
  );
  if (singleJob.status === 404) {
    throw notFound();
  }
  if (!singleJob.ok) {
    throw new Error("Er is iets misgegaan");
  }
  const job: Job = await singleJob.json();
  return job;
}

async function getRelatedJobs(niches: string[]): Promise<JobsResponse> {
  const params = new URLSearchParams();
  params.append("limit", "3");
  niches.forEach((niche) => params.set("niches", niche));
  const response = await fetch(
    `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error("Er is iets misgegaan");
  }
  return response.json();
}

async function getRelatedCompanyJobs(companyId: string): Promise<JobsResponse> {
  const params = new URLSearchParams();
  params.append("limit", "3");
  params.set("companyIds", companyId);

  const response = await fetch(
    `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error("Er is iets misgegaan");
  }
  return response.json();
}

// TODO: error handling & change with general route in route.ts
export default async function Page(props: { params: Promise<{ id: string }> }) {
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

    employmentType: job.contract,

    industry: job.niches.join(", "),

    occupationalCategory: job.niches.join(", "),

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
        addressCountry: job.country === "the_netherlands" ? "NL" : undefined,
      },
    },

    jobLocationType: job.workplace,

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

    qualifications: job.requirements?.join("\n"),

    responsibilities: job.responsibilities?.join("\n"),

    educationRequirements: job.education,

    experienceRequirements: job.seniority,

    skills: job.tags?.join(", "),

    jobBenefits: Object.entries(job.benefits)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(", "),

    directApply: true,
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
      <div>
        <JobDetails
          job={job}
          relatedCompanyJobs={relatedCompanyJobs.data}
          relatedJobs={relatedJobs.data}
        />
      </div>
    </>
  );
}
