export function jobQuery({
  searchParams,
  niche,
  location,
  limit,
  page,
}: {
  searchParams: any;
  niche?: string;
  location?: string;
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
    location: location
      ? [location]
      : searchParams.location
        ? [searchParams.location]
        : undefined,
  };
}
