import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test.skip(
    ({ viewport }) => (viewport?.width ?? 1280) < 768,
    "Desktop-only tests",
  );

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows logo linking to homepage", async ({ page }) => {
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();

    const img = logo.locator("img");
    await expect(img).toHaveAttribute("alt", "Job Board Logo");
  });

  test("desktop nav contains main links", async ({ page }) => {
    const nav = page.locator("header nav");
    await expect(nav.getByText("Alle vacatures")).toBeVisible();
    await expect(nav.getByText("Over ons")).toBeVisible();
    await expect(nav.getByText("Blog")).toBeVisible();
  });

  test("Werkgevers dropdown opens and shows options", async ({ page }) => {
    const trigger = page.locator("header").getByText("Werkgevers");
    await trigger.click();

    await expect(page.getByText("Waarom Baan met CAO")).toBeVisible();
    await expect(page.getByText("Plaats vacature").first()).toBeVisible();
    await expect(page.getByText("Inloggen")).toBeVisible();
  });

  test("Werkgevers dropdown closes on outside click", async ({ page }) => {
    const trigger = page.locator("header").getByText("Werkgevers");
    await trigger.click();
    await expect(page.getByText("Waarom Baan met CAO")).toBeVisible();

    await page.locator("body").click({ position: { x: 10, y: 10 } });
    await expect(page.getByText("Waarom Baan met CAO")).toBeHidden();
  });

  test("Plaats vacature CTA button is visible", async ({ page }) => {
    const ctaButton = page
      .locator("header")
      .getByRole("link", { name: "Plaats vacature" })
      .first();
    await expect(ctaButton).toBeVisible();
  });

  test("navigating from nav links works", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    await page.locator("header nav").getByText("Over ons").click();
    await expect(page).toHaveURL(/\/over-ons/);
    await expect(page.locator("h1")).toContainText("CAO");

    await page.locator("header nav").getByText("Blog").click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator("h1")).toContainText("werkzoekenden");
  });
});

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/over-ons");
  });

  test("displays copyright text", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toContainText("2026 Baan met CAO");
  });

  test("contains legal and info links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByText("Algemene voorwaarden")).toBeVisible();
    await expect(footer.getByText("Privacybeleid")).toBeVisible();
    await expect(footer.getByText("Blog")).toBeVisible();
    await expect(footer.getByText("Contact")).toBeVisible();
  });

  test("displays job category links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByText("Vacature categorieën")).toBeVisible();

    const categoryLinks = footer.locator('a[href^="/vacatures/"]');
    expect(await categoryLinks.count()).toBeGreaterThan(0);
  });

  test("footer links navigate correctly", async ({ page }) => {
    await page.locator("footer").getByText("Privacybeleid").click();
    await page.waitForURL("/privacy");
    await expect(page.locator("h1")).toContainText("Privacybeleid");
  });
});

test.describe("Search in navbar", () => {
  test.skip(
    ({ viewport }) => (viewport?.width ?? 1280) < 768,
    "Desktop-only tests",
  );

  test("search bar appears on non-homepage routes", async ({ page }) => {
    await page.goto("/over-ons");
    const searchInput = page
      .locator("header")
      .getByPlaceholder("Zoek vacatures...");
    await expect(searchInput).toBeVisible();
  });

  test("search bar is hidden on homepage", async ({ page }) => {
    await page.goto("/");
    const searchInput = page
      .locator("header")
      .getByPlaceholder("Zoek vacatures...");
    await expect(searchInput).toBeHidden();
  });

  test("navbar search redirects to homepage with query", async ({ page }) => {
    await page.goto("/blog");
    const searchInput = page
      .locator("header")
      .getByPlaceholder("Zoek vacatures...");
    await searchInput.fill("developer");
    await searchInput.press("Enter");

    await page.waitForURL(/search=developer/);
    expect(page.url()).toContain("search=developer");
  });
});
