"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Song, ApiResponse, LockStatus } from '@/types';
import SongCard from '@/components/SongCard';
import AuthGuard from '@/components/AuthGuard';
import ShuffleButton from '@/components/ShuffleButton';
import SongSkeleton from '@/components/SongSkeleton';
import { useAuth } from '@/context/AuthContext';
import { Lock, Unlock } from 'lucide-react';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const { user } = useAuth();

  const isAdmin = user?.email === 'admin@gmail.com';

  const fetchSelectedSongs = async () => {
    setLoading(true);
    try {
      const response = await api.get<ApiResponse<Song[]>>('/songs/selected');
      const songsData = response.data.data;

      // If no songs selected initially (fresh DB), shuffle once (if not locked)
      if (!songsData || songsData.length === 0) {
        // Only attempt initial shuffle if we don't know it's locked, or just let the user do it.
        // For now, let's just fetch songs. If empty, user sees empty state.
        // Logic change: Original code shuffled automatically.
        // We should check lock status first.
      } else {
        setSongs(songsData);
      }
    } catch (err) {
      console.error("Failed to fetch songs:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLockStatus = async () => {
    try {
      const response = await api.get<ApiResponse<LockStatus>>('/songs/lock-status');
      setIsLocked(response.data.data.locked);
    } catch (error) {
      console.error("Failed to fetch lock status", error);
    }
  };

  useEffect(() => {
    fetchSelectedSongs();
    fetchLockStatus();

    // Optional: Poll for lock status every few seconds to keep clients in sync
    const interval = setInterval(fetchLockStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleShuffleUpdate = (newSongs: Song[]) => {
    setSongs(newSongs);
  };

  const handleLockToggle = async () => {
    if (!isAdmin) return;
    try {
      const endpoint = isLocked ? '/songs/unlock' : '/songs/lock';
      await api.post(endpoint);
      setIsLocked(!isLocked); // Optimistic update
      fetchLockStatus(); // Verify
    } catch (error) {
      console.error("Failed to toggle lock", error);
      alert("Failed to update lock status");
    }
  };


  const groupedSongs = songs.reduce((acc, song) => {
    if (!acc[song.language]) {
      acc[song.language] = [];
    }
    acc[song.language].push(song);
    return acc;
  }, {} as Record<string, Song[]>);


  const languages = Object.keys(groupedSongs);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-dark-bg text-foreground pb-20">


        <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Current Round</h2>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <button
                  onClick={handleLockToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${isLocked
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50"
                      : "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50"
                    }`}
                >
                  {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                  {isLocked ? "Unlock Shuffle" : "Lock Shuffle"}
                </button>
              )}
              <ShuffleButton onShuffle={handleShuffleUpdate} isLocked={isLocked} isAdmin={isAdmin} />
            </div>
          </div>

          {languages.map((lang) => (
            <section key={lang} className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                  {lang} Songs
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <SongSkeleton key={i} />
                  ))
                ) : (
                  groupedSongs[lang].map((song) => (
                    <SongCard key={song._id} song={song} />
                  ))
                )}
              </div>
            </section>
          ))}

          {!loading && songs.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl text-text-muted">No songs selected. Click Shuffle to start!</h3>
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
