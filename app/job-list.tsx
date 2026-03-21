"use client";

import { JobsResponse } from "@/app/types";
import { MapPin, Building2, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { sanitize } from "@/lib/sanitize";
import ReactMarkdown from "react-markdown";
import Pagination from "./pagination";
import { contractFormat, intervalFormat, slugify } from "@/lib/utils";
import Link from "next/link";
import CompanyLogo from "@/components/image-fallback";

export default function JobList({
  jobsResponse,
  page,
}: {
  jobsResponse: JobsResponse;
  page: number;
}) {
  const sortedJobs = [...jobsResponse.data].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });
  const { totalCount, limit } = jobsResponse.pagination;
  const totalPages = Math.ceil(totalCount / limit);

  const router = useRouter();

  const openJob = (jobId: string, jobTitle: string) => {
    router.push(`/vacature/${jobId}/${slugify(jobTitle)}`);
  };

  return (
    <>
      <div className="space-y-6">
        {sortedJobs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Geen vacatures gevonden
          </div>
        )}

        {sortedJobs.map((job: JobsResponse["data"][number]) => (
          <Card
            key={job.id}
            className={`hover:shadow-md transition-shadow ${
              job.isFeatured ? "border-yellow-300 border-2 bg-yellow-50/30" : ""
            }`}
          >
            <CardHeader>
              <div className="flex max-sm:flex-col md:flex-row justify-between gap-4">
                <div>
                  <div className="flex flex-row items-center gap-3 mb-4">
                    <CompanyLogo
                      src={
                        job.company.logoUrl
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${job.company.logoUrl}`
                          : undefined
                      }
                      alt={`${job.company.name} logo`}
                      size={60}
                    />
                    <div>
                      {job.isFeatured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 mb-1 text-xs">
                          <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                          Uitgelicht
                        </Badge>
                      )}
                      <CardTitle className="text-xl mb-2 hover:text-[#F1592A]">
                        <Link
                          prefetch={false}
                          href={`/vacature/${job.id}/${slugify(job.title)}`}
                        >
                          {job.title}
                        </Link>
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex max-sm:flex-col gap-4 text-gray-600">
                    <div className="flex flex-row gap-4">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {job.company.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.city}
                      </span>
                    </div>
                    <div className="flex flex-row gap-4 max-sm:mb-2">
                      <span className="flex items-center gap-1">
                        <Badge variant={"outline"}>
                          {job.salary.symbol} {Math.trunc(job.salary.min)}-
                          {Math.trunc(job.salary.max)}{" "}
                          {intervalFormat(job.salary.interval)}
                        </Badge>
                      </span>
                      <span className="flex items-center gap-1">
                        <Badge>{contractFormat(job.contract)}</Badge>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    size="sm"
                    onClick={() => openJob(job.id, job.title)}
                    className="bg-[#F1592A] max-sm:w-full cursor-pointer"
                  >
                    <Eye className="h-4 w-4" /> Bekijk vacature
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <ReactMarkdown>{sanitize(job.summary)}</ReactMarkdown>

              <div className="flex flex-wrap gap-2 mt-3">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </>
  );
}
