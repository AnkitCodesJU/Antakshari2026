"use client";

import React, { useState } from 'react';
import { Shuffle, Lock } from 'lucide-react';
import api from '@/lib/api';
import { Song, ApiResponse } from '@/types';

interface ShuffleButtonProps {
    onShuffle: (newSongs: Song[]) => void;
    isLocked: boolean;
    isAdmin: boolean;
}

const ShuffleButton: React.FC<ShuffleButtonProps> = ({ onShuffle, isLocked, isAdmin }) => {
    const [loading, setLoading] = useState(false);

    const handleShuffle = async () => {
        setLoading(true);
        try {
            const response = await api.post<ApiResponse<Song[]>>('/songs/shuffle');
            onShuffle(response.data.data);
        } catch (error: any) {
            console.error("Shuffle failed:", error);
            alert(error.response?.data?.message || "Failed to shuffle songs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = loading || (isLocked && !isAdmin);

    return (
        <button
            onClick={handleShuffle}
            disabled={isDisabled}
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isLocked && !isAdmin
                    ? "bg-gray-600 text-gray-300" // Locked style
                    : "bg-secondary hover:bg-red-600 text-white hover:shadow-red-500/30" // Normal style
                }`}
            title={isLocked && !isAdmin ? "Shuffle is locked by Admin" : "Shuffle songs"}
        >
            {isLocked && !isAdmin ? <Lock size={20} /> : <Shuffle size={20} className={loading ? "animate-spin" : ""} />}
            {loading ? "Shuffling..." : (isLocked && !isAdmin ? "Locked" : "Shuffle Round")}
        </button>
    );
};

export default ShuffleButton;
