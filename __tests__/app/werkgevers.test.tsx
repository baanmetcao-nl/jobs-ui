import React from "react";
import { render, screen } from "@testing-library/react";
import WerkgeversPage from "@/app/werkgevers/page";
import { PRICING_PLANS } from "@/app/types-employer";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("WerkgeversPage", () => {
  beforeEach(() => {
    render(<WerkgeversPage />);
  });

  it("renders the hero heading", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Vind medewerkers die blijven/,
    );
  });

  it("renders a CTA link to /plaats-vacature", () => {
    const ctaLinks = screen.getAllByRole("link", {
      name: /Plaats een vacature/,
    });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    ctaLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/plaats-vacature");
    });
  });

  it("renders the pricing section with an anchor id", () => {
    const section = document.getElementById("prijzen");
    expect(section).toBeInTheDocument();
  });

  describe("pricing plans", () => {
    it("renders all plan names", () => {
      for (const plan of PRICING_PLANS) {
        expect(screen.getByText(plan.name)).toBeInTheDocument();
      }
    });

    it("renders prices for each plan", () => {
      for (const plan of PRICING_PLANS) {
        expect(screen.getByText(`€${plan.price}`)).toBeInTheDocument();
      }
    });

    it("renders features for each plan", () => {
      const allFeatures = PRICING_PLANS.flatMap((p) => p.features);
      const uniqueFeatures = [...new Set(allFeatures)];
      for (const feature of uniqueFeatures) {
        const count = allFeatures.filter((f) => f === feature).length;
        expect(screen.getAllByText(feature)).toHaveLength(count);
      }
    });

    it("shows 'Populair' badge only for the popular plan", () => {
      const badges = screen.getAllByText("Populair");
      expect(badges).toHaveLength(1);
    });

    it("renders savings text for plans with savings", () => {
      const plansWithSavings = PRICING_PLANS.filter((p) => p.savings);
      for (const plan of plansWithSavings) {
        expect(
          screen.getByText(`Bespaar €${plan.savings}`),
        ).toBeInTheDocument();
      }
    });

    it("does not render savings text for plans without savings", () => {
      const plansWithoutSavings = PRICING_PLANS.filter((p) => !p.savings);
      expect(plansWithoutSavings.length).toBeGreaterThan(0);
      for (const plan of plansWithoutSavings) {
        expect(
          screen.queryByText(new RegExp(`Bespaar.*€${plan.price}`)),
        ).not.toBeInTheDocument();
      }
    });

    it("links each plan to /plaats-vacature with the plan id", () => {
      const planLinks = screen
        .getAllByRole("link")
        .filter((a) =>
          a.getAttribute("href")?.startsWith("/plaats-vacature?plan="),
        );
      expect(planLinks).toHaveLength(PRICING_PLANS.length);
      for (const plan of PRICING_PLANS) {
        expect(
          planLinks.some(
            (a) =>
              a.getAttribute("href") === `/plaats-vacature?plan=${plan.id}`,
          ),
        ).toBe(true);
      }
    });
  });

  describe("FAQ section", () => {
    it("renders all FAQ questions", () => {
      const questions = [
        "Moet mijn bedrijf een CAO hebben?",
        "Hoe snel is mijn vacature online?",
        "Kan ik mijn vacature tussentijds aanpassen?",
        "Wat als mijn vacature na 60 dagen niet is ingevuld?",
        "Kan ik een factuur krijgen?",
      ];
      for (const q of questions) {
        expect(screen.getByText(q)).toBeInTheDocument();
      }
    });
  });

  describe("structured data", () => {
    it("renders FAQ JSON-LD script", () => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      const jsonContents = Array.from(scripts).map((s) => s.innerHTML);
      const faqScript = jsonContents.find((c) => c.includes('"FAQPage"'));
      expect(faqScript).toBeDefined();

      const parsed = JSON.parse(faqScript!);
      expect(parsed["@type"]).toBe("FAQPage");
      expect(parsed.mainEntity).toHaveLength(5);
    });

    it("renders pricing JSON-LD script with all plans", () => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      const jsonContents = Array.from(scripts).map((s) => s.innerHTML);
      const pricingScript = jsonContents.find((c) =>
        c.includes('"OfferCatalog"'),
      );
      expect(pricingScript).toBeDefined();

      const parsed = JSON.parse(pricingScript!);
      expect(parsed["@type"]).toBe("OfferCatalog");
      expect(parsed.itemListElement).toHaveLength(PRICING_PLANS.length);

      for (const plan of PRICING_PLANS) {
        const offer = parsed.itemListElement.find(
          (o: { name: string }) => o.name === plan.name,
        );
        expect(offer).toBeDefined();
        expect(offer.price).toBe(plan.price);
        expect(offer.priceCurrency).toBe("EUR");
      }
    });
  });

  describe("navigation links", () => {
    it("links to /contact", () => {
      const contactLink = screen.getByRole("link", {
        name: /Neem contact op/,
      });
      expect(contactLink).toHaveAttribute("href", "/contact");
    });

    it("links to #prijzen for tariff section", () => {
      const link = screen.getByRole("link", { name: /Bekijk tarieven/ });
      expect(link).toHaveAttribute("href", "#prijzen");
    });
  });
});
