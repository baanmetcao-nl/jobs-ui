"use client";

import { useMemo } from "react";

function debounce<Fn extends (...args: any[]) => void>(
  fn: Fn,
  options: { timeout: number },
) {
  let handle: Timer | null;

  return (...args: any[]) => {
    clearTimeout(handle!);
    handle = setTimeout(() => {
      fn(...args);
    }, options.timeout);
  };
}

export default function useDebouncedCallback<T>(
  fn: (...args: any[]) => T,
  options: { timeout: number },
) {
  return useMemo(() => {
    return debounce(fn, { timeout: options.timeout });
  }, [fn]);
}
