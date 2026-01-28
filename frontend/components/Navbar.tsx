'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLogin();
        // Use an interval to check for login status change if not using a global state manager
        const interval = setInterval(checkLogin, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
        router.refresh();
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white border-b border-gray-100 py-4 px-4 md:px-8 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform">
                    BizStartup
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center font-bold">
                    <Link href="/deals" className="text-gray-500 hover:text-blue-600 transition-colors">
                        Explore Deals
                    </Link>
                    <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition-colors">
                        Dashboard
                    </Link>
                    <div className="flex gap-4 items-center">
                        {isLoggedIn ? (
                            <>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-blue-100 border-2 border-white">
                                    JD
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2.5 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="px-6 py-2.5 rounded-full text-gray-700 font-bold hover:bg-gray-50 transition-all border border-gray-100">
                                    Login
                                </Link>
                                <Link href="/register" className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    {isLoggedIn && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black border border-white">
                            JD
                        </div>
                    )}
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-6 px-4">
                    <Link
                        href="/deals"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2"
                    >
                        Explore Deals
                    </Link>
                    <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2"
                    >
                        Dashboard
                    </Link>
                    <div className="flex flex-col gap-4 pt-2">
                        {isLoggedIn ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full py-4 text-center rounded-2xl bg-black text-white font-bold shadow-lg shadow-gray-100 px-6"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 text-center rounded-2xl text-gray-700 font-bold bg-gray-50"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 text-center rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-100"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
