import { test, expect } from "@playwright/test";

test.describe("About page (/over-ons)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/over-ons");
  });

  test("renders page heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("CAO");
  });

  test("displays key stats section", async ({ page }) => {
    await expect(page.getByText("2.000+", { exact: true })).toBeVisible();
    await expect(page.getByText("100%", { exact: true })).toBeVisible();
    await expect(page.getByText("Gratis", { exact: true })).toBeVisible();
    await expect(page.getByText("Dagelijks", { exact: true })).toBeVisible();
  });

  test("shows 'Waarom wij dit doen' section", async ({ page }) => {
    await expect(page.getByText("Waarom wij dit doen")).toBeVisible();
  });

  test("shows 'Onze principes' with three pillars", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Onze principes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "No-nonsense" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Transparant" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Altijd actueel" })).toBeVisible();
  });

  test("shows CAO explanation section", async ({ page }) => {
    await expect(
      page.getByText("Wat is een CAO eigenlijk?"),
    ).toBeVisible();
  });

  test("CTA links to homepage", async ({ page }) => {
    const cta = page
      .getByRole("link", { name: "Bekijk alle vacatures" })
      .first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/");
  });
});

test.describe("Privacy page (/privacy)", () => {
  test("renders heading", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1")).toContainText("Privacybeleid");
  });

  test("shows last updated date", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByText("Laatst bijgewerkt")).toBeVisible();
  });
});

test.describe("Terms page (/algemene-voorwaarden)", () => {
  test("renders heading", async ({ page }) => {
    await page.goto("/algemene-voorwaarden");
    await expect(page.locator("h1")).toContainText("Algemene");
    await expect(page.locator("h1")).toContainText("Voorwaarden");
  });

  test("shows last updated date", async ({ page }) => {
    await page.goto("/algemene-voorwaarden");
    await expect(page.getByText("Laatst bijgewerkt")).toBeVisible();
  });
});
