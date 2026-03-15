import {
  Shield,
  Target,
  Eye,
  CheckCircle,
  TrendingUp,
  Clock,
  FileCheck,
  ArrowRight,
  Users,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Baan met CAO verzamelt vacatures van werkgevers die onder een collectieve arbeidsovereenkomst vallen. Transparante salarissen, duidelijke arbeidsvoorwaarden en geen verrassingen achteraf.",
  keywords: [
    "vacatures met cao",
    "werken met cao",
    "transparante vacatures",
    "eerlijk salaris",
    "arbeidsvoorwaarden vacatures",
  ],
  alternates: {
    canonical: "/over-ons",
  },
  openGraph: {
    title: "Over Baan met CAO",
    description:
      "Wij verzamelen alleen vacatures van werkgevers met een CAO. Zo weet je precies waar je aan toe bent.",
    url: "/over-ons",
    siteName: "Baan met CAO",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Over Baan met CAO",
    description:
      "Vacatures met transparante arbeidsvoorwaarden en eerlijke salarissen.",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzek0zNiA0OGMxLjY1NyAwIDMtMS4zNDMgMy0zcy0xLjM0My0zLTMtMy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgM3pNNiAzNmMwLTEuNjU3LTEuMzQzLTMtMy0zcy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgMyAzLTEuMzQzIDMtM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="bg-[#F1592A]/20 text-[#F1592A] border-[#F1592A]/30 mb-6 text-sm px-4 py-1">
            Over Baan met CAO
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Vacatures met een <span className="text-[#F1592A]">CAO</span>. Punt.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Geen verborgen voorwaarden, geen onduidelijke contracten. Alleen
            banen bij werkgevers die hun arbeidsvoorwaarden zwart op wit hebben
            staan.
          </p>
          <Link href="/" prefetch={false}>
            <Button
              size="lg"
              className="bg-[#F1592A] hover:bg-[#e04d1f] text-white gap-2 text-base px-8 py-6"
            >
              Bekijk alle vacatures
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-0 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#F1592A]">
                2.000+
              </p>
              <p className="text-sm text-gray-500 mt-1">Vacatures met CAO</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                100%
              </p>
              <p className="text-sm text-gray-500 mt-1">CAO-werkgevers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                Gratis
              </p>
              <p className="text-sm text-gray-500 mt-1">Voor werkzoekenden</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                Dagelijks
              </p>
              <p className="text-sm text-gray-500 mt-1">Nieuwe vacatures</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Waarom wij <span className="text-[#F1592A]">dit</span> doen
              </h2>
              <p className="text-gray-600 mb-4">
                Te veel werkzoekenden komen terecht bij werkgevers met vage
                beloftes en onduidelijke arbeidsvoorwaarden. Pas na de
                handtekening blijkt wat je echt krijgt — of juist niet.
              </p>
              <p className="text-gray-600 mb-4">
                Wij geloven dat iedereen recht heeft op transparantie. Een CAO
                betekent duidelijkheid: over je salaris, je vakantiedagen, je
                pensioen en je rechten. Geen verrassingen achteraf.
              </p>
              <p className="text-gray-600">
                Daarom verzamelen wij uitsluitend vacatures van werkgevers die
                onder een CAO vallen. Hetzelfde werk, betere voorwaarden.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#F1592A]/10 rounded-full p-3">
                  <Shield className="h-6 w-6 text-[#F1592A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Beschermde rechten
                  </h3>
                  <p className="text-sm text-gray-600">
                    CAO&apos;s beschermen je tegen willekeur van werkgevers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 rounded-full p-3">
                  <FileCheck className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Duidelijke afspraken
                  </h3>
                  <p className="text-sm text-gray-600">
                    Alles staat zwart op wit, geen verrassingen
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Betere voorwaarden
                  </h3>
                  <p className="text-sm text-gray-600">
                    Vaak beter salaris, meer vakantiedagen en pensioen
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
              Onze principes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Alles wat wij doen is gebaseerd op drie overtuigingen.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#F1592A]/10 rounded-lg p-3 w-fit mb-4">
                <Target className="h-6 w-6 text-[#F1592A]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No-nonsense</h3>
              <p className="text-sm text-gray-600">
                Geen poespas, geen vage vacatureteksten. Direct duidelijk wat je
                kunt verwachten.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-500/10 rounded-lg p-3 w-fit mb-4">
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparant</h3>
              <p className="text-sm text-gray-600">
                Alle vacatures tonen de CAO, salarisschalen en
                arbeidsvoorwaarden vooraf.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="bg-green-500/10 rounded-lg p-3 w-fit mb-4">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Altijd actueel
              </h3>
              <p className="text-sm text-gray-600">
                Dagelijks nieuwe vacatures, dagelijks gecontroleerd op
                actualiteit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Wat is een CAO eigenlijk?
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-14">
            Een collectieve arbeidsovereenkomst beschermt jouw rechten als
            werknemer.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-6">
                Een CAO (Collectieve Arbeidsovereenkomst) is een schriftelijke
                overeenkomst tussen werkgevers(organisaties) en vakbonden over
                arbeidsvoorwaarden. Denk aan zaken als:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Minimumloon en salarisschalen voor jouw functie
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Aantal vakantiedagen (vaak meer dan het wettelijk minimum)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Pensioenregeling en toeslagen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Regels rondom overwerk, ziekte en ontslag
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Opleidingsmogelijkheden en doorgroeikansen
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#F1592A]/10 rounded-full p-3">
                  <Users className="h-6 w-6 text-[#F1592A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Voor werknemers
                  </h3>
                  <p className="text-sm text-gray-600">
                    Een CAO beschermt je rechten en zorgt voor eerlijke en
                    transparante arbeidsvoorwaarden.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 rounded-full p-3">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Voor werkgevers
                  </h3>
                  <p className="text-sm text-gray-600">
                    Werkgevers met een CAO trekken gemotiveerde kandidaten aan
                    die kiezen voor zekerheid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Klaar om je droombaan te vinden?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Bekijk ons aanbod van 2.000+ vacatures bij werkgevers met CAO.
            Hetzelfde werk, betere voorwaarden.
          </p>
          <Link href="/" prefetch={false}>
            <Button
              size="lg"
              className="bg-[#F1592A] hover:bg-[#e04d1f] text-white gap-2 text-base px-8 py-6 font-semibold"
            >
              Bekijk alle vacatures
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
