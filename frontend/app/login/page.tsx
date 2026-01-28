'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Login functionally will be implemented soon!');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 border border-gray-100 shadow-xl shadow-blue-50/50">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500 font-medium">Log in to your founder account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            placeholder="founder@startup.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-medium text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-600 font-bold hover:underline">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
