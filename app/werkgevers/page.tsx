import {
  CheckCircle,
  Eye,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  ArrowRight,
  Clock,
  Star,
  BadgeCheck,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PRICING_PLANS } from "@/app/types-employer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Moet mijn bedrijf een CAO hebben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, Baan met CAO is exclusief voor werkgevers die onder een collectieve arbeidsovereenkomst vallen. Dit is onze kernbelofte aan werkzoekenden en dat maakt elke vacature extra waardevol.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe snel is mijn vacature online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direct. Zodra de vacature is ingevuld en het pakket is afgerekend, is de vacature zichtbaar op het platform.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik mijn vacature tussentijds aanpassen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, de tekst en details van een vacature zijn op elk moment aan te passen via het dashboard. Wijzigingen zijn direct zichtbaar.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als mijn vacature na 60 dagen niet is ingevuld?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verlengen kan voor slechts €49 per 60 dagen. Dat gaat eenvoudig vanuit het dashboard, zonder opnieuw alles in te vullen.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik een factuur krijgen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Uiteraard. Na betaling is de factuur direct te downloaden vanuit het dashboard onder Facturen.",
      },
    },
  ],
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Vacature pakketten",
  description: "Tarieven voor het plaatsen van vacatures op Baan met CAO",
  itemListElement: PRICING_PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price,
    priceCurrency: "EUR",
    description: plan.features.join(". "),
    eligibleDuration: {
      "@type": "QuantitativeValue",
      value: plan.durationDays,
      unitCode: "DAY",
    },
  })),
};

export default function WerkgeversPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzek0zNiA0OGMxLjY1NyAwIDMtMS4zNDMgMy0zcy0xLjM0My0zLTMtMy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgM3pNNiAzNmMwLTEuNjU3LTEuMzQzLTMtMy0zcy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgMyAzLTEuMzQzIDMtM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="bg-[#F1592A]/20 text-[#F1592A] border-[#F1592A]/30 mb-6 text-sm px-4 py-1">
            Het vacatureplatform voor werkgevers met een CAO
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Vind medewerkers die <span className="text-[#F1592A]">blijven</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Werkzoekenden op Baan met CAO kiezen bewust voor werkgevers met
            goede arbeidsvoorwaarden. Dat levert gemotiveerde kandidaten op met
            minder verloop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plaats-vacature">
              <Button
                size="lg"
                className="bg-[#F1592A] hover:bg-[#e04d1f] text-white gap-2 w-full sm:w-auto text-base px-8 py-6"
              >
                Plaats een vacature
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#prijzen">
              <Button
                size="lg"
                className="bg-transparent border border-white/30 text-white hover:bg-white hover:text-gray-900 gap-2 w-full sm:w-auto text-base px-8 py-6"
              >
                Bekijk tarieven
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-0 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#F1592A]">
                2.000+
              </p>
              <p className="text-sm text-gray-500 mt-1">Actieve vacatures</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                50K+
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Maandelijkse bezoekers
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                85%
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Gerichte werkzoekenden
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                60 dagen
              </p>
              <p className="text-sm text-gray-500 mt-1">Vacature zichtbaar</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Moeite met het vinden van de{" "}
                <span className="text-[#F1592A]">juiste</span> kandidaten?
              </h2>
              <p className="text-gray-600 mb-4">
                Op de grote vacaturesites verdwijnt een vacature in de massa.
                Veel reacties, maar weinig geschikte kandidaten. Dat kost tijd
                en geld.
              </p>
              <p className="text-gray-600 mb-6">
                Baan met CAO is anders. Onze bezoekers zoeken bewust naar
                werkgevers die hun zaken goed geregeld hebben. Ze kiezen voor
                zekerheid — en dat maakt ze loyaler en gemotiveerder.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700">
                    Minder verloop door bewuste keuze van kandidaten
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700">
                    Hogere kwaliteit sollicitaties
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700">
                    Versterk het werkgeversimago
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#F1592A]/10 rounded-full p-3">
                  <Target className="h-6 w-6 text-[#F1592A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Gericht bereik
                  </h3>
                  <p className="text-sm text-gray-600">
                    Geen ruis. Elke vacature bereikt alleen werkzoekenden die
                    specifiek zoeken naar banen met een CAO.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 rounded-full p-3">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Vertrouwd platform
                  </h3>
                  <p className="text-sm text-gray-600">
                    Werkzoekenden vertrouwen ons platform omdat wij alleen
                    werkgevers met een CAO toelaten.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Groeiend platform
                  </h3>
                  <p className="text-sm text-gray-600">
                    Steeds meer werkzoekenden ontdekken Baan met CAO. Profiteer
                    nu van de groei.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Alles wat nodig is om de beste kandidaten te vinden
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elke vacatureplaatsing bevat een compleet pakket aan tools en
              zichtbaarheid.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#F1592A]/10 rounded-lg p-3 w-fit mb-4">
                <Zap className="h-6 w-6 text-[#F1592A]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Direct online
              </h3>
              <p className="text-sm text-gray-600">
                Vacatures zijn binnen minuten zichtbaar voor duizenden
                werkzoekenden. Geen wachttijd, geen goedkeuring nodig.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-500/10 rounded-lg p-3 w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Real-time statistieken
              </h3>
              <p className="text-sm text-gray-600">
                Volg views, kliks en sollicitaties in het dashboard. Zie precies
                hoe de vacature presteert.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-500/10 rounded-lg p-3 w-fit mb-4">
                <BadgeCheck className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Bedrijfsprofiel
              </h3>
              <p className="text-sm text-gray-600">
                Presenteer de organisatie op een eigen profielpagina. Laat zien
                wie je bent en waarom kandidaten er willen werken.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-500/10 rounded-lg p-3 w-fit mb-4">
                <Eye className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                60 dagen zichtbaar
              </h3>
              <p className="text-sm text-gray-600">
                Elke vacature is 60 dagen actief. Eenvoudig te verlengen indien
                meer tijd nodig is.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-yellow-500/10 rounded-lg p-3 w-fit mb-4">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Voorrang in resultaten
              </h3>
              <p className="text-sm text-gray-600">
                Met een bundelpakket verschijnt de vacature hoger in de
                zoekresultaten. Meer zichtbaarheid, meer sollicitaties.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-red-500/10 rounded-lg p-3 w-fit mb-4">
                <Clock className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Eenvoudig verlengen
              </h3>
              <p className="text-sm text-gray-600">
                Vacature nog niet ingevuld? Verleng met een paar klikken voor
                slechts €49. Geen nieuw plaatsingsproces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            In 3 stappen een vacature online
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-14">
            Het plaatsen van een vacature duurt nog geen 5 minuten.
          </p>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-gray-200" />
            <div className="text-center relative">
              <div className="w-16 h-16 bg-[#F1592A] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                Maak een account
              </h3>
              <p className="text-gray-600">
                Vul de bedrijfsgegevens in en maak direct een werkgeversprofiel
                aan. Klaar in 2 minuten.
              </p>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 bg-[#F1592A] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                Plaats de vacature
              </h3>
              <p className="text-gray-600">
                Vul de functie, locatie en beschrijving in. Kies een pakket en
                publiceer direct.
              </p>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 bg-[#F1592A] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                Ontvang sollicitaties
              </h3>
              <p className="text-gray-600">
                De vacature is direct zichtbaar. Volg de resultaten in het
                dashboard en ontvang sollicitaties.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="prijzen" className="py-20 bg-gray-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Transparante tarieven, geen verrassingen
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Kies het pakket dat past. Alle prijzen zijn exclusief btw.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${plan.popular ? "border-[#F1592A] border-2 shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#F1592A] text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Populair
                  </div>
                )}
                <CardContent className="pt-8 pb-8 px-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <div>
                      <span className="text-4xl font-bold text-gray-900">
                        €{plan.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        excl. btw
                      </span>
                    </div>
                    {plan.savings && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Bespaar €{plan.savings}
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/plaats-vacature?plan=${plan.id}`}
                    className="block"
                  >
                    <Button
                      className={`w-full ${plan.popular ? "bg-[#F1592A] hover:bg-[#e04d1f] text-white" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Kies dit pakket
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Veelgestelde vragen
          </h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Moet mijn bedrijf een CAO hebben?
              </h3>
              <p className="text-gray-600">
                Ja, Baan met CAO is exclusief voor werkgevers die onder een
                collectieve arbeidsovereenkomst vallen. Dit is onze kernbelofte
                aan werkzoekenden en dat maakt elke vacature extra waardevol.
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Hoe snel is mijn vacature online?
              </h3>
              <p className="text-gray-600">
                Direct. Zodra de vacature is ingevuld en het pakket is
                afgerekend, is de vacature zichtbaar op het platform.
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Kan ik mijn vacature tussentijds aanpassen?
              </h3>
              <p className="text-gray-600">
                Ja, de tekst en details van een vacature zijn op elk moment aan
                te passen via het dashboard. Wijzigingen zijn direct zichtbaar.
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Wat als mijn vacature na 60 dagen niet is ingevuld?
              </h3>
              <p className="text-gray-600">
                Verlengen kan voor slechts €49 per 60 dagen. Dat gaat eenvoudig
                vanuit het dashboard, zonder opnieuw alles in te vullen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Kan ik een factuur krijgen?
              </h3>
              <p className="text-gray-600">
                Uiteraard. Na betaling is de factuur direct te downloaden vanuit
                het dashboard onder Facturen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Klaar om de juiste kandidaten te bereiken?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Sluit je aan bij werkgevers die investeren in goede
            arbeidsvoorwaarden. Plaats vandaag nog een eerste vacature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plaats-vacature">
              <Button
                size="lg"
                className="bg-[#F1592A] hover:bg-[#e04d1f] text-white gap-2 text-base px-8 py-6 font-semibold"
              >
                Plaats een vacature
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6"
              >
                Neem contact op
              </Button>
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Vanaf €199 excl. btw per vacature — geen abonnement, geen
            verplichtingen
          </p>
        </div>
      </section>
    </>
  );
}
