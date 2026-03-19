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
  User,
  Download,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DashboardJob,
  DashboardStats,
  Invoice,
  JOB_STATUS_LABELS,
  JobStatus,
  EXTEND_PRICE,
} from "@/app/types-employer";
import { useUser, useClerk } from "@clerk/nextjs";

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

type TabType = "jobs" | "invoices" | "account";

type AccountData = {
  companyName: string;
  vatNumber: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  contactName: string;
  email: string;
  phone: string;
};

const emptyAccount: AccountData = {
  companyName: "",
  vatNumber: "",
  address: "",
  postalCode: "",
  city: "",
  country: "Nederland",
  contactName: "",
  email: "",
  phone: "",
};

const isAccountComplete = (account: AccountData): boolean =>
  !!(
    account.companyName.trim() &&
    account.address.trim() &&
    account.postalCode.trim() &&
    account.city.trim() &&
    account.email.trim()
  );

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    amount: 299,
    vat: 62.79,
    total: 361.79,
    status: "paid",
    jobCount: 1,
    description: "Enkele vacature — Senior Software Developer",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    date: "2024-01-10",
    dueDate: "2024-02-10",
    amount: 799,
    vat: 167.79,
    total: 966.79,
    status: "paid",
    jobCount: 3,
    description: "3 vacatures bundel",
  },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const [activeTab, setActiveTab] = useState<TabType>("jobs");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [stats] = useState<DashboardStats>(mockStats);
  const [jobs, setJobs] = useState<DashboardJob[]>(mockJobs);
  const [newJobBanner, setNewJobBanner] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountData>(emptyAccount);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [accountSaved, setAccountSaved] = useState(false);

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
    { id: "account" as TabType, label: "Account", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welkom terug{user?.firstName ? `, ${user.firstName}` : ""}! Hier
              is een overzicht van je vacatures.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setActiveTab("account")}
            >
              <User className="w-4 h-4" />
              Account
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
                &ldquo;{newJobBanner}&rdquo; is live en zichtbaar voor
                werkzoekenden.
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
                className={`flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-none px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#F1592A] text-[#F1592A]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4 hidden sm:block" />
                {tab.label}
                {tab.id === "jobs" && (
                  <Badge
                    variant="secondary"
                    className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs"
                  >
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

            <div className="space-y-3 md:hidden">
              {jobs.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => toggleSelectJob(job.id)}
                        className="rounded mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {job.title}
                            </p>
                            <p className="text-sm text-gray-500">{job.city}</p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${getStatusColor(job.status)}`}
                          >
                            {JOB_STATUS_LABELS[job.status]}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                          <div>
                            <p className="text-gray-500">Views</p>
                            <p className="font-medium">
                              {formatNumber(job.views)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Clicks</p>
                            <p className="font-medium">
                              {formatNumber(job.clicks)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Sollicitaties</p>
                            <p className="font-medium">{job.applications}</p>
                          </div>
                        </div>
                        {job.expiresAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            Vervalt op: {job.expiresAt}
                          </p>
                        )}
                        <div className="flex items-center gap-1 mt-3 pt-3 border-t">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden hidden md:block">
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
            {!isAccountComplete(account) ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Bedrijfsgegevens vereist
                  </h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Vul eerst je bedrijfsgegevens in bij Account om facturen te
                    kunnen downloaden.
                  </p>
                </div>
                <Button
                  onClick={() => setActiveTab("account")}
                  className="bg-[#F1592A] hover:bg-[#e04d1f] gap-2"
                >
                  <User className="w-4 h-4" />
                  Ga naar Account
                </Button>
              </div>
            ) : invoices.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Er zijn nog geen facturen beschikbaar.
              </p>
            ) : (
              <>
                <div className="space-y-3 md:hidden">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {invoice.invoiceNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            {invoice.date}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {invoice.status === "paid"
                            ? "Betaald"
                            : invoice.status === "pending"
                              ? "Openstaand"
                              : "Vervallen"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {invoice.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <p className="text-sm font-medium text-gray-900">
                          €
                          {invoice.total.toLocaleString("nl-NL", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[#F1592A]"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden md:block">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Factuurnummer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Datum
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Omschrijving
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Bedrag
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          PDF
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {invoice.invoiceNumber}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {invoice.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {invoice.description}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                invoice.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : invoice.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {invoice.status === "paid"
                                ? "Betaald"
                                : invoice.status === "pending"
                                  ? "Openstaand"
                                  : "Vervallen"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                            €
                            {invoice.total.toLocaleString("nl-NL", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-[#F1592A]"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "account" && (
          <div className="space-y-6">
            {accountSaved && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm text-green-800">
                  Bedrijfsgegevens opgeslagen.
                </p>
                <button
                  onClick={() => setAccountSaved(false)}
                  className="ml-auto text-green-600 hover:text-green-800 text-sm"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Bedrijfsgegevens
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Deze gegevens worden gebruikt voor je facturen.
              </p>

              <div className="space-y-4 max-w-2xl">
                <div>
                  <Label htmlFor="acc-companyName" className="mb-2">
                    Bedrijfsnaam <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="acc-companyName"
                    placeholder="Acme B.V."
                    value={account.companyName}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="acc-vatNumber" className="mb-2">
                    BTW-nummer
                  </Label>
                  <Input
                    id="acc-vatNumber"
                    placeholder="NL000000000B01"
                    value={account.vatNumber}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        vatNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="acc-address" className="mb-2">
                    Adres <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="acc-address"
                    placeholder="Straatnaam 123"
                    value={account.address}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="acc-postalCode" className="mb-2">
                      Postcode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="acc-postalCode"
                      placeholder="1234 AB"
                      value={account.postalCode}
                      onChange={(e) =>
                        setAccount((prev) => ({
                          ...prev,
                          postalCode: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="acc-city" className="mb-2">
                      Plaats <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="acc-city"
                      placeholder="Amsterdam"
                      value={account.city}
                      onChange={(e) =>
                        setAccount((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="acc-country" className="mb-2">
                    Land
                  </Label>
                  <Input
                    id="acc-country"
                    value={account.country}
                    onChange={(e) =>
                      setAccount((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Contactpersoon
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="acc-contactName" className="mb-2">
                        Naam
                      </Label>
                      <Input
                        id="acc-contactName"
                        placeholder="Jan Jansen"
                        value={account.contactName}
                        onChange={(e) =>
                          setAccount((prev) => ({
                            ...prev,
                            contactName: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acc-email" className="mb-2">
                          E-mailadres <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="acc-email"
                          type="email"
                          placeholder="jan@bedrijf.nl"
                          value={account.email}
                          onChange={(e) =>
                            setAccount((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="acc-phone" className="mb-2">
                          Telefoonnummer
                        </Label>
                        <Input
                          id="acc-phone"
                          type="tel"
                          placeholder="06 12345678"
                          value={account.phone}
                          onChange={(e) =>
                            setAccount((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    className="bg-[#F1592A] hover:bg-[#e04d1f]"
                    onClick={() => setAccountSaved(true)}
                  >
                    Opslaan
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Persoonlijk profiel
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Beheer je naam, e-mailadres en wachtwoord.
              </p>
              <Button variant="outline" onClick={() => openUserProfile()}>
                Profiel beheren
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
