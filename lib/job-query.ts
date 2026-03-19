export function jobQuery({
  searchParams,
  niche,
  locations,
  limit,
  page,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  niche?: string;
  locations?: string;
  limit: number;
  page: number;
}) {
  return {
    limit,
    offset: (page - 1) * limit,
    search: searchParams.search,
    contract: searchParams.contract,
    seniorities: searchParams.seniorities
      ? [searchParams.seniorities]
      : undefined,
    workplace: searchParams.workplace,
    niches: niche
      ? [niche]
      : searchParams.niches
        ? [searchParams.niches]
        : undefined,
    locations: locations
      ? [locations]
      : searchParams.locations
        ? [searchParams.locations]
        : undefined,
  };
}
