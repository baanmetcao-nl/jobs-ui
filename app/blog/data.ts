export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  content: BlogSection[];
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "wat-is-een-cao-alles-wat-je-moet-weten",
    title: "Wat is een CAO? Alles wat je moet weten als werkzoekende",
    description:
      "Een CAO regelt je salaris, vakantiedagen, pensioen en meer. Ontdek wat een collectieve arbeidsovereenkomst precies inhoudt en waarom het belangrijk is bij het zoeken naar een baan.",
    image: "/blog/cao-uitleg.jpg",
    imageAlt: "Persoon ondertekent een arbeidsovereenkomst",
    date: "2026-03-15",
    readTime: "7 min",
    category: "Arbeidsrecht",
    keywords: [
      "wat is een cao",
      "collectieve arbeidsovereenkomst",
      "cao uitleg",
      "arbeidsvoorwaarden",
      "cao werknemer",
    ],
    content: [
      {
        paragraphs: [
          "Als je op zoek bent naar een baan, kom je regelmatig de term CAO tegen. Maar wat houdt een collectieve arbeidsovereenkomst precies in? En waarom is het zo belangrijk om te weten of je toekomstige werkgever onder een CAO valt? In dit artikel leggen we alles uit wat je moet weten.",
        ],
      },
      {
        heading: "CAO staat voor Collectieve Arbeidsovereenkomst",
        paragraphs: [
          "Een CAO is een schriftelijke overeenkomst tussen werkgevers (of werkgeversorganisaties) en vakbonden over arbeidsvoorwaarden. Deze afspraken gelden voor alle werknemers die onder die CAO vallen — ongeacht of je lid bent van een vakbond.",
          "In Nederland zijn er meer dan 700 verschillende CAO's. Sommige gelden voor een hele sector (zoals de CAO Retail of CAO Zorg), andere zijn bedrijfsspecifiek (zoals de CAO van grote bedrijven als KLM of Philips).",
        ],
      },
      {
        heading: "Wat regelt een CAO precies?",
        paragraphs: [
          "Een CAO regelt veel meer dan alleen je salaris. Dit zijn de belangrijkste zaken die in een CAO worden vastgelegd:",
        ],
        list: [
          "Salarisschalen en periodieken — je weet precies wat je verdient en wanneer je een loonsverhoging krijgt",
          "Vakantiedagen — vaak meer dan het wettelijk minimum van 20 dagen bij een fulltime dienstverband",
          "Vakantiegeld — meestal 8% van je bruto jaarsalaris, soms zelfs meer",
          "Pensioenregeling — je bouwt pensioen op via je werkgever",
          "Overwerkvergoedingen en toeslagen — voor avond-, nacht- en weekendwerk",
          "Regels bij ziekte — aanvulling op je loon bij ziekteverzuim",
          "Ontslagbescherming — duidelijke regels en procedures",
          "Opleidingsbudget — mogelijkheden om jezelf te ontwikkelen",
        ],
      },
      {
        heading: "Waarom is een CAO belangrijk bij het zoeken naar werk?",
        paragraphs: [
          "Een baan bij een werkgever met CAO biedt je als werknemer meerdere voordelen. Ten eerste heb je zekerheid: alle afspraken staan zwart op wit en kunnen niet zomaar eenzijdig worden gewijzigd door je werkgever.",
          "Ten tweede zijn de arbeidsvoorwaarden in een CAO bijna altijd beter dan het wettelijk minimum. Denk aan meer vakantiedagen, hogere salarissen en betere pensioenopbouw. Dat kan op jaarbasis duizenden euro's schelen.",
          "Tot slot zorgt een CAO voor gelijkheid op de werkvloer. Iedereen met dezelfde functie en ervaring krijgt hetzelfde salaris. Geen willekeur, geen ongelijke behandeling.",
        ],
      },
      {
        heading: "Hoe weet je of een werkgever onder een CAO valt?",
        paragraphs: [
          "Dit is vaak niet direct duidelijk in vacatureteksten. Sommige werkgevers vermelden het expliciet, maar veel ook niet. Je kunt het op meerdere manieren achterhalen:",
        ],
        list: [
          "Vraag het tijdens het sollicitatiegesprek — een legitieme en belangrijke vraag",
          "Check de website van het ministerie van SZW voor algemeen verbindend verklaarde CAO's",
          "Zoek op de website van de vakbond in jouw sector",
          "Gebruik Baan met CAO — wij vermelden alleen vacatures van werkgevers die onder een CAO vallen",
        ],
      },
      {
        heading: "Baan zonder CAO: waar moet je op letten?",
        paragraphs: [
          "Niet elke werkgever valt onder een CAO. Dat hoeft niet per se slecht te zijn, maar het betekent wel dat je zelf beter moet opletten. Zonder CAO gelden alleen de wettelijke minimumregels uit het Burgerlijk Wetboek en de Wet minimumloon.",
          "In de praktijk betekent dit vaak: minder vakantiedagen, geen duidelijke salarisstructuur en minder zekerheid over zaken als pensioen en overwerkvergoeding. Daarom raden wij altijd aan om bij voorkeur te solliciteren bij werkgevers met een CAO.",
        ],
      },
      {
        heading: "Conclusie",
        paragraphs: [
          "Een CAO biedt je als werknemer bescherming, duidelijkheid en betere arbeidsvoorwaarden. Bij het zoeken naar een nieuwe baan is het slim om hier actief op te letten. Op Baan met CAO vind je uitsluitend vacatures van werkgevers die onder een collectieve arbeidsovereenkomst vallen — zodat je precies weet waar je aan toe bent.",
        ],
      },
    ],
  },
  {
    slug: "sollicitatietips-die-echt-werken",
    title: "10 Sollicitatietips die echt werken in 2026",
    description:
      "Wil je meer uitgenodigd worden voor sollicitatiegesprekken? Ontdek 10 bewezen sollicitatietips waarmee je opvalt bij werkgevers en sneller je droombaan vindt.",
    image: "/blog/sollicitatietips.jpg",
    imageAlt: "Twee personen tijdens een sollicitatiegesprek",
    date: "2026-03-10",
    readTime: "8 min",
    category: "Solliciteren",
    keywords: [
      "sollicitatietips",
      "solliciteren tips",
      "sollicitatiebrief",
      "sollicitatiegesprek",
      "baan vinden",
      "cv tips",
    ],
    content: [
      {
        paragraphs: [
          "De arbeidsmarkt verandert continu, maar de basis van goed solliciteren blijft hetzelfde: laat zien wie je bent, wat je kunt en waarom jij de beste kandidaat bent. In dit artikel delen we 10 sollicitatietips die in 2026 echt het verschil maken.",
        ],
      },
      {
        heading: "1. Pas je CV aan op elke vacature",
        paragraphs: [
          "Stuur nooit hetzelfde generieke CV naar elke werkgever. Lees de vacaturetekst goed door en pas je CV aan op de gevraagde competenties en ervaring. Zet de meest relevante ervaring bovenaan en gebruik dezelfde termen als in de vacature. Recruiters besteden gemiddeld 6 seconden aan een eerste screening — zorg dat jouw CV meteen scoort.",
        ],
      },
      {
        heading: "2. Schrijf een gerichte motivatiebrief",
        paragraphs: [
          "Ja, de motivatiebrief doet er nog steeds toe. Maar dan moet het wel een goede zijn. Vermijd standaardzinnen als 'Met veel enthousiasme reageer ik op uw vacature'. Vertel in plaats daarvan concreet waarom je bij dit bedrijf wilt werken en wat jij toevoegt. Noem specifieke projecten, resultaten of ervaringen die aansluiten bij de functie.",
        ],
      },
      {
        heading: "3. Onderzoek het bedrijf grondig",
        paragraphs: [
          "Voordat je solliciteert, verdiep je in het bedrijf. Bekijk hun website, lees recent nieuws, check hun social media en kijk of er reviews van medewerkers zijn. Dit helpt je niet alleen bij je sollicitatiebrief, maar ook tijdens het gesprek. Werkgevers merken het direct als je je huiswerk hebt gedaan.",
        ],
      },
      {
        heading: "4. Maak je LinkedIn-profiel sollicitatieproof",
        paragraphs: [
          "Recruiters zoeken actief op LinkedIn. Zorg dat je profiel compleet en actueel is. Gebruik een professionele foto, schrijf een pakkende kopregel en vul je werkervaring aan met concrete resultaten. Zet de optie 'Open to work' aan als je actief zoekt — maar alleen zichtbaar voor recruiters als je nog in dienst bent.",
        ],
      },
      {
        heading: "5. Bereid je voor op veelgestelde vragen",
        paragraphs: [
          "De meeste sollicitatiegesprekken bevatten voorspelbare vragen. Bereid je antwoorden voor op vragen als:",
        ],
        list: [
          "'Vertel eens iets over jezelf' — houd het professioneel en relevant, max 2 minuten",
          "'Waarom wil je hier werken?' — toon dat je het bedrijf kent en enthousiast bent",
          "'Wat zijn je sterke en zwakke punten?' — wees eerlijk maar strategisch",
          "'Waar zie je jezelf over 5 jaar?' — laat ambitie en realisme zien",
          "'Waarom moeten we jou aannemen?' — vat je toegevoegde waarde samen",
        ],
      },
      {
        heading: "6. Vraag naar de arbeidsvoorwaarden",
        paragraphs: [
          "Het is volkomen normaal om tijdens het sollicitatieproces te vragen naar salaris, vakantiedagen en andere arbeidsvoorwaarden. Sterker nog: het is verstandig. Vraag of het bedrijf onder een CAO valt — dat zegt veel over de kwaliteit van de arbeidsvoorwaarden. Op Baan met CAO vind je alleen vacatures bij werkgevers met een CAO, zodat je dit al van tevoren weet.",
        ],
      },
      {
        heading: "7. Volg op na het gesprek",
        paragraphs: [
          "Stuur binnen 24 uur een kort bedankmailtje na je sollicitatiegesprek. Bedank voor het gesprek, benoem iets specifieks dat je is bijgebleven en bevestig je interesse. Dit is een klein gebaar dat een groot verschil maakt — veel kandidaten doen het niet.",
        ],
      },
      {
        heading: "8. Wees eerlijk over je ervaring",
        paragraphs: [
          "Overdrijf niet op je CV of tijdens het gesprek. Werkgevers prikken hier doorheen en het kan je de baan kosten — of erger, leiden tot een mismatch. Als je bepaalde ervaring nog niet hebt, laat dan zien dat je leergierig bent en snel kunt oppakken. Eerlijkheid wordt altijd gewaardeerd.",
        ],
      },
      {
        heading: "9. Let op je online aanwezigheid",
        paragraphs: [
          "Steeds meer werkgevers googelen sollicitanten. Controleer wat er over je te vinden is en ruim eventuele onprofessionele content op. Dit geldt voor social media, maar ook voor oude forumberichten of reacties. Je online imago is onderdeel van je eerste indruk.",
        ],
      },
      {
        heading: "10. Geef niet op na een afwijzing",
        paragraphs: [
          "Afwijzingen horen bij solliciteren. Gemiddeld moet je 10 tot 15 keer solliciteren voordat je een baan vindt. Vraag altijd om feedback na een afwijzing — dit helpt je om je volgende sollicitatie te verbeteren. En onthoud: elke afwijzing brengt je dichter bij de juiste match.",
        ],
      },
      {
        heading: "Aan de slag",
        paragraphs: [
          "Met deze tips vergroot je je kansen aanzienlijk. Begin vandaag nog met het verbeteren van je CV, onderzoek bedrijven die je aanspreken en solliciteer gericht. Op Baan met CAO vind je duizenden vacatures bij werkgevers met goede arbeidsvoorwaarden. Succes met je zoektocht!",
        ],
      },
    ],
  },
  {
    slug: "salarisonderhandeling-tips-hoger-salaris",
    title:
      "Salarisonderhandeling: zo vraag je het salaris dat je verdient",
    description:
      "Leer hoe je succesvol onderhandelt over je salaris. Van voorbereiding tot het gesprek: praktische tips voor een hoger salaris bij je nieuwe of huidige werkgever.",
    image: "/blog/salarisonderhandeling.jpg",
    imageAlt: "Financiele documenten en rekenmachine op bureau",
    date: "2026-03-05",
    readTime: "6 min",
    category: "Carriere",
    keywords: [
      "salarisonderhandeling",
      "salaris onderhandelen",
      "hoger salaris vragen",
      "salarisverhoging",
      "loononderhandeling",
      "salarisgesprek tips",
    ],
    content: [
      {
        paragraphs: [
          "Veel werknemers vinden het lastig om over hun salaris te onderhandelen. Toch is het een van de belangrijkste momenten in je carriere. Een goed gevoerd salarisgesprek kan duizenden euro's per jaar schelen — en het effect stapelt op gedurende je hele loopbaan. In dit artikel leer je hoe je je voorbereidt en succesvol onderhandelt.",
        ],
      },
      {
        heading: "Waarom salarisonderhandeling belangrijk is",
        paragraphs: [
          "Onderzoek toont aan dat werknemers die onderhandelen over hun salaris gemiddeld 5.000 tot 10.000 euro per jaar meer verdienen dan collega's die dat niet doen. Over een carriere van 30 jaar kan dat oplopen tot honderdduizenden euro's — inclusief het effect op pensioenopbouw, vakantiegeld en eventuele bonussen.",
          "Toch onderhandelt slechts 39% van de werknemers bij een nieuwe baan. De belangrijkste reden? Angst. Angst om de baan te verliezen, angst om hebberig over te komen, of simpelweg niet weten hoe je het moet aanpakken.",
        ],
      },
      {
        heading: "Stap 1: Ken je marktwaarde",
        paragraphs: [
          "Voordat je het gesprek aangaat, moet je weten wat gangbaar is voor jouw functie, ervaring en regio. Gebruik bronnen als het Nationaal Salaris Onderzoek, salariswijzers van recruitmentbureaus en vacaturesites die salarissen vermelden.",
          "Als de werkgever onder een CAO valt, heb je een extra voordeel: de salarisschalen zijn vastgelegd. Je kunt precies zien in welke schaal je hoort en wat de groeimogelijkheden zijn. Op Baan met CAO vind je vacatures waar dit transparant is vermeld.",
        ],
      },
      {
        heading: "Stap 2: Bereid je argumenten voor",
        paragraphs: [
          "Een succesvolle onderhandeling draait om feiten, niet om emoties. Verzamel concrete voorbeelden van je prestaties:",
        ],
        list: [
          "Meetbare resultaten — omzet verhoogd, kosten bespaard, processen verbeterd",
          "Extra verantwoordelijkheden die je hebt opgepakt",
          "Certificaten, opleidingen of cursussen die je hebt afgerond",
          "Positieve feedback van klanten, collega's of leidinggevenden",
          "Marktgegevens die je huidige onderbetaling aantonen",
        ],
      },
      {
        heading: "Stap 3: Kies het juiste moment",
        paragraphs: [
          "Timing is cruciaal. De beste momenten voor een salarisgesprek zijn: na een succesvolle afronding van een project, tijdens je jaarlijkse beoordelingsgesprek, of bij het aannemen van extra taken. Bij een sollicitatie komt het salarisonderwerp meestal ter sprake in de tweede gespreksronde of wanneer de werkgever een aanbod doet.",
          "Vermijd het onderwerp op te brengen wanneer het bedrijf het financieel moeilijk heeft, direct na een reorganisatie of op een ongeschikt moment zoals een informeel praatje bij de koffieautomaat.",
        ],
      },
      {
        heading: "Stap 4: Voer het gesprek met vertrouwen",
        paragraphs: [
          "Begin het gesprek positief. Benadruk hoeveel je het werk waardeert en wat je hebt bijgedragen. Noem vervolgens je onderzoek naar de marktwaarde en je concrete prestaties. Geef een specifiek bedrag of range die je voor ogen hebt — wie het eerste getal noemt, verankert de onderhandeling.",
          "Luister goed naar de reactie van je werkgever. Als het gewenste salaris niet mogelijk is, onderhandel dan over andere arbeidsvoorwaarden: extra vakantiedagen, thuiswerkdagen, opleidingsbudget of een eenmalige bonus.",
        ],
      },
      {
        heading: "Salarisonderhandeling bij een CAO",
        paragraphs: [
          "Werk je bij een werkgever met een CAO? Dan liggen de salarisschalen vast, maar er is vaak meer ruimte dan je denkt. Je kunt onderhandelen over je inschaling (welke trede in de schaal), je kunt vragen om sneller door te groeien naar een hogere trede, en sommige CAO's bieden ruimte voor een persoonlijke toeslag bovenop het schaalmaximum.",
          "Bovendien bieden veel CAO's secundaire arbeidsvoorwaarden waar je over kunt praten: een hogere reiskostenvergoeding, meer thuiswerkdagen of een groter opleidingsbudget.",
        ],
      },
      {
        heading: "Tot slot",
        paragraphs: [
          "Salarisonderhandeling is een vaardigheid die je kunt leren. Bereid je goed voor, ken je waarde en durf het gesprek aan te gaan. Het ergste dat kan gebeuren is een 'nee' — en zelfs dan weet je waar je staat. Bekijk op Baan met CAO vacatures met transparante salarisschalen, zodat je altijd weet wat je kunt verwachten.",
        ],
      },
    ],
  },
  {
    slug: "rechten-als-werknemer-dit-regelt-een-cao",
    title: "Jouw rechten als werknemer: dit regelt een CAO voor jou",
    description:
      "Van vakantiedagen tot ontslagbescherming: ontdek welke rechten een CAO je biedt als werknemer en waarom dit verschil maakt bij het kiezen van een werkgever.",
    image: "/blog/rechten-werknemer.jpg",
    imageAlt: "Professionele handdruk tussen twee collega's",
    date: "2026-02-28",
    readTime: "7 min",
    category: "Arbeidsrecht",
    keywords: [
      "rechten werknemer",
      "cao rechten",
      "vakantiedagen cao",
      "ontslagbescherming",
      "arbeidsvoorwaarden werknemer",
      "pensioen cao",
    ],
    content: [
      {
        paragraphs: [
          "Als werknemer heb je rechten. Dat klinkt logisch, maar in de praktijk weten veel mensen niet precies waar ze recht op hebben. Een CAO speelt hierin een cruciale rol: het regelt zaken die ver boven het wettelijk minimum uitstijgen. In dit artikel zetten we de belangrijkste rechten op een rij die een CAO voor jou regelt.",
        ],
      },
      {
        heading: "Vakantiedagen: meer dan het wettelijk minimum",
        paragraphs: [
          "Wettelijk heb je als fulltime werknemer recht op minimaal 20 vakantiedagen per jaar. Maar de meeste CAO's bieden aanzienlijk meer. In de CAO Zorg heb je bijvoorbeeld recht op 27 tot 34 dagen, afhankelijk van je leeftijd en dienstjaren. In de CAO Metaal & Techniek zijn dat 25 dagen plus eventuele seniorendagen.",
          "Daarnaast kennen veel CAO's bijzonder verlof voor situaties als verhuizing, huwelijk, overlijden van een naaste of het bijwonen van een doktersbezoek. Zonder CAO ben je afhankelijk van de goodwill van je werkgever.",
        ],
      },
      {
        heading: "Salaris en salarisgroei",
        paragraphs: [
          "Een CAO legt salarisschalen vast. Dat betekent dat je precies weet wat het minimum- en maximumsalaris is voor jouw functie. Bovendien zijn er vaste momenten waarop je in aanmerking komt voor een periodieke salarisverhoging — meestal jaarlijks.",
          "Zonder CAO is je salaris volledig afhankelijk van individuele onderhandeling. Dat kan voordelig zijn als je goed onderhandelt, maar het kan ook leiden tot onderbetaling of ongelijkheid tussen collega's die hetzelfde werk doen.",
        ],
      },
      {
        heading: "Pensioenopbouw",
        paragraphs: [
          "De meeste CAO's verplichten werkgevers om een pensioenregeling aan te bieden. Dit is een enorm voordeel, want pensioenopbouw via je werkgever is een van de beste manieren om voor je toekomst te sparen. De werkgever betaalt vaak twee derde van de premie.",
          "Zonder CAO is een werkgever niet verplicht om pensioen aan te bieden — tenzij er een verplicht bedrijfstakpensioenfonds geldt. Veel werknemers zonder CAO lopen hierdoor een gat in hun pensioenopbouw op.",
        ],
      },
      {
        heading: "Doorbetaling bij ziekte",
        paragraphs: [
          "Wettelijk moet je werkgever je loon doorbetalen bij ziekte: minimaal 70% in het eerste jaar en 70% in het tweede jaar. Maar veel CAO's bieden betere voorwaarden. Zo betalen werkgevers in de CAO Bouw het eerste jaar 100% door en in het tweede jaar 70%. In de CAO Overheid is de doorbetaling zelfs twee jaar lang 100%.",
          "Dit maakt een enorm verschil als je onverhoopt langdurig ziek wordt. Zonder CAO val je sneller terug naar het wettelijk minimum, wat flink in je portemonnee kan schelen.",
        ],
      },
      {
        heading: "Overwerk en toeslagen",
        paragraphs: [
          "Werk je regelmatig over, in de avond of in het weekend? Dan is een CAO extra waardevol. De meeste CAO's regelen overwerkvergoedingen, avondtoeslagen en weekendtoeslagen. In de CAO Horeca krijg je bijvoorbeeld 150% van je uurloon op zondag en 200% op feestdagen.",
          "Zonder CAO is je werkgever alleen verplicht om je het afgesproken uurloon te betalen — ook voor onregelmatige uren. Extra vergoedingen zijn dan puur afhankelijk van wat je individueel hebt afgesproken.",
        ],
      },
      {
        heading: "Ontslagbescherming en opzegtermijnen",
        paragraphs: [
          "Een CAO bevat vaak aanvullende regels rondom ontslag die verder gaan dan de wettelijke bescherming. Denk aan een langere opzegtermijn, verplichte hoorprocedures of een sociaal plan bij reorganisaties. Sommige CAO's kennen een ontslagcommissie die meekijkt of een ontslag terecht is.",
          "Dit geeft je als werknemer meer zekerheid en bescherming in onzekere tijden. Je staat er niet alleen voor als je werkgever wil reorganiseren of bezuinigen.",
        ],
      },
      {
        heading: "Opleidingsbudget en ontwikkeling",
        paragraphs: [
          "Veel CAO's bevatten afspraken over opleidingen en persoonlijke ontwikkeling. Je hebt dan recht op een jaarlijks opleidingsbudget, studieverlof of vergoeding van cursussen die bijdragen aan je professionele groei. In de CAO Metaal & Techniek is dat bijvoorbeeld een individueel ontwikkelingsbudget van meerdere duizenden euro's.",
          "Dit stimuleert niet alleen je carriere, maar vergroot ook je waarde op de arbeidsmarkt. Investeren in jezelf is altijd een goed idee — en met een CAO wordt dat financieel mogelijk gemaakt.",
        ],
      },
      {
        heading: "Conclusie: een CAO maakt het verschil",
        paragraphs: [
          "De rechten die een CAO je biedt gaan ver boven het wettelijk minimum. Van meer vakantiedagen en betere doorbetaling bij ziekte tot pensioenopbouw en ontslagbescherming — een CAO beschermt je op alle vlakken.",
          "Daarom is het slim om bij het zoeken naar een baan te letten op werkgevers die onder een CAO vallen. Op Baan met CAO vind je uitsluitend dit soort vacatures: eerlijke banen met transparante voorwaarden. Hetzelfde werk, betere voorwaarden.",
        ],
      },
    ],
  },
  {
    slug: "minimumloon-2026-bedragen-per-uur",
    title: "Minimumloon 2026: alle bedragen op een rij",
    description:
      "Wat is het minimumloon in 2026? Bekijk de actuele bedragen per uur, per maand en per leeftijd. Plus: wat een CAO extra voor je salaris kan betekenen.",
    image: "/blog/minimumloon.jpg",
    imageAlt: "Munten met een groeiend plantje als symbool voor loongroei",
    date: "2026-02-20",
    readTime: "5 min",
    category: "Salaris",
    keywords: [
      "minimumloon 2026",
      "minimumloon per uur",
      "wettelijk minimumloon",
      "minimumjeugdloon 2026",
      "minimumloon bedragen",
    ],
    content: [
      {
        paragraphs: [
          "Het wettelijk minimumloon wordt twee keer per jaar aangepast. Per 1 januari 2026 is het minimumuurloon vastgesteld op \u20AC 14,71 bruto voor werknemers van 21 jaar en ouder. Maar wat betekent dat precies per maand? En hoeveel verdien je als je jonger bent? In dit artikel zetten we alle bedragen overzichtelijk op een rij.",
        ],
      },
      {
        heading: "Minimumloon per uur in 2026",
        paragraphs: [
          "Sinds 2024 werkt Nederland met een wettelijk minimumuurloon in plaats van een maandloon. Dit maakt het eerlijker: of je nu 36, 38 of 40 uur per week werkt, je minimale uurloon blijft hetzelfde. Per 1 januari 2026 is dat \u20AC 14,71 bruto per uur voor werknemers van 21 jaar en ouder.",
        ],
      },
      {
        heading: "Minimumloon per maand",
        paragraphs: [
          "Het maandloon hangt af van het aantal uren dat je per week werkt. Dit zijn de bedragen per 1 januari 2026:",
        ],
        list: [
          "36 uur per week: circa \u20AC 2.302 bruto per maand",
          "38 uur per week: circa \u20AC 2.430 bruto per maand",
          "40 uur per week: circa \u20AC 2.558 bruto per maand",
        ],
      },
      {
        heading: "Minimumjeugdloon 2026",
        paragraphs: [
          "Voor werknemers onder de 21 jaar geldt een minimumjeugdloon. Dit is een percentage van het volwassen minimumloon:",
        ],
        list: [
          "20 jaar: \u20AC 11,77 per uur (80%)",
          "19 jaar: \u20AC 8,83 per uur (60%)",
          "18 jaar: \u20AC 7,36 per uur (50%)",
          "17 jaar: \u20AC 5,74 per uur (39%)",
          "16 jaar: \u20AC 5,01 per uur (34,5%)",
          "15 jaar: \u20AC 4,36 per uur (30%)",
        ],
      },
      {
        heading: "Minimumloon en vakantiegeld",
        paragraphs: [
          "Bovenop het minimumloon heb je recht op vakantiegeld: minimaal 8% van je bruto jaarsalaris. Dit wordt meestal in mei of juni uitbetaald. Het vakantiegeld zit niet in de bovenstaande bedragen verwerkt — het komt er dus bovenop.",
          "Bij het minimumloon van \u20AC 2.558 bruto per maand (40 uur) komt daar dus nog circa \u20AC 205 per maand aan vakantiegeld bij.",
        ],
      },
      {
        heading: "Met een CAO verdien je vaak meer",
        paragraphs: [
          "Het minimumloon is het absolute minimum. In de praktijk liggen salarissen bij werkgevers met een CAO aanzienlijk hoger. CAO-salarissen zijn gebaseerd op functieniveaus en salarisschalen die bijna altijd boven het wettelijk minimum liggen.",
          "Bovendien bieden CAO's vaak extra's die het minimumloon niet dekt: een dertiende maand, eindejaarsuitkering, hogere vakantiegeldpercentages of toeslagen voor onregelmatige diensten. Op Baan met CAO vind je vacatures waar deze voorwaarden transparant worden vermeld.",
        ],
      },
      {
        heading: "Wanneer wordt het minimumloon aangepast?",
        paragraphs: [
          "Het wettelijk minimumloon wordt twee keer per jaar aangepast: op 1 januari en op 1 juli. De aanpassing is gekoppeld aan de gemiddelde loonontwikkeling in Nederland. Houd de website van de Rijksoverheid in de gaten voor de meest actuele bedragen.",
          "Zoek je een baan die meer biedt dan het minimum? Op Baan met CAO vind je duizenden vacatures bij werkgevers die onder een collectieve arbeidsovereenkomst vallen — met duidelijke salarisschalen en eerlijke voorwaarden.",
        ],
      },
    ],
  },
  {
    slug: "thuiswerken-rechten-vergoeding-regels",
    title: "Thuiswerken in 2026: jouw rechten, vergoeding en de regels",
    description:
      "Mag je thuiswerken van je werkgever? Wat is de thuiswerkvergoeding in 2026? Ontdek je rechten rondom hybride werken en wat de wet zegt.",
    image: "/blog/thuiswerken.jpg",
    imageAlt: "Laptop op een bureau in een thuiswerkomgeving",
    date: "2026-02-15",
    readTime: "6 min",
    category: "Arbeidsrecht",
    keywords: [
      "thuiswerken rechten",
      "thuiswerkvergoeding 2026",
      "hybride werken",
      "wet flexibel werken",
      "thuiswerken regels",
    ],
    content: [
      {
        paragraphs: [
          "Thuiswerken is voor veel werknemers de normaalste zaak van de wereld geworden. Maar welke rechten heb je eigenlijk? Mag je werkgever een thuiswerkverzoek weigeren? En hoe zit het met de vergoeding? In dit artikel leggen we de regels rondom thuiswerken in 2026 helder uit.",
        ],
      },
      {
        heading: "Heb je recht op thuiswerken?",
        paragraphs: [
          "Thuiswerken is in Nederland geen absoluut recht. Wel kun je op basis van de Wet flexibel werken (Wfw) een verzoek indienen om je werkplek aan te passen. Je werkgever moet dit verzoek serieus overwegen en mag het alleen afwijzen als daar zwaarwegende bedrijfsbelangen tegenover staan.",
          "Om een verzoek in te dienen gelden drie voorwaarden: je bent minimaal 26 weken (een halfjaar) in dienst, het bedrijf heeft 10 of meer werknemers, en je dient het verzoek minimaal 2 maanden voor de gewenste ingangsdatum schriftelijk in.",
        ],
      },
      {
        heading: "Thuiswerkvergoeding 2026",
        paragraphs: [
          "In 2026 mag je werkgever een onbelaste thuiswerkvergoeding geven van maximaal \u20AC 2,45 per dag. Dit bedrag is bedoeld voor extra kosten die je thuis maakt, zoals elektriciteit, verwarming en internetgebruik. Let op: deze vergoeding is niet verplicht, tenzij het in je CAO of arbeidsovereenkomst is vastgelegd.",
          "Veel CAO's bevatten inmiddels afspraken over thuiswerkvergoedingen. Sommige gaan verder dan het fiscale maximum en bieden ook een eenmalige vergoeding voor de inrichting van je thuiswerkplek.",
        ],
      },
      {
        heading: "Arbo-verplichtingen bij thuiswerken",
        paragraphs: [
          "Je werkgever is ook verantwoordelijk voor een veilige en gezonde thuiswerkplek. Dit valt onder de zorgplicht uit de Arbowet. In de praktijk betekent dit dat je werkgever moet zorgen voor:",
        ],
        list: [
          "Een ergonomische werkplek — denk aan een goed bureau en stoel",
          "Voorlichting over gezond thuiswerken",
          "Een risico-inventarisatie die ook thuiswerk dekt",
          "Middelen om je werk goed uit te kunnen voeren (laptop, beeldscherm)",
        ],
      },
      {
        heading: "Hybride werken en je CAO",
        paragraphs: [
          "Steeds meer CAO's bevatten specifieke afspraken over hybride werken. Dit kan gaan over het aantal thuiswerkdagen, de vergoeding, het recht op een thuiswerkplek en de bereikbaarheid tijdens thuiswerkdagen. Als je werkgever onder een CAO valt, check dan of er afspraken over thuiswerken in staan.",
          "Bij het zoeken naar een nieuwe baan is het slim om vooraf te vragen naar het thuiswerkbeleid. Op Baan met CAO vind je vacatures bij werkgevers met een CAO, waar dit soort afspraken vaak goed geregeld zijn.",
        ],
      },
      {
        heading: "Tips voor succesvol thuiswerken",
        paragraphs: [
          "Of je nu twee of vijf dagen thuiswerkt, met een paar simpele gewoontes haal je er meer uit:",
        ],
        list: [
          "Creeer een vaste werkplek — niet je bank, maar een bureau waar je geconcentreerd kunt werken",
          "Houd vaste werktijden aan en neem echte pauzes",
          "Communiceer duidelijk met je team over je beschikbaarheid",
          "Zorg voor voldoende beweging en frisse lucht tussendoor",
          "Maak afspraken met je werkgever over verwachtingen en bereikbaarheid",
        ],
      },
      {
        heading: "Conclusie",
        paragraphs: [
          "Thuiswerken is geen recht, maar je werkgever mag een verzoek niet zomaar afwijzen. Met de thuiswerkvergoeding van \u20AC 2,45 per dag en de arbo-verplichtingen van je werkgever ben je in 2026 beter beschermd dan ooit. Zoek je een baan met goede thuiswerkmogelijkheden? Bekijk de vacatures op Baan met CAO.",
        ],
      },
    ],
  },
  {
    slug: "proeftijd-regels-rechten-ontslag",
    title: "Proeftijd: dit zijn de regels en jouw rechten in 2026",
    description:
      "Hoe lang duurt een proeftijd? Kun je zomaar ontslagen worden? Ontdek alle regels rondom de proeftijd en wat je rechten zijn als werknemer.",
    image: "/blog/proeftijd.jpg",
    imageAlt: "Twee personen werken samen achter een laptop",
    date: "2026-02-10",
    readTime: "5 min",
    category: "Arbeidsrecht",
    keywords: [
      "proeftijd",
      "proeftijd regels",
      "ontslag proeftijd",
      "proeftijd rechten",
      "hoe lang duurt proeftijd",
      "proeftijd opzeggen",
    ],
    content: [
      {
        paragraphs: [
          "Je bent net begonnen aan een nieuwe baan en zit in je proeftijd. Spannend, maar ook onzeker: kun je zomaar ontslagen worden? En mag jij zelf ook direct weg? De proeftijd kent specifieke regels die je als werknemer moet kennen. In dit artikel leggen we alles uit.",
        ],
      },
      {
        heading: "Wat is een proeftijd?",
        paragraphs: [
          "Een proeftijd is een periode aan het begin van je arbeidsovereenkomst waarin zowel jij als je werkgever het dienstverband per direct kunnen beeindigen — zonder opzegtermijn en zonder reden te hoeven geven. Het is bedoeld om te kijken of de samenwerking bevalt.",
          "Een proeftijd is niet verplicht. Het moet expliciet schriftelijk worden overeengekomen in je arbeidscontract. Is er niets over een proeftijd opgenomen? Dan heb je er ook geen.",
        ],
      },
      {
        heading: "Hoe lang mag een proeftijd duren?",
        paragraphs: [
          "De maximale duur van een proeftijd hangt af van het type contract:",
        ],
        list: [
          "Tijdelijk contract van 6 maanden of korter: geen proeftijd toegestaan",
          "Tijdelijk contract langer dan 6 maanden maar korter dan 2 jaar: maximaal 1 maand",
          "Tijdelijk contract van 2 jaar of langer: maximaal 2 maanden",
          "Vast contract (onbepaalde tijd): maximaal 2 maanden",
        ],
      },
      {
        heading: "Ontslag tijdens de proeftijd",
        paragraphs: [
          "Tijdens de proeftijd kan zowel de werkgever als de werknemer het contract direct opzeggen. Er geldt geen opzegtermijn. Je werkgever hoeft in principe geen reden te geven, maar er zijn grenzen. Ontslag mag niet gebaseerd zijn op discriminatie (leeftijd, geslacht, afkomst, religie) of andere verboden gronden.",
          "Als je werkgever je ontslaat en je vraagt om een reden, dan is hij verplicht die schriftelijk te geven. Vermoed je dat het ontslag discriminerend is? Dan kun je dit aanvechten bij de rechter.",
        ],
      },
      {
        heading: "Jouw rechten bij ontslag in de proeftijd",
        paragraphs: [
          "Ook bij ontslag in de proeftijd heb je rechten:",
        ],
        list: [
          "Transitievergoeding — sinds 2020 heb je vanaf dag 1 recht op een transitievergoeding bij ontslag door de werkgever",
          "WW-uitkering — als je ontslagen wordt (niet zelf opzegt) en je voldoet aan de voorwaarden, kun je WW aanvragen",
          "Geen concurrentiebeding — een concurrentiebeding in een tijdelijk contract is in principe niet geldig, tenzij de werkgever kan aantonen dat het noodzakelijk is",
          "Recht op uitleg — je werkgever moet op jouw verzoek schriftelijk motiveren waarom je ontslagen bent",
        ],
      },
      {
        heading: "Proeftijd en CAO",
        paragraphs: [
          "In sommige CAO's zijn afspraken gemaakt over de proeftijd die afwijken van de wet. Een CAO kan de proeftijd bijvoorbeeld verkorten of extra bescherming bieden. Het is altijd slim om je CAO te raadplegen als je wilt weten welke regels er voor jou gelden.",
          "Op Baan met CAO vind je vacatures bij werkgevers die onder een CAO vallen. Zo weet je vooraf dat je extra bescherming geniet — ook tijdens de proeftijd.",
        ],
      },
    ],
  },
  {
    slug: "ontslag-nemen-opzegtermijn-checklist",
    title: "Ontslag nemen: opzegtermijn, vakantiedagen en checklist",
    description:
      "Wil je ontslag nemen? Lees hier alles over de opzegtermijn, je vakantiedagen, WW-rechten en wat je moet regelen voordat je vertrekt.",
    image: "/blog/ontslag-nemen.jpg",
    imageAlt: "Professional in pak bij een kantoorgebouw",
    date: "2026-02-05",
    readTime: "7 min",
    category: "Arbeidsrecht",
    keywords: [
      "ontslag nemen",
      "opzegtermijn",
      "zelf ontslag nemen",
      "vakantiedagen bij ontslag",
      "ontslagbrief",
      "opzeggen baan",
    ],
    content: [
      {
        paragraphs: [
          "Je hebt besloten om ontslag te nemen. Misschien heb je een betere baan gevonden, of ben je toe aan iets nieuws. Hoe dan ook: er komt meer bij kijken dan alleen je baas inlichten. Van opzegtermijn tot openstaande vakantiedagen — in dit artikel lees je precies wat je moet weten en regelen.",
        ],
      },
      {
        heading: "Wat is je opzegtermijn?",
        paragraphs: [
          "Als werknemer is je wettelijke opzegtermijn standaard 1 maand. Dit betekent dat je minimaal een volle kalendermaand voor je gewenste vertrekdatum moet opzeggen. Zeg je op 15 maart op? Dan is je laatste werkdag pas 30 april.",
          "Let op: in je arbeidsovereenkomst of CAO kan een andere opzegtermijn staan. Sommige contracten hanteren 2 maanden, en in bepaalde CAO's zijn afwijkende termijnen afgesproken. Check dit altijd voordat je opzegt.",
        ],
      },
      {
        heading: "Hoe zeg je op?",
        paragraphs: [
          "Formeel gezien mag je mondeling opzeggen, maar doe het altijd ook schriftelijk. Stuur een brief of e-mail aan je werkgever met daarin:",
        ],
        list: [
          "De mededeling dat je je arbeidsovereenkomst opzegt",
          "De datum van opzegging",
          "Je beoogde laatste werkdag (rekening houdend met de opzegtermijn)",
          "Eventueel een korte bedanking voor de samenwerking",
        ],
      },
      {
        heading: "Vakantiedagen bij ontslag",
        paragraphs: [
          "Bij het einde van je dienstverband heb je recht op uitbetaling van je openstaande vakantiedagen. Dit geldt voor zowel wettelijke als bovenwettelijke dagen. Je werkgever kan je ook vragen om de dagen op te nemen tijdens je opzegtermijn — maar dat kan alleen in overleg, niet eenzijdig.",
          "Check je loonstrook of HR-systeem voor het exacte aantal openstaande dagen. Wettelijke vakantiedagen vervallen 6 maanden na het jaar waarin ze zijn opgebouwd, bovenwettelijke dagen pas na 5 jaar.",
        ],
      },
      {
        heading: "Wat gebeurt er met je WW-rechten?",
        paragraphs: [
          "Als je zelf ontslag neemt, heb je in principe geen recht op een WW-uitkering. Het UWV beschouwt dit als verwijtbaar werkloos. Er zijn uitzonderingen, bijvoorbeeld als je om medische redenen of vanwege een onveilige werksituatie ontslag neemt, maar dit moet je goed kunnen onderbouwen.",
          "Neem je ontslag omdat je een andere baan hebt? Zorg dan dat je een getekend arbeidscontract van je nieuwe werkgever hebt voordat je opzegt. Zo voorkom je dat je zonder inkomen komt te zitten.",
        ],
      },
      {
        heading: "Checklist: ontslag nemen",
        paragraphs: [
          "Voordat je ontslag neemt, loop deze checklist door:",
        ],
        list: [
          "Check je opzegtermijn in je contract of CAO",
          "Zorg dat je een nieuw contract hebt (indien van toepassing)",
          "Bereken je openstaande vakantiedagen en vakantiegeld",
          "Zeg schriftelijk op en bewaar een kopie",
          "Maak afspraken over je eindafrekening (vakantiedagen, vakantiegeld, eventuele bonus)",
          "Vraag om een getuigschrift of referentie",
          "Lever bedrijfseigendommen in (laptop, telefoon, pasjes)",
          "Informeer je collega's en draag je werk netjes over",
        ],
      },
      {
        heading: "Ontslag nemen en je CAO",
        paragraphs: [
          "Werk je bij een werkgever met een CAO? Dan kunnen er aanvullende afspraken gelden rondom opzegtermijnen en uitdiensttreding. Sommige CAO's kennen een langere opzegtermijn voor specifieke functies of bieden extra vergoedingen bij vertrek.",
          "Op zoek naar een nieuwe uitdaging? Op Baan met CAO vind je duizenden vacatures bij werkgevers met transparante arbeidsvoorwaarden. Een goede volgende stap begint met een eerlijke werkgever.",
        ],
      },
    ],
  },
  {
    slug: "vast-of-tijdelijk-contract-verschillen",
    title: "Vast of tijdelijk contract: wat zijn de verschillen?",
    description:
      "Wat is het verschil tussen een vast en tijdelijk contract? Leer over de voor- en nadelen, de ketenregeling en wanneer je recht hebt op een vast contract.",
    image: "/blog/vast-tijdelijk-contract.jpg",
    imageAlt: "Rekenmachine op documenten als symbool voor contractkeuzes",
    date: "2026-01-28",
    readTime: "6 min",
    category: "Arbeidsrecht",
    keywords: [
      "vast contract",
      "tijdelijk contract",
      "verschil vast tijdelijk",
      "ketenregeling",
      "contract voor onbepaalde tijd",
      "arbeidsovereenkomst",
    ],
    content: [
      {
        paragraphs: [
          "Als je solliciteert of net een baan hebt gevonden, krijg je te maken met het type contract dat je aangeboden wordt. Is het een tijdelijk of een vast contract? En wat betekent dat precies voor je rechten en zekerheid? In dit artikel leggen we de verschillen helder uit.",
        ],
      },
      {
        heading: "Wat is een tijdelijk contract?",
        paragraphs: [
          "Een tijdelijk contract (ook wel contract voor bepaalde tijd) heeft een vaste begin- en einddatum. Na de einddatum eindigt het contract automatisch, tenzij het verlengd wordt. Je werkgever moet je wel uiterlijk een maand voor het einde laten weten of het contract verlengd wordt — dit heet de aanzegplicht.",
          "Een tijdelijk contract kan varieren van een paar maanden tot maximaal 3 jaar. De voorwaarden staan vast voor de duur van het contract en het kan tussentijds alleen opgezegd worden als dat expliciet in het contract is opgenomen.",
        ],
      },
      {
        heading: "Wat is een vast contract?",
        paragraphs: [
          "Een vast contract (contract voor onbepaalde tijd) heeft geen einddatum. Dit biedt de meeste zekerheid: je werkgever kan je niet zomaar ontslaan. Ontslag is alleen mogelijk via het UWV of de kantonrechter, en dan moet er een geldige reden zijn — zoals bedrijfseconomische redenen of disfunctioneren.",
          "Met een vast contract heb je ook een betere positie bij het aanvragen van een hypotheek of het huren van een woning. Banken en verhuurders zien een vast contract als bewijs van inkomenszekerheid.",
        ],
      },
      {
        heading: "De ketenregeling: wanneer krijg je een vast contract?",
        paragraphs: [
          "De wet beschermt werknemers tegen eindeloze tijdelijke contracten via de ketenregeling. Je krijgt automatisch een vast contract als:",
        ],
        list: [
          "Je meer dan 3 tijdelijke contracten achter elkaar hebt gehad bij dezelfde werkgever",
          "Je langer dan 3 jaar aan tijdelijke contracten hebt gewerkt bij dezelfde werkgever",
          "De keten wordt pas doorbroken als er een onderbreking is van meer dan 6 maanden",
        ],
      },
      {
        heading: "Voor- en nadelen op een rij",
        paragraphs: [
          "Beide contractvormen hebben hun eigen voor- en nadelen. Een tijdelijk contract biedt flexibiliteit maar minder zekerheid. Een vast contract biedt maximale zekerheid maar minder bewegingsvrijheid. Dit zijn de belangrijkste verschillen:",
        ],
        list: [
          "Ontslagbescherming — bij een vast contract veel sterker dan bij tijdelijk",
          "Hypotheek — met een vast contract aanzienlijk makkelijker",
          "Proeftijd — bij een kort tijdelijk contract is geen proeftijd toegestaan",
          "Opzegtermijn — bij een vast contract geldt een opzegtermijn die oploopt met dienstjaren",
          "Flexibiliteit — een tijdelijk contract geeft je een natuurlijk moment om van baan te wisselen",
        ],
      },
      {
        heading: "Contract en CAO",
        paragraphs: [
          "Een CAO kan aanvullende regels bevatten over contracten. Sommige CAO's beperken het aantal tijdelijke contracten of verkorten de keten. Andere CAO's geven werknemers sneller recht op een vast contract. Dit is een van de redenen waarom een CAO waardevol is: het biedt extra bescherming bovenop de wet.",
          "In bepaalde sectoren, zoals de zorg en het onderwijs, zijn er via de CAO speciale regels over wanneer een tijdelijk contract automatisch omgezet wordt naar een vast contract.",
        ],
      },
      {
        heading: "Conclusie",
        paragraphs: [
          "Of je nu een vast of tijdelijk contract krijgt aangeboden: het is belangrijk om te weten wat je rechten zijn. Een vast contract biedt de meeste zekerheid, maar ook met een tijdelijk contract kun je via de ketenregeling doorgroeien naar een vaste aanstelling.",
          "Op Baan met CAO vind je vacatures bij werkgevers die onder een CAO vallen. Zo weet je dat je extra bescherming geniet — ongeacht het type contract. Hetzelfde werk, betere voorwaarden.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
