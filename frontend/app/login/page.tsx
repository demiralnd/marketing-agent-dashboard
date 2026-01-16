"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Authentication
        if (email === "nurettin@vespersocial.com" && password === "Paloma12Agent.34") {
            sessionStorage.setItem("authenticated", "true");
            sessionStorage.setItem("user", JSON.stringify({
                name: "Paloma Admin",
                email: "nurettin@vespersocial.com"
            }));

            router.push("/");
            router.refresh();
        } else {
            setError("Invalid credentials.");
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("Google OAuth requires configuration. Use demo credentials for now.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Premium Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5f9fb] via-[#e8f1f5] to-[#d4e8f0] -z-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#6a9dbe]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8ab5d1]/10 rounded-full blur-3xl -z-10" />

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:block space-y-8"
                >
                    <div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6a9dbe] to-[#4a7d9e] shadow-2xl shadow-[#6a9dbe]/40 mb-6 animate-float"
                        >
                            <Image
                                src="/paloma-logo.png"
                                alt="Paloma Logo"
                                width={200}
                                height={200}
                                className="w-16 h-auto object-contain brightness-0 invert"
                            />
                        </motion.div>
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="gradient-text">Paloma Marketing Agent</span>
                        </h1>
                        <p className="text-xl text-gray-600 font-medium">
                            Your AI-powered assistant for Meta & Google Ads analytics
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: Shield, text: "Secure & Private", desc: "Enterprise-grade security" },
                            { icon: Zap, text: "Real-Time Insights", desc: "Live performance tracking" },
                            { icon: BarChart3, text: "Advanced Analytics", desc: "AI-powered recommendations" },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.text}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-xl glass-card"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6a9dbe] to-[#4a7d9e] flex items-center justify-center shadow-lg">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{feature.text}</div>
                                    <div className="text-sm text-gray-600">{feature.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="glass-card p-8 md:p-10 shadow-2xl">
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6a9dbe] to-[#4a7d9e] shadow-2xl shadow-[#6a9dbe]/40 mb-4">
                                <Image
                                    src="/paloma-logo.png"
                                    alt="Paloma Logo"
                                    width={100}
                                    height={100}
                                    className="w-12 h-auto object-contain brightness-0 invert"
                                />
                            </div>
                            <h2 className="text-2xl font-bold gradient-text">Paloma Marketing Agent</h2>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                            <p className="text-gray-600">Sign in to access your analytics dashboard</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-2"
                            >
                                <div>{error}</div>
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="demo@marketing.ai"
                                        className="input-glass w-full pl-11"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="input-glass w-full pl-11"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#6a9dbe] to-[#4a7d9e] hover:from-[#5a8dae] hover:to-[#3a6d8e] text-white font-semibold py-6 rounded-xl shadow-lg shadow-[#6a9dbe]/30 hover:shadow-xl hover:shadow-[#6a9dbe]/40 transition-all"
                            >
                                {loading ? (
                                    <div className="loading-spinner border-white/30 border-t-white" />
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Sign In</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </Card>

                    <p className="text-center text-sm text-gray-500 mt-6 font-medium">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </motion.div>
            </div >
        </div >
    );
}
