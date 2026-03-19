import { test, expect } from "@playwright/test";

// These tests only run in the mobile-chrome project
test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu is visible on mobile", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.locator("header button").filter({
      has: page.locator("svg"),
    });
    await expect(menuButton.last()).toBeVisible();
  });

  test("desktop nav is hidden on mobile", async ({ page }) => {
    await page.goto("/");
    const desktopNav = page.locator("header nav");
    await expect(desktopNav).toBeHidden();
  });

  test("mobile menu opens and shows all links", async ({ page }) => {
    await page.goto("/");

    // Click hamburger menu
    const menuButton = page.locator("header button").filter({
      has: page.locator("svg"),
    });
    await menuButton.last().click();

    // Check mobile menu links
    const mobileMenu = page.locator("header .md\\:hidden").last();
    await expect(mobileMenu.getByText("Alle vacatures")).toBeVisible();
    await expect(mobileMenu.getByText("Over ons")).toBeVisible();
    await expect(mobileMenu.getByText("Blog")).toBeVisible();
    await expect(mobileMenu.getByText("Contact")).toBeVisible();
  });

  test("mobile menu shows employer section", async ({ page }) => {
    await page.goto("/");

    const menuButton = page.locator("header button").filter({
      has: page.locator("svg"),
    });
    await menuButton.last().click();

    const mobileMenu = page.locator("header .md\\:hidden").last();
    await expect(mobileMenu.getByText("Werkgevers")).toBeVisible();
    await expect(mobileMenu.getByText("Waarom Baan met CAO")).toBeVisible();
    await expect(mobileMenu.getByText("Plaats vacature").first()).toBeVisible();
    await expect(mobileMenu.getByText("Inloggen")).toBeVisible();
  });

  test("mobile menu closes after clicking a link", async ({ page }) => {
    await page.goto("/");
    await page.locator("h1").first().waitFor({ timeout: 15_000 });
    await page.waitForLoadState("networkidle");

    const menuButton = page.getByRole("button", { name: /Menu openen/i });
    await menuButton.click();

    // Wait for the mobile menu to appear and be stable
    const contactLink = page.locator("header").getByRole("link", { name: "Contact" });
    await contactLink.waitFor({ state: "visible" });

    const blogLink = page.locator("header").getByRole("link", { name: "Blog", exact: true });
    await blogLink.click();

    await page.waitForURL("/blog");
    // Menu should be closed after navigation
    await expect(contactLink).toBeHidden();
  });

  test("Plaats vacature CTA button is hidden on mobile", async ({ page }) => {
    await page.goto("/");
    const ctaButton = page.locator(
      "header .hidden.md\\:inline-flex",
    );
    await expect(ctaButton).toBeHidden();
  });
});

test.describe("Mobile page rendering", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("homepage renders without horizontal scroll", async ({ page }) => {
    await page.goto("/");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("blog page cards stack vertically on mobile", async ({ page }) => {
    await page.goto("/blog");
    const articles = page.locator("article");
    expect(await articles.count()).toBeGreaterThan(0);

    // First two articles should have similar x positions (stacked)
    const firstBox = await articles.nth(0).boundingBox();
    const secondBox = await articles.nth(1).boundingBox();

    if (firstBox && secondBox) {
      expect(firstBox.x).toBeCloseTo(secondBox.x, 0);
    }
  });

  test("contact form is usable on mobile", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByLabel("Naam *")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Verstuur bericht" }),
    ).toBeVisible();

    // Fields should be full width
    const nameInput = page.getByLabel("Naam *");
    const nameBox = await nameInput.boundingBox();
    if (nameBox) {
      expect(nameBox.width).toBeGreaterThan(200);
    }
  });

  test("werkgevers pricing cards stack on mobile", async ({ page }) => {
    await page.goto("/werkgevers");
    const pricingSection = page.locator("#prijzen");
    await pricingSection.scrollIntoViewIfNeeded();

    // Cards should be full-width stacked
    const cards = pricingSection.locator('[data-testid="pricing-card"]');
    const firstCard = await cards.nth(0).boundingBox();
    const secondCard = await cards.nth(1).boundingBox();

    if (firstCard && secondCard) {
      // Stacked = second card is below first card
      expect(secondCard.y).toBeGreaterThan(firstCard.y);
    }
  });
});
