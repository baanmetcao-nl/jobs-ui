import { JobsResponse } from "@/app/types";
import { ALLOWED_CONTRACTS } from "../contracts";

const DEFAULT_LIMIT = 10;

type FetchJobsParams = {
  limit?: number;
  offset?: number;
  contract?: string;
  seniorities?: string[];
  search?: string;
  location?: string[];
  workplace?: string;
  niches?: string[];
};

export async function fetchJobCount({
  niches,
  contract,
  seniorities,
  location,
  workplace,
}: FetchJobsParams): Promise<{ count: number }> {
  const params = new URLSearchParams();

  if (contract && contract !== "all") {
    params.set("contracts", contract);
  } else {
    ALLOWED_CONTRACTS.forEach((c) => params.append("contracts", c));
  }

  if (workplace && workplace !== "all") {
    params.set("workplace", workplace);
  }

  seniorities?.forEach((s) => params.append("seniorities", s));
  location?.forEach((l) => params.append("location", l));
  niches?.forEach((n) => params.append("niches", n));

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/count?${params.toString()}`;
  console.log("fetchJobCount URL:", url);

  const res = await fetch(url, {
    next: { revalidate: 60 },
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

export async function fetchJobs({
  limit = DEFAULT_LIMIT,
  offset = 0,
  search,
  contract,
  seniorities,
  location,
  workplace,
  niches,
}: FetchJobsParams): Promise<JobsResponse> {
  const params = new URLSearchParams();

  params.set("limit", limit.toString());
  params.set("offset", offset.toString());

  if (search) params.set("search", search);

  if (contract && contract !== "all") {
    params.set("contracts", contract);
  } else {
    ALLOWED_CONTRACTS.forEach((c) => params.append("contracts", c));
  }

  if (workplace && workplace !== "all") {
    params.set("workplace", workplace);
  }

  seniorities?.forEach((s) => params.append("seniorities", s));
  location?.forEach((l) => params.append("location", l));
  niches?.forEach((n) => params.append("niches", n));

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${params.toString()}`;
  console.log("fetchJobs URL:", url);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    throw new Error(`API request failed (${res.status})`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error("API returned non-JSON response");
  }

  const data = await res.json();

  return data;
}
