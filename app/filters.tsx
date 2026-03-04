"use client";

import { Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { startTransition } from "react";

function updateParam(params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params);

  if (!value || value === "all") {
    next.delete(key);
  } else {
    next.set(key, value);
  }

  next.set("page", "0");
  return next;
}

export default function Filters({
  jobCount,
  totalJobCount,
}: {
  jobCount: number;
  totalJobCount: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [contract, setContract] = useState(
    searchParams.get("contract") || "all",
  );
  const [location, setLocation] = useState(
    searchParams.get("location") || "all",
  );
  const [workplace, setWorkplace] = useState(
    searchParams.get("workplace") || "all",
  );
  const [niches, setNiche] = useState(searchParams.get("niches") || "all");

  const applyFilters = (nextParams: URLSearchParams) => {
    startTransition(() => {
      router.replace(`${pathname}?${nextParams.toString()}`);
    });
  };

  const handleSelectChange = (key: string, value: string) => {
    const next = updateParam(searchParams, key, value);
    applyFilters(next);

    if (key === "contract") setContract(value);
    if (key === "location") setLocation(value);
    if (key === "workplace") setWorkplace(value);
    if (key === "niches") setNiche(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const next = updateParam(params, "search", searchTerm);
      applyFilters(next);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, pathname]);

  const resetFilters = () => {
    setSearchTerm("");
    setContract("all");
    setLocation("all");
    setWorkplace("all");
    setNiche("all");
    startTransition(() => router.replace(pathname));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Zoek op functie, bedrijf of vaardigheden..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 h-12 text-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
        <Select
          value={contract}
          onValueChange={(val) => handleSelectChange("contract", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type contract" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle contracten</SelectItem>
            <SelectItem value="permanent">Vast</SelectItem>
            <SelectItem value="temporary">Tijdelijk</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={location}
          onValueChange={(val) => handleSelectChange("location", val)}
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
          value={workplace}
          onValueChange={(val) => handleSelectChange("workplace", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Alle werklocaties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle werklocaties</SelectItem>
            <SelectItem value="remote">Thuiswerken</SelectItem>
            <SelectItem value="office">Op kantoor</SelectItem>
            <SelectItem value="hybrid">Hybride</SelectItem>
            <SelectItem value="free_choice">Vrije keuze</SelectItem>
            <SelectItem value="other">Anders</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={niches}
          onValueChange={(val) => handleSelectChange("niches", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Alle categorieën" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle categorieën</SelectItem>
            <SelectItem value="communications">Communicatie</SelectItem>
            <SelectItem value="creative-design">Creatief & Design</SelectItem>
            <SelectItem value="education-training">
              Onderwijs & Training
            </SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="electrical-installation">
              Installatietechniek (Elektro)
            </SelectItem>
            <SelectItem value="finance-accounting">
              Finance & Accounting
            </SelectItem>
            <SelectItem value="healthcare-medical">Zorg & Medisch</SelectItem>
            <SelectItem value="human-resources">Human Resources</SelectItem>
            <SelectItem value="legal">Juridisch</SelectItem>
            <SelectItem value="logistics-supply-chain">
              Logistiek & Supply Chain
            </SelectItem>
            <SelectItem value="marketing-advertising">
              Marketing & Advertising
            </SelectItem>
            <SelectItem value="public-sector-non-profit">
              Publieke Sector & Non-profit
            </SelectItem>
            <SelectItem value="real-estate">Vastgoed</SelectItem>
            <SelectItem value="sales-retail">Sales & Retail</SelectItem>
            <SelectItem value="science-research">
              Wetenschap & Onderzoek
            </SelectItem>
            <SelectItem value="technology-it">Technologie & IT</SelectItem>
            <SelectItem value="skilled-trades">Technische Beroepen</SelectItem>
            <SelectItem value="other">Anders</SelectItem>
            <SelectItem value="unknown">Onbekend</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={resetFilters}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" /> Filters wissen
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        {jobCount} van {totalJobCount} vacatures
      </div>
    </div>
  );
}
