import {notFound} from "next/navigation";


type DetailedJob =
    {
        "createdAt": string,
        "description": string,
        "id": number,
        "location": string,
        "position": string,
        "requirements": string[],
        "responsibilities": string[],
        "tags": string[],
        "url": string,
        "workplace": string,
        "contract": string,
        "education": string,
        "field": string
        "seniority": string
        "salaryRange": {
            "min": number,
            "max": number,
            "currency": string,
            "symbol": string,
            "interval": string
        },
        "company": {
            "name": string,
            "logoUrl": string,
            "description": string,
            "meta": string,
            "id": number
        },
        "collectiveLaborAgreement": {
            "extraMoney": boolean,
            "pension": boolean,
            "travelAllowance": boolean,
            "stocks": boolean,
            "bonus": boolean
        }
    }
export default async function JobDetailsV2({ id} : { id: string }) {
    const response = await fetch(`https://api.baanmetcao.nl/jobs/${id}`)
    if (response.status === 404) {
        notFound()
    } else if (!response.ok) {
        throw new Error("something went wrong")
    }

    const {data: job }: { data: DetailedJob } = await response.json();

    return (
        <div>
            {job.position}
            Details v2
        </div>
    )
}