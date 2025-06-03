"use client";

import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Clock,
  Building2,
  Filter,
  Eye,
  X,
  Calendar,
  Briefcase,
  GraduationCap,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Amsterdam, NL",
    type: "Fulltime",
    salary: "€65k - €85k",
    posted: "2 dagen geleden",
    description:
      "We zoeken een ervaren frontend developer om ons team te versterken en geweldige gebruikerservaringen te bouwen.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    remote: true,
    cao: "Metalektro CAO",
    fullDescription: `We zijn op zoek naar een zeer bekwame Senior Frontend Developer om ons dynamische engineeringteam te versterken. In deze rol ben je verantwoordelijk voor het ontwikkelen en onderhouden van geavanceerde webapplicaties die miljoenen gebruikers wereldwijd bedienen.

Je werkt nauw samen met ons designteam om pixel-perfecte gebruikersinterfaces te implementeren en werkt samen met backend engineers om API's en services te integreren. We waarderen schone, onderhoudbare code en moderne ontwikkelingspraktijken.`,
    responsibilities: [
      "Ontwikkelen en onderhouden van responsieve webapplicaties met React en TypeScript",
      "Samenwerken met designers om gebruiksvriendelijke interfaces te implementeren",
      "Optimaliseren van applicaties voor maximale snelheid en schaalbaarheid",
      "Mentoren van junior developers en uitvoeren van code reviews",
      "Deelnemen aan architecturale beslissingen en technische planning",
    ],
    requirements: [
      "5+ jaar ervaring met React en moderne JavaScript",
      "Sterke beheersing van TypeScript en ES6+",
      "Ervaring met Next.js en server-side rendering",
      "Kennis van CSS frameworks (Tailwind CSS bij voorkeur)",
      "Bekendheid met testing frameworks (Jest, React Testing Library)",
    ],
    benefits: [
      "Competitief salaris volgens CAO-schalen",
      "Uitgebreide zorgverzekering en pensioenregeling",
      "Flexibele werkregelingen en thuiswerk mogelijkheden",
      "Professioneel ontwikkelingsbudget (€2.000/jaar)",
      "25 vakantiedagen + feestdagen",
    ],
    companyInfo: {
      size: "500-1000 medewerkers",
      founded: "2015",
      industry: "Technologie",
    },
    applicationDeadline: "15 maart 2024",
    startDate: "1 april 2024",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Rotterdam, NL",
    type: "Fulltime",
    salary: "€55k - €75k",
    posted: "1 dag geleden",
    description:
      "Leid productstrategie en werk samen met multifunctionele teams om innovatieve oplossingen te leveren.",
    skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
    remote: false,
    cao: "ICT CAO",
    fullDescription: `Sluit je aan bij onze snelgroeiende startup als Product Manager waar je de productvisie en strategie voor ons kernplatform zult sturen. Je werkt op het snijvlak van business, technologie en gebruikerservaring om producten te leveren waar klanten van houden.`,
    responsibilities: [
      "Definiëren en communiceren van productvisie en strategie",
      "Uitvoeren van marktonderzoek en concurrentieanalyse",
      "Samenwerken met engineeringteams om technische vereisten te definiëren",
      "Analyseren van gebruikersdata en feedback om productbeslissingen te informeren",
      "Beheren van productroadmap en prioriteren van feature ontwikkeling",
    ],
    requirements: [
      "3+ jaar product management ervaring",
      "Sterke analytische en probleemoplossende vaardigheden",
      "Ervaring met agile ontwikkelingsmethodologieën",
      "Uitstekende communicatie- en leiderschapsvaardigheden",
      "Bekendheid met analytics tools (Google Analytics, Mixpanel, etc.)",
    ],
    benefits: [
      "Competitief salaris met prestatiebonussen",
      "Aandelen participatie in groeiende startup",
      "Gezondheids- en welzijnsvoordelen",
      "Leer- en ontwikkelingsmogelijkheden",
      "Flexibel werkschema",
    ],
    companyInfo: {
      size: "50-100 medewerkers",
      founded: "2020",
      industry: "SaaS",
    },
    applicationDeadline: "20 maart 2024",
    startDate: "15 april 2024",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "Utrecht, NL",
    type: "Contract",
    salary: "€45k - €60k",
    posted: "3 dagen geleden",
    description:
      "Creëer mooie en intuïtieve gebruikersinterfaces voor web- en mobiele applicaties.",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    remote: true,
    cao: "Grafimedia CAO",
    fullDescription: `We zoeken een getalenteerde UX/UI Designer om ons creatieve team te versterken en de toekomst van digitale ervaringen vorm te geven. Je werkt aan diverse projecten variërend van webapplicaties tot mobiele apps.`,
    responsibilities: [
      "Uitvoeren van gebruikersonderzoek en usability testing",
      "Creëren van wireframes, prototypes en high-fidelity designs",
      "Ontwikkelen en onderhouden van design systems en style guides",
      "Samenwerken met ontwikkelteams om design implementatie te waarborgen",
      "Presenteren van design concepten aan stakeholders en klanten",
    ],
    requirements: [
      "3+ jaar UX/UI design ervaring",
      "Beheersing van Figma en Adobe Creative Suite",
      "Sterk portfolio dat design proces en resultaten toont",
      "Ervaring met gebruikersonderzoek methodologieën",
      "Begrip van front-end ontwikkelingsprincipes",
    ],
    benefits: [
      "Competitieve contract tarieven",
      "Flexibele werkuren",
      "Thuiswerk mogelijkheden",
      "Toegang tot design tools en resources",
      "Professionele ontwikkelingsondersteuning",
    ],
    companyInfo: {
      size: "20-50 medewerkers",
      founded: "2018",
      industry: "Design Agency",
    },
    applicationDeadline: "25 maart 2024",
    startDate: "1 mei 2024",
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "CloudTech Solutions",
    location: "Eindhoven, NL",
    type: "Fulltime",
    salary: "€60k - €80k",
    posted: "1 week geleden",
    description:
      "Bouw schaalbare backend systemen en API's om ons groeiende platform te ondersteunen.",
    skills: ["Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
    remote: true,
    cao: "Metalektro CAO",
    fullDescription: `Sluit je aan bij ons engineeringteam als Backend Engineer waar je de server-side systemen ontwerpt en bouwt die ons platform aandrijven. Je werkt aan uitdagende problemen betreffende schaalbaarheid, prestaties en betrouwbaarheid.`,
    responsibilities: [
      "Ontwerpen en implementeren van schaalbare backend services en API's",
      "Optimaliseren van database queries en systeemprestaties",
      "Implementeren van security best practices en data bescherming",
      "Samenwerken met frontend teams om services te integreren",
      "Monitoren van systeemprestaties en troubleshooten van problemen",
    ],
    requirements: [
      "4+ jaar backend ontwikkelingsexpertise",
      "Sterke beheersing van Node.js en Python",
      "Ervaring met cloud platforms (AWS bij voorkeur)",
      "Kennis van database design en optimalisatie",
      "Bekendheid met containerization (Docker, Kubernetes)",
    ],
    benefits: [
      "Competitief salaris en aandelenopties",
      "Remote-first werkomgeving",
      "Zorg-, tandheelkundige en zichtverzekering",
      "Professioneel ontwikkelingsbudget",
      "Flexibel verlofbeleid",
    ],
    companyInfo: {
      size: "200-500 medewerkers",
      founded: "2017",
      industry: "Cloud Services",
    },
    applicationDeadline: "30 maart 2024",
    startDate: "15 mei 2024",
  },
];

function JobDetailModal({
  job,
  isOpen,
  onClose,
}: {
  job: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !job) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:block hidden"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
        <div className="bg-white w-full h-full md:w-full md:max-w-4xl md:h-auto md:max-h-[90vh] md:rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold truncate">
                {job.title}
              </h2>
              <div className="flex items-center gap-4 text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{job.type}</Badge>
                {job.remote && <Badge variant="outline">Thuiswerken</Badge>}
                <Badge variant="outline">{job.salary}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.posted}
                </Badge>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Over {job.company}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Bedrijfsgrootte:</span>
                    <span className="text-gray-700">
                      {job.companyInfo.size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Opgericht:</span>
                    <span className="text-gray-700">
                      {job.companyInfo.founded}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sector:</span>
                    <span className="text-gray-700">
                      {job.companyInfo.industry}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Functieomschrijving</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {job.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Belangrijkste verantwoordelijkheden
                </h3>
                <ul className="space-y-3">
                  {job.responsibilities.map(
                    (responsibility: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#F1592A] rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Vereisten
                </h3>
                <ul className="space-y-3">
                  {job.requirements.map(
                    (requirement: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Vereiste vaardigheden</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Voordelen & Extra's</h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Belangrijke data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Sollicitatie deadline:</span>
                    <span className="text-gray-700">
                      {job.applicationDeadline}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Verwachte startdatum:</span>
                    <span className="text-gray-700">{job.startDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 border-t">
            <Button className="w-full bg-[#F1592A] hover:bg-[#F1592A]/90">
              Solliciteer Nu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function JobBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [remoteFilter, setRemoteFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesJobType =
        jobTypeFilter === "all" || job.type === jobTypeFilter;
      const matchesLocation =
        locationFilter === "all" || job.location.includes(locationFilter);
      const matchesRemote =
        remoteFilter === "all" ||
        (remoteFilter === "remote" && job.remote) ||
        (remoteFilter === "onsite" && !job.remote);

      return (
        matchesSearch && matchesJobType && matchesLocation && matchesRemote
      );
    });
  }, [searchTerm, jobTypeFilter, locationFilter, remoteFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setJobTypeFilter("all");
    setLocationFilter("all");
    setRemoteFilter("all");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.03%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Baan met CAO"
                width={300}
                height={120}
                className="h-36 w-auto"
                priority
              />
            </div>

            <p className="text-lg md:text-xl mb-8 text-gray-300 font-light">
              Ontdek vacatures bij werkgevers die een CAO hanteren. Meer
              zekerheid, betere arbeidsvoorwaarden en eerlijke beloning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-[#F1592A]/20 rounded-full p-2">
                    <Shield className="h-5 w-5 text-[#F1592A]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Gegarandeerde Rechten
                </h3>
                <p className="text-gray-400 text-sm">
                  CAO-beschermde arbeidsvoorwaarden
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-blue-500/20 rounded-full p-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  1,200+ Vacatures
                </h3>
                <p className="text-gray-400 text-sm">Dagelijks nieuwe kansen</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-green-500/20 rounded-full p-2">
                    <Users className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Vertrouwde Partners
                </h3>
                <p className="text-gray-400 text-sm">Alleen CAO-werkgevers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Zoek op functie, bedrijf of vaardigheden..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type contract" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle types</SelectItem>
                <SelectItem value="Fulltime">Fulltime</SelectItem>
                <SelectItem value="Parttime">Parttime</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Locatie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle locaties</SelectItem>
                <SelectItem value="Amsterdam">Amsterdam</SelectItem>
                <SelectItem value="Rotterdam">Rotterdam</SelectItem>
                <SelectItem value="Utrecht">Utrecht</SelectItem>
                <SelectItem value="Eindhoven">Eindhoven</SelectItem>
                <SelectItem value="Den Haag">Den Haag</SelectItem>
              </SelectContent>
            </Select>

            <Select value={remoteFilter} onValueChange={setRemoteFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Werkstijl" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Werklocatie</SelectItem>
                <SelectItem value="home">Thuiswerken</SelectItem>
                <SelectItem value="onsite">Op kantoor</SelectItem>
                <SelectItem value="hybrid">Hybride</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters wissen
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            {filteredJobs.length} van {jobs.length} vacatures
          </div>
        </div>

        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Geen vacatures gevonden
              </h3>
              <p className="text-gray-600">
                Probeer je zoekcriteria of filters aan te passen
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-gray-900">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{job.type}</Badge>
                        {job.remote && (
                          <Badge variant="outline">Thuiswerken</Badge>
                        )}
                        <Badge variant="outline">{job.salary}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Bekijk Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#F1592A] hover:bg-[#F1592A]/90"
                      >
                        Solliciteer
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Meer vacatures laden
            </Button>
          </div>
        )}
      </main>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={true}
          onClose={() => setSelectedJob(null)}
        />
      )}

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>&copy; 2025 Baan met CAO. Hetzelfde werk, betere voorwaarden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
