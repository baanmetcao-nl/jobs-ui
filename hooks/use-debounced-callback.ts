"use client";

import { useMemo } from "react";

function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  options: { timeout: number },
) {
  let handle: ReturnType<typeof setTimeout> | null;

  return (...args: Args) => {
    clearTimeout(handle!);
    handle = setTimeout(() => {
      fn(...args);
    }, options.timeout);
  };
}

export default function useDebouncedCallback<Args extends unknown[]>(
  fn: (...args: Args) => void,
  options: { timeout: number },
) {
  return useMemo(() => {
    return debounce(fn, { timeout: options.timeout });
  }, [fn]);
}
