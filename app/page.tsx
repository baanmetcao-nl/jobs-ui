import Filters from "./filters";
import JobList from "./job-list";
import { fetchJobs } from "@/lib/utils";
import { JobsResponse } from "./types";

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
  }>;
}) {
  const params = await searchParams;

  const page = Math.max(0, Number(params.page) || 0);
  const offset = page * LIMIT;

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: params.search,
    contract: params.contract,
    location: params.location,
    workplace: params.workplace,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <Filters
          jobCount={jobsResponse.data.length}
          totalJobCount={jobsResponse.pagination.totalCount}
        />

        <JobList jobsResponse={jobsResponse} page={page} />
      </main>
    </div>
  );
}
