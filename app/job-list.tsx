"use client";

import React from "react";
import { JobsResponse } from "./types";
import { Search, MapPin, Clock, Building2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function JobList({
  jobsResponsePromise,
}: {
  jobsResponsePromise: Promise<JobsResponse>;
}) {
  const jobsResponse = React.use(jobsResponsePromise);
  const jobs = jobsResponse.data;

  return (
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
        <Card key={job.id} className="hover:shadow-md transition-shadow">
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
                    {/* <span>{job.posted}</span> */}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{job.contract}</Badge>
                  {job.workplace === "remote" && (
                    <Badge variant="outline">Thuiswerken</Badge>
                  )}
                  <Badge variant="outline">{job.salaryRange.max}</Badge>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // const updatedSearchParams = new URLSearchParams(
                    //   searchParams,
                    // );
                    // router.replace(
                    //   `${pathname}?${updatedSearchParams.toString()}`,
                    // );
                  }}
                  className="flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  Bekijk Details
                </Button>
                <Button
                  size="sm"
                  className="bg-[#F1592A] hover:bg-[#F1592A]/90"
                >
                  Solliciteer
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
