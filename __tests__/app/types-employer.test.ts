import {
  JOB_POSTING_STEPS,
  STEP_SLUGS,
  PRICING_PLANS,
  JOB_STATUS_LABELS,
  EXTEND_PRICE,
} from "@/app/types-employer";

describe("JOB_POSTING_STEPS", () => {
  it("contains exactly 5 steps", () => {
    expect(JOB_POSTING_STEPS).toHaveLength(5);
  });

  it("steps are numbered 1 through 5", () => {
    const ids = JOB_POSTING_STEPS.map((s) => s.id);
    expect(ids).toEqual([1, 2, 3, 4, 5]);
  });

  it("each step has a title, description and slug", () => {
    for (const step of JOB_POSTING_STEPS) {
      expect(typeof step.title).toBe("string");
      expect(step.title.length).toBeGreaterThan(0);
      expect(typeof step.description).toBe("string");
      expect(step.description.length).toBeGreaterThan(0);
      expect(typeof step.slug).toBe("string");
      expect(step.slug.length).toBeGreaterThan(0);
    }
  });
});

describe("STEP_SLUGS", () => {
  it("maps every slug back to its step number", () => {
    expect(STEP_SLUGS.vacature).toBe(1);
    expect(STEP_SLUGS.bedrijf).toBe(2);
    expect(STEP_SLUGS.preview).toBe(3);
    expect(STEP_SLUGS.prijzen).toBe(4);
    expect(STEP_SLUGS.account).toBe(5);
  });

  it("is consistent with JOB_POSTING_STEPS slugs", () => {
    for (const step of JOB_POSTING_STEPS) {
      expect(STEP_SLUGS[step.slug as keyof typeof STEP_SLUGS]).toBe(step.id);
    }
  });
});

describe("PRICING_PLANS", () => {
  it("has exactly 3 plans", () => {
    expect(PRICING_PLANS).toHaveLength(3);
  });

  it("plan ids are single, bundle3, bundle10", () => {
    const ids = PRICING_PLANS.map((p) => p.id);
    expect(ids).toEqual(["single", "bundle3", "bundle10"]);
  });

  it("each plan has a positive price and jobCount", () => {
    for (const plan of PRICING_PLANS) {
      expect(plan.price).toBeGreaterThan(0);
      expect(plan.jobCount).toBeGreaterThan(0);
    }
  });

  it("bundle plans are cheaper per job than the single plan", () => {
    const single = PRICING_PLANS.find((p) => p.id === "single")!;
    const bundle3 = PRICING_PLANS.find((p) => p.id === "bundle3")!;
    const bundle10 = PRICING_PLANS.find((p) => p.id === "bundle10")!;

    const singleCost = single.price / single.jobCount;
    expect(bundle3.price / bundle3.jobCount).toBeLessThan(singleCost);
    expect(bundle10.price / bundle10.jobCount).toBeLessThan(singleCost);
  });

  it("each plan lists at least one feature", () => {
    for (const plan of PRICING_PLANS) {
      expect(plan.features.length).toBeGreaterThan(0);
    }
  });

  it("bundle3 is marked as popular", () => {
    const bundle3 = PRICING_PLANS.find((p) => p.id === "bundle3")!;
    expect(bundle3.popular).toBe(true);
  });

  it("single plan is not marked as popular", () => {
    const single = PRICING_PLANS.find((p) => p.id === "single")!;
    expect(single.popular).toBeFalsy();
  });
});

describe("JOB_STATUS_LABELS", () => {
  it("has a label for every status", () => {
    expect(JOB_STATUS_LABELS.active).toBe("Actief");
    expect(JOB_STATUS_LABELS.draft).toBe("Concept");
    expect(JOB_STATUS_LABELS.expired).toBe("Verlopen");
    expect(JOB_STATUS_LABELS.paused).toBe("Gepauzeerd");
  });
});

describe("EXTEND_PRICE", () => {
  it("is a positive number", () => {
    expect(EXTEND_PRICE).toBeGreaterThan(0);
  });

  it("equals 99", () => {
    expect(EXTEND_PRICE).toBe(99);
  });
});
