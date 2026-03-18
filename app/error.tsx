"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="text-[#F1592A] text-8xl font-bold mb-4">500</div>
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
            <AlertTriangle className="w-12 h-12 text-[#F1592A]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Er ging iets mis
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
          Er is een onverwachte fout opgetreden. Probeer het opnieuw of ga terug
          naar de homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button
            onClick={reset}
            className="bg-[#F1592A] hover:bg-[#F1592A]/90 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Probeer opnieuw
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <Link prefetch={false} href="/">
              <Home className="w-4 h-4 mr-2" />
              Naar homepage
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Hulp nodig?{" "}
          <Link
            href="/contact"
            className="text-[#F1592A] underline underline-offset-4 hover:text-[#F1592A]/80 font-medium"
          >
            Neem contact op
          </Link>
        </p>
      </div>
    </div>
  );
}
