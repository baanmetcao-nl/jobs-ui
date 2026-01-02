"use client";

import React, { useEffect, useState } from "react";
import { JobsResponse } from "./types";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  jobsResponsePromise,
  offset,
}: {
  jobsResponsePromise: Promise<JobsResponse>;
  offset: number;
}) {
  const [jobsResponse, setJobsResponse] = useState<JobsResponse | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    jobsResponsePromise.then((res) => setJobsResponse(res));
  }, [jobsResponsePromise]);

  if (!jobsResponse) return null;

  if (jobsResponse.pagination.isFinished) {
    return null;
  }

  return (
    <div className="text-center mt-12">
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("offset", (offset + 10).toString());
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        Meer vacatures laden
      </Button>
    </div>
  );
}
