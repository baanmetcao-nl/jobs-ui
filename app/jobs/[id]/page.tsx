import {notFound} from "next/navigation";
import {Suspense} from "react";
import SimilarJobs from "@/app/jobs/[id]/similar-jobs";
import JobDetailsV2 from "@/app/jobs/[id]/job-details-v2";

const CACHE_TIME = 24 * 60 * 60;

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const response = fetch(`https://api.baanmetcao.nl/jobs/${params.id}`, {
    next: { revalidate: CACHE_TIME },
  }).then(response => {
    if (response.status === 404) {
      notFound()
    } else if (!response.ok) {
      throw new Error("something went wrong")
    } else {
      return response.json()
    }
  });

  return (
    <div>
      {/*  ik zou alle componenten die data nodig hebben, hier in Page renderen. Zo kan je met suspense tegelijk alles laden en een skeleton loader
      tonen op de plek waar het component moet komen.
      */}

      <Suspense fallback={<div>Lekkerladen</div>}>
          <JobDetailsV2 id={params.id} />
      </Suspense>

      <Suspense fallback={<div>Lekkerladen</div>}>
          <SimilarJobs id={params.id} />
      </Suspense>
    </div>
  );
}
