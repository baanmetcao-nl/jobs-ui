"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, startTransition } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
      { label: "Freelance", value: "freelance" },
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
      { label: "Lead", value: "lead" },
    ],
  },
  {
    key: "location",
    label: "Locatie",
    type: "multi",
    options: [
      { label: "Amsterdam", value: "amsterdam" },
      { label: "Rotterdam", value: "rotterdam" },
      { label: "Utrecht", value: "utrecht" },
      { label: "Eindhoven", value: "eindhoven" },
      { label: "Den Haag", value: "den-haag" },
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

export default function Filters({
  jobCount,
  totalJobCount,
  showNicheFilter = true,
  showLocationFilter = true,
}: {
  jobCount: number;
  totalJobCount: number;
  showNicheFilter?: boolean;
  showLocationFilter?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
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
    router.replace(pathname, { scroll: false });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (!searchTerm) params.delete("search");
      else params.set("search", searchTerm);

      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const visibleFilters = filterConfig.filter((f) => {
    if (!showLocationFilter && f.key === "location") return false;
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
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Zoek op functie, bedrijf of vaardigheden..."
          className="pl-10 h-12 text-lg"
        />
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
        >
          <Filter className="h-4 w-4" />
          Filters wissen
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {activeFilters.map((f) => (
            <Badge key={`${f.key}-${f.value}`} variant="secondary">
              {f.value}
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
  } else if (selected.length === 2) {
    triggerLabel = selectedLabels.join(", ");
  } else if (selected.length > 2) {
    triggerLabel = `${selected.length} geselecteerd`;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
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
