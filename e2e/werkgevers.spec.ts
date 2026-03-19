import { test, expect } from "@playwright/test";

test.describe("Employer landing page (/werkgevers)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/werkgevers");
  });

  test("renders hero heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("blijven");
  });

  test("displays key stats", async ({ page }) => {
    await expect(page.getByText("2.000+")).toBeVisible();
    await expect(page.getByText("50K+")).toBeVisible();
    await expect(page.getByText("85%")).toBeVisible();
    await expect(page.getByText("60 dagen", { exact: true })).toBeVisible();
  });

  test("shows 'Plaats een vacature' CTA", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Plaats een vacature" }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/plaats-vacature");
  });

  test("shows pricing section with three plans", async ({ page }) => {
    await expect(
      page.getByText("Transparante tarieven, geen verrassingen"),
    ).toBeVisible();

    // Verify all three pricing plans exist
    const planCards = page.locator('#prijzen [data-testid="pricing-card"]');
    expect(await planCards.count()).toBe(3);
  });

  test("popular plan is marked", async ({ page }) => {
    await expect(page.getByText("Populair")).toBeVisible();
  });

  test("pricing plan links include plan ID in URL", async ({ page }) => {
    const planLinks = page.locator('a[href*="/plaats-vacature?plan="]');
    expect(await planLinks.count()).toBe(3);
  });

  test("FAQ section is rendered", async ({ page }) => {
    await expect(page.getByText("Veelgestelde vragen")).toBeVisible();
    await expect(
      page.getByText("Moet mijn bedrijf een CAO hebben?"),
    ).toBeVisible();
    await expect(
      page.getByText("Hoe snel is mijn vacature online?"),
    ).toBeVisible();
    await expect(
      page.getByText("Kan ik mijn vacature tussentijds aanpassen?"),
    ).toBeVisible();
  });

  test("3-step process section is visible", async ({ page }) => {
    await expect(
      page.getByText("In 3 stappen een vacature online"),
    ).toBeVisible();
    await expect(page.getByText("Maak een account")).toBeVisible();
    await expect(page.getByText("Plaats de vacature")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Ontvang sollicitaties" }),
    ).toBeVisible();
  });

  test("features section lists all benefits", async ({ page }) => {
    await expect(page.getByText("Direct online")).toBeVisible();
    await expect(page.getByText("Real-time statistieken")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Bedrijfsprofiel" }),
    ).toBeVisible();
    await expect(page.getByText("60 dagen zichtbaar")).toBeVisible();
    await expect(page.getByText("Eenvoudig verlengen")).toBeVisible();
  });

  test("structured data scripts are present", async ({ page }) => {
    const faqSchema = page.locator('script[type="application/ld+json"]');
    const schemas = await faqSchema.allTextContents();
    const hasFaq = schemas.some((s) => s.includes("FAQPage"));
    const hasOfferCatalog = schemas.some((s) => s.includes("OfferCatalog"));

    expect(hasFaq).toBe(true);
    expect(hasOfferCatalog).toBe(true);
  });

  test("anchor link #prijzen scrolls to pricing", async ({ page }) => {
    const pricingLink = page
      .getByRole("link", { name: "Bekijk tarieven" })
      .first();
    await expect(pricingLink).toHaveAttribute("href", "#prijzen");
  });
});
