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
import { contractFormat, intervalFormat } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

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
                            <div className="flex max-sm:flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <div className="flex flex-row items-center gap-3 mb-4">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${job.company.logoUrl}`}
                                            alt={'logo'}
                                            width={60}
                                            height={60}
                                        />{' '}
                                        <CardTitle className="text-xl mb-2 hover:text-[#F1592A]">
                                            <Link href={`/jobs/${job.id}`}>
                                                {job.title}
                                            </Link>
                                        </CardTitle>
                                    </div>
                                    <div className="flex max-sm:flex-col gap-4 text-gray-600">
                                        <div className="flex flex-row gap-4">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="h-4 w-4" />
                                                {job.company.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.city}
                                            </span>
                                        </div>
                                        <div className="flex flex-row gap-4 max-sm:mb-2">
                                            <span className="flex items-center gap-1">
                                                <Badge variant={'outline'}>
                                                    {job.salary.symbol}{' '}
                                                    {Math.trunc(job.salary.min)}
                                                    -
                                                    {Math.trunc(job.salary.max)}{' '}
                                                    {intervalFormat(
                                                        job.salary.interval,
                                                    )}
                                                </Badge>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Badge>
                                                    {contractFormat(
                                                        job.contract,
                                                    )}
                                                </Badge>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        size="sm"
                                        onClick={() => openJob(job.id)}
                                        className="bg-[#F1592A] max-sm:w-full"
                                    >
                                        <Eye className="h-4 w-4" /> Bekijk
                                        vacature
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {job.summary}
                            </ReactMarkdown>

                            <div className="flex flex-wrap gap-2 mt-3">
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
