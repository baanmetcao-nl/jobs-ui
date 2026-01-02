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
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Baan met CAO"
                width={300}
                height={120}
                className="h-36 w-auto"
                priority
              />
            </div>

            <p className="text-lg md:text-xl mb-8 text-gray-300 font-light">
              Ontdek vacatures bij werkgevers die een CAO hanteren. Meer
              zekerheid, betere arbeidsvoorwaarden en eerlijke beloning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-[#F1592A]/20 rounded-full p-2">
                    <Shield className="h-5 w-5 text-[#F1592A]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Gegarandeerde Rechten
                </h3>
                <p className="text-gray-400 text-sm">
                  CAO-beschermde arbeidsvoorwaarden
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-blue-500/20 rounded-full p-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  1,200+ Vacatures
                </h3>
                <p className="text-gray-400 text-sm">Dagelijks nieuwe kansen</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-green-500/20 rounded-full p-2">
                    <Users className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Vertrouwde Partners
                </h3>
                <p className="text-gray-400 text-sm">Alleen CAO-werkgevers</p>
              </div>
            </div>
          </div>
        </div>
      </header>

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
