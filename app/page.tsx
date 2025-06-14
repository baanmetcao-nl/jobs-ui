"use client";

import { useMemo } from "react";
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
import useSearchState from "@/hooks/use-search-state";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { jobs } from "../constants/jobs";

function JobDetailModal({
  job,
  onClose,
}: {
  job: (typeof jobs)[0];
  onClose: () => void;
}) {
  if (!job) {
    return null;
  }

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
  const searchState = useSearchState();
  const jobIdParam = searchState.get("job");

  const {
    value: searchValue,
    debouncedValue: searchTerm,
    setValue: setSearchValue,
  } = useDebouncedSearch(searchState.get("search") || "", 300);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const contractFilter = searchState.get("contract");
      const matchesContract =
        !contractFilter ||
        contractFilter === "all" ||
        job.type === contractFilter;

      const locationFilter = searchState.get("location");
      const matchesLocation =
        !locationFilter ||
        locationFilter === "all" ||
        job.location.includes(locationFilter);

      const workplaceFilter = searchState.get("workplace");
      const matchesWorkplace =
        !workplaceFilter ||
        workplaceFilter === "all" ||
        (workplaceFilter === "home" && job.remote) ||
        (workplaceFilter === "onsite" && !job.remote);

      return (
        matchesSearch && matchesContract && matchesLocation && matchesWorkplace
      );
    });
  }, [searchTerm, searchState]);

  const selectedJob = (() => {
    if (!jobIdParam) {
      return null;
    }

    const jobId = Number.parseInt(jobIdParam);
    return jobs.find((job) => job.id === jobId) ?? null;
  })();

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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Select
              defaultValue={searchState.get("contract")}
              onValueChange={searchState.getOnChange("contract")}
            >
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

            <Select
              defaultValue={searchState.get("location")}
              onValueChange={searchState.getOnChange("location")}
            >
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

            <Select
              defaultValue={searchState.get("workplace")}
              onValueChange={searchState.getOnChange("workplace")}
            >
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
              onClick={searchState.clear}
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
                        onClick={() =>
                          searchState.getOnChange("job")(job.id.toString())
                        }
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
          onClose={searchState.getOnDelete("job")}
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
