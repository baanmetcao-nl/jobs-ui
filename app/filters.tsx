"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Loader2 as Spinner,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  LocationAutocomplete,
  locationDisplayName,
} from "@/components/location-autocomplete";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Option = { label: string; value: string };

const filterConfig = [
  {
    key: "contracts",
    label: "Contract",
    type: "single",
    options: [
      { label: "Alle contracten", value: "all" },
      { label: "Vast", value: "permanent" },
      { label: "Tijdelijk", value: "temporary" },
    ],
  },
  {
    key: "seniorities",
    label: "Ervaringsniveau",
    type: "multi",
    options: [
      { label: "Junior", value: "junior" },
      { label: "Medior", value: "medior" },
      { label: "Senior", value: "senior" },
      { label: "Lead", value: "principal" },
    ],
  },
  {
    key: "workplace",
    label: "Werklocatie",
    type: "single",
    options: [
      { label: "Alle werklocaties", value: "all" },
      { label: "Thuiswerken", value: "remote" },
      { label: "Op kantoor", value: "office" },
      { label: "Hybride", value: "hybrid" },
      { label: "Vrije keuze", value: "free_choice" },
    ],
  },
  {
    key: "niches",
    label: "Categorie",
    type: "multi",
    options: [
      { label: "Communicatie", value: "communications" },
      { label: "Creatief & Design", value: "creative-design" },
      { label: "Onderwijs & Training", value: "education-training" },
      { label: "Engineering", value: "engineering" },
      {
        label: "Installatietechniek (Elektro)",
        value: "electrical-installation",
      },
      { label: "Finance & Accounting", value: "finance-accounting" },
      { label: "Zorg & Medisch", value: "healthcare-medical" },
      { label: "Human Resources", value: "human-resources" },
      { label: "Juridisch", value: "legal" },
      { label: "Logistiek & Supply Chain", value: "logistics-supply-chain" },
      { label: "Marketing & Advertising", value: "marketing-advertising" },
      {
        label: "Publieke Sector & Non-profit",
        value: "public-sector-non-profit",
      },
      { label: "Vastgoed", value: "real-estate" },
      { label: "Sales & Retail", value: "sales-retail" },
      { label: "Wetenschap & Onderzoek", value: "science-research" },
      { label: "Technologie & IT", value: "technology-it" },
      { label: "Technische Beroepen", value: "skilled-trades" },
      { label: "Anders", value: "other" },
    ],
  },
];

function getValues(params: URLSearchParams, key: string) {
  return params.getAll(key);
}

function setValues(params: URLSearchParams, key: string, values: string[]) {
  const next = new URLSearchParams(params.toString());
  next.delete(key);
  values.forEach((v) => next.append(key, v));
  next.delete("page");
  return next;
}

function setSingleValue(
  params: URLSearchParams,
  key: string,
  value: string,
): URLSearchParams {
  const next = new URLSearchParams(params.toString());
  if (!value || value === "all") next.delete(key);
  else next.set(key, value);
  next.delete("page");
  return next;
}

function buildLocationFilterParams(
  searchParams: URLSearchParams,
): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};

  const search = searchParams.get("search");
  if (search) params.search = search;

  const contracts = searchParams.get("contracts");
  if (contracts && contracts !== "all") params.contracts = contracts;

  const seniorities = searchParams.getAll("seniorities");
  if (seniorities.length > 0) params.seniorities = seniorities;

  const workplace = searchParams.get("workplace");
  if (workplace && workplace !== "all") params.workplace = workplace;

  const niches = searchParams.getAll("niches");
  if (niches.length > 0) params.niches = niches;

  return params;
}

export default function Filters({
  jobCount,
  showNicheFilter = true,
  showLocationInput = true,
}: {
  jobCount: number;
  showNicheFilter?: boolean;
  showLocationInput?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [locationTerm, setLocationTerm] = useState(
    searchParams.get("locations") || "",
  );

  const updateMultiFilter = (key: string, value: string) => {
    const current = getValues(searchParams, key);

    const nextValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const next = setValues(searchParams, key, nextValues);

    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const updateSingleFilter = (key: string, value: string) => {
    const next = setSingleValue(searchParams, key, value);

    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const removeFilter = (key: string, value: string) => {
    const filter = filterConfig.find((f) => f.key === key);

    if (filter?.type === "single") {
      const next = setSingleValue(searchParams, key, "all");
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      return;
    }

    const current = getValues(searchParams, key);

    const next = setValues(
      searchParams,
      key,
      current.filter((v) => v !== value),
    );

    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setLocationTerm("");
    router.replace(pathname, { scroll: false });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (!searchTerm) params.delete("search");
      else params.set("search", searchTerm);

      if (!locationTerm) params.delete("locations");
      else params.set("locations", locationTerm);

      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, locationTerm]);


  const visibleFilters = filterConfig.filter((f) => {
    if (!showNicheFilter && f.key === "niches") return false;
    return true;
  });

  const activeFilters = visibleFilters.flatMap((filter) => {
    if (filter.type === "single") {
      const value = searchParams.get(filter.key);
      return value && value !== "all" ? [{ key: filter.key, value }] : [];
    }

    return getValues(searchParams, filter.key).map((v) => ({
      key: filter.key,
      value: v,
    }));
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 relative">
      {isPending && (
        <div className="absolute inset-0 bg-white/70 z-50 rounded-lg flex items-center justify-center">
          <Spinner className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      )}
      <div className={`grid grid-cols-1 ${showLocationInput ? "md:grid-cols-2" : ""} gap-4 mb-6`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek op functie, bedrijf of vaardigheden..."
            className="pl-10 h-12 text-lg"
          />
        </div>
        {showLocationInput && (
          <LocationAutocomplete
            value={locationTerm}
            onChange={(val) => setLocationTerm(val)}
            onInputChange={(val) => setLocationTerm(val)}
            inputClassName="h-12 text-lg"
            filterParams={buildLocationFilterParams(searchParams)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {visibleFilters.map((filter) => {
          if (filter.type === "single") {
            const value = searchParams.get(filter.key) || "all";

            return (
              <Select
                key={filter.key}
                value={value}
                onValueChange={(v) => updateSingleFilter(filter.key, v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }

          const selected = getValues(searchParams, filter.key);

          return (
            <MultiSelect
              key={filter.key}
              label={filter.label}
              options={filter.options}
              selected={selected}
              onToggle={(v) => updateMultiFilter(filter.key, v)}
            />
          );
        })}

        <Button
          variant="outline"
          onClick={resetFilters}
          className="flex gap-2 cursor-pointer"
          role="combobox"
        >
          <Filter className="h-4 w-4" />
          Filters wissen
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {activeFilters.map((f) => (
            <Badge key={`${f.key}-${f.value}`} variant="secondary">
              {getFilterLabel(f.key, f.value)}
              <X
                className="ml-2 h-3 w-3 cursor-pointer"
                onClick={() => removeFilter(f.key, f.value)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function getFilterLabel(key: string, value: string): string {
  const filter = filterConfig.find((f) => f.key === key);
  if (!filter) return value;

  const option = filter.options.find((o) => o.value === value);
  return option ? option.label : value;
}

function MultiSelect({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const selectedLabels = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label);

  let triggerLabel = label;

  if (selected.length === 1) {
    triggerLabel = selectedLabels[0];
  } else if (selected.length >= 2) {
    triggerLabel = `${selected.length} geselecteerd`;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
          role="combobox"
        >
          {triggerLabel}
          <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-2 space-y-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
          >
            <Checkbox
              checked={selected.includes(option.value)}
              onCheckedChange={() => onToggle(option.value)}
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </PopoverContent>
    </Popover>
  );
}
