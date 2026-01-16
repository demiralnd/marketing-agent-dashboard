"use client";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    role: "user" | "assistant";
    content: string;
    isLoading?: boolean;
}

export function MessageBubble({ role, content, isLoading }: MessageBubbleProps) {
    const isUser = role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "flex gap-3",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Bot className="w-5 h-5 text-white" />
                </div>
            )}

            <div
                className={cn(
                    "max-w-[85%] rounded-2xl px-5 py-3 shadow-lg",
                    isUser
                        ? "message-gradient-user"
                        : "message-gradient-assistant"
                )}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Analyzing</span>
                        <motion.div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-indigo-500 rounded-full"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    <p className={cn(
                        "text-sm leading-relaxed whitespace-pre-wrap",
                        isUser ? "text-white" : "text-gray-800"
                    )}>
                        {content}
                    </p>
                )}
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" />
                </div>
            )}
        </motion.div>
    );
}
