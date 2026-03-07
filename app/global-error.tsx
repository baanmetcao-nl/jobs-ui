"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md text-center p-6">
          <h1 className="text-3xl font-bold mb-4">Oeps! Er ging iets mis</h1>

          <p className="text-gray-600 mb-6">
            Er is een onverwachte fout opgetreden. Probeer het opnieuw of ga
            terug naar de vacatures.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              prefetch={false}
              href="/"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Bekijk vacatures
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
