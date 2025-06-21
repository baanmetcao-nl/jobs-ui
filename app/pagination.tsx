"use client";
import React from "react";
import { JobsResponse } from "./types";
import { Button } from "@/components/ui/button";

export default function Pagination(props: {
  jobsResponsePromise: Promise<JobsResponse>;
}) {
  const jobsResponse = React.use(props.jobsResponsePromise);

  if (jobsResponse.pagination.isFinished) {
    return null;
  }

  return (
    <div className="text-center mt-12">
      <Button variant="outline" size="lg">
        Meer vacatures laden
      </Button>
    </div>
  );
}
