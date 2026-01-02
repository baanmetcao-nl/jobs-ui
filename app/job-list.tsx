"use client";

import React, { useState, useEffect } from "react";
import { JobsResponse, Job } from "./types";
import { Search, MapPin, Clock, Building2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchJobs, truncate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function JobList({
  initialJobsResponse,
  selectedJobId,
}: {
  initialJobsResponse: JobsResponse;
  selectedJobId?: number | null;
}) {
  const [jobsResponse, setJobsResponse] =
    useState<JobsResponse>(initialJobsResponse);
  const [jobs, setJobs] = useState<Job[]>(initialJobsResponse.data);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      const search = searchParams.get("search") ?? undefined;
      const contract = searchParams.get("contract") ?? undefined;
      const location = searchParams.get("location") ?? undefined;
      const workplace = searchParams.get("workplace") ?? undefined;

      const newJobsResponse = await fetchJobs({
        search,
        contract,
        location,
        workplace,
        offset: 0,
      });
      setJobs(newJobsResponse.data);
      setJobsResponse(newJobsResponse);
    };

    fetchFilteredJobs();
  }, [searchParams]);

  const loadMoreJobs = async () => {
    const newOffset = jobs.length;
    const search = searchParams.get("search") ?? undefined;
    const contract = searchParams.get("contract") ?? undefined;
    const location = searchParams.get("location") ?? undefined;
    const workplace = searchParams.get("workplace") ?? undefined;

    const newJobsResponse = await fetchJobs({
      search,
      contract,
      location,
      workplace,
      offset: newOffset,
    });
    setJobs((prev) => [...prev, ...newJobsResponse.data]);
    setJobsResponse(newJobsResponse);
  };

  return (
    <>
      <div className="space-y-6">
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Geen vacatures gevonden
            </h3>
            <p className="text-gray-600">
              Probeer je zoekcriteria of filters aan te passen
            </p>
          </div>
        )}

        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 text-gray-900">
                      {job.position}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{job.company.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{job.contract}</Badge>
                      {job.workplace === "remote" && (
                        <Badge variant="outline">Thuiswerken</Badge>
                      )}
                      <Badge variant="outline">{job.salaryRange?.max}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-[#F1592A] hover:bg-[#F1592A]/90"
                      onClick={() => {
                        const updatedSearchParams = new URLSearchParams(
                          searchParams
                        );
                        updatedSearchParams.set("jobId", job.id.toString());
                        router.push(
                          `${pathname}?${updatedSearchParams.toString()}`
                        );
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      Bekijk Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-700 mb-4">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {truncate(job.description || "", 500)}
                </ReactMarkdown>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.tags.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {!jobsResponse.pagination.isFinished && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={loadMoreJobs}>
            Meer vacatures laden
          </Button>
        </div>
      )}
    </>
  );
}
