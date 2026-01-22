"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Music2, LogOut, Library, Shuffle, PlusCircle } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    if (!user) return null;

    const navItems = [
        { name: 'Play', href: '/', icon: Shuffle },
        { name: 'Library', href: '/library', icon: Library },
        { name: 'Add Song', href: '/add-song', icon: PlusCircle },
    ];

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10 mb-8">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-gradient-to-tr from-primary to-green-400 rounded-lg shadow-lg shadow-green-500/20">
                        <Music2 className="text-black" size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block">Antakshari</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${isActive ? 'bg-white/10 text-primary font-medium' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                            >
                                <Icon size={18} />
                                <span className="hidden sm:block text-sm">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-2">
                        <span className="text-sm font-medium text-white">{user.username}</span>
                        <span className="text-xs text-text-muted">Player</span>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 text-text-muted hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
