'use client';

import React, { useEffect, useState, use } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

interface Deal {
  _id: string;
  title: string;
  description: string;
  category: string;
  accessLevel: string;
  eligibilityText: string;
  partnerName: string;
}

const DealDetailsPage = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
  const params = use(paramsPromise);
  const { id } = params;

  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await api.get(`/deals/${id}`);
        setDeal(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load deal details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDeal();
  }, [id]);

  const handleClaim = async () => {
    setClaiming(true);
    try {
      await api.post(`/claims/${id}`);
      setClaimed(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to claim deal. Are you logged in?');
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="bg-white p-8 md:p-16 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Deal Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">{error || "The deal you're looking for doesn't exist or is currently unavailable."}</p>
          <Link href="/deals" className="inline-flex items-center text-blue-600 font-black hover:gap-3 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to deals
          </Link>
        </div>
      </div>
    );
  }

  const isLocked = deal.accessLevel === 'locked';

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">
      <Link href="/deals" className="inline-flex items-center text-xs font-black text-gray-400 hover:text-blue-600 mb-10 transition-all uppercase tracking-widest group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Keep Exploring
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white rounded-[2rem] p-8 md:p-14 border border-gray-100 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-blue-100">
                {deal.category}
              </span>
              {isLocked && (
                <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full border border-amber-100 uppercase tracking-[0.2em]">
                  Locked Benefit
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">{deal.title}</h1>
            <p className="text-base md:text-xl text-gray-500 leading-relaxed font-medium whitespace-pre-wrap">
              {deal.description}
            </p>
          </section>

          <section className="bg-gray-900 rounded-[2rem] p-8 md:p-14 text-white">
            <h2 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs">?</span>
              Eligibility Requirements
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-bold italic">
              "{deal.eligibilityText}"
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-2xl shadow-blue-100/30 lg:sticky lg:top-32">
            <div className="mb-10">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">Partner Institution</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl font-black text-blue-600 border border-gray-100">
                  {deal.partnerName?.[0] || 'V'}
                </div>
                <p className="text-xl font-black text-gray-900">{deal.partnerName || 'Visionary Partners'}</p>
              </div>
            </div>

            <div className="space-y-6">
              {claimed ? (
                <div className="w-full py-5 text-center bg-green-50 text-green-600 font-black rounded-2xl border border-green-100 flex items-center justify-center gap-3 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  CLAIMED
                </div>
              ) : (
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl ${claiming
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-black active:scale-[0.98] shadow-blue-200'
                    }`}
                >
                  {claiming ? 'PROCESSING...' : 'CLAIM BENEFIT'}
                </button>
              )}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-center text-gray-400 font-bold leading-relaxed uppercase tracking-widest">
                  Secure deal. verification required by partner. terms apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailsPage;
