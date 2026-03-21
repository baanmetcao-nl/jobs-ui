import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  MapPin,
  Eye,
  Users,
  Calendar,
  ExternalLink,
  Building2,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { backendFetch } from "@/lib/api/backend";
import type { EmployerProfile, DashboardJob } from "@/app/types-employer";
import { cache } from "react";

export const revalidate = 3600;

const getCompany = cache(async function getCompany(slug: string) {
  const res = await backendFetch(`/api/companies/${slug}`);

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Failed to fetch company");

  return res.json() as Promise<{
    profile: EmployerProfile;
    jobs: DashboardJob[];
  }>;
});

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  try {
    const { profile } = await getCompany(params.slug);

    return {
      title: `${profile.companyName} - Vacatures & bedrijfsprofiel`,
      description: profile.bio
        ? profile.bio.slice(0, 155)
        : `Bekijk vacatures en het bedrijfsprofiel van ${profile.companyName} op Baan met CAO.`,
      alternates: {
        canonical: `/bedrijf/${params.slug}`,
      },
      openGraph: {
        title: `${profile.companyName} - Vacatures & bedrijfsprofiel`,
        description: profile.bio
          ? profile.bio.slice(0, 155)
          : `Bekijk vacatures van ${profile.companyName}.`,
      },
    };
  } catch {
    return {
      title: "Bedrijfsprofiel",
    };
  }
}

function formatNumber(num: number): string {
  return num.toLocaleString("nl-NL");
}

function getStatusColor(status: string): string {
  if (status === "active") return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
}

function createJobSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function getJobLink(job: DashboardJob): string {
  return `/vacature/${job.id}/${createJobSlug(job.title)}`;
}

export default async function CompanyProfilePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { profile, jobs } = await getCompany(params.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-48 md:h-64 bg-linear-to-r from-[#F1592A] to-[#e04d1f] relative">
        {profile.coverImage && (
          <Image
            src={profile.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-md border-4 border-white flex items-center justify-center -mt-16 md:-mt-20 shrink-0">
              {profile.logoUrl ? (
                <Image
                  src={profile.logoUrl}
                  alt={profile.companyName}
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              ) : (
                <Building2 className="w-12 h-12 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {profile.companyName}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
                {profile.industry && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {profile.industry}
                  </span>
                )}
                {profile.size && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {profile.size} medewerkers
                  </span>
                )}
                {profile.foundedYear && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Opgericht {profile.foundedYear}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#F1592A] hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Briefcase className="w-4 h-4" />
                  {profile.activeJobs} actieve vacatures
                </span>
              </div>
            </div>
          </div>

          {profile.bio && (
            <div className="mt-6 pt-6 border-t">
              <h2 className="text-lg font-semibold mb-3">Over ons</h2>
              <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-[#F1592A]">
                {profile.activeJobs}
              </p>
              <p className="text-sm text-gray-500">Vacatures</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold">
                {formatNumber(jobs.reduce((acc, j) => acc + j.views, 0))}
              </p>
              <p className="text-sm text-gray-500">Views</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold">
                {formatNumber(jobs.reduce((acc, j) => acc + j.clicks, 0))}
              </p>
              <p className="text-sm text-gray-500">Kliks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold">
                {jobs.reduce((acc, j) => acc + j.applications, 0)}
              </p>
              <p className="text-sm text-gray-500">Sollicitaties</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">
            Vacatures van {profile.companyName}
          </h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 hover:border-[#F1592A]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <Link
                          href={getJobLink(job)}
                          className="font-medium text-gray-900 hover:text-[#F1592A] transition-colors"
                        >
                          {job.title}
                        </Link>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.city}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(job.status)}`}
                          >
                            {job.status === "active" ? "Actief" : job.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {formatNumber(job.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applications}
                    </span>
                    <Link href={getJobLink(job)}>
                      <Button
                        size="sm"
                        className="bg-[#F1592A] hover:bg-[#e04d1f]"
                      >
                        Bekijk
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Er zijn momenteel geen vacatures beschikbaar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
