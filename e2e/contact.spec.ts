import { test, expect } from "@playwright/test";

/**
 * All contact form tests mock the /api/contact endpoint via page.route()
 * so no real emails are ever sent.
 */
test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("renders page heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("contact");
  });

  test("displays all required form fields", async ({ page }) => {
    await expect(page.getByLabel("Naam *")).toBeVisible();
    await expect(page.getByLabel("E-mailadres *")).toBeVisible();
    await expect(page.getByLabel("Onderwerp")).toBeVisible();
    await expect(page.getByLabel("Bericht *")).toBeVisible();
  });

  test("submit button is present", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Verstuur bericht" }),
    ).toBeVisible();
  });

  test("required fields prevent empty submission via HTML validation", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Verstuur bericht" }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("honeypot field is hidden from view", async ({ page }) => {
    const honeypot = page.locator('input[name="company"]');
    await expect(honeypot).toBeHidden();
  });

  test("shows success message on valid submission", async ({ page }) => {
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByLabel("Naam *").fill("Test Gebruiker");
    await page.getByLabel("E-mailadres *").fill("test@example.com");
    await page.getByLabel("Onderwerp").fill("Test onderwerp");
    await page.getByLabel("Bericht *").fill("Dit is een testbericht.");

    await page.getByRole("button", { name: "Verstuur bericht" }).click();

    await expect(
      page.getByText("Je bericht is succesvol verzonden!"),
    ).toBeVisible();
  });

  test("shows error message on API failure", async ({ page }) => {
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Er ging iets mis. Probeer het later opnieuw.",
        }),
      });
    });

    await page.getByLabel("Naam *").fill("Test Gebruiker");
    await page.getByLabel("E-mailadres *").fill("test@example.com");
    await page.getByLabel("Bericht *").fill("Testbericht");

    await page.getByRole("button", { name: "Verstuur bericht" }).click();

    await expect(
      page.getByText("Er ging iets mis. Probeer het later opnieuw."),
    ).toBeVisible();
  });

  test("button shows loading state during submission", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByLabel("Naam *").fill("Test Gebruiker");
    await page.getByLabel("E-mailadres *").fill("test@example.com");
    await page.getByLabel("Bericht *").fill("Testbericht");

    await page.getByRole("button", { name: "Verstuur bericht" }).click();

    await expect(page.getByText("Versturen...")).toBeVisible();
  });

  test("form fields are disabled during submission", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByLabel("Naam *").fill("Test Gebruiker");
    await page.getByLabel("E-mailadres *").fill("test@example.com");
    await page.getByLabel("Bericht *").fill("Testbericht");

    await page.getByRole("button", { name: "Verstuur bericht" }).click();

    await expect(page.getByLabel("Naam *")).toBeDisabled();
    await expect(page.getByLabel("E-mailadres *")).toBeDisabled();
    await expect(page.getByLabel("Bericht *")).toBeDisabled();
  });

  test("form resets after successful submission", async ({ page }) => {
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByLabel("Naam *").fill("Test Gebruiker");
    await page.getByLabel("E-mailadres *").fill("test@example.com");
    await page.getByLabel("Bericht *").fill("Testbericht");

    await page.getByRole("button", { name: "Verstuur bericht" }).click();
    await expect(
      page.getByText("Je bericht is succesvol verzonden!"),
    ).toBeVisible();

    await expect(page.getByLabel("Naam *")).toHaveValue("");
    await expect(page.getByLabel("E-mailadres *")).toHaveValue("");
    await expect(page.getByLabel("Bericht *")).toHaveValue("");
  });
});
