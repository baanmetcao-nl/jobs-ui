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
    params.set("page", p.toString());

    router.push(`${pathname}?${params.toString()}`);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-12">
      <Button disabled={page === 0} onClick={() => goToPage(0)}>
        {"<<"}
      </Button>
      <Button disabled={page === 0} onClick={() => goToPage(page - 1)}>
        {"<"}
      </Button>

      {Array.from({ length: totalPages })
        .slice(Math.max(0, page - 2), page + 3)
        .map((_, i) => {
          const pageNumber = Math.max(0, page - 2) + i;
          return (
            <Button
              key={pageNumber}
              variant={pageNumber === page ? "default" : "outline"}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber + 1}
            </Button>
          );
        })}

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
