export async function backendFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  let token: string | null = null;
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { getToken } = await auth();
    token = await getToken();
  } catch {}

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (process.env.BEARER_TOKEN) {
    headers.Authorization = `Bearer ${process.env.BEARER_TOKEN}`;
  }

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string>),
    },
  });
}
