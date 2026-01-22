import React from 'react';

const SongSkeleton = () => {
    return (
        <div className="w-full h-48 bg-card-bg rounded-xl border border-white/5 animate-pulse overflow-hidden">
            <div className="h-full p-5 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 mr-4 space-y-2">
                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2"></div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10"></div>
                </div>
            </div>
        </div>
    );
};

export default SongSkeleton;
