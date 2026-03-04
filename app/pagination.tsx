"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (p === 0) {
      params.delete("page");
    } else {
      params.set("page", (p + 1).toString());
    }

    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.push(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <div className="flex justify-center gap-2 mt-12 flex-wrap">
      <Button disabled={page === 0} onClick={() => goToPage(0)}>
        {"<<"}
      </Button>

      <Button disabled={page === 0} onClick={() => goToPage(page - 1)}>
        {"<"}
      </Button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 flex items-center text-gray-500"
          >
            ...
          </span>
        ) : (
          <Button
            key={`page-${p}`}
            variant={p === page ? "default" : "outline"}
            onClick={() => goToPage(p)}
          >
            {p + 1}
          </Button>
        ),
      )}

      <Button
        disabled={page >= totalPages - 1}
        onClick={() => goToPage(page + 1)}
      >
        {">"}
      </Button>

      <Button
        disabled={page >= totalPages - 1}
        onClick={() => goToPage(totalPages - 1)}
      >
        {">>"}
      </Button>
    </div>
  );
}
