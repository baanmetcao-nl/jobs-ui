import { test, expect } from "@playwright/test";

test.describe("404 page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/this-page-definitely-does-not-exist");
  });

  test("displays 404 text", async ({ page }) => {
    await expect(page.getByText("404")).toBeVisible();
  });

  test("shows 'Pagina niet gevonden' heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Pagina niet gevonden");
  });

  test("shows helpful description", async ({ page }) => {
    await expect(
      page.getByText("De pagina die je zoekt bestaat niet"),
    ).toBeVisible();
  });

  test("has link back to homepage", async ({ page }) => {
    const homeLink = page.getByRole("link", { name: "Naar homepage" });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");
  });

  test("has link to browse all jobs", async ({ page }) => {
    const jobsLink = page.getByRole("link", {
      name: "Bekijk alle vacatures",
    });
    await expect(jobsLink).toBeVisible();
    await expect(jobsLink).toHaveAttribute("href", "/");
  });

  test("has link to contact page", async ({ page }) => {
    const contactLink = page.getByRole("link", { name: "Neem contact op" });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute("href", "/contact");
  });

  test("navigating home from 404 works", async ({ page }) => {
    await page.getByRole("link", { name: "Naar homepage" }).click();
    await page.waitForURL("/");
    await page.locator("h1").waitFor({ timeout: 15_000 });
    await expect(page.locator("h1")).toContainText("baan met CAO");
  });
});
