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

export async function createJobDraft(
  jobData: Partial<JobDetailsFormData>,
  companyData: Partial<CompanyFormData>,
): Promise<{ draftId: string }> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/draft`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/draft/${draftId}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/publish`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/drafts/${draftId}`;

  const res = await fetch(url, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Failed to get draft: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerDashboard(): Promise<EmployerDashboardResponse> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/dashboard`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerJobs(): Promise<DashboardJob[]> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerStats(): Promise<DashboardStats> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/stats`;

  const res = await fetch(url, {
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/${jobId}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/${jobId}/duplicate`;

  const res = await fetch(url, {
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
  durationDays: number = 30,
): Promise<ExtendJobResponse> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/${jobId}/extend`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/${jobId}/republish`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to republish job: ${res.status}`);
  }

  return res.json();
}

export async function pauseJob(jobId: string): Promise<{ success: boolean }> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/${jobId}/pause`;

  const res = await fetch(url, {
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/${jobId}/activate`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to activate job: ${res.status}`);
  }

  return res.json();
}

export async function deleteJob(jobId: string): Promise<{ success: boolean }> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/${jobId}`;

  const res = await fetch(url, {
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/jobs/bulk`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobIds, action }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to perform bulk action: ${res.status}`);
  }

  return res.json();
}

export async function getInvoices(): Promise<Invoice[]> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/invoices`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch invoices: ${res.status}`);
  }

  return res.json();
}

export async function getInvoice(invoiceId: string): Promise<Invoice> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/invoices/${invoiceId}`;

  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch invoice: ${res.status}`);
  }

  return res.json();
}

export async function getEmployerProfile(): Promise<EmployerProfile> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/profile`;

  const res = await fetch(url, {
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/profile`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/auth/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/auth/register`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/auth/logout`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to logout: ${res.status}`);
  }

  return res.json();
}

export async function getCurrentEmployer(): Promise<EmployerProfile | null> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employer/auth/me`;

  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
