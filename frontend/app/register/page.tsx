'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/register', formData);
            const { token } = response.data; // Changed from response.data.data

            if (token) {
                localStorage.setItem('token', token);
            }
            router.push('/deals');
            router.refresh();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Try a different email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-[2rem] p-10 md:p-12 border border-gray-100 shadow-2xl shadow-blue-50/50">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Join BizStartup</h1>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Unlock Priority Growth Assets</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 text-center animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Startup Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                            placeholder="My Awesome Startup"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Work Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                            placeholder="founder@startup.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Secure Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-2xl font-black text-white transition-all shadow-xl shadow-blue-100 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-black active:scale-[0.98]'
                            }`}
                    >
                        {loading ? 'CREATING ACCOUNT...' : 'BUILD MY STARTUP'}
                    </button>
                </form>

                <div className="mt-10 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                    Already a member?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Member login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
