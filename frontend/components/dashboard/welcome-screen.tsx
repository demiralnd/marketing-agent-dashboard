"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3, LineChart, Zap, Target, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
    {
        text: "How is Meta performing today?",
        icon: BarChart3,
    },
    {
        text: "Show me Google Ads results",
        icon: LineChart,
    },
    {
        text: "Compare both platforms",
        icon: Target,
    },
    {
        text: "Campaign breakdown",
        icon: DollarSign,
    },
];

interface WelcomeScreenProps {
    onSuggestionClick: (suggestion: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12"
        >
            {/* Animated Premium Logo */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mb-8"
            >
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#6a9dbe] to-[#4a7d9e] flex items-center justify-center shadow-2xl shadow-[#6a9dbe]/40 animate-float">
                    <Image
                        src="/paloma-logo.png"
                        alt="Paloma Logo"
                        width={250}
                        height={250}
                        className="w-24 h-auto object-contain brightness-0 invert"
                    />
                </div>
                <motion.div
                    className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#6a9dbe] to-[#8ab5d1] blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </motion.div>

            {/* Quick Suggestions with Premium Buttons */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="max-w-3xl w-full"
            >
                <div className="flex items-center justify-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-[#6a9dbe]" />
                    <span className="text-sm font-semibold text-gray-700">Try asking:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {suggestions.map((suggestion, index) => (
                        <motion.div
                            key={suggestion.text}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                        >
                            <Button
                                onClick={() => onSuggestionClick(suggestion.text)}
                                variant="outline"
                                className="w-full justify-start gap-3 h-auto py-4 px-5 glass-card border-[#6a9dbe]/20 hover:border-[#6a9dbe]/40 hover:bg-[#6a9dbe]/5 text-left group"
                            >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-[#6a9dbe] to-[#4a7d9e] group-hover:scale-110 transition-transform">
                                    <suggestion.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#6a9dbe] transition-colors">
                                    {suggestion.text}
                                </span>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
