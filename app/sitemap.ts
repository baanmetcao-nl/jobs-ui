import { MetadataRoute } from "next";
import { nicheSeo } from "@/lib/niches";
import { locations } from "@/lib/locations";

const BASE_URL = "https://baanmetcao.nl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/over-ons`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/werkgevers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = Object.values(nicheSeo).map(
    (niche) => ({
      url: `${BASE_URL}/vacatures/${niche.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }),
  );

  const categoryLocationPages: MetadataRoute.Sitemap = [];

  Object.values(nicheSeo).forEach((niche) => {
    locations.forEach((location) => {
      categoryLocationPages.push({
        url: `${BASE_URL}/vacatures/${niche.slug}/${location}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      });
    });
  });

  let jobPages: MetadataRoute.Sitemap = [];

  try {
    const jobsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?limit=1000`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (jobsRes.ok) {
      const jobsData = await jobsRes.json();

      if (jobsData.data && Array.isArray(jobsData.data)) {
        jobPages = jobsData.data.map(
          (job: { id: string; slug: string; publishedAt?: string }) => ({
            url: `${BASE_URL}/vacature/${job.id}/${job.slug}`,
            lastModified: job.publishedAt
              ? new Date(job.publishedAt)
              : new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          }),
        );
      }
    }
  } catch (error) {
    console.error("Failed to fetch jobs for sitemap:", error);
  }

  return [
    ...staticPages,
    ...categoryPages,
    ...categoryLocationPages,
    ...jobPages,
  ];
}
