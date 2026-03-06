import { Contract, JobsResponse } from "@/app/types";

const DEFAULT_LIMIT = 10;

type FetchJobsParams = {
  limit?: number;
  offset?: number;
  contract?: string;
  search?: string;
  location?: string;
  workplace?: string;
  niches?: string;
};

export async function fetchJobs({
  limit = DEFAULT_LIMIT,
  offset = 0,
  search,
  contract,
  location,
  workplace,
  niches,
}: FetchJobsParams): Promise<JobsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });
  const allowedContracts: Contract[] = ["freelance", "temporary", "permanent", "flex"];


  if (search) params.set("search", search);
  if (contract && contract !== "all") {
  params.set("contract", contract);
} else {
  allowedContracts.forEach((c) => params.append("contracts", c));
}
  if (location && location !== "all") params.set("location", location);
  if (workplace && workplace !== "all") params.set("workplace", workplace);
  if (niches && niches !== "all") params.set("niches", niches);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${params.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 600 },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    throw new Error(`API request failed (${res.status})`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error("API returned non-JSON response");
  }

  return res.json();
}