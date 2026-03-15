"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Eye,
  FileText,
  Plus,
  Edit,
  Copy,
  Trash2,
  RefreshCw,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  DashboardJob,
  DashboardStats,
  JOB_STATUS_LABELS,
  JobStatus,
  EXTEND_PRICE,
} from "@/app/types-employer";

const mockStats: DashboardStats = {
  totalJobs: 11,
  activeJobs: 4,
  draftJobs: 2,
  expiredJobs: 5,
  totalViews: 12450,
  totalClicks: 3250,
  totalApplications: 156,
  viewsThisMonth: 3200,
  clicksThisMonth: 890,
  applicationsThisMonth: 45,
};

const mockJobs: DashboardJob[] = [
  {
    id: "1",
    title: "Senior Software Developer",
    status: "active",
    city: "Amsterdam",
    publishedAt: "2024-01-15",
    expiresAt: "2024-02-15",
    views: 1250,
    clicks: 340,
    applications: 28,
    package: "Enkele vacature",
    isPromoted: false,
    company: { name: "Tech Corp", logoUrl: "" },
  },
  {
    id: "2",
    title: "Project Manager",
    status: "active",
    city: "Utrecht",
    publishedAt: "2024-01-10",
    expiresAt: "2024-02-10",
    views: 890,
    clicks: 210,
    applications: 15,
    package: "Enkele vacature",
    isPromoted: true,
    company: { name: "Tech Corp", logoUrl: "" },
  },
  {
    id: "3",
    title: "UX Designer",
    status: "draft",
    city: "Rotterdam",
    publishedAt: "",
    expiresAt: "",
    views: 0,
    clicks: 0,
    applications: 0,
    package: "Enkele vacature",
    isPromoted: false,
    company: { name: "Tech Corp", logoUrl: "" },
  },
  {
    id: "4",
    title: "Marketing Manager",
    status: "expired",
    city: "Den Haag",
    publishedAt: "2023-12-01",
    expiresAt: "2024-01-01",
    views: 2100,
    clicks: 560,
    applications: 42,
    package: "Enkele vacature",
    isPromoted: false,
    company: { name: "Tech Corp", logoUrl: "" },
  },
];

type TabType = "jobs" | "invoices";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("jobs");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [stats] = useState<DashboardStats>(mockStats);
  const [jobs, setJobs] = useState<DashboardJob[]>(mockJobs);
  const [newJobBanner, setNewJobBanner] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("new") !== "true") return;
    try {
      const saved = localStorage.getItem("new-job");
      if (!saved) return;
      const newJob = JSON.parse(saved);
      localStorage.removeItem("new-job");
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      const entry: DashboardJob = {
        id: "new-" + Date.now(),
        title: newJob.title,
        status: "active",
        city: newJob.city,
        publishedAt: new Date().toISOString().split("T")[0],
        expiresAt,
        views: 0,
        clicks: 0,
        applications: 0,
        package: newJob.package,
        isPromoted: false,
        company: newJob.company,
      };
      setJobs((prev) => [entry, ...prev]);
      setNewJobBanner(newJob.title);
      setActiveTab("jobs");
    } catch {}
  }, []);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("nl-NL");
  };

  const getStatusColor = (status: JobStatus): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleSelectJob = (jobId: string): void => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const toggleSelectAll = (): void => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(jobs.map((job) => job.id));
    }
  };

  const tabs = [
    { id: "jobs" as TabType, label: "Vacatures", icon: Briefcase },
    { id: "invoices" as TabType, label: "Facturen", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welkom terug! Hier is een overzicht van je vacatures.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Facturen
            </Button>
            <Link href="/plaats-vacature">
              <Button className="bg-[#F1592A] hover:bg-[#e04d1f] gap-2">
                <Plus className="w-4 h-4" />
                Nieuwe vacature
              </Button>
            </Link>
          </div>
        </div>

        {newJobBanner && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-green-900">Vacature geplaatst!</p>
              <p className="text-sm text-green-700">
                &ldquo;{newJobBanner}&rdquo; is live en zichtbaar voor werkzoekenden.
              </p>
            </div>
            <button
              onClick={() => setNewJobBanner(null)}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Actieve vacatures</p>
                  <p className="text-2xl font-bold">{stats.activeJobs}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Views deze maand</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(stats.viewsThisMonth)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                +12% vs vorige maand
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Sollicitaties</p>
                  <p className="text-2xl font-bold">
                    {stats.applicationsThisMonth}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                +8% vs vorige maand
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Verlopen vacatures</p>
                  <p className="text-2xl font-bold">{stats.expiredJobs}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <Link
                href="/dashboard?tab=jobs&filter=expired"
                className="mt-2 text-sm text-[#F1592A] hover:underline block"
              >
                Verlengen vanaf €{EXTEND_PRICE}
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="border-b mb-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#F1592A] text-[#F1592A]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === "jobs" && (
                  <Badge variant="secondary" className="ml-1">
                    {jobs.length}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "jobs" && (
          <div>
            {selectedJobs.length > 0 && (
              <div className="bg-[#F1592A]/10 border border-[#F1592A]/20 rounded-lg p-4 mb-4 flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium">
                  {selectedJobs.length} vacature(s) geselecteerd
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw className="w-4 h-4" />
                    Verlengen
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    Pauzeren
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Verwijderen
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedJobs([])}
                >
                  Annuleren
                </Button>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedJobs.length === jobs.length && jobs.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vacature
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Sollicitaties
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vervalt op
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Acties
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => toggleSelectJob(job.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-500">{job.city}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}
                        >
                          {JOB_STATUS_LABELS[job.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatNumber(job.views)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatNumber(job.clicks)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.applications}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.expiresAt || "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          {job.status === "expired" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-[#F1592A]"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-center py-8">
              Facturen worden binnenkort toegevoegd.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
