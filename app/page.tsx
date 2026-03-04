import Filters from "./filters";
import JobList from "./job-list";
import { fetchJobs } from "@/lib/utils";
import { JobsResponse } from "./types";

const LIMIT = 10;

export async function generateMetadata(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page ?? "1");

  const canonical = page <= 1 ? "/" : `/?page=${page}`;

  return {
    alternates: {
      canonical,
    },
  };
}

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

  const page = Number.parseInt(params.page ?? "1", 10);
  const safePage = Math.max(1, page || 1);

  const offset = (safePage - 1) * LIMIT;

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

        <JobList jobsResponse={jobsResponse} page={safePage - 1} />
      </main>
    </div>
  );
}
