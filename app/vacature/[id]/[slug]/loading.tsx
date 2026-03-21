import { Loader2 as Spinner } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <Spinner className="h-8 w-8 animate-spin text-teal-600" />
      <p className="text-gray-500 text-sm">Vacature laden...</p>
    </div>
  );
}
