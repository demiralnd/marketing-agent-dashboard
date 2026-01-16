"use client";
import { useState } from "react";
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

        // Demo authentication
        if (email === "demo@marketing.ai" && password === "demo123") {
            sessionStorage.setItem("authenticated", "true");
            sessionStorage.setItem("user", JSON.stringify({
                name: "Demo User",
                email: "demo@marketing.ai"
            }));

            router.push("/");
            router.refresh();
        } else {
            setError("Invalid credentials. Try: demo@marketing.ai / demo123");
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
                            <TrendingUp className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="gradient-text">Marketing Agent</span>
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
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold gradient-text">Marketing Agent</h2>
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

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleGoogleSignIn}
                            type="button"
                            variant="outline"
                            className="w-full border-2 border-gray-200 hover:border-[#6a9dbe]/30 hover:bg-[#6a9dbe]/5 py-6 rounded-xl transition-all"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="font-semibold text-gray-700">Sign in with Google</span>
                            </div>
                        </Button>

                        {/* Demo Credentials */}
                        <div className="mt-8 p-4 bg-gradient-to-br from-[#6a9dbe]/10 to-[#8ab5d1]/10 rounded-xl border border-[#6a9dbe]/20">
                            <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#6a9dbe]" />
                                Demo Credentials
                            </p>
                            <p className="text-xs text-gray-700 font-mono">Email: demo@marketing.ai</p>
                            <p className="text-xs text-gray-700 font-mono">Password: demo123</p>
                        </div>
                    </Card>

                    <p className="text-center text-sm text-gray-500 mt-6 font-medium">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
