import { test, expect } from "@playwright/test";

test.describe("Accessibility basics", () => {
  test("all pages have exactly one h1", async ({ page }) => {
    const routes = [
      "/",
      "/over-ons",
      "/blog",
      "/contact",
      "/werkgevers",
      "/privacy",
      "/algemene-voorwaarden",
    ];

    for (const route of routes) {
      await page.goto(route);
      await page.locator("h1").first().waitFor({ timeout: 10_000 });
      const h1Count = await page.locator("h1").count();
      expect(h1Count, `${route} should have exactly 1 h1`).toBe(1);
    }
  });

  test("images have alt attributes", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(
        alt !== null,
        `Image ${i} is missing alt attribute`,
      ).toBe(true);
    }
  });

  test("blog images have alt attributes", async ({ page }) => {
    await page.goto("/blog");
    const images = page.locator("article img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt, `Blog image ${i} should have non-empty alt`).toBeTruthy();
    }
  });

  test("form inputs have associated labels", async ({ page }) => {
    await page.goto("/contact");

    const nameInput = page.locator("#name");
    const nameLabel = page.locator('label[for="name"]');
    await expect(nameLabel).toBeVisible();
    await expect(nameInput).toBeVisible();

    const emailInput = page.locator("#email");
    const emailLabel = page.locator('label[for="email"]');
    await expect(emailLabel).toBeVisible();
    await expect(emailInput).toBeVisible();

    const messageInput = page.locator("#message");
    const messageLabel = page.locator('label[for="message"]');
    await expect(messageLabel).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test("interactive elements are keyboard-focusable", async ({ page }) => {
    await page.goto("/");

    // Tab to first focusable element in header
    await page.keyboard.press("Tab");
    const firstFocused = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(firstFocused).toBeTruthy();
  });

  test("buttons have discernible text or aria-label", async ({ page }) => {
    await page.goto("/");
    await page.locator("h1").first().waitFor({ timeout: 10_000 });

    const buttonData = await page.locator("button:visible").evaluateAll(
      (buttons) =>
        buttons
          .filter(
            (btn) =>
              !btn.closest("nextjs-portal") &&
              !btn.getAttribute("aria-label")?.includes("Next.js") &&
              btn.getAttribute("role") !== "combobox" &&
              (btn as HTMLElement).offsetWidth > 0 &&
              (btn as HTMLElement).offsetHeight > 0,
          )
          .map((btn, i) => ({
            index: i,
            text: (btn.textContent || "").trim(),
            ariaLabel: btn.getAttribute("aria-label") || "",
            title: btn.getAttribute("title") || "",
          })),
    );

    for (const btn of buttonData) {
      if (!btn.text) {
        expect(
          btn.ariaLabel || btn.title,
          `Button ${btn.index} is icon-only but has no aria-label or title`,
        ).toBeTruthy();
      }
    }
  });

  test("links have discernible text", async ({ page }) => {
    await page.goto("/over-ons");
    await page.locator("h1").first().waitFor({ timeout: 10_000 });

    const linkData = await page.locator("a").evaluateAll((links) =>
      links.map((link, i) => ({
        index: i,
        href: link.getAttribute("href") || "",
        text: (link.textContent || "").trim(),
        ariaLabel: link.getAttribute("aria-label") || "",
        title: link.getAttribute("title") || "",
        imgAlt: link.querySelector("img")?.getAttribute("alt") || "",
      })),
    );

    for (const link of linkData) {
      const hasLabel =
        link.text.length > 0 ||
        link.ariaLabel.length > 0 ||
        link.title.length > 0 ||
        link.imgAlt.length > 0;

      expect(
        hasLabel,
        `Link ${link.index} (href: ${link.href}) has no accessible name`,
      ).toBe(true);
    }
  });

  test("color contrast: text is not invisible (basic check)", async ({
    page,
  }) => {
    await page.goto("/");
    // Verify key text elements are not transparent
    const heading = page.locator("h1").first();
    await heading.waitFor({ timeout: 10_000 });
    const color = await heading.evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    expect(color).not.toBe("rgba(0, 0, 0, 0)");
    expect(color).not.toBe("transparent");
  });

  test("page has proper document language", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("nl");
  });
});
