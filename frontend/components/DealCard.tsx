'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface DealProps {
    deal: {
        _id: string;
        title: string;
        description: string;
        category: string;
        accessLevel: string;
        partnerName: string;
    };
    isVerified?: boolean;
}

const DealCard: React.FC<DealProps> = ({ deal, isVerified = false }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const isLocked = deal.accessLevel === 'locked' && !isVerified;

    return (
        <Link href={`/deals/${deal._id}`} className="group block h-full">
            <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 hover:shadow-2xl hover:shadow-blue-100 transition-shadow duration-500 overflow-hidden h-full flex flex-col"
            >
                <div className={`flex flex-col h-full ${isLocked ? 'relative' : ''}`}>
                    <div className="flex justify-between items-start mb-6">
                        <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">
                            {deal.category}
                        </span>
                        {isLocked && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full border border-amber-100 uppercase tracking-widest">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Locked
                            </span>
                        )}
                    </div>

                    <div className={`${isLocked ? 'blur-[3px] select-none opacity-60' : ''} flex-grow`}>
                        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                            {deal.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium line-clamp-3 mb-8 leading-relaxed">
                            {deal.description}
                        </p>
                    </div>

                    <div className={`mt-auto flex items-center justify-between ${isLocked ? 'blur-[2px] opacity-40' : ''}`}>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Partner</span>
                            <span className="text-sm font-bold text-gray-900 tracking-tight">
                                {deal.partnerName || 'Visionary Partners'}
                            </span>
                        </div>
                        <div className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                            View Details
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </div>
                    </div>

                    {isLocked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-none z-10 transition-all group-hover:bg-white/5">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="p-5 bg-white rounded-2xl shadow-2xl border border-gray-100 transform cursor-pointer relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>

                                <AnimatePresence>
                                    {showTooltip && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, x: '-50%' }}
                                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                                            exit={{ opacity: 0, y: 10, x: '-50%' }}
                                            className="absolute bottom-full left-1/2 mb-6 w-56 bg-black text-white text-[10px] font-black p-4 rounded-xl text-center uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20"
                                        >
                                            Verification required to claim this deal
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
};

export default DealCard;
