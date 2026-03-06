"use client";

import { NavBar } from "./navbar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <NavBar />
    </header>
  );
}
