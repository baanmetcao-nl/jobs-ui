/**
 * Lightweight mock API server that replaces the real backend during e2e tests.
 * Started automatically by Playwright via global-setup.ts.
 */
import http from "node:http";
import {
  MOCK_JOBS,
  MOCK_FULL_JOB,
  MOCK_TOTAL_COUNT,
  buildJobsResponse,
} from "./data";

const PORT = 3456;

function json(res: http.ServerResponse, body: unknown, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const path = url.pathname;

  // --- /api/jobs/count ---
  if (path === "/api/jobs/count") {
    return json(res, { count: MOCK_TOTAL_COUNT });
  }

  // --- /api/jobs/:id  (single job) ---
  const singleJobMatch = path.match(/^\/api\/jobs\/([^/]+)$/);
  if (singleJobMatch && !path.includes("count")) {
    const id = singleJobMatch[1];
    if (id === MOCK_FULL_JOB.id) {
      return json(res, MOCK_FULL_JOB);
    }
    // Return mock job with the requested id
    return json(res, { ...MOCK_FULL_JOB, id });
  }

  // --- /api/jobs  (listing) ---
  if (path === "/api/jobs") {
    const limit = Number(url.searchParams.get("limit") ?? 10);
    const offset = Number(url.searchParams.get("offset") ?? 0);
    const search = url.searchParams.get("search") ?? "";

    let filteredJobs = [...MOCK_JOBS];

    if (search) {
      const q = search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.summary.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    const niches = url.searchParams.getAll("niches");
    if (niches.length > 0) {
      filteredJobs = filteredJobs.filter((j) =>
        j.niches.some((n) => niches.includes(n)),
      );
    }

    return json(res, buildJobsResponse(filteredJobs, offset, limit));
  }

  // --- /api/locations ---
  if (path === "/api/locations") {
    return json(res, [
      { label: "Amsterdam", value: "the_netherlands__Amsterdam" },
      { label: "Rotterdam", value: "the_netherlands__Rotterdam" },
      { label: "Utrecht", value: "the_netherlands__Utrecht" },
      { label: "Den Haag", value: "the_netherlands__Den Haag" },
    ]);
  }

  // --- fallback ---
  json(res, { error: "Not found" }, 404);
});

server.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});

export { server, PORT };
