"use client";

import { Search, Filter } from "lucide-react";
import useDebouncedCallback from "@/hooks/use-debounced-callback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Filters(props: {
  jobCount: number;
  totalJobCount: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: { target: { value: string } }) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("search", event.target.value);
      startTransition(() => {
        router.replace(`${pathname}?${updatedSearchParams.toString()}`);
      });
    },
    { timeout: 400 },
  );

  // TODO: dedup these
  const handleContractChange = (contract: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("contract", contract);
    startTransition(() => {
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    });
  };

  // TODO: dedup these
  const handleWorkplaceChange = (workplace: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("workplace", workplace);
    startTransition(() => {
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    });
  };

  // TODO: dedup these
  const handleLocationChange = (location: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("location", location);
    startTransition(() => {
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Zoek op functie, bedrijf of vaardigheden..."
          onChange={handleSearch}
          className="pl-10 h-12 text-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Select
          value={searchParams.get("contract") ?? ""}
          onValueChange={handleContractChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type contract" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle contracten</SelectItem>
            <SelectItem value="permanent">Vast</SelectItem>
            <SelectItem value="temporary">Tijdelijk</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
            <SelectItem value="internship">Stage</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("location") ?? ""}
          onValueChange={handleLocationChange}
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
          value={searchParams.get("workplace") ?? ""}
          onValueChange={handleWorkplaceChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Kantoor, hybride of remote" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Werklocatie</SelectItem>
            <SelectItem value="remote">Thuiswerken</SelectItem>
            <SelectItem value="office">Op kantoor</SelectItem>
            <SelectItem value="hybrid">Hybride</SelectItem>
            <SelectItem value="free_choice">Vrije keuze</SelectItem>
            <SelectItem value="other">Anders</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            router.push(pathname);
          }}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters wissen
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        {props.jobCount} van {props.totalJobCount} vacatures
      </div>
    </div>
  );
}
