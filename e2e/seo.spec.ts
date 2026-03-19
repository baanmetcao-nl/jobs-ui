import { test, expect } from "@playwright/test";

test.describe("SEO & meta tags", () => {
  test("homepage has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(
      /Baan met CAO - Vacatures met eerlijke arbeidsvoorwaarden/,
    );
  });

  test("homepage has meta description", async ({ page }) => {
    await page.goto("/");
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
      "content",
      /vacatures.*CAO/i,
    );
  });

  test("blog page has correct title", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog.*Baan met CAO/);
  });

  test("about page has correct title", async ({ page }) => {
    await page.goto("/over-ons");
    await expect(page).toHaveTitle(/Over ons/);
  });

  test("privacy page has correct title", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page).toHaveTitle(/Privacybeleid/);
  });

  test("terms page has correct title", async ({ page }) => {
    await page.goto("/algemene-voorwaarden");
    await expect(page).toHaveTitle(/Algemene Voorwaarden/);
  });

  test("contact page has proper heading structure", async ({ page }) => {
    await page.goto("/contact");
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("html lang attribute is set to nl", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "nl");
  });

  test("canonical URL is set on homepage", async ({ page }) => {
    await page.goto("/");
    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toContain("/");
  });

  test("OpenGraph tags present on homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website",
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "nl_NL",
    );
  });

  test("Twitter card tags present on homepage", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('meta[name="twitter:card"]'),
    ).toHaveAttribute("content", "summary_large_image");
  });

  test("Organization structured data in layout", async ({ page }) => {
    await page.goto("/");
    const scripts = page.locator('script[type="application/ld+json"]');
    const allText = await scripts.allTextContents();
    const hasOrg = allText.some((s) => s.includes('"Organization"'));
    const hasWebSite = allText.some((s) => s.includes('"WebSite"'));

    expect(hasOrg).toBe(true);
    expect(hasWebSite).toBe(true);
  });

  test("robots meta allows indexing", async ({ page }) => {
    await page.goto("/");
    const robots = page.locator('meta[name="robots"]');
    // If present, should contain index/follow
    if ((await robots.count()) > 0) {
      const content = await robots.getAttribute("content");
      expect(content).toContain("index");
      expect(content).toContain("follow");
    }
  });
});

test.describe("Redirects", () => {
  test("/jobs redirects to /vacatures", async ({ page }) => {
    const response = await page.goto("/jobs");
    // Should be redirected (301/308 -> 200 final)
    expect(page.url()).toContain("/vacatures");
  });
});
