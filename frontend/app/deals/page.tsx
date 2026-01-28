'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import DealCard from '@/components/DealCard';

interface Deal {
    _id: string;
    title: string;
    description: string;
    category: string;
    accessLevel: string;
    partnerName: string;
}

const DealsPage = () => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await api.get('/deals');
                setDeals(response.data);
            } catch (err: any) {
                setError(err.message || 'Something went wrong while fetching deals.');
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Discovering best deals for you...</p>
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
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Exclusive Deals</h1>
                <p className="text-lg text-gray-500 max-w-2xl">
                    Browse through our curated list of startup deals and benefits. Some deals are locked and require sign-in.
                </p>
            </header>

            {deals.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-100 p-24 text-center">
                    <p className="text-gray-400 font-medium text-lg">No deals available at the moment. Check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deals.map((deal) => (
                        <DealCard key={deal._id} deal={deal} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DealsPage;