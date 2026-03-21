import { test, expect } from "@playwright/test";
import { MOCK_JOBS, MOCK_TOTAL_COUNT } from "./mocks/data";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("h1").waitFor({ timeout: 15_000 });
  });

  test("renders the main heading with brand text", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("baan met CAO");
  });

  test("displays total job count from mock data", async ({ page }) => {
    const formatted = MOCK_TOTAL_COUNT.toLocaleString("nl-NL");
    await expect(page.locator("main").first()).toContainText(formatted);
  });

  test("renders mock job titles", async ({ page }) => {
    for (const job of MOCK_JOBS) {
      await expect(page.getByText(job.title).first()).toBeVisible();
    }
  });

  test("job cards show company names", async ({ page }) => {
    for (const job of MOCK_JOBS) {
      await expect(page.getByText(job.company.name).first()).toBeVisible();
    }
  });

  test("job cards show city", async ({ page }) => {
    for (const job of MOCK_JOBS) {
      await expect(page.getByText(job.city).first()).toBeVisible();
    }
  });

  test("displays filter section", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Zoek op functie, bedrijf of vaardigheden..."),
    ).toBeVisible();
  });

  test("search filters update URL params", async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      "Zoek op functie, bedrijf of vaardigheden...",
    );
    await searchInput.fill("developer");
    await searchInput.press("Enter");

    await page.waitForURL(/search=developer/);
    expect(page.url()).toContain("search=developer");
  });

  test("search returns filtered mock results", async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      "Zoek op functie, bedrijf of vaardigheden...",
    );
    await searchInput.fill("developer");
    await searchInput.press("Enter");

    await page.waitForURL(/search=developer/);
    await expect(page.getByText("Senior Software Developer")).toBeVisible();
  });

  test("page=2 loads with offset", async ({ page }) => {
    await page.goto("/?page=2");
    await page.locator("h1").waitFor({ timeout: 15_000 });
    await expect(page.locator("main").first()).toBeVisible();
    expect(page.url()).toContain("page=2");
  });
});
