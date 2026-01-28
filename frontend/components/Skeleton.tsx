'use client';

import { motion } from 'framer-motion';

export const Skeleton = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />
    );
};

export const DealCardSkeleton = () => {
    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex-grow">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-8" />
            </div>
            <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
};

export const DashboardRowSkeleton = () => {
    return (
        <tr className="border-b border-gray-100">
            <td className="px-8 py-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-16 rounded-full" />
                </div>
            </td>
            <td className="px-8 py-6"><Skeleton className="h-4 w-24" /></td>
            <td className="px-8 py-6"><Skeleton className="h-4 w-16" /></td>
            <td className="px-8 py-6"><Skeleton className="h-6 w-16 rounded-full" /></td>
            <td className="px-8 py-6 text-right"><Skeleton className="h-8 w-16 rounded-lg ml-auto" /></td>
        </tr>
    );
};
