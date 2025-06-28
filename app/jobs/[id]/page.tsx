import { Job } from "@/app/types";

// TODO: error handling
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const response = await fetch(`https://api.baanmetcao.nl/jobs/${params.id}`);
  const job: Job = await response.json();

  return (
    <div>
      <h1>{job.position}</h1>
    </div>
  );
}
