import { Job, JobsResponse } from "@/app/types";
import { notFound } from "next/navigation";
import JobDetails from "./job-details";

const CACHE_TIME = 7 * 24 * 60 * 60;

// TODO: error handling & change with general route in route.ts
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const singleJob = await fetch(`https://api.baanmetcao.nl/jobs/${params.id}`, {
    next: { revalidate: 0 },
  });

  if (singleJob.status === 404) {
    notFound();
  }

  if (!singleJob.ok) {
    return "an erreur";
  }

  const result: { data: Job } = await singleJob.json();
  const job = result.data;

  const allJobs = await fetch("https://api.baanmetcao.nl/jobs").then(
    (response) => {
      if (response.ok) {
        return response.json() as Promise<JobsResponse>;
      }
      throw new Error("An error occurred fetching jobs");
    }
  );

  const relatedCompanyJobs = allJobs.data
    .filter((j) => j.field === job.field && j.id !== job.id)
    .slice(0, 4);

  const relatedJobs = allJobs.data
    .filter((j) => j.field === job.field && j.company.name !== job.company.name)
    .slice(0, 4);

  console.log(relatedCompanyJobs);

  return (
    <div>
      <JobDetails
        job={job}
        relatedCompanyJobs={relatedCompanyJobs}
        relatedJobs={relatedJobs}
      />
    </div>
  );
}
