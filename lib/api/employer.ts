import type {
  CreateJobResponse,
  DuplicateJobResponse,
  EmployerDashboardResponse,
  ExtendJobResponse,
  JobDetailsFormData,
  CompanyFormData,
  AccountFormData,
  DashboardJob,
  DashboardStats,
  Invoice,
  EmployerProfile,
  PricingPlan,
} from "@/app/types-employer";
import { backendFetch } from "./backend";

export async function createJobDraft(
  jobData: Partial<JobDetailsFormData>,
  companyData: Partial<CompanyFormData>,
): Promise<{ draftId: string }> {
  const res = await backendFetch("/api/employer/jobs/draft", {
    method: "POST",
    body: JSON.stringify({
      job: jobData,
      company: companyData,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create draft: ${res.status}`);
  }

  return res.json();
}

export async function updateJobDraft(
  draftId: string,
  jobData: Partial<JobDetailsFormData>,
  companyData?: Partial<CompanyFormData>,
): Promise<{ success: boolean }> {
  const res = await backendFetch(`/api/employer/jobs/draft/${draftId}`, {
    method: "PUT",
    body: JSON.stringify({
      job: jobData,
      company: companyData,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update draft: ${res.status}`);
  }

  return res.json();
}

export async function publishJob(
  draftId: string,
  pricing: PricingPlan,
  accountData: AccountFormData,
): Promise<CreateJobResponse> {
  const res = await backendFetch("/api/employer/jobs/publish", {
    method: "POST",
    body: JSON.stringify({
      draftId,
      pricing,
      account: accountData,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      success: false,
      errors: error.errors || {},
    };
  }

  return res.json();
}

export async function getDraft(draftId: string): Promise<{
  job: Partial<JobDetailsFormData>;
  company: Partial<CompanyFormData>;
}> {
  const res = await backendFetch(`/api/employer/drafts/${draftId}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Failed to get draft: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerDashboard(): Promise<EmployerDashboardResponse> {
  const res = await backendFetch("/api/employer/dashboard", {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerJobs(): Promise<DashboardJob[]> {
  const res = await backendFetch("/api/employer/jobs", {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerStats(): Promise<DashboardStats> {
  const res = await backendFetch("/api/employer/stats", {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status}`);
  }

  return res.json();
}

export async function updateJob(
  jobId: string,
  jobData: Partial<JobDetailsFormData>,
): Promise<{ success: boolean }> {
  const res = await backendFetch(`/api/employer/jobs/${jobId}`, {
    method: "PUT",
    body: JSON.stringify(jobData),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to update job: ${res.status}`);
  }

  return res.json();
}

export async function duplicateJob(
  jobId: string,
): Promise<DuplicateJobResponse> {
  const res = await backendFetch(`/api/employer/jobs/${jobId}/duplicate`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to duplicate job: ${res.status}`);
  }

  return res.json();
}

export async function extendJob(
  jobId: string,
  durationDays: number = 60,
): Promise<ExtendJobResponse> {
  const res = await backendFetch(`/api/employer/jobs/${jobId}/extend`, {
    method: "POST",
    body: JSON.stringify({ durationDays }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to extend job: ${res.status}`);
  }

  return res.json();
}

export async function republishJob(
  jobId: string,
): Promise<{ success: boolean; newExpiryDate: string }> {
  const res = await backendFetch(`/api/employer/jobs/${jobId}/republish`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to republish job: ${res.status}`);
  }

  return res.json();
}

export async function pauseJob(jobId: string): Promise<{ success: boolean }> {
  const res = await backendFetch(`/api/employer/jobs/${jobId}/pause`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to pause job: ${res.status}`);
  }

  return res.json();
}

export async function activateJob(
  jobId: string,
): Promise<{ success: boolean }> {
  const res = await backendFetch(`/api/employer/jobs/${jobId}/activate`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to activate job: ${res.status}`);
  }

  return res.json();
}

export async function deleteJob(jobId: string): Promise<{ success: boolean }> {
  const res = await backendFetch(`/api/employer/jobs/${jobId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete job: ${res.status}`);
  }

  return res.json();
}

export async function bulkAction(
  jobIds: string[],
  action: "delete" | "pause" | "activate" | "extend",
): Promise<{ success: boolean; affectedCount: number }> {
  const res = await backendFetch("/api/employer/jobs/bulk", {
    method: "POST",
    body: JSON.stringify({ jobIds, action }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to perform bulk action: ${res.status}`);
  }

  return res.json();
}

export async function getInvoices(): Promise<Invoice[]> {
  const res = await backendFetch("/api/employer/invoices", {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch invoices: ${res.status}`);
  }

  return res.json();
}

export async function getInvoice(invoiceId: string): Promise<Invoice> {
  const res = await backendFetch(`/api/employer/invoices/${invoiceId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch invoice: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerProfile(): Promise<EmployerProfile> {
  const res = await backendFetch("/api/employer/profile", {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status}`);
  }

  return res.json();
}

export async function updateEmployerProfile(
  profileData: Partial<EmployerProfile>,
): Promise<{ success: boolean }> {
  const res = await backendFetch("/api/employer/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.status}`);
  }

  return res.json();
}

export async function loginEmployer(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: EmployerProfile; error?: string }> {
  const res = await backendFetch("/api/employer/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }

  return res.json();
}

export async function registerEmployer(
  accountData: AccountFormData,
): Promise<{ success: boolean; user?: EmployerProfile; error?: string }> {
  const res = await backendFetch("/api/employer/auth/register", {
    method: "POST",
    body: JSON.stringify(accountData),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      success: false,
      error: error.message || "Registration failed",
    };
  }

  return res.json();
}

export async function logoutEmployer(): Promise<{ success: boolean }> {
  const res = await backendFetch("/api/employer/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to logout: ${res.status}`);
  }

  return res.json();
}

export async function getCurrentEmployer(): Promise<EmployerProfile | null> {
  const res = await backendFetch("/api/employer/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
