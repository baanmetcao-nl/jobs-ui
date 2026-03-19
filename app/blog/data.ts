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
          "Stel je voor: je krijgt twee aanbiedingen. Allebei dezelfde functie, allebei hetzelfde salaris. Het enige verschil? De ene werkgever valt onder een CAO, de andere niet. Klinkt misschien als een detail, maar het kan je duizenden euro's per jaar schelen. En toch weten verrassend veel mensen niet precies wat een CAO inhoudt.",
        ],
      },
      {
        heading: "Eerst even de basis",
        paragraphs: [
          "CAO staat voor Collectieve Arbeidsovereenkomst. Het is een deal tussen vakbonden en werkgevers (of werkgeversorganisaties) over de spelregels op het werk. Denk aan salaris, vakantiedagen, pensioen, overwerktoeslagen — eigenlijk alles wat je arbeidsvoorwaarden noemt.",
          "Het mooie: die afspraken gelden voor iedereen die onder die CAO valt. Je hoeft er niet eens lid van een vakbond voor te zijn. In Nederland bestaan er meer dan 700 verschillende CAO's, van sector-breed (CAO Retail, CAO Zorg) tot bedrijfsspecifiek (denk aan KLM of Philips).",
        ],
      },
      {
        heading: "Wat regelt zo'n CAO dan concreet?",
        paragraphs: [
          "Meer dan je denkt. De meeste mensen associëren het met salaris, maar een CAO gaat veel verder dan dat:",
        ],
        list: [
          "Salarisschalen — je weet precies wat je kunt verdienen en wanneer je erop vooruitgaat",
          "Vakantiedagen — vrijwel altijd meer dan de wettelijke 20 dagen",
          "Vakantiegeld — minimaal 8%, maar sommige CAO's gaan hoger",
          "Pensioen — je werkgever draagt mee aan je opbouw, vaak twee derde van de premie",
          "Toeslagen voor avond-, nacht- en weekendwerk",
          "Aanvulling op je loon als je ziek wordt",
          "Ontslagprocedures en -bescherming",
          "Budget voor opleidingen en cursussen",
        ],
      },
      {
        heading: "Waarom zou je hierop letten bij het solliciteren?",
        paragraphs: [
          "Drie redenen. Ten eerste: zekerheid. Alles staat zwart op wit. Je werkgever kan niet op een ochtend besluiten om je vakantiedagen te halveren of je overwerkvergoeding te schrappen. Bij een werkgever zonder CAO gelden alleen de wettelijke minimumregels — en die zijn, eerlijk gezegd, vrij karig.",
          "Ten tweede: geld. CAO-voorwaarden zijn bijna altijd beter dan het wettelijk minimum. Meer vakantiedagen, hogere salarissen, betere pensioenopbouw. Dat tikt aan. Over een hele carrière praat je al snel over tienduizenden euro's verschil.",
          "Ten derde: gelijkheid. Iedereen met dezelfde functie en ervaring krijgt hetzelfde. Geen willekeur, geen 'gunfactor'. Dat klinkt misschien vanzelfsprekend, maar zonder CAO is je salaris volledig afhankelijk van hoe goed je hebt onderhandeld — en niet iedereen is daar even bedreven in.",
        ],
      },
      {
        heading: "Hoe kom je erachter of een werkgever een CAO heeft?",
        paragraphs: [
          "Helaas vermelden lang niet alle vacatures dit. Soms staat het er wel ('wij vallen onder de CAO Metaal & Techniek'), maar vaak ook niet. Je kunt het op een paar manieren achterhalen: gewoon vragen tijdens het sollicitatiegesprek (volkomen normaal), de website van het ministerie van SZW raadplegen voor algemeen verbindend verklaarde CAO's, of zoeken via de vakbond in jouw sector.",
          "Of je zoekt op een platform dat dit al voor je uitfiltert. Wij tonen op Baan met CAO alleen vacatures van werkgevers die onder een collectieve arbeidsovereenkomst vallen, zodat je daar niet zelf achteraan hoeft.",
        ],
      },
      {
        heading: "Geen CAO — is dat erg?",
        paragraphs: [
          "Niet per definitie. Er zijn genoeg werkgevers zonder CAO die prima voorwaarden bieden. Maar je moet dan wel zelf goed opletten. Zonder CAO gelden alleen de minimumregels uit het Burgerlijk Wetboek en de Wet minimumloon. In de praktijk betekent dat vaker: minder vakantiedagen, geen duidelijke salarisstructuur, en vraagtekens bij pensioen en overwerkvergoeding.",
          "Mijn advies: als je twijfelt tussen twee werkgevers, weeg dan de CAO mee als een serieuze factor. Het is niet het enige dat telt, maar het zegt wel iets over hoe een werkgever met z'n mensen omgaat.",
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
          "Er zijn van die sollicitatietips die iedereen kent. 'Wees jezelf.' 'Doe je onderzoek.' 'Kom op tijd.' Klopt allemaal, maar het zijn open deuren. Hier tien tips die wat concreter zijn — dingen die ik in de praktijk echt verschil zie maken.",
        ],
      },
      {
        heading: "1. Stuur nooit twee keer hetzelfde CV",
        paragraphs: [
          "Dit klinkt als veel werk, maar het hoeft niet. Je hoeft niet elke keer je hele CV om te gooien. Lees de vacature, en schuif de ervaring die het best aansluit naar boven. Gebruik dezelfde woorden als in de vacaturetekst. Recruiters scannen je CV gemiddeld 6 tot 7 seconden — in die tijd moet het klikken.",
          "Wat ook helpt: schrap irrelevante bijbaantjes of stages die niets toevoegen. Een strak CV van één pagina maakt meer indruk dan drie kantjes met alles wat je ooit hebt gedaan.",
        ],
      },
      {
        heading: "2. Je motivatiebrief is geen samenvatting van je CV",
        paragraphs: [
          "De grootste fout die mensen maken: hun motivatiebrief gebruiken om hun CV na te vertellen. Dat is dubbel werk voor de recruiter. Gebruik de brief om te vertellen waaróm je bij dit bedrijf wilt werken en wat jou drijft. Noem een specifiek project, een recente ontwikkeling, of iets dat je aansprak op hun website. Laat zien dat je niet dezelfde brief naar dertig bedrijven stuurt.",
        ],
      },
      {
        heading: "3. Google het bedrijf alsof je er gaat investeren",
        paragraphs: [
          "Kijk verder dan de 'Over ons'-pagina. Check hun LinkedIn, lees recente nieuwsartikelen, zoek reviews op Glassdoor of Indeed. Heeft het bedrijf recent een prijs gewonnen? Zijn ze aan het groeien? Zit er een reorganisatie aan te komen? Hoe meer je weet, hoe beter je vragen kunt stellen tijdens het gesprek. En werkgevers merken dat. Direct.",
        ],
      },
      {
        heading: "4. LinkedIn is je stille verkoper",
        paragraphs: [
          "Recruiters zoeken actief op LinkedIn. Dat betekent dat je profiel voor je werkt, ook als je er niet achter zit. Zorg voor een professionele foto (geen vakantiefoto, geen selfie), een kopregel die meer zegt dan je functietitel, en concrete resultaten bij je werkervaring. 'Verantwoordelijk voor sales' zegt niets. '37% omzetgroei gerealiseerd in Q3' zegt alles.",
          "Tip: zet 'Open to work' aan, maar maak het alleen zichtbaar voor recruiters als je nog ergens in dienst bent. Zo voorkom je ongemakkelijke situaties.",
        ],
      },
      {
        heading: "5. Oefen de voorspelbare vragen tot je ze zat bent",
        paragraphs: [
          "Ja, ze zijn voorspelbaar. Nee, dat betekent niet dat je ze kunt improviseren. 'Vertel eens iets over jezelf' klinkt simpel, maar de meeste mensen rammelen er een chaotisch verhaal uit. Oefen je antwoord hardop — voor de spiegel, tegen je partner, tegen je kat. Het maakt niet uit. Zolang je het maar een keer hebt uitgesproken voordat je tegenover die hiring manager zit.",
        ],
        list: [
          "'Vertel eens iets over jezelf' — max 2 minuten, professioneel, eindig met waarom je hier zit",
          "'Waarom wil je hier werken?' — laat zien dat je het bedrijf kent",
          "'Wat zijn je zwakke punten?' — wees eerlijk, maar laat zien dat je eraan werkt",
          "'Waar zie je jezelf over 5 jaar?' — ambitieus maar realistisch",
        ],
      },
      {
        heading: "6. Vraag naar de arbeidsvoorwaarden — daar is niets mis mee",
        paragraphs: [
          "Ik snap dat het spannend voelt, maar vragen naar salaris, vakantiedagen en pensioen is volkomen normaal. Sterker nog: een werkgever die daar moeilijk over doet, vertelt je eigenlijk al iets. Een goede vraag: 'Valt het bedrijf onder een CAO?' Dat zegt veel over de kwaliteit van de voorwaarden en de transparantie van de werkgever.",
        ],
      },
      {
        heading: "7. Stuur een bedankmailtje na het gesprek",
        paragraphs: [
          "Klein gebaar, groot effect. De meeste kandidaten doen het niet, dus je valt er meteen mee op. Stuur binnen 24 uur een kort mailtje: bedank voor het gesprek, noem iets specifieks dat je is bijgebleven, bevestig je interesse. Drie zinnen, meer hoeft niet.",
        ],
      },
      {
        heading: "8. Lieg niet op je CV",
        paragraphs: [
          "Klinkt voor de hand liggend, maar het gebeurt vaker dan je denkt. En het komt altijd uit — of tijdens het gesprek, of tijdens je eerste werkweken. Als je bepaalde ervaring niet hebt, zeg dat. Laat zien dat je leergierig bent. Eerlijkheid wint het altijd van een opgeblazen CV dat je niet kunt waarmaken.",
        ],
      },
      {
        heading: "9. Ruim je digitale voetafdruk op",
        paragraphs: [
          "Google jezelf eens. Serieus. Werkgevers doen het ook. Staan er openbare Instagram-posts of oude forumberichten die je liever niet op tafel hebt tijdens een sollicitatie? Ruim het op of zet het op privé. Je online imago is onderdeel van je eerste indruk, of je dat nu leuk vindt of niet.",
        ],
      },
      {
        heading: "10. Een afwijzing is geen eindstation",
        paragraphs: [
          "Gemiddeld solliciteer je 10 tot 15 keer voordat je iets vindt. Dat is normaal. Vraag altijd om feedback na een afwijzing — niet elk bedrijf doet het, maar als je het wel krijgt, is het goud waard. En onthoud: een afwijzing zegt lang niet altijd iets over jou. Soms is het gewoon timing, of was er een interne kandidaat.",
        ],
      },
    ],
  },
  {
    slug: "salarisonderhandeling-tips-hoger-salaris",
    title: "Salarisonderhandeling: zo vraag je het salaris dat je verdient",
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
          "Laten we eerlijk zijn: de meeste mensen vinden salarisonderhandeling doodeng. En dus doen ze het niet. Volgens onderzoek van Nationale Vacaturebank onderhandelt slechts 39% van de werknemers bij een nieuwe baan over het salaris. De rest accepteert het eerste bod.",
          "Dat is zonde. Want het verschil tussen wel en niet onderhandelen kan al snel 5.000 tot 10.000 euro per jaar zijn. En dat effect stapelt op: over een carrière van 30 jaar praat je dan over tonnen — inclusief het doorwerken in pensioenopbouw en vakantiegeld.",
        ],
      },
      {
        heading: "Weet wat je waard bent voordat je je mond opendoet",
        paragraphs: [
          "De grootste fout: het gesprek ingaan zonder cijfers. Als je niet weet wat gangbaar is voor jouw functie, ervaring en regio, dan sta je met lege handen. Check het Nationaal Salaris Onderzoek, kijk op vacaturesites die salarissen vermelden, en vraag in je netwerk. Hoe concreter je cijfers, hoe sterker je positie.",
          "Werk je bij een werkgever met een CAO? Dan heb je een extra troef. De salarisschalen liggen vast en zijn openbaar. Je kunt precies zien in welke schaal je thuishoort, wat het maximum is, en of je onderbetaald wordt. Dat maakt het gesprek een stuk makkelijker.",
        ],
      },
      {
        heading: "Bouw je zaak op feiten, niet op gevoel",
        paragraphs: [
          "'Ik vind dat ik meer verdien' is geen argument. 'Ik heb de klanttevredenheid met 15% verhoogd en twee nieuwe processen geïmplementeerd die het team 4 uur per week besparen' — dát is een argument. Verzamel concrete voorbeelden van wat je hebt bijgedragen:",
        ],
        list: [
          "Meetbare resultaten: omzet, besparingen, klanttevredenheid",
          "Extra taken die je hebt opgepakt buiten je functieomschrijving",
          "Opleidingen, certificaten of cursussen die je hebt afgerond",
          "Positieve feedback die je hebt gekregen van klanten of leidinggevenden",
        ],
      },
      {
        heading: "Timing is alles",
        paragraphs: [
          "Het beste moment voor een salarisgesprek is na een succes. Je hebt net een groot project afgerond, een moeilijke klant binnengehaald, of je jaarlijkse beoordeling was uitstekend. Dat is wanneer je waarde het meest zichtbaar is.",
          "Het slechtste moment: wanneer het bedrijf net heeft gereorganiseerd, wanneer je baas gestrest is, of 'even tussendoor' bij de koffieautomaat. Plan het als een echt gesprek. Serieus nemen van het moment laat zien dat je het serieus meent.",
        ],
      },
      {
        heading: "Noem het eerste getal",
        paragraphs: [
          "Dit is contraintuïtief, maar het werkt. Wie het eerste getal noemt, zet het anker. Als jij zegt '55.000 tot 60.000', dan beweegt het gesprek rond die range. Als je wacht tot de werkgever een getal noemt, loop je het risico dat hun anker veel lager ligt.",
          "Noem een specifiek bedrag of een smalle range. En onderbouw het met je onderzoek. 'Op basis van mijn ervaring en de marktgegevens denk ik aan een salaris rond de 57.000 euro' klinkt een stuk sterker dan 'ik wil graag iets meer verdienen'.",
        ],
      },
      {
        heading: "Nee is niet het einde van het gesprek",
        paragraphs: [
          "Soms is het gevraagde salaris er simpelweg niet. Dat hoeft niet te betekenen dat je met lege handen weggaat. Onderhandel over andere voorwaarden: een extra vakantiedag, een thuiswerkdag, opleidingsbudget, of een eenmalige bonus. Bij werkgevers met een CAO zit hier soms verrassend veel ruimte — denk aan een hogere inschaling, snellere doorgroei, of een persoonlijke toeslag.",
          "Het belangrijkste: durf het gesprek aan te gaan. Het ergste dat kan gebeuren is een 'nee'. En zelfs dan weet je waar je staat.",
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
          "Veel werknemers denken: 'Ik heb een contract, dus mijn rechten zijn geregeld.' En ja, dat klopt — deels. De wet beschermt je op een basisniveau. Maar dat basisniveau is lager dan de meeste mensen beseffen. Een CAO tilt je rechten naar een heel ander niveau. Laat me dat concreet maken.",
        ],
      },
      {
        heading: "Vakantiedagen: 20 is het minimum, niet de standaard",
        paragraphs: [
          "De wet geeft je als fulltime werknemer recht op 20 vakantiedagen. Punt. Dat is vier weken. Klinkt redelijk, tot je beseft dat de meeste CAO's 25 tot 34 dagen bieden. In de CAO Zorg krijg je bijvoorbeeld tot 34 dagen, afhankelijk van je leeftijd en dienstjaren. De CAO Metaal & Techniek zit op 25 dagen plus eventuele seniorendagen.",
          "En dan zijn er nog de bijzondere verlofdagen. Trouwen? Verhuizen? Overlijden van een naaste? De meeste CAO's regelen hier extra vrije dagen voor. Zonder CAO ben je afhankelijk van de goodwill van je werkgever. Soms is die er, soms niet.",
        ],
      },
      {
        heading: "Salaris: weten waar je aan toe bent",
        paragraphs: [
          "Een CAO legt salarisschalen vast. Je weet precies wat het minimum en maximum is voor jouw functie, en wanneer je in aanmerking komt voor een verhoging — meestal jaarlijks, via een zogenaamde periodiek.",
          "Zonder CAO is het een ander verhaal. Dan hangt je salaris volledig af van wat je zelf hebt onderhandeld. Dat kan prima uitpakken als je een sterke onderhandelaar bent. Maar het leidt ook tot situaties waarin collega's die exact hetzelfde werk doen, flink verschillende salarissen krijgen. Niet omdat ze beter zijn, maar omdat de een beter heeft onderhandeld dan de ander.",
        ],
      },
      {
        heading: "Pensioen: de spaarpot die je niet ziet",
        paragraphs: [
          "De meeste CAO's verplichten werkgevers om een pensioenregeling aan te bieden, waarbij de werkgever vaak twee derde van de premie betaalt. Dat is gratis geld voor je toekomst. Zonder CAO is een werkgever hier niet toe verplicht — tenzij er een verplicht bedrijfstakpensioenfonds geldt.",
          "Het vervelende: je merkt het gemis pas als je met pensioen gaat. Werknemers die jaren zonder pensioenopbouw werken, komen er op hun 67e achter dat het gat in hun opbouw niet meer te dichten is.",
        ],
      },
      {
        heading: "Ziek worden: het verschil is pijnlijk",
        paragraphs: [
          "Wettelijk moet je werkgever bij ziekte minimaal 70% van je loon doorbetalen. Dat klinkt oké, tot je beseft dat 70% van een modaal salaris betekent dat je netto honderden euro's per maand minder overhoudt. Terwijl je zorgkosten juist oplopen.",
          "Veel CAO's bieden aanzienlijk betere voorwaarden. In de CAO Bouw wordt het eerste jaar 100% doorbetaald. Bij de overheid zelfs twee jaar lang 100%. Dat maakt een enorm verschil als je onverhoopt langdurig uitvalt.",
        ],
      },
      {
        heading: "Overwerk: gratis of vergoed?",
        paragraphs: [
          "Werk je regelmatig 's avonds of in het weekend? Met een CAO krijg je daar bijna altijd extra vergoeding voor. De CAO Horeca geeft 150% op zondag en 200% op feestdagen. Zonder CAO is je werkgever alleen verplicht je het afgesproken uurloon te betalen — ook om 23:00 op een zaterdag. Toeslagen zijn dan puur afhankelijk van wat je individueel hebt afgesproken.",
        ],
      },
      {
        heading: "Ontslag: een vangnet als het tegenzit",
        paragraphs: [
          "CAO's bevatten vaak aanvullende regels rondom ontslag die verder gaan dan de wet: langere opzegtermijnen, hoorprocedures, soms zelfs een sociaal plan bij reorganisaties met een onafhankelijke commissie die meekijkt. Dat geeft je een buffer op het moment dat je die het hardst nodig hebt.",
          "Kortom: een CAO is geen luxe, het is een serieuze factor in je arbeidsvoorwaarden. Niet het enige dat telt bij het kiezen van een werkgever, maar wel iets om bewust mee te wegen.",
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
          "Sinds 2024 werkt Nederland met een wettelijk minimumuurloon in plaats van een maandloon. Eerlijker, want of je nu 36, 38 of 40 uur werkt — het minimale uurloon is hetzelfde. Per 1 januari 2026 is dat vastgesteld op \u20AC 14,71 bruto per uur voor iedereen van 21 jaar en ouder.",
        ],
      },
      {
        heading: "Wat betekent dat per maand?",
        paragraphs: [
          "Hangt af van je contracturen. Dit zijn de bruto maandbedragen per 1 januari 2026:",
        ],
        list: [
          "36 uur per week: circa \u20AC 2.302 per maand",
          "38 uur per week: circa \u20AC 2.430 per maand",
          "40 uur per week: circa \u20AC 2.558 per maand",
        ],
      },
      {
        heading: "Minimumjeugdloon",
        paragraphs: [
          "Ben je jonger dan 21? Dan geldt een percentage van het volwassen minimumloon. De bedragen per 1 januari 2026:",
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
        heading: "Vergeet je vakantiegeld niet",
        paragraphs: [
          "Bovenop het minimumloon heb je recht op vakantiegeld: minimaal 8% van je bruto jaarsalaris. Wordt meestal in mei of juni uitbetaald en zit niet in de bovenstaande bedragen verwerkt. Bij een maandloon van \u20AC 2.558 (40 uur) is dat dus nog eens circa \u20AC 205 per maand extra.",
        ],
      },
      {
        heading: "Minimumloon vs. CAO-loon",
        paragraphs: [
          "Het minimumloon is het absolute bodemtarief. In de praktijk verdien je bij een werkgever met een CAO vrijwel altijd meer, omdat CAO-salarisschalen zijn gebaseerd op functieniveaus die boven het wettelijke minimum liggen. Daar komen vaak nog extra's bij: een dertiende maand, eindejaarsuitkering, hogere vakantiegeldpercentages, of toeslagen voor onregelmatige diensten.",
          "Het verschil is het grootst bij startersfuncties. Waar het minimumloon stopt bij \u20AC 14,71, begint een CAO-startersloon in veel sectoren rond de \u20AC 15,50 tot \u20AC 17,00 per uur — met een duidelijk pad naar boven.",
        ],
      },
      {
        heading: "Wanneer verandert het?",
        paragraphs: [
          "Het wettelijk minimumloon wordt twee keer per jaar aangepast: op 1 januari en 1 juli. De aanpassing volgt de gemiddelde loonontwikkeling in Nederland. De meest actuele bedragen vind je altijd op rijksoverheid.nl.",
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
          "Thuiswerken voelt inmiddels als een verworven recht. Maar is het dat ook juridisch? Het korte antwoord: nee, niet helemaal. Het iets langere antwoord: je staat sterker dan je misschien denkt.",
        ],
      },
      {
        heading: "Kun je thuiswerken afdwingen?",
        paragraphs: [
          "Niet echt. Er bestaat in Nederland geen absoluut recht op thuiswerken. Wat er wel is: de Wet flexibel werken (Wfw). Die geeft je het recht om een verzoek in te dienen om je werkplek aan te passen. Je werkgever moet dat verzoek serieus behandelen en mag het alleen afwijzen als daar zwaarwegende bedrijfsbelangen tegenover staan.",
          "De voorwaarden: je bent minimaal een halfjaar in dienst, het bedrijf heeft 10 of meer werknemers, en je dient het verzoek minstens 2 maanden van tevoren schriftelijk in. In de praktijk wordt de lat voor 'zwaarwegende bedrijfsbelangen' vrij hoog gelegd door rechters, dus een werkgever kan niet zomaar 'nee' zeggen zonder goede reden.",
        ],
      },
      {
        heading: "De thuiswerkvergoeding: \u20AC 2,45 per dag",
        paragraphs: [
          "In 2026 mag je werkgever een onbelaste thuiswerkvergoeding geven van maximaal \u20AC 2,45 per dag. Bedoeld voor stroom, verwarming en internet. Belangrijk detail: dit is een máximum dat je werkgever mag geven, geen verplichting. Je werkgever hoeft het niet te betalen, tenzij het in je CAO of arbeidsovereenkomst staat.",
          "En \u20AC 2,45 — is dat genoeg? Eerlijk gezegd betwijfel ik het. Het Nibud berekende dat thuiswerken gemiddeld \u20AC 3 tot \u20AC 4 per dag kost aan extra energie en internet. Maar goed, het is beter dan niets, en het is onbelast.",
        ],
      },
      {
        heading: "Je werkgever moet zorgen voor een goede werkplek",
        paragraphs: [
          "Wat veel mensen niet weten: de Arbowet geldt ook thuis. Je werkgever is verantwoordelijk voor een veilige en gezonde thuiswerkplek. Dat betekent in de praktijk: meedenken over een ergonomisch bureau en stoel, zorgen dat je de juiste middelen hebt (laptop, beeldscherm), en voorlichting geven over gezond thuiswerken.",
          "Sommige werkgevers geven een eenmalige vergoeding voor de inrichting van je thuiswerkplek — dat zie je vooral terug bij werkgevers met een CAO, waar dit soort afspraken schriftelijk zijn vastgelegd.",
        ],
      },
      {
        heading: "Hybride werken in je CAO",
        paragraphs: [
          "Steeds meer CAO's bevatten specifieke afspraken over hybride werken: het aantal thuiswerkdagen, de vergoeding, bereikbaarheid, en soms zelfs het recht op aanpassing van je werktijden. Als je werkgever onder een CAO valt, is het slim om die erbij te pakken. Vaak staan er rechten in die je werkgever niet uit zichzelf noemt.",
          "Solliciteer je bij een nieuwe werkgever? Vraag dan vooraf naar het thuiswerkbeleid. Hoe flexibel is het? Wordt er een vergoeding gegeven? Is het vastgelegd of 'in overleg'? Het antwoord zegt veel over de cultuur.",
        ],
      },
      {
        heading: "Vier dingen die helpen",
        paragraphs: [
          "Los van de regels — een paar dingen die thuiswerken gewoon beter maken:",
        ],
        list: [
          "Werk niet op de bank. Een apart bureau, al is het een inklapbaar tafeltje, maakt een groot verschil voor je rug en je focus",
          "Houd vaste werktijden aan en sluit je laptop echt af als je klaar bent",
          "Communiceer overdreven duidelijk met je team — je mist de non-verbale signalen van kantoor",
          "Ga naar buiten tussen de middag. Klinkt simpel, maar het is de makkelijkste manier om je dag op te breken",
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
          "Net begonnen aan een nieuwe baan. Alles is nieuw, spannend, een beetje onwennig. En dan zit je in je proeftijd. Kun je zomaar op straat staan? Wat mag er wel en wat mag er niet? Er bestaan veel misverstanden over de proeftijd. Tijd om die uit de weg te ruimen.",
        ],
      },
      {
        heading: "Wat is een proeftijd eigenlijk?",
        paragraphs: [
          "Een proeftijd is een afgesproken periode aan het begin van je contract waarin beide partijen — jij en je werkgever — het dienstverband per direct kunnen beëindigen. Geen opzegtermijn, geen procedure. Het idee is simpel: even kijken of het klikt.",
          "Belangrijk: een proeftijd is niet automatisch. Het moet expliciet en schriftelijk zijn opgenomen in je arbeidscontract. Staat er niets over in je contract? Dan heb je geen proeftijd.",
        ],
      },
      {
        heading: "Hoe lang mag het duren?",
        paragraphs: ["Dit hangt af van je contract. De regels zijn strikt:"],
        list: [
          "Contract van 6 maanden of korter — geen proeftijd toegestaan. Punt. Je werkgever mag het niet afspreken, en als het toch in je contract staat, is het nietig",
          "Contract langer dan 6 maanden maar korter dan 2 jaar — maximaal 1 maand",
          "Contract van 2 jaar of langer, of een vast contract — maximaal 2 maanden",
        ],
      },
      {
        heading: "Kan mijn werkgever me zomaar ontslaan?",
        paragraphs: [
          "Ja en nee. Ja, in de zin dat er geen opzegtermijn geldt en je werkgever geen toestemming nodig heeft van het UWV of de rechter. Nee, in de zin dat het niet volstrekt willekeurig mag zijn.",
          "Ontslag in de proeftijd mag niet discriminerend zijn — niet op basis van geslacht, leeftijd, afkomst, religie, zwangerschap of een andere verboden grond. Als je werkgever je ontslaat en je vraagt waarom, is hij verplicht om je schriftelijk een reden te geven. Vermoed je discriminatie? Dan kun je naar de rechter stappen.",
        ],
      },
      {
        heading: "Je staat niet helemaal met lege handen",
        paragraphs: [
          "Wat veel mensen niet weten: ook bij ontslag in de proeftijd heb je rechten. Sinds 2020 heb je vanaf dag één recht op een transitievergoeding als je werkgever het contract beëindigt. Het bedrag is niet hoog bij een kort dienstverband, maar het principe staat.",
          "Verder kun je WW aanvragen als je ontslagen wordt (niet als je zelf opzegt) en je aan de voorwaarden voldoet. En een concurrentiebeding in een tijdelijk contract is in principe niet geldig, tenzij je werkgever kan aantonen dat het écht noodzakelijk is.",
        ],
      },
      {
        heading: "Jij mag ook weg",
        paragraphs: [
          "De proeftijd werkt twee kanten op. Merk je na twee weken dat de functie totaal anders is dan beloofd, dat de sfeer niet klopt, of dat de werkgever verwachtingen heeft die nooit zijn besproken? Dan kun je ook zelf per direct vertrekken. Zonder opzegtermijn, zonder consequenties.",
          "Dat klinkt misschien drastisch, maar het is precies waarvoor de proeftijd bedoeld is. Beter na twee weken eerlijk zijn dan een jaar lang ergens ongelukkig zitten.",
        ],
      },
      {
        heading: "Check je CAO",
        paragraphs: [
          "Sommige CAO's wijken af van de wettelijke proeftijdregels — meestal in het voordeel van de werknemer. Denk aan een kortere proeftijd of extra beschermingsregels. Als je werkgever onder een CAO valt, is het altijd slim om even te checken wat daar over de proeftijd staat.",
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
          "Je hebt besloten: je gaat weg. Misschien heb je iets beters gevonden, misschien ben je gewoon klaar. Hoe dan ook — er komt meer bij kijken dan je baas even inlichten. Dit is wat je moet weten en regelen.",
        ],
      },
      {
        heading: "Je opzegtermijn: waarschijnlijk één maand",
        paragraphs: [
          "De wettelijke opzegtermijn voor werknemers is één kalendermaand. Let op: kalendermaand. Zeg je op 15 maart op, dan is je laatste werkdag niet 15 april, maar 30 april. Je opzegging gaat in op de eerste dag van de volgende maand.",
          "Maar check altijd je contract en je CAO. Sommige contracten hanteren 2 maanden, en bepaalde CAO's kennen afwijkende termijnen — vooral voor hogere functies. Als je je niet aan de opzegtermijn houdt, kan je werkgever in theorie een schadevergoeding claimen. In de praktijk gebeurt dat zelden, maar het is een risico dat je niet hoeft te nemen.",
        ],
      },
      {
        heading: "Hoe zeg je op?",
        paragraphs: [
          "Technisch gezien mag het mondeling, maar doe jezelf een plezier en leg het schriftelijk vast. Een korte e-mail of brief met drie dingen: dat je opzegt, de datum van opzegging, en je beoogde laatste werkdag. Bewaar een kopie. Dat voorkomt discussie achteraf.",
          "Persoonlijk zou ik zeggen: vertel het eerst mondeling aan je leidinggevende en stuur daarna dezelfde dag de schriftelijke bevestiging. Dat is netter en voorkomt dat je baas het via de mail moet ontdekken.",
        ],
      },
      {
        heading: "Wat gebeurt er met je vakantiedagen?",
        paragraphs: [
          "Openstaande vakantiedagen worden uitbetaald bij je vertrek. Zowel wettelijke als bovenwettelijke dagen. Je werkgever kan je vragen om ze op te nemen tijdens je opzegtermijn, maar dat kan alleen in overleg — het mag niet eenzijdig worden opgelegd.",
          "Check je loonstrook of het HR-systeem voor het exacte aantal. En let op de vervaltermijnen: wettelijke vakantiedagen vervallen 6 maanden na het jaar waarin ze zijn opgebouwd, bovenwettelijke dagen pas na 5 jaar. Dagen die al vervallen zijn, worden niet meer uitbetaald.",
        ],
      },
      {
        heading: "WW: vergeet het maar (meestal)",
        paragraphs: [
          "Dit is belangrijk. Neem je zelf ontslag, dan heb je in principe géén recht op WW. Het UWV beschouwt dit als 'verwijtbaar werkloos'. Er zijn uitzonderingen — medische redenen, een onveilige werksituatie — maar die moet je goed kunnen onderbouwen.",
          "De les: neem pas ontslag als je een getekend contract van je nieuwe werkgever hebt. Niet een mondelinge toezegging, niet een 'we sturen het contract volgende week' — een getekend contract. Ik heb genoeg verhalen gehoord van mensen die te vroeg opzegden en vervolgens alsnog zonder baan zaten.",
        ],
      },
      {
        heading: "De checklist",
        paragraphs: ["Loop dit rijtje af voordat je opzegt:"],
        list: [
          "Opzegtermijn gecheckt in je contract of CAO?",
          "Nieuw contract getekend (als je ergens anders begint)?",
          "Openstaande vakantiedagen en vakantiegeld berekend?",
          "Schriftelijk opgezegd en kopie bewaard?",
          "Afspraken gemaakt over je eindafrekening?",
          "Getuigschrift of referentie gevraagd?",
          "Bedrijfseigendommen (laptop, telefoon, pasjes) klaar om in te leveren?",
          "Werk overgedragen aan je opvolger of collega's?",
        ],
      },
      {
        heading: "Nog iets",
        paragraphs: [
          "Vertrek netjes. Hoe je weggaat zegt iets over je. Nederland is klein, sectoren zijn kleiner, en je komt mensen altijd weer tegen. Een nette overdracht, een oprecht bedankje aan collega's, en een professionele houding tot je laatste dag — dat betaalt zich terug.",
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
          "Je krijgt een contractvoorstel. 'Contract voor bepaalde tijd, 12 maanden.' Of je bent al een tijdje in dienst en vraagt je af: wanneer krijg ik eigenlijk een vast contract? Het verschil tussen vast en tijdelijk is groter dan alleen de einddatum op papier. Dit is wat het in de praktijk betekent.",
        ],
      },
      {
        heading: "Tijdelijk contract: wat houdt het in?",
        paragraphs: [
          "Een tijdelijk contract heeft een begin- en einddatum. Na die einddatum stopt het automatisch. Je werkgever moet je wel uiterlijk een maand van tevoren laten weten of het verlengd wordt — dat heet de aanzegplicht. Vergeet je werkgever dat, dan heb je recht op een vergoeding van maximaal één maandsalaris.",
          "Tussentijds opzeggen kan alleen als dat expliciet in het contract staat. Staat het er niet in, dan zitten zowel jij als je werkgever aan de afgesproken periode vast. Een tijdelijk contract kan variëren van een paar maanden tot maximaal 3 jaar.",
        ],
      },
      {
        heading: "Vast contract: de heilige graal?",
        paragraphs: [
          "Een vast contract (voor onbepaalde tijd) heeft geen einddatum. Je werkgever kan je niet zomaar ontslaan — daar is een geldige reden voor nodig en goedkeuring van het UWV of de kantonrechter. Denk aan bedrijfseconomische redenen of langdurig disfunctioneren, en zelfs dan gelden er strenge procedures.",
          "Wat vaak vergeten wordt: een vast contract heeft ook praktische voordelen buiten je baan. Banken en verhuurders vragen ernaar. Een hypotheek krijgen met een tijdelijk contract is niet onmogelijk, maar het is een stuk lastiger. En bij het huren van een woning in een krappe markt kan een vast contract het verschil maken.",
        ],
      },
      {
        heading: "De ketenregeling: wanneer heb je recht op vast?",
        paragraphs: [
          "De wet beschermt je tegen eindeloze tijdelijke contracten. De ketenregeling bepaalt dat je automatisch een vast contract krijgt in twee situaties:",
        ],
        list: [
          "Je hebt meer dan 3 tijdelijke contracten achter elkaar gehad bij dezelfde werkgever",
          "Je hebt in totaal langer dan 3 jaar op tijdelijke contracten gewerkt bij dezelfde werkgever",
        ],
      },
      {
        paragraphs: [
          "De keten wordt alleen doorbroken als er een onderbreking zit van meer dan 6 maanden. Sommige werkgevers spelen hier bewust op in: na je derde contract 'even' geen verlenging aanbieden, om daarna weer opnieuw te beginnen. Niet netjes, maar het gebeurt. Goed om te weten.",
          "Let op: CAO's mogen van deze regels afwijken. Sommige CAO's beperken het aantal tijdelijke contracten juist verder, of verkorten de keten. In de zorg en het onderwijs zijn er via de CAO speciale regels over wanneer een tijdelijk contract automatisch wordt omgezet.",
        ],
      },
      {
        heading: "Welke past bij jou?",
        paragraphs: [
          "Dat hangt af van je situatie. Een vast contract biedt maximale zekerheid — fijn als je een hypotheek wilt of als je stabiliteit zoekt. Een tijdelijk contract biedt een natuurlijk uitstapmoment — handig als je nog niet zeker weet of dit de juiste werkgever is, of als je bewust flexibel wilt blijven.",
          "Wat ik zelf het belangrijkst vind: de voorwaarden. Een tijdelijk contract met goede arbeidsvoorwaarden en een werkgever die investeert in je ontwikkeling is meer waard dan een vast contract bij een werkgever die je het minimum biedt. Het type contract is één ding — wat erin staat is minstens zo belangrijk.",
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
