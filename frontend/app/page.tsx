import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-5 md:py-5 lg:py-5 bg-white border-b border-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl font-black text-gray-400 tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
                Scale Your Startup with <br className="hidden md:block" /> <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent underline decoration-blue-100 decoration-8 underline-offset-8">Premium Deals</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 text-base md:text-xl lg:text-2xl font-medium leading-relaxed px-4">
                Connect with world-class partners and unlock exclusive offers designed to accelerate your growth journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
              <Link
                href="/deals"
                className="inline-flex h-16 items-center justify-center rounded-2xl bg-blue-600 px-10 text-lg font-black text-white shadow-2xl shadow-blue-200 transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95 text-center"
              >
                Explore Deals
              </Link>
              <Link
                href="/register"
                className="inline-flex h-16 items-center justify-center rounded-2xl border-2 border-gray-100 bg-white px-10 text-lg font-black text-gray-900 transition-all hover:bg-gray-50 hover:border-gray-200 active:scale-95 text-center"
              >
                Join Now
              </Link>
            </div>
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100" />
                  </div>
                ))}
              </div>
              <span>Trusted by 500+ Early Stage Founders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <div className="flex flex-col items-center space-y-3 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-transform hover:scale-105">
              <span className="text-4xl font-black text-blue-600 tabular-nums font-mono">$10M+</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Savings Generated</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-transform hover:scale-105">
              <span className="text-4xl font-black text-blue-600 tabular-nums font-mono">50+</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Active Partners</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-transform hover:scale-105">
              <span className="text-4xl font-black text-blue-600 tabular-nums font-mono">200+</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Exclusive Deals</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-transform hover:scale-105">
              <span className="text-4xl font-black text-blue-600 tabular-nums font-mono">Elite</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Member Access</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
