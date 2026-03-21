import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "Lees de algemene voorwaarden van Baan met CAO. Hier vind je alle regels en afspraken die gelden bij het gebruik van ons platform.",
  alternates: {
    canonical: "/algemene-voorwaarden",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="mb-12">
      <section className="py-16 bg-gray-50 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Algemene <span className="text-[#F1592A]">Voorwaarden</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Laatst bijgewerkt: 18 maart 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 1 – Definities
          </h2>
          <p className="text-gray-600 mb-3">
            In deze algemene voorwaarden wordt verstaan onder:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Platform:</strong> de website baanmetcao.nl, beheerd door
              Baan met CAO.
            </li>
            <li>
              <strong>Werkgever:</strong> iedere (rechts)persoon die via het
              Platform een vacature plaatst of een account aanmaakt.
            </li>
            <li>
              <strong>Werkzoekende:</strong> iedere persoon die het Platform
              bezoekt om vacatures te bekijken of te solliciteren.
            </li>
            <li>
              <strong>Diensten:</strong> alle door Baan met CAO aangeboden
              diensten, waaronder het plaatsen en tonen van vacatures.
            </li>
            <li>
              <strong>Account:</strong> het persoonlijke account dat een
              Werkgever aanmaakt om gebruik te maken van de Diensten.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 2 – Toepasselijkheid
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Deze algemene voorwaarden zijn van toepassing op elk gebruik van
              het Platform en alle overeenkomsten tussen Baan met CAO en de
              Werkgever.
            </li>
            <li>
              Door het gebruik van het Platform of het aanmaken van een account
              gaat de gebruiker akkoord met deze voorwaarden.
            </li>
            <li>
              Baan met CAO behoudt zich het recht voor deze voorwaarden te
              wijzigen. Wijzigingen treden in werking zodra ze op het Platform
              zijn gepubliceerd.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 3 – Gebruik van het Platform
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Het Platform is bedoeld om werkgevers met een CAO in contact te
              brengen met werkzoekenden.
            </li>
            <li>
              Werkzoekenden kunnen het Platform gratis gebruiken om vacatures te
              bekijken.
            </li>
            <li>
              Werkgevers kunnen tegen betaling vacatures plaatsen op het
              Platform.
            </li>
            <li>
              Het is niet toegestaan het Platform te gebruiken voor
              onrechtmatige doeleinden, waaronder het plaatsen van misleidende
              of discriminerende vacatures.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 4 – Vacatures plaatsen
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              De Werkgever garandeert dat de geplaatste vacature juist, volledig
              en niet misleidend is.
            </li>
            <li>
              De Werkgever garandeert dat de vacature betrekking heeft op een
              functie die onder een collectieve arbeidsovereenkomst (CAO) valt.
            </li>
            <li>
              Baan met CAO behoudt zich het recht voor vacatures te weigeren, te
              wijzigen of te verwijderen die niet voldoen aan de voorwaarden of
              de kwaliteitseisen van het Platform.
            </li>
            <li>
              Na betaling wordt de vacature gepubliceerd voor de afgesproken
              looptijd. Restitutie na publicatie is niet mogelijk, tenzij anders
              overeengekomen.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 5 – Prijzen en betaling
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Alle prijzen op het Platform zijn in euro&apos;s en exclusief btw,
              tenzij anders vermeld.
            </li>
            <li>
              Betaling vindt plaats via de op het Platform beschikbare
              betaalmethoden (o.a. iDEAL, creditcard).
            </li>
            <li>
              De vacature wordt pas gepubliceerd na ontvangst van de volledige
              betaling.
            </li>
            <li>
              Baan met CAO behoudt zich het recht voor prijzen te wijzigen.
              Reeds betaalde vacatures worden niet beïnvloed door
              prijswijzigingen.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 6 – Account en beveiliging
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              De Werkgever is verantwoordelijk voor het vertrouwelijk houden van
              inloggegevens en voor alle activiteiten die via het account
              plaatsvinden.
            </li>
            <li>
              Bij vermoeden van onbevoegd gebruik dient de Werkgever Baan met
              CAO direct op de hoogte te stellen.
            </li>
            <li>
              Baan met CAO kan een account opschorten of verwijderen bij
              vermoeden van misbruik of schending van deze voorwaarden.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 7 – Intellectueel eigendom
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Alle content op het Platform, waaronder teksten, afbeeldingen,
              logo&apos;s en software, is eigendom van Baan met CAO of haar
              licentiegevers.
            </li>
            <li>
              Het is niet toegestaan content van het Platform te kopiëren,
              verspreiden of anderszins te gebruiken zonder voorafgaande
              schriftelijke toestemming.
            </li>
            <li>
              De Werkgever verleent Baan met CAO een niet-exclusieve licentie om
              de aangeleverde vacature-inhoud te publiceren en te verspreiden
              via het Platform.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 8 – Aansprakelijkheid
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Baan met CAO spant zich in om het Platform zo goed mogelijk te
              laten functioneren, maar garandeert geen ononderbroken of foutloze
              werking.
            </li>
            <li>
              Baan met CAO is niet aansprakelijk voor schade als gevolg van
              onjuiste of onvolledige vacature-informatie die door Werkgevers is
              aangeleverd.
            </li>
            <li>
              De totale aansprakelijkheid van Baan met CAO is beperkt tot het
              bedrag dat de Werkgever heeft betaald voor de betreffende dienst.
            </li>
            <li>
              Baan met CAO is niet aansprakelijk voor indirecte schade,
              waaronder gevolgschade, gederfde winst of gemiste kansen.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 9 – Klachten
          </h2>
          <p className="text-gray-600 mb-3">
            Klachten over de Diensten kunnen worden ingediend via{" "}
            <a
              href="mailto:info@baanmetcao.nl"
              className="text-[#F1592A] underline"
            >
              info@baanmetcao.nl
            </a>
            . Wij streven ernaar klachten binnen 14 werkdagen te behandelen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Artikel 10 – Toepasselijk recht en geschillen
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Op deze voorwaarden en alle overeenkomsten is Nederlands recht van
              toepassing.
            </li>
            <li>
              Geschillen worden bij voorkeur in onderling overleg opgelost.
              Indien dit niet mogelijk is, worden geschillen voorgelegd aan de
              bevoegde rechter in Nederland.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600">
            Heb je vragen over deze voorwaarden? Neem dan contact met ons op via{" "}
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
