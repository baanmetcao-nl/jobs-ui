import {
  Shield,
  Target,
  Eye,
  CheckCircle,
  TrendingUp,
  Clock,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Vacatures met een <span className="text-[#F1592A]">CAO</span>. Punt.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Geen verborgen voorwaarden, geen onduidelijke contracten. Alleen
            banen bij werkgevers die hun arbeidsvoorwaarden zwart op wit hebben
            staan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Waarom wij dit doen
              </h2>
              <p className="text-gray-600 mb-4">
                Te veel werkzoekenden komen terecht bij werkgevers met vage
                beloftes en onduidelijke arbeidsvoorwaarden. Pas na de
                handtekening blijkt wat je echt krijgt - of juist niet.
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
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F1592A]/10 rounded-full p-2 mt-1">
                    <Shield className="h-5 w-5 text-[#F1592A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Beschermde rechten
                    </h3>
                    <p className="text-sm text-gray-600">
                      CAO's beschermen je tegen willekeur van werkgevers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 rounded-full p-2 mt-1">
                    <FileCheck className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Duidelijke afspraken
                    </h3>
                    <p className="text-sm text-gray-600">
                      Alles staat zwart op wit, geen verrassingen
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/10 rounded-full p-2 mt-1">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
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
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Onze principes
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Target className="h-7 w-7 text-[#F1592A]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No-nonsense</h3>
              <p className="text-sm text-gray-600">
                Geen poespas, geen vage vacatureteksten. Direct duidelijk wat je
                kunt verwachten.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Eye className="h-7 w-7 text-[#F1592A]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparant</h3>
              <p className="text-sm text-gray-600">
                Alle vacatures tonen de CAO, salarisschalen en
                arbeidsvoorwaarden vooraf.
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Clock className="h-7 w-7 text-[#F1592A]" />
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

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Wat is een CAO eigenlijk?
          </h2>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-600 mb-4">
              Een CAO (Collectieve Arbeidsovereenkomst) is een schriftelijke
              overeenkomst tussen werkgevers(organisaties) en vakbonden over
              arbeidsvoorwaarden. Denk aan zaken als:
            </p>
            <ul className="space-y-3 mb-6">
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
            <p className="text-gray-600">
              Kortom: een CAO beschermt je rechten en zorgt voor eerlijke en
              transparante arbeidsvoorwaarden.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Klaar om je droombaan te vinden?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Bekijk ons aanbod van 1,200+ vacatures bij werkgevers met CAO.
            Hetzelfde werk, betere voorwaarden.
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="bg-[#F1592A] hover:bg-[#d94d22] text-white"
            >
              Bekijk alle vacatures
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
