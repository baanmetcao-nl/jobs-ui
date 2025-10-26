
type SimilarJob = {
    "id": number
    "location": string
    "position": string
    "contract": string
    "education": string
    "field": string
    "salaryRange": {
        "min": number
        "max": number
        "currency": string
        "symbol":string
        "interval": string
    },
    "company": {
        "name": string,
        "logoUrl": string,
        "id": number
    }
}

export default async function SimilarJobs({ id}: { id: string}) {
    const response = await fetch(`https://api.baanmetcao.nl/jobs/${id}/similar`)
    const { data: similarJobs }: { data: SimilarJob[] } = await response.json();

    return (
        <div>
            {similarJobs.map(job => (
                <div key={job.id}>
                    job hiero
                </div>
            ))}
        </div>
    )
}