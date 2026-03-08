import Filters from "./filters";
import JobList from "./job-list";
import { formatNumber } from "@/lib/utils";
import { JobsResponse } from "./types";
import { fetchJobs } from "../lib/api/jobs";

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
    seniorities?: string;
    locations?: string;
    workplace?: string;
    niches?: string;
  }>;
}) {
  const params = await searchParams;

  const page = Number.parseInt(params.page ?? "1", 10);
  const safePage = Math.max(1, page || 1);

  const offset = (safePage - 1) * LIMIT;

  const locationsParam = params.locations;
  const locationValues = Array.isArray(locationsParam)
    ? locationsParam
    : locationsParam
      ? [locationsParam]
      : undefined;

  const senioritiesParam = params.seniorities;
  const senioritiesValues = Array.isArray(senioritiesParam)
    ? senioritiesParam
    : senioritiesParam
      ? [senioritiesParam]
      : undefined;

  const nichesParam = params.niches;
  const nichesValues = Array.isArray(nichesParam)
    ? nichesParam
    : nichesParam
      ? [nichesParam]
      : undefined;

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: params.search,
    contract: params.contract,
    seniorities: senioritiesValues,
    locations: locationValues,
    workplace: params.workplace,
    niches: nichesValues,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <Filters
          jobCount={jobsResponse.data.length}
          totalJobCount={jobsResponse.pagination.totalCount}
        />
        <div className="relative rounded-lg bg-gray-50 flex mt-4 mb-8 items-center relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden py-8">
          <div className="flex flex-col gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-2xl font-bold text-white">
              Werk met zekerheid. Kies voor een{" "}
              <span className="text-[#F1592A]">baan met CAO</span>
            </h1>
            <p className="text-white">
              Ontdek {formatNumber(jobsResponse.pagination.totalCount)}{" "}
              vacatures met eerlijke salarissen en goede arbeidsvoorwaarden.
            </p>
          </div>
        </div>
        <JobList jobsResponse={jobsResponse} page={safePage - 1} />
      </main>
    </div>
  );
}
