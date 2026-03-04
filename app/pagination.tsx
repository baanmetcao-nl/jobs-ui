"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? "1";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (totalPages <= 1) return null;

  const start = Math.max(0, page - 2);
  const end = Math.min(totalPages - 1, page + 2);

  const pages: (number | "ellipsis")[] = [];

  if (start > 0) {
    pages.push(0);
    if (start > 1) {
      pages.push("ellipsis");
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    if (end < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages - 1);
  }

  const createUrl = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (p === 0) {
      params.delete("page");
    } else {
      params.set("page", String(p + 1));
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <div className="flex justify-center gap-2 mt-12 flex-wrap">
      {page > 0 && (
        <Link href={createUrl(0)} scroll={false}>
          <Button>{"<<"}</Button>
        </Link>
      )}

      {page > 0 && (
        <Link href={createUrl(page - 1)} scroll={false}>
          <Button>{"<"}</Button>
        </Link>
      )}

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 flex items-center text-gray-500"
          >
            ...
          </span>
        ) : (
          <Link key={`page-${p}`} href={createUrl(p)} scroll={false}>
            <Button variant={p === page ? "default" : "outline"}>
              {p + 1}
            </Button>
          </Link>
        ),
      )}

      {page < totalPages - 1 && (
        <Link href={createUrl(page + 1)} scroll={false}>
          <Button>{">"}</Button>
        </Link>
      )}

      {page < totalPages - 1 && (
        <Link href={createUrl(totalPages - 1)} scroll={false}>
          <Button>{">>"}</Button>
        </Link>
      )}
    </div>
  );
}
