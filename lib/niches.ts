import { Niche } from "@/app/types";

export type NicheSeoConfig = {
  slug: string;
  title: string;
  description: string;
  heading: string;
};

export const nicheSeo: Record<Niche, NicheSeoConfig> = {
  communications: {
    slug: "communicatie-vacatures",
    title: "Communicatie Vacatures | PR, Corporate & Interne Communicatie",
    description:
      "Bekijk communicatie vacatures in PR, corporate communicatie, woordvoering en interne communicatie.",
    heading: "Communicatie Vacatures",
  },

  "creative-design": {
    slug: "design-vacatures",
    title: "Design Vacatures | UX, Grafisch & Creatieve Banen",
    description:
      "Vind design vacatures in UX/UI, grafisch ontwerp, branding en multimedia.",
    heading: "Design Vacatures",
  },

  "education-training": {
    slug: "onderwijs-vacatures",
    title: "Onderwijs Vacatures | Docent & Trainer Banen",
    description:
      "Bekijk vacatures in het onderwijs voor docenten, trainers en opleidingsspecialisten.",
    heading: "Onderwijs Vacatures",
  },

  engineering: {
    slug: "engineering-vacatures",
    title: "Engineering Vacatures | Technische & Industriële Banen",
    description:
      "Ontdek engineering vacatures in werktuigbouwkunde, industrie en technische ontwikkeling.",
    heading: "Engineering Vacatures",
  },

  "electrical-installation": {
    slug: "elektrotechniek-vacatures",
    title: "Elektrotechniek Vacatures | Elektromonteur & Installatie Banen",
    description:
      "Bekijk vacatures in de elektrotechniek voor elektromonteurs, installatiemonteurs en paneelbouwers.",
    heading: "Elektrotechniek Vacatures",
  },

  "finance-accounting": {
    slug: "finance-vacatures",
    title: "Finance Vacatures | Accounting & Control Banen",
    description:
      "Vind vacatures in finance en accounting zoals controller, accountant en financieel specialist.",
    heading: "Finance Vacatures",
  },

  "healthcare-medical": {
    slug: "zorg-vacatures",
    title: "Zorg Vacatures | Verpleegkundige & Medische Banen",
    description:
      "Bekijk zorg vacatures voor verpleegkundigen, artsen en andere medische professionals.",
    heading: "Zorg Vacatures",
  },

  "human-resources": {
    slug: "hr-vacatures",
    title: "HR Vacatures | Recruitment & Human Resources Banen",
    description:
      "Vind HR vacatures in recruitment, personeelsmanagement en talentontwikkeling.",
    heading: "HR Vacatures",
  },

  legal: {
    slug: "juridische-vacatures",
    title: "Juridische Vacatures | Advocaat & Jurist Banen",
    description:
      "Bekijk juridische vacatures voor advocaten, juristen en legal counsel functies.",
    heading: "Juridische Vacatures",
  },

  "logistics-supply-chain": {
    slug: "logistiek-vacatures",
    title: "Logistiek Vacatures | Supply Chain & Transport Banen",
    description:
      "Vind logistieke vacatures in supply chain, transport, warehouse en planning.",
    heading: "Logistiek Vacatures",
  },

  "marketing-advertising": {
    slug: "marketing-vacatures",
    title: "Marketing Vacatures | Online Marketing & Advertising",
    description:
      "Bekijk marketing vacatures in online marketing, advertising, branding en performance marketing.",
    heading: "Marketing Vacatures",
  },

  "public-sector-non-profit": {
    slug: "overheid-vacatures",
    title: "Overheid Vacatures | Publieke Sector & Non-profit Banen",
    description:
      "Vind vacatures binnen de overheid en non-profit sector in Nederland.",
    heading: "Overheid & Non-profit Vacatures",
  },

  "real-estate": {
    slug: "vastgoed-vacatures",
    title: "Vastgoed Vacatures | Makelaar & Property Management",
    description:
      "Bekijk vacatures in vastgoed, makelaardij en property management.",
    heading: "Vastgoed Vacatures",
  },

  "sales-retail": {
    slug: "sales-vacatures",
    title: "Sales Vacatures | Retail & Commerciële Banen",
    description:
      "Vind sales vacatures in retail, accountmanagement en commerciële functies.",
    heading: "Sales & Retail Vacatures",
  },

  "science-research": {
    slug: "research-vacatures",
    title: "Research Vacatures | Wetenschap & Onderzoek",
    description:
      "Bekijk vacatures in wetenschap en onderzoek bij universiteiten en bedrijven.",
    heading: "Research & Science Vacatures",
  },

  "technology-it": {
    slug: "it-vacatures",
    title: "IT Vacatures | Software Development & Tech Jobs",
    description:
      "Bekijk IT vacatures in software development, data, cloud en cybersecurity.",
    heading: "IT Vacatures",
  },

  "skilled-trades": {
    slug: "vakmensen-vacatures",
    title: "Vakmensen Vacatures | Bouw & Technische Beroepen",
    description:
      "Vind vacatures voor vakmensen in bouw, techniek en ambachtelijke beroepen.",
    heading: "Vakmensen Vacatures",
  },

  other: {
    slug: "overige-vacatures",
    title: "Overige Vacatures | Diverse Banen",
    description: "Bekijk overige vacatures in verschillende sectoren.",
    heading: "Overige Vacatures",
  },

  unknown: {
    slug: "alle-vacatures",
    title: "Alle Vacatures | Overzicht van Banen",
    description: "Bekijk alle beschikbare vacatures in verschillende sectoren.",
    heading: "Alle Vacatures",
  },
};
