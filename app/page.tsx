import Filters from "./filters";
import JobList from "./job-list";
import { fetchJobs } from "@/lib/utils";
import { JobsResponse } from "./types";

export const revalidate = 600;

const LIMIT = 10;

export default async function JobBoard({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    jobId?: string;
    search?: string;
    contract?: string;
    location?: string;
    workplace?: string;
    niches?: string;
  }>;
}) {
  const params = await searchParams;

  const page = Number.parseInt(params.page ?? "0", 10);
  const safePage = Math.max(0, page || 0);

  const offset = safePage * LIMIT;

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: params.search,
    contract: params.contract,
    location: params.location,
    workplace: params.workplace,
    niches: params.niches,
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
