'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Skeleton, DashboardRowSkeleton } from '@/components/Skeleton';
import { AnimatedButton } from '@/components/AnimatedButton';

interface ClaimedDeal {
    _id: string;
    dealId: {
        _id: string;
        title: string;
        partnerName: string;
        category: string;
    };
    status: string;
    createdAt: string;
}

const DashboardPage = () => {
    const [claims, setClaims] = useState<ClaimedDeal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await api.get('/claims/my');
                setClaims(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load your claims. Are you logged in?');
            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <header className="mb-10">
                    <Skeleton className="h-10 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </header>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <DashboardRowSkeleton key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto px-4 md:px-8 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
                    <p className="text-gray-500 mb-8">{error}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/login" className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors">
                            Login
                        </Link>
                        <Link href="/" className="px-8 py-3.5 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors">
                            Go Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
            <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-300 mb-2 tracking-tight">My Dashboard</h1>
                    <p className="text-gray-400 font-medium">Tracking your exclusive startup benefits.</p>
                </div>
                <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl self-start">
                    <button className="px-6 py-2.5 bg-white text-blue-600 font-bold rounded-xl shadow-sm text-sm md:text-base">My Claims</button>
                    <button className="px-6 py-2.5 text-gray-500 font-bold hover:text-gray-700 transition-colors text-sm md:text-base cursor-not-allowed">Profile</button>
                </div>
            </header>

            {claims.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-gray-100 p-12 md:p-24 text-center shadow-sm"
                >
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No active claims yet</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start exploring and claim exclusive deals to see them appear here.</p>
                    <Link href="/deals">
                        <AnimatedButton className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">
                            Browse Deals
                        </AnimatedButton>
                    </Link>
                </motion.div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Deal</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Partner</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {claims.map((claim) => (
                                    <tr key={claim._id} className="hover:bg-gray-50/50 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{claim.dealId?.title}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 px-2 py-0.5 bg-gray-50 rounded-full self-start">{claim.dealId?.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-semibold text-gray-600 text-sm">{claim.dealId?.partnerName || 'Visionary Partners'}</td>
                                        <td className="px-8 py-6 text-gray-400 text-sm tabular-nums">
                                            {new Date(claim.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${claim.status === 'approved' ? 'bg-green-50 text-green-600 border-green-100' :
                                                claim.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                                                }`}>
                                                {claim.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Link href={`/deals/${claim.dealId?._id}`}>
                                                <AnimatedButton className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                                                    View
                                                </AnimatedButton>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-gray-100">
                        {claims.map((claim) => (
                            <div key={claim._id} className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{claim.dealId?.category}</span>
                                        <h3 className="font-bold text-gray-900 leading-tight">{claim.dealId?.title}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${claim.status === 'approved' ? 'bg-green-50 text-green-600 border-green-100' :
                                        claim.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                                        }`}>
                                        {claim.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-medium">Partner: <span className="text-gray-900">{claim.dealId?.partnerName || 'Visionary Partners'}</span></span>
                                    <span className="text-gray-400 tabular-nums">{new Date(claim.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                                </div>
                                <Link href={`/deals/${claim.dealId?._id}`} className="block w-full">
                                    <AnimatedButton className="w-full text-center py-3 bg-gray-50 text-blue-600 font-bold rounded-xl text-sm transition-colors active:bg-blue-50">
                                        View Deal Details
                                    </AnimatedButton>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
