"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Music2 } from "lucide-react";
import { ApiResponse } from "@/types";

interface AuthResponse {
    _id: string;
    username: string;
    email: string;
    token: string;
}

export default function AuthPage() {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const endpoint = isLogin ? "/auth/login" : "/auth/register";

        try {
            // Basic validation
            if (!isLogin && !formData.username) {
                throw new Error("Username is required");
            }

            const { data } = await api.post<ApiResponse<AuthResponse>>(endpoint, formData);

            if (data.success) {
                login(data.data.token, data.data);
            } else {
                setError(data.message || "Authentication failed");
            }
        } catch (err: any) {
            console.error("Auth error:", err);
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card-bg border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-fade-in glass">
                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 bg-gradient-to-tr from-primary to-green-400 rounded-full shadow-lg shadow-green-500/20 mb-4">
                            <Music2 className="text-black" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-text-muted text-sm mt-2">
                            {isLogin
                                ? "Sign in to continue your musical journey"
                                : "Join the community and start playing"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary text-black font-bold rounded-lg hover:bg-green-400 transition-colors shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-text-muted">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                }}
                                className="text-primary hover:underline font-medium"
                            >
                                {isLogin ? "Sign Up" : "Log In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
