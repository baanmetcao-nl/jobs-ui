import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  GraduationCap,
  MapPin,
  X,
} from "lucide-react";
import { Job } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function JobDetailModal({ job }: { job: Job }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:block hidden"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
        <div className="bg-white w-full h-full md:w-full md:max-w-4xl md:h-auto md:max-h-[90vh] md:rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold truncate">
                {job.position}
              </h2>
              <div className="flex items-center gap-4 text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">{job.company.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const updatedSearchParams = new URLSearchParams(searchParams);
                updatedSearchParams.delete("jobId");
                router.replace(`${pathname}?${updatedSearchParams.toString()}`);
              }}
              className="h-10 w-10 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{job.contract}</Badge>
                {job.workplace === "remote" && (
                  <Badge variant="outline">Thuiswerken</Badge>
                )}
                <Badge variant="outline">{job.salaryRange.max}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {/* {job.posted} */}
                </Badge>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Over {job.company.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Bedrijfsgrootte:</span>
                    <span className="text-gray-700">
                      {/* {job.companyInfo.size} */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Opgericht:</span>
                    <span className="text-gray-700">
                      {/* {job.companyInfo.founded} */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sector:</span>
                    <span className="text-gray-700">
                      {/* {job.companyInfo.industry} */}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Functieomschrijving</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Belangrijkste verantwoordelijkheden
                </h3>
                <ul className="space-y-3">
                  {job.responsibilities.map(
                    (responsibility: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#F1592A] rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Vereisten
                </h3>
                <ul className="space-y-3">
                  {job.requirements.map(
                    (requirement: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Vereiste vaardigheden</h3>
                <div className="flex flex-wrap gap-2">
                  {/* wat is het verschil tussen skills en requirements? */}
                  {/* {job.skills.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))} */}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Voordelen & Extra's</h3>
                <ul className="space-y-3">
                  {/* {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))} */}
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Belangrijke data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Sollicitatie deadline:</span>
                    <span className="text-gray-700">
                      {/* {job.applicationDeadline} */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Verwachte startdatum:</span>
                    {/* <span className="text-gray-700">{job.startDate}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 border-t">
            <Button className="w-full bg-[#F1592A] hover:bg-[#F1592A]/90">
              Solliciteer Nu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
