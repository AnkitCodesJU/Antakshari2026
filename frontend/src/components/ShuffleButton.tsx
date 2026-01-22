"use client";

import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import api from '@/lib/api';
import { Song, ApiResponse } from '@/types';

interface ShuffleButtonProps {
    onShuffle: (newSongs: Song[]) => void;
}

const ShuffleButton: React.FC<ShuffleButtonProps> = ({ onShuffle }) => {
    const [loading, setLoading] = useState(false);

    const handleShuffle = async () => {
        setLoading(true);
        try {
            const response = await api.post<ApiResponse<Song[]>>('/songs/shuffle');
            onShuffle(response.data.data);
        } catch (error) {
            console.error("Shuffle failed:", error);
            alert("Failed to shuffle songs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleShuffle}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Shuffle size={20} className={loading ? "animate-spin" : ""} />
            {loading ? "Shuffling..." : "Shuffle Round"}
        </button>
    );
};

export default ShuffleButton;
