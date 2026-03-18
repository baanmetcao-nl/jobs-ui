export async function backendFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Try Clerk token for authenticated server-side requests
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { getToken } = await auth();
    const token = await getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Not in a server component context or Clerk not available,
    // fall back to env token
    const envToken = process.env.BEARER_TOKEN;
    if (envToken) {
      headers.Authorization = `Bearer ${envToken}`;
    }
  }

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string>),
    },
  });
}
