import Filters from "./filters";
import JobList from "./job-list";
import { formatNumber } from "@/lib/utils";
import { JobsResponse } from "@/app/types";
import { fetchJobs, fetchTotalJobCount } from "@/lib/api/jobs";

const LIMIT = 10;

function toArray<T>(value: T | T[] | undefined): T[] | undefined {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return undefined;
}

export async function generateMetadata(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page ?? "1");

  const canonical = page <= 1 ? "/" : `/?page=${page}`;

  return {
    title:
      page <= 1
        ? "Baan met CAO - Vacatures met eerlijke arbeidsvoorwaarden"
        : `Vacatures met CAO - Pagina ${page}`,
    description:
      "Ontdek vacatures met CAO, eerlijke salarissen en goede arbeidsvoorwaarden. Vind een baan met zekerheid bij werkgevers die hun zaken goed geregeld hebben.",
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
    contracts?: string;
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

  const locationValues = toArray(params.locations);
  const senioritiesValues = toArray(params.seniorities);
  const nichesValues = toArray(params.niches);

  const jobsResponse: JobsResponse = await fetchJobs({
    limit: LIMIT,
    offset,
    search: params.search,
    contracts: params.contracts,
    seniorities: senioritiesValues,
    locations: locationValues,
    workplace: params.workplace,
    niches: nichesValues,
  });

  const totalJobCount = await fetchTotalJobCount();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <Filters jobCount={jobsResponse.data.length} />
        <div className="relative rounded-lg bg-gray-50 flex mt-4 mb-8 items-center  bg-linear-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden py-8">
          <div className="flex flex-col gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-2xl font-bold text-white">
              Werk met zekerheid. Kies voor een{" "}
              <span className="text-[#F1592A]">baan met CAO</span>
            </h1>
            <p className="text-white mb-0">
              Ontdek {formatNumber(totalJobCount)} vacatures met eerlijke
              salarissen en goede arbeidsvoorwaarden.
            </p>
          </div>
        </div>
        <JobList jobsResponse={jobsResponse} page={safePage - 1} />
      </main>
    </div>
  );
}
