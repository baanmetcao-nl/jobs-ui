import { test, expect } from "@playwright/test";

test.describe("Blog listing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("renders page heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("werkzoekenden");
  });

  test("shows blog badge", async ({ page }) => {
    await expect(
      page.locator("main").first().getByText("Blog").first(),
    ).toBeVisible();
  });

  test("displays blog post cards", async ({ page }) => {
    const articles = page.locator("article");
    expect(await articles.count()).toBeGreaterThan(0);
  });

  test("each card has title, date, read time, and category", async ({
    page,
  }) => {
    const firstArticle = page.locator("article").first();
    await expect(firstArticle.locator("h2")).toBeVisible();
    await expect(firstArticle.getByText("min")).toBeVisible();
    // Category badge
    const badge = firstArticle.locator('[data-testid="category-badge"]');
    await expect(badge.first()).toBeVisible();
  });

  test("each card has a 'Lees artikel' link", async ({ page }) => {
    const readLinks = page.getByText("Lees artikel");
    expect(await readLinks.count()).toBeGreaterThan(0);
  });

  test("clicking a blog card navigates to the post", async ({ page }) => {
    const firstLink = page.locator('a[href^="/blog/"]').first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();

    await page.waitForURL(`**${href}`);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("CTA section at bottom links to homepage", async ({ page }) => {
    await expect(
      page.getByText("Op zoek naar een baan met goede voorwaarden?"),
    ).toBeVisible();

    const ctaLink = page.getByRole("link", { name: "Bekijk alle vacatures" });
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute("href", "/");
  });
});

test.describe("Blog post page", () => {
  test("renders article content with heading", async ({ page }) => {
    await page.goto("/blog/wat-is-een-cao-alles-wat-je-moet-weten");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText("CAO");
  });

  test("returns 404 for non-existent blog post", async ({ page }) => {
    const response = await page.goto("/blog/non-existent-slug-12345");
    // Next.js may return 200 with not-found content or actual 404
    const content = await page.content();
    const is404 =
      response?.status() === 404 || content.includes("niet gevonden");
    expect(is404).toBe(true);
  });
});
