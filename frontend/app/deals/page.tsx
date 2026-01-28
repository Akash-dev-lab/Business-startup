'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import DealCard from '@/components/DealCard';
import { motion, Variants } from 'framer-motion';
import { Skeleton, DealCardSkeleton } from '@/components/Skeleton';
import { AnimatedButton } from '@/components/AnimatedButton';

interface Deal {
    _id: string;
    title: string;
    description: string;
    category: string;
    accessLevel: string;
    partnerName: string;
}

import { containerVariants, itemVariants } from '@/lib/animations';

const DealsPage = () => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dealsRes = await api.get('/deals');
                const allDeals = dealsRes.data;
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                setIsLoggedIn(!!token);
                setDeals(allDeals);

                if (token) {
                    try {
                        const userRes = await api.get('/auth/me');
                        setIsVerified(!!userRes.data.isVerified);
                    } catch (e) {
                        console.error('Failed to fetch user status', e);
                        setIsVerified(false);
                    }
                } else {
                    setIsVerified(false);
                }
            } catch (err: any) {
                setError(err.message || 'Something went wrong while fetching deals.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-8 py-12 font-jakarta">
                <header className="mb-12">
                    <Skeleton className="h-16 w-64 mb-4" />
                    <Skeleton className="h-6 w-full max-w-2xl" />
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <DealCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-8 text-center">
                <div className="max-w-md space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Oops! Failed to load deals</h2>
                    <p className="text-gray-500">{error}</p>
                    <AnimatedButton
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 shadow-lg shadow-blue-100"
                    >
                        Try Again
                    </AnimatedButton>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-12 font-jakarta">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h1 className="text-4xl md:text-7xl font-black text-gray-300 mb-6 tracking-tight">
                    Exclusive <span className="text-blue-600">Deals</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
                    Browse through our curated list of startup deals and benefits.
                    {!isLoggedIn && " Log in to view exclusive locked deals."}
                    {isLoggedIn && !isVerified && " Verify your account to unlock all benefits."}
                </p>
            </motion.header>

            {deals.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-100 p-24 text-center">
                    <p className="text-gray-400 font-medium text-lg">No deals available at the moment. Check back soon!</p>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {deals.map((deal) => (
                        <motion.div key={deal._id} variants={itemVariants}>
                            <DealCard deal={deal} isVerified={isVerified} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default DealsPage;