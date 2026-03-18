"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";

interface LocationOption {
  country: string;
  city: string;
  count: number;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (value: string) => void;
  className?: string;
  error?: boolean;
  inputClassName?: string;
  filterParams?: Record<string, string | string[]>;
}

const EXCLUDED_PATTERNS = [",", "/", "in overleg", "route", "undefined"];

function isValidCity(city: string): boolean {
  if (!city || !city.trim()) return false;
  const lower = city.toLowerCase();
  if (lower === "unknown") return false;
  return !EXCLUDED_PATTERNS.some((pattern) => lower.includes(pattern));
}

/** Extract display name from "country__city" format */
export function locationDisplayName(value: string): string {
  if (!value) return "";
  const parts = value.split("__");
  return parts.length === 2 ? parts[1] : value;
}

export function LocationAutocomplete({
  value,
  onChange,
  onInputChange,
  className,
  error,
  inputClassName,
  filterParams,
}: LocationAutocompleteProps) {
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [inputValue, setInputValue] = useState(locationDisplayName(value));
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setInputValue(locationDisplayName(value));
  }, [value]);

  const filterKey = filterParams ? JSON.stringify(filterParams) : "";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params = new URLSearchParams();
    if (filterParams) {
      for (const [key, val] of Object.entries(filterParams)) {
        if (Array.isArray(val)) {
          val.forEach((v) => params.append(key, v));
        } else if (val) {
          params.set(key, val);
        }
      }
    }
    const query = params.toString();
    const url = query ? `/api/locations?${query}` : "/api/locations";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        const items: LocationOption[] = (json.data || []).filter(
          (loc: LocationOption) => isValidCity(loc.city),
        );
        setLocations(items);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filterKey]);

  const filtered = isOpen
    ? inputValue.trim()
      ? locations.filter((loc) =>
          loc.city.toLowerCase().includes(inputValue.toLowerCase()),
        )
      : locations.slice(0, 10)
    : [];

  const selectLocation = useCallback(
    (loc: LocationOption) => {
      const paramValue = `${loc.country}__${loc.city}`;
      onChange(paramValue);
      setInputValue(loc.city);
      setIsOpen(false);
      setHighlightIndex(-1);
    },
    [onChange],
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filtered.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filtered.length) {
        selectLocation(filtered[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
      )}
      <Input
        placeholder="Bijv. Amsterdam"
        value={inputValue}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          setIsOpen(true);
          setHighlightIndex(-1);
          onInputChange?.(val);
          if (!val.trim()) {
            onChange("");
          }
        }}
        onFocus={() => {
          if (locations.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className={`pl-10 ${error ? "border-red-500" : ""} ${inputClassName || ""} ${className || ""}`}
        autoComplete="off"
      />
      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-lg"
        >
          {filtered.map((loc, i) => (
            <li
              key={`${loc.country}__${loc.city}`}
              className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer ${
                i === highlightIndex
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                selectLocation(loc);
              }}
              onMouseEnter={() => setHighlightIndex(i)}
            >
              <span>{loc.city}</span>
              <span className="text-xs text-gray-400">
                {loc.count} vacature{loc.count !== 1 ? "s" : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
