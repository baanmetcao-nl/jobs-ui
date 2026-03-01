import { Niche } from "@/app/types";

export type NicheSeoConfig = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
};

export const nicheSeo: Record<Niche, NicheSeoConfig> = {
  communications: {
    slug: "communicatie-vacatures",
    title: "Communicatie Vacatures | PR, Corporate & Interne Communicatie",
    description:
      "Bekijk communicatie vacatures in PR, corporate communicatie en interne communicatie.",
    heading: "Communicatie Vacatures",
    intro:
      "Op zoek naar een baan in communicatie? Hier vind je actuele vacatures in PR, corporate communicatie en interne communicatie. Of je nu woordvoerder, communicatieadviseur of content specialist bent, ontdek hier de nieuwste kansen binnen de communicatiesector.",
  },

  "creative-design": {
    slug: "design-vacatures",
    title: "Design Vacatures | UX, Grafisch & Creatieve Banen",
    description:
      "Vind design vacatures in UX/UI, grafisch ontwerp, branding en multimedia.",
    heading: "Design Vacatures",
    intro:
      "Ontdek creatieve vacatures in UX-design, grafisch ontwerp en branding. Werk aan innovatieve projecten bij startups, bureaus of grote organisaties en geef vorm aan digitale en visuele ervaringen.",
  },

  "education-training": {
    slug: "onderwijs-vacatures",
    title: "Onderwijs Vacatures | Docent & Trainer Banen",
    description: "Bekijk vacatures in het onderwijs voor docenten en trainers.",
    heading: "Onderwijs Vacatures",
    intro:
      "Ben je docent, trainer of opleidingsspecialist? Hier vind je actuele vacatures binnen het onderwijs en training. Van basisonderwijs tot hoger onderwijs en bedrijfsopleidingen.",
  },

  engineering: {
    slug: "engineering-vacatures",
    title: "Engineering Vacatures | Technische & Industriële Banen",
    description:
      "Ontdek engineering vacatures in werktuigbouwkunde en industrie.",
    heading: "Engineering Vacatures",
    intro:
      "Bekijk engineering vacatures in werktuigbouwkunde, industriële techniek en productontwikkeling. Werk aan innovatieve oplossingen binnen productie, energie en hightech sectoren.",
  },

  "electrical-installation": {
    slug: "elektrotechniek-vacatures",
    title: "Elektrotechniek Vacatures | Elektromonteur & Installatie Banen",
    description:
      "Bekijk vacatures in de elektrotechniek voor elektromonteurs en installatiemonteurs.",
    heading: "Elektrotechniek Vacatures",
    intro:
      "Op zoek naar een baan in de elektrotechniek? Hier vind je vacatures voor elektromonteurs, installatiemonteurs en technische specialisten. Van woningbouw tot industrie en utiliteitsprojecten.",
  },

  "finance-accounting": {
    slug: "finance-vacatures",
    title: "Finance Vacatures | Accounting & Control Banen",
    description:
      "Vind vacatures in finance en accounting zoals controller en accountant.",
    heading: "Finance Vacatures",
    intro:
      "Bekijk finance vacatures in accounting, controlling en financieel management. Of je nu starter bent of ervaren finance professional, hier vind je de nieuwste kansen binnen de financiële sector.",
  },

  "healthcare-medical": {
    slug: "zorg-vacatures",
    title: "Zorg Vacatures | Verpleegkundige & Medische Banen",
    description:
      "Bekijk zorg vacatures voor verpleegkundigen, artsen en andere zorgprofessionals.",
    heading: "Zorg Vacatures",
    intro:
      "Ontdek actuele zorg vacatures voor verpleegkundigen, artsen en andere medische professionals. Werk in ziekenhuizen, klinieken of thuiszorgorganisaties en maak impact binnen de zorgsector.",
  },

  "human-resources": {
    slug: "hr-vacatures",
    title: "HR Vacatures | Recruitment & Human Resources Banen",
    description: "Vind HR vacatures in recruitment en personeelsmanagement.",
    heading: "HR Vacatures",
    intro:
      "Bekijk HR vacatures binnen recruitment, talentontwikkeling en personeelsmanagement. Werk aan het aantrekken en ontwikkelen van talent binnen uiteenlopende organisaties.",
  },

  legal: {
    slug: "juridische-vacatures",
    title: "Juridische Vacatures | Advocaat & Jurist Banen",
    description: "Bekijk juridische vacatures voor advocaten en juristen.",
    heading: "Juridische Vacatures",
    intro:
      "Vind juridische vacatures binnen advocatuur, bedrijfsleven en overheid. Van advocaat-stagiair tot ervaren bedrijfsjurist, ontdek hier de nieuwste kansen in de juridische sector.",
  },

  "logistics-supply-chain": {
    slug: "logistiek-vacatures",
    title: "Logistiek Vacatures | Supply Chain & Transport Banen",
    description: "Vind logistieke vacatures in supply chain en transport.",
    heading: "Logistiek Vacatures",
    intro:
      "Bekijk logistieke vacatures in supply chain management, transport en warehouse. Werk aan efficiënte distributieprocessen en internationale logistieke ketens.",
  },

  "marketing-advertising": {
    slug: "marketing-vacatures",
    title: "Marketing Vacatures | Online Marketing & Advertising",
    description:
      "Bekijk marketing vacatures in online marketing en advertising.",
    heading: "Marketing Vacatures",
    intro:
      "Ontdek marketing vacatures in online marketing, advertising en branding. Van performance marketeer tot content specialist, hier vind je de nieuwste commerciële kansen.",
  },

  "public-sector-non-profit": {
    slug: "overheid-vacatures",
    title: "Overheid Vacatures | Publieke Sector & Non-profit",
    description: "Vind vacatures binnen de overheid en non-profit sector.",
    heading: "Overheid & Non-profit Vacatures",
    intro:
      "Bekijk vacatures binnen de publieke sector en non-profit organisaties. Werk aan maatschappelijke impact binnen gemeenten, ministeries en goede doelen.",
  },

  "real-estate": {
    slug: "vastgoed-vacatures",
    title: "Vastgoed Vacatures | Makelaar & Property Management",
    description: "Bekijk vacatures in vastgoed en makelaardij.",
    heading: "Vastgoed Vacatures",
    intro:
      "Vind vastgoed vacatures binnen makelaardij en property management. Werk aan woningverkoop, commercieel vastgoed of vastgoedbeheer.",
  },

  "sales-retail": {
    slug: "sales-vacatures",
    title: "Sales Vacatures | Retail & Commerciële Banen",
    description: "Vind sales vacatures in retail en accountmanagement.",
    heading: "Sales & Retail Vacatures",
    intro:
      "Ontdek sales vacatures binnen retail, accountmanagement en business development. Werk aan commerciële groei binnen uiteenlopende sectoren.",
  },

  "science-research": {
    slug: "research-vacatures",
    title: "Research Vacatures | Wetenschap & Onderzoek",
    description: "Bekijk vacatures in wetenschap en onderzoek.",
    heading: "Research & Science Vacatures",
    intro:
      "Vind research vacatures bij universiteiten, onderzoeksinstituten en innovatieve bedrijven. Werk aan wetenschappelijke doorbraken en technologische ontwikkeling.",
  },

  "technology-it": {
    slug: "it-vacatures",
    title: "IT Vacatures | Software Development & Tech Jobs",
    description: "Bekijk IT vacatures in software development, data en cloud.",
    heading: "IT Vacatures",
    intro:
      "Op zoek naar een baan in de IT? Hier vind je actuele IT vacatures in software development, data engineering, cloud en cybersecurity. Van junior developer tot senior architect.",
  },

  "skilled-trades": {
    slug: "vakmensen-vacatures",
    title: "Vakmensen Vacatures | Bouw & Technische Beroepen",
    description: "Vind vacatures voor vakmensen in bouw en techniek.",
    heading: "Vakmensen Vacatures",
    intro:
      "Bekijk vacatures voor vakmensen in bouw, installatie en technische beroepen. Werk aan projecten in woningbouw, renovatie en industriële techniek.",
  },

  other: {
    slug: "overige-vacatures",
    title: "Overige Vacatures",
    description: "Bekijk overige vacatures in diverse sectoren.",
    heading: "Overige Vacatures",
    intro:
      "Hier vind je vacatures die buiten de standaardcategorieën vallen. Ontdek nieuwe mogelijkheden in uiteenlopende sectoren.",
  },

  unknown: {
    slug: "alle-vacatures",
    title: "Alle Vacatures",
    description: "Bekijk alle beschikbare vacatures.",
    heading: "Alle Vacatures",
    intro:
      "Bekijk alle beschikbare vacatures in verschillende sectoren en vind de baan die bij jou past.",
  },
};
