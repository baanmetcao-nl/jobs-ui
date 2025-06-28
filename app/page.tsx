import { Users, TrendingUp, Shield } from "lucide-react";
import Image from "next/image";
import Filters from "./filters";
import { JobsResponse } from "./types";
import JobList from "./job-list";
import Pagination from "./pagination";
import { Suspense } from "react";
import ApplyModal from "./apply-modal";
import { usePathname, useRouter } from "next/navigation";

export default async function JobBoard(props: {
  searchParams: Promise<{ jobId?: string }>;
}) {
  const searchParams = await props.searchParams;
  const jobsResponsePromise = fetch("https://api.baanmetcao.nl/jobs").then(
    (response) => {
      if (response.ok) {
        return response.json() as Promise<JobsResponse>;
      }
      throw new Error("could not fetch mon");
    },
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.03%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <Suspense fallback={<div>Aan het laden ...</div>}>
          <Filters jobCount={0} totalJobCount={0} />
        </Suspense>
        <Suspense fallback={<div>Aan het laden ...</div>}>
          <JobList
            jobsResponsePromise={jobsResponsePromise}
            selectedJobId={
              searchParams.jobId ? parseInt(searchParams.jobId) : null
            }
          />
        </Suspense>
        <Suspense fallback={<div>Aan het laden ...</div>}>
          <Pagination jobsResponsePromise={jobsResponsePromise} />
        </Suspense>
      </main>
    </div>
  );
}
