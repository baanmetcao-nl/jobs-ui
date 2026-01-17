import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      <p className="text-gray-500 text-sm">Vacatures laden...</p>
    </div>
  );
}
