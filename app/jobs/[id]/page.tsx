import { Job, JobsResponse, MinimalJob } from '@/app/types';
import { notFound } from 'next/navigation';
import JobDetails from './job-details';

const CACHE_TIME = 7 * 24 * 60 * 60;

async function getJob(id: string) {
    const singleJob = await fetch(
        `https://jobs-dry-breeze-1010.fly.dev/api/jobs/${id}`,
        {
            next: { revalidate: 0 },
        },
    );
    if (singleJob.status === 404) {
        throw notFound();
    }
    if (!singleJob.ok) {
        throw new Error('Er is iets misgegaan');
    }
    const job: Job = await singleJob.json();
    return job;
}

async function getRelatedJobs(niches: string[]): Promise<JobsResponse> {
    const params = new URLSearchParams();
    params.append('limit', '3');
    niches.forEach((niche) => params.set('niches', niche));
    console.log(
        `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`,
    );
    const response = await fetch(
        `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`,
    );
    if (!response.ok) {
        throw new Error('Er is iets misgegaan');
    }
    return response.json();
}

async function getRelatedCompanyJobs(companyId: string): Promise<JobsResponse> {
    const params = new URLSearchParams();
    params.append('limit', '3');
    params.set('companyIds', companyId);

    const response = await fetch(
        `https://jobs-dry-breeze-1010.fly.dev/api/jobs?${params.toString()}`,
    );
    if (!response.ok) {
        throw new Error('Er is iets misgegaan');
    }
    const relatedCompanyJobs: MinimalJob[] = await response.json();
    return relatedCompanyJobs;
}

// TODO: error handling & change with general route in route.ts
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const job = await getJob(params.id);

    const [relatedJobs, relatedCompanyJobs] = await Promise.all([
        getRelatedJobs(job.niches),
        getRelatedCompanyJobs(job.company.id),
    ]);

    return (
        <div>
            <JobDetails
                job={job}
                relatedCompanyJobs={relatedCompanyJobs.data}
                relatedJobs={relatedJobs.data}
            />
        </div>
    );
}
