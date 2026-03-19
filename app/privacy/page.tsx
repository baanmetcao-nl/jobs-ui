import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Lees het privacybeleid van Baan met CAO. Hier lees je hoe wij omgaan met je persoonsgegevens en welke rechten je hebt.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mb-12">
      <section className="py-16 bg-gray-50 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Privacy<span className="text-[#F1592A]">beleid</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Laatst bijgewerkt: 18 maart 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Inleiding
          </h2>
          <p className="text-gray-600 mb-3">
            Baan met CAO hecht veel waarde aan de bescherming van je
            persoonsgegevens. In dit privacybeleid leggen we uit welke gegevens
            wij verzamelen, waarom we dat doen en hoe we ermee omgaan.
          </p>
          <p className="text-gray-600">
            Dit beleid is van toepassing op alle bezoekers en gebruikers van
            baanmetcao.nl (het &quot;Platform&quot;).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Verwerkingsverantwoordelijke
          </h2>
          <p className="text-gray-600 mb-3">
            De verwerkingsverantwoordelijke voor de verwerking van
            persoonsgegevens is:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 text-gray-600">
            <p className="font-semibold text-gray-900">Baan met CAO</p>
            <p>
              E-mail:{" "}
              <a
                href="mailto:info@baanmetcao.nl"
                className="text-[#F1592A] underline"
              >
                info@baanmetcao.nl
              </a>
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Welke gegevens verzamelen wij?
          </h2>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            3.1 Gegevens van werkgevers
          </h3>
          <p className="text-gray-600 mb-2">
            Wanneer je als werkgever een account aanmaakt of een vacature
            plaatst, verwerken wij:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Naam en achternaam</li>
            <li>E-mailadres</li>
            <li>Bedrijfsnaam en bedrijfsgegevens</li>
            <li>Telefoonnummer (indien opgegeven)</li>
            <li>Betalingsgegevens (verwerkt via Stripe)</li>
            <li>Vacature-inhoud</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            3.2 Gegevens van werkzoekenden
          </h3>
          <p className="text-gray-600 mb-2">
            Als werkzoekende kun je het Platform gebruiken zonder een account
            aan te maken. Wij verzamelen:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>
              Technische gegevens zoals IP-adres, browsertype en apparaattype
            </li>
            <li>Gebruiksgegevens zoals bezochte pagina&apos;s en zoektermen</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            3.3 Contactformulier
          </h3>
          <p className="text-gray-600">
            Wanneer je contact met ons opneemt via het contactformulier,
            verwerken wij je naam, e-mailadres en het bericht dat je stuurt.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Waarvoor gebruiken wij je gegevens?
          </h2>
          <p className="text-gray-600 mb-3">
            Wij verwerken persoonsgegevens voor de volgende doeleinden:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Dienstverlening:</strong> het aanmaken en beheren van
              accounts, het plaatsen en tonen van vacatures.
            </li>
            <li>
              <strong>Betalingsverwerking:</strong> het verwerken van betalingen
              voor vacatureplaatsingen via Stripe.
            </li>
            <li>
              <strong>Communicatie:</strong> het beantwoorden van vragen en het
              versturen van servicegerelateerde berichten.
            </li>
            <li>
              <strong>Nieuwsbrief:</strong> het versturen van tips en
              vacature-updates (alleen met jouw toestemming).
            </li>
            <li>
              <strong>Verbetering van het Platform:</strong> het analyseren van
              gebruiksgegevens om het Platform te verbeteren.
            </li>
            <li>
              <strong>Wettelijke verplichtingen:</strong> het voldoen aan
              wettelijke verplichtingen, zoals belastingwetgeving.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Grondslagen voor verwerking
          </h2>
          <p className="text-gray-600 mb-3">
            Wij verwerken je gegevens op basis van de volgende rechtsgronden
            (conform de AVG):
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Uitvoering van een overeenkomst:</strong> voor het leveren
              van onze diensten aan werkgevers.
            </li>
            <li>
              <strong>Toestemming:</strong> voor het versturen van de
              nieuwsbrief en het plaatsen van niet-essentiële cookies.
            </li>
            <li>
              <strong>Gerechtvaardigd belang:</strong> voor het verbeteren van
              het Platform en het voorkomen van misbruik.
            </li>
            <li>
              <strong>Wettelijke verplichting:</strong> voor het bewaren van
              financiële gegevens.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Delen van gegevens met derden
          </h2>
          <p className="text-gray-600 mb-3">
            Wij delen je gegevens alleen met derden wanneer dit noodzakelijk is
            voor onze dienstverlening:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Stripe:</strong> voor het verwerken van betalingen.
            </li>
            <li>
              <strong>Clerk:</strong> voor authenticatie en accountbeheer.
            </li>
            <li>
              <strong>Google Analytics:</strong> voor het analyseren van
              websitegebruik.
            </li>
            <li>
              <strong>Hostingprovider:</strong> voor het hosten van het
              Platform.
            </li>
          </ul>
          <p className="text-gray-600 mt-3">
            Wij verkopen je gegevens nooit aan derden. Met alle verwerkers
            hebben wij passende verwerkersovereenkomsten gesloten.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
          <p className="text-gray-600 mb-3">
            Het Platform maakt gebruik van cookies. Wij onderscheiden:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Functionele cookies:</strong> noodzakelijk voor het
              functioneren van het Platform (bijv. sessiecookies, inlogstatus).
            </li>
            <li>
              <strong>Analytische cookies:</strong> om het gebruik van het
              Platform te analyseren (Google Analytics).
            </li>
          </ul>
          <p className="text-gray-600 mt-3">
            Via onze cookiebanner kun je je voorkeuren beheren.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Bewaartermijnen
          </h2>
          <p className="text-gray-600 mb-3">
            Wij bewaren je gegevens niet langer dan noodzakelijk:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Accountgegevens:</strong> zolang het account actief is, en
              tot maximaal 12 maanden na verwijdering van het account.
            </li>
            <li>
              <strong>Vacaturegegevens:</strong> zolang de vacature actief is op
              het Platform.
            </li>
            <li>
              <strong>Financiële gegevens:</strong> 7 jaar, conform de
              wettelijke bewaarplicht.
            </li>
            <li>
              <strong>Contactberichten:</strong> maximaal 12 maanden na
              afhandeling.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Jouw rechten
          </h2>
          <p className="text-gray-600 mb-3">
            Op grond van de AVG heb je de volgende rechten:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Recht op inzage:</strong> je mag opvragen welke gegevens
              wij van je verwerken.
            </li>
            <li>
              <strong>Recht op rectificatie:</strong> je kunt verzoeken om
              onjuiste gegevens te laten corrigeren.
            </li>
            <li>
              <strong>Recht op verwijdering:</strong> je kunt verzoeken om je
              gegevens te laten verwijderen.
            </li>
            <li>
              <strong>Recht op beperking:</strong> je kunt verzoeken om de
              verwerking van je gegevens te beperken.
            </li>
            <li>
              <strong>Recht op overdraagbaarheid:</strong> je kunt verzoeken om
              je gegevens in een leesbaar formaat te ontvangen.
            </li>
            <li>
              <strong>Recht op bezwaar:</strong> je kunt bezwaar maken tegen de
              verwerking van je gegevens.
            </li>
            <li>
              <strong>Recht om toestemming in te trekken:</strong> je kunt je
              eerder gegeven toestemming op elk moment intrekken.
            </li>
          </ul>
          <p className="text-gray-600 mt-3">
            Je kunt je rechten uitoefenen door een e-mail te sturen naar{" "}
            <a
              href="mailto:info@baanmetcao.nl"
              className="text-[#F1592A] underline"
            >
              info@baanmetcao.nl
            </a>
            . Wij reageren binnen 30 dagen op je verzoek.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            10. Beveiliging
          </h2>
          <p className="text-gray-600">
            Wij nemen passende technische en organisatorische maatregelen om je
            gegevens te beschermen tegen onbevoegde toegang, verlies of
            misbruik. Denk aan versleutelde verbindingen (SSL/TLS), veilige
            opslag van gegevens en beperkte toegang tot persoonsgegevens.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            11. Klachten
          </h2>
          <p className="text-gray-600">
            Heb je een klacht over hoe wij met je gegevens omgaan? Neem dan
            contact met ons op via{" "}
            <a
              href="mailto:info@baanmetcao.nl"
              className="text-[#F1592A] underline"
            >
              info@baanmetcao.nl
            </a>
            . Je hebt ook het recht om een klacht in te dienen bij de Autoriteit
            Persoonsgegevens (
            <a
              href="https://autoriteitpersoonsgegevens.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1592A] underline"
            >
              autoriteitpersoonsgegevens.nl
            </a>
            ).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            12. Wijzigingen
          </h2>
          <p className="text-gray-600">
            Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest
            recente versie is altijd beschikbaar op deze pagina. Bij
            substantiële wijzigingen zullen wij je hierover informeren.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600">
            Heb je vragen over dit privacybeleid? Neem dan contact met ons op
            via{" "}
            <a
              href="mailto:info@baanmetcao.nl"
              className="text-[#F1592A] underline"
            >
              info@baanmetcao.nl
            </a>{" "}
            of via onze{" "}
            <Link href="/contact" className="text-[#F1592A] underline">
              contactpagina
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
