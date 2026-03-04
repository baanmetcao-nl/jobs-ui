import Filters from "./filters";
import JobList from "./job-list";
import { fetchJobs } from "@/lib/utils";
import { JobsResponse } from "./types";

export const revalidate = 600;

const LIMIT = 10;

export default async function JobBoard({
  searchParams,
}: {
  searchParams: {
    page?: string;
    jobId?: string;
    search?: string;
    contract?: string;
    location?: string;
    workplace?: string;
    niches?: string;
  };
}) {
  const page = Number.parseInt(searchParams.page ?? "0", 10);
  const safePage = Math.max(0, page || 0);

  const offset = safePage * LIMIT;
  console.log(searchParams);
  console.log("PAGE:", searchParams.page);
  console.log("OFFSET:", offset);
  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: searchParams.search,
    contract: searchParams.contract,
    location: searchParams.location,
    workplace: searchParams.workplace,
    niches: searchParams.niches,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <Filters
          jobCount={jobsResponse.data.length}
          totalJobCount={jobsResponse.pagination.totalCount}
        />

        <JobList jobsResponse={jobsResponse} page={safePage} />
      </main>
    </div>
  );
}
