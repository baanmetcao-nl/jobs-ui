import { Users, TrendingUp, Shield } from "lucide-react";
import Image from "next/image";
import Filters from "./filters";
import JobList from "./job-list";
import { JobsResponse } from "./types";
import { fetchJobs } from "@/lib/utils";

export default async function JobBoard(props: {
  searchParams: Promise<{
    jobId?: string;
    offset?: string;
    search?: string;
    contract?: string;
    location?: string;
    workplace?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const offset = Number(searchParams.offset ?? 0);

  const initialJobsResponse: JobsResponse = await fetchJobs({
    offset,
    search: searchParams.search,
    contract: searchParams.contract,
    location: searchParams.location,
    workplace: searchParams.workplace,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <Filters
          jobCount={initialJobsResponse.data.length}
          totalJobCount={initialJobsResponse.pagination.totalCount}
        />

        <JobList
          initialJobsResponse={initialJobsResponse}
          selectedJobId={searchParams.jobId ? Number(searchParams.jobId) : null}
        />
      </main>
    </div>
  );
}
