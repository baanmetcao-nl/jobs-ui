'use client';

import { JobsResponse, Job } from './types';
import { MapPin, Building2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Pagination from './pagination';
import { intervalFormat } from '@/lib/utils';

export default function JobList({
    jobsResponse,
    page,
}: {
    jobsResponse: JobsResponse;
    page: number;
}) {
    const jobs = jobsResponse.data;
    const { totalCount, limit } = jobsResponse.pagination;
    const totalPages = Math.ceil(totalCount / limit);

    const router = useRouter();

    const openJob = (jobId: string) => {
        router.push(`/jobs/${jobId}`);
    };

    return (
        <>
            <div className="space-y-6">
                {jobs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Geen vacatures gevonden
                    </div>
                )}

                {jobs.map((job: JobsResponse['data'][number]) => (
                    <Card
                        key={job.id}
                        className="hover:shadow-md transition-shadow"
                    >
                        <CardHeader>
                            <div className="flex justify-between gap-4">
                                <div>
                                    <CardTitle className="text-xl mb-2">
                                        {job.title}
                                    </CardTitle>
                                    <div className="flex gap-4 text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Building2 className="h-4 w-4" />
                                            {job.company.name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job.city}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Badge>
                                                {job.salary.symbol}{' '}
                                                {job.salary.min}-
                                                {job.salary.max}{' '}
                                                {intervalFormat(
                                                    job.salary.interval,
                                                )}
                                            </Badge>
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    size="sm"
                                    onClick={() => openJob(job.id)}
                                    className="bg-[#F1592A]"
                                >
                                    <Eye className="h-4 w-4" /> Bekijk
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {job.summary}
                            </ReactMarkdown>

                            <div className="flex flex-wrap gap-2 mt-3">
                                <Badge>{job.contract}</Badge>
                                {job.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} />
        </>
    );
}
