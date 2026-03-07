import Link from "next/link";
import { Briefcase, Search } from "lucide-react";
import { NicheSeoConfig } from "@/lib/niches";
import { Button } from "./ui/button";

type NoJobsFoundProps = {
  config: NicheSeoConfig;
};

export function NoJobsFound({ config }: NoJobsFoundProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Briefcase className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 left-1/2 transform -translate-x-1/2 translate-x-8">
            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-destructive" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">
          Geen vacatures gevonden
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Er zijn momenteel geen vacatures beschikbaar voor deze selectie.
          Bekijk alle vacatures binnen deze categorie.
        </p>

        <div className="flex sm:flex-col md:flex-row justify-center gap-4">
          <div className="flex sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#F1592A]">
              <Link prefetch={false} href={`/vacatures/${config.slug}`}>
                Bekijk alle {config.heading}
              </Link>
            </Button>
          </div>
          <div className="flex sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#F1592A]">
              <Link prefetch={false} href="/">
                Bekijk alle vacatures
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Hulp nodig?{" "}
          <Link
            href="/contact"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Neem contact op
          </Link>
        </p>
      </div>
    </div>
  );
}
