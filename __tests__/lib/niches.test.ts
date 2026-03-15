import { nicheSeo, NicheSeoConfig } from "@/lib/niches";
import { Niche } from "@/app/types";

const REQUIRED_FIELDS: (keyof NicheSeoConfig)[] = [
  "slug",
  "title",
  "description",
  "heading",
  "intro",
];

const ALL_NICHES: Niche[] = [
  "communications",
  "creative-design",
  "education-training",
  "engineering",
  "electrical-installation",
  "finance-accounting",
  "healthcare-medical",
  "human-resources",
  "legal",
  "logistics-supply-chain",
  "marketing-advertising",
  "public-sector-non-profit",
  "real-estate",
  "sales-retail",
  "science-research",
  "technology-it",
  "skilled-trades",
  "other",
  "unknown",
];

describe("nicheSeo", () => {
  it("has an entry for every Niche type", () => {
    for (const niche of ALL_NICHES) {
      expect(nicheSeo[niche]).toBeDefined();
    }
  });

  it.each(ALL_NICHES)(
    "%s has all required fields with non-empty strings",
    (niche) => {
      const config = nicheSeo[niche];
      for (const field of REQUIRED_FIELDS) {
        expect(typeof config[field]).toBe("string");
        expect((config[field] as string).length).toBeGreaterThan(0);
      }
    }
  );

  it("all slugs are unique", () => {
    const slugs = ALL_NICHES.map((n) => nicheSeo[n].slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("technology-it maps to the it-vacatures slug", () => {
    expect(nicheSeo["technology-it"].slug).toBe("it-vacatures");
  });

  it("unknown maps to alle-vacatures slug", () => {
    expect(nicheSeo["unknown"].slug).toBe("alle-vacatures");
  });
});
