"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Send, Loader2, Settings, RefreshCw, LogOut, User, Sparkles, TrendingUp, BarChart3, LineChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSeparator as DropdownMenuSeparator2,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageBubble } from "@/components/dashboard/message-bubble";
import { ChartRenderer } from "@/components/dashboard/chart-renderer";
import { WelcomeScreen } from "@/components/dashboard/welcome-screen";

interface Message {
  role: "user" | "assistant";
  content: string;
  tool_call?: string | null;
  data?: unknown;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user] = useState({ name: "Paloma Admin", email: "nurettin@vespersocial.com" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("authenticated");
    const userData = sessionStorage.getItem("user");

    if (auth === "true") {
      setIsAuthenticated(true);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        Object.assign(user, parsedUser);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isAuthenticated) {
      inputRef.current?.focus();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    const userMsg: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Failed to connect to the server. Make sure the backend is running.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the server. Please make sure the backend is running on port 8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    inputRef.current?.focus();
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("authenticated");
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Premium Header with shadcn/ui */}
      <header className="fixed top-0 left-0 right-0 z-50 header-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6a9dbe] to-[#4a7d9e] flex items-center justify-center shadow-lg shadow-[#6a9dbe]/30 animate-glow">
                <Image
                  src="/paloma-logo.png"
                  alt="Paloma Logo"
                  width={100}
                  height={100}
                  className="w-8 h-auto object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Paloma Marketing Agent</h1>
              <p className="text-xs text-gray-600 font-medium">AI-Powered Analytics Platform</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <Button
                onClick={clearChat}
                variant="ghost"
                size="icon"
                className="hover:bg-[#6a9dbe]/10 hover:text-[#6a9dbe] transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}

            {/* User Menu with shadcn/ui */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-[#6a9dbe]/10">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-[#6a9dbe] to-[#4a7d9e] text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass-card">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-[#6a9dbe]/10 cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="hover:bg-red-50 text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 pt-24 pb-36 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="space-y-6 py-6">
              <AnimatePresence mode="popLayout">
                {messages.map((m, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MessageBubble role={m.role} content={m.content} />

                    {m.tool_call && m.data ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 ml-0 md:ml-14"
                      >
                        <ChartRenderer type={m.tool_call} data={m.data as any} />
                      </motion.div>
                    ) : null}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <MessageBubble role="assistant" content="" isLoading />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-6 py-3 rounded-xl text-sm shadow-lg max-w-md"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Input Area */}
      <div className="fixed bottom-0 left-0 right-0 header-blur border-t border-[#6a9dbe]/10">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-6 py-5">
          <div className="relative flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your Meta or Google Ads performance..."
              disabled={loading}
              className="flex-1 input-glass pr-16 text-sm"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 bg-gradient-to-r from-[#6a9dbe] to-[#4a7d9e] hover:from-[#5a8dae] hover:to-[#3a6d8e] shadow-lg shadow-[#6a9dbe]/30 disabled:opacity-50 disabled:cursor-not-allowed h-10 px-4"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-3 font-medium">
            Marketing Agent can make mistakes. Verify important data from your ad platforms.
          </p>
        </form>
      </div>
    </main>
  );
}
