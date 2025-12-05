"use client";

import { useState } from "react";
import { User, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-official-dark flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>

      {/* Header Simple */}
      <header className="py-8 text-center relative z-10">
        <Link href="/" className="inline-block group">
          <h1 className="text-3xl font-serif font-bold text-white group-hover:text-official-gold transition-colors">STARCONNECT</h1>
          <p className="text-xs text-official-gold uppercase tracking-widest">Official Fan Access</p>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-400 text-sm mt-2">Login to access exclusive content and drops.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email / Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-official-gold" />
                  </div>
                  <input 
                    type="email" 
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-official-gold focus:border-transparent transition-colors outline-none"
                    placeholder="fan@starconnect.cm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-official-gold" />
                  </div>
                  <input 
                    type="password" 
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-official-gold focus:border-transparent transition-colors outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs text-official-gold hover:underline">Forgot password?</a>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-official-gold text-official-dark font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? "Authenticating..." : (
                  <>
                    Enter The Universe <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                New here?{" "}
                <a href="#" className="text-official-gold font-bold hover:underline">Join the Community</a>
              </p>
            </div>
          </div>
          
          <div className="bg-black/40 p-4 text-center text-xs text-gray-500 border-t border-white/5">
            Secured by StarConnect CMS • Personal Brand Infrastructure
          </div>
        </div>
      </div>
    </div>
  );
}
