import { Job } from "@/app/types";

const CACHE_TIME = 7 * 24 * 60 * 60;

// TODO: error handling
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const response = await fetch(`https://api.baanmetcao.nl/jobs/${params.id}`, {
    next: { revalidate: CACHE_TIME },
  });
  const result: { data: Job } = await response.json();
  const job = result.data;

  return (
    <div>
      <h1>{job.position}</h1>
    </div>
  );
}
