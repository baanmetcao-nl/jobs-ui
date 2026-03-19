import { jobQuery } from "@/lib/job-query";

describe("jobQuery", () => {
  it("calculates offset from page and limit", () => {
    const result = jobQuery({ searchParams: {}, limit: 10, page: 1 });
    expect(result.offset).toBe(0);

    const page3 = jobQuery({ searchParams: {}, limit: 10, page: 3 });
    expect(page3.offset).toBe(20);
  });

  it("passes through limit", () => {
    const result = jobQuery({ searchParams: {}, limit: 25, page: 1 });
    expect(result.limit).toBe(25);
  });

  it("passes through search, contract and workplace from searchParams", () => {
    const result = jobQuery({
      searchParams: {
        search: "developer",
        contract: "permanent",
        workplace: "remote",
      },
      limit: 10,
      page: 1,
    });
    expect(result.search).toBe("developer");
    expect(result.contract).toBe("permanent");
    expect(result.workplace).toBe("remote");
  });

  it("wraps seniorities from searchParams in an array", () => {
    const result = jobQuery({
      searchParams: { seniorities: "senior" },
      limit: 10,
      page: 1,
    });
    expect(result.seniorities).toEqual(["senior"]);
  });

  it("returns undefined seniorities when not in searchParams", () => {
    const result = jobQuery({ searchParams: {}, limit: 10, page: 1 });
    expect(result.seniorities).toBeUndefined();
  });

  it("niche argument takes priority over searchParams.niches", () => {
    const result = jobQuery({
      searchParams: { niches: "marketing-advertising" },
      niche: "technology-it",
      limit: 10,
      page: 1,
    });
    expect(result.niches).toEqual(["technology-it"]);
  });

  it("falls back to searchParams.niches when niche argument is absent", () => {
    const result = jobQuery({
      searchParams: { niches: "marketing-advertising" },
      limit: 10,
      page: 1,
    });
    expect(result.niches).toEqual(["marketing-advertising"]);
  });

  it("returns undefined niches when neither niche nor searchParams.niches is set", () => {
    const result = jobQuery({ searchParams: {}, limit: 10, page: 1 });
    expect(result.niches).toBeUndefined();
  });

  it("locations argument takes priority over searchParams.locations", () => {
    const result = jobQuery({
      searchParams: { locations: "rotterdam" },
      locations: "amsterdam",
      limit: 10,
      page: 1,
    });
    expect(result.locations).toEqual(["amsterdam"]);
  });

  it("falls back to searchParams.locations when locations argument is absent", () => {
    const result = jobQuery({
      searchParams: { locations: "rotterdam" },
      limit: 10,
      page: 1,
    });
    expect(result.locations).toEqual(["rotterdam"]);
  });

  it("returns undefined locations when neither argument nor searchParam is set", () => {
    const result = jobQuery({ searchParams: {}, limit: 10, page: 1 });
    expect(result.locations).toBeUndefined();
  });
});
