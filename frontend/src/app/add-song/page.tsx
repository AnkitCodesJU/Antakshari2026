"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
import { Music2, Save, X } from 'lucide-react';
import { ApiResponse } from '@/types';

export default function AddSong() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        artist: '',
        album: '',
        language: 'Hindi', // Default
        url: '',
        lyrics: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post<ApiResponse<any>>('/songs', formData);
            router.push('/library'); // Redirect to library after adding
        } catch (err: any) {
            console.error("Failed to add song:", err);
            // Handle duplicate song warning specifically
            if (err.response && err.response.status === 409) {
                alert(err.response.data.message || "A song with this name already exists. Please change the name.");
            } else {
                alert("Failed to add song. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AuthGuard>
            <main className="min-h-screen bg-dark-bg text-foreground pb-20">
                <div className="max-w-2xl mx-auto px-6 py-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-gradient-to-tr from-primary to-green-400 rounded-lg shadow-lg shadow-green-500/20">
                            <Music2 className="text-black" size={24} />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Add New Song</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-card-bg/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Song Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Tum Hi Ho"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Artist *</label>
                                <input
                                    type="text"
                                    name="artist"
                                    required
                                    placeholder="e.g. Arijit Singh"
                                    value={formData.artist}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Album</label>
                                <input
                                    type="text"
                                    name="album"
                                    placeholder="e.g. Aashiqui 2"
                                    value={formData.album}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Language *</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                >
                                    <option value="Hindi">Hindi</option>
                                    <option value="Bengali">Bengali</option>
                                    <option value="English">English</option>
                                </select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-text-muted">Audio/Video URL *</label>
                                <input
                                    type="url"
                                    name="url"
                                    required
                                    placeholder="https://..."
                                    value={formData.url}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-text-muted">Lyrics URL</label>
                                <input
                                    type="url"
                                    name="lyrics"
                                    placeholder="https://..."
                                    value={formData.lyrics}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 py-3 px-4 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 px-4 bg-primary text-black rounded-lg hover:bg-green-400 transition-colors font-bold shadow-lg flex items-center justify-center gap-2"
                            >
                                {loading ? 'Saving...' : <><Save size={18} /> Save Song</>}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </AuthGuard>
    );
}
