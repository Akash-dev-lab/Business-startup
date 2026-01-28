import React from 'react';
import Link from 'next/link';

interface DealProps {
    deal: {
        _id: string;
        title: string;
        description: string;
        category: string;
        accessLevel: string;
        partnerName: string;
    };
}

const DealCard: React.FC<DealProps> = ({ deal }) => {
    const isLocked = deal.accessLevel === 'locked';

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 flex flex-col h-full border-b-4 border-b-transparent hover:border-b-blue-500">
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {deal.category}
                </span>
                {isLocked && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full border border-amber-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Locked
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {deal.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                {deal.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-gray-400">
                    By {deal.partnerName || 'Visionary Partners'}
                </span>
                <Link
                    href={`/deals/${deal._id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm"
                >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default DealCard;
