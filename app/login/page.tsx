"use client";

import { useState } from "react";
import { User, Lock, ArrowRight, AlertCircle, Crown, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState<'fan' | 'star'>('fan');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://starconnect-api-prod-a8bhddb7ccf7gugw.italynorth-01.azurewebsites.net";
      
      const res = await fetch(`${apiUrl}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message || "Login failed");
      }

      // Store token and user info
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on login type
      if (loginType === 'star') {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-official-dark flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>

      {/* Header Simple */}
      <header className="py-8 text-center relative z-10">
        <Link href="/" className="inline-block group">
          <h1 className="text-3xl font-serif font-bold text-white group-hover:text-official-gold transition-colors">STARCONNECT</h1>
          <p className="text-xs text-official-gold uppercase tracking-widest">
            {loginType === 'star' ? 'Creator Access Portal' : 'Official Fan Access'}
          </p>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Login Type Toggle */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setLoginType('fan')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                loginType === 'fan' 
                  ? 'bg-white/5 text-official-gold border-b-2 border-official-gold' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={16} />
              Fan Login
            </button>
            <button
              onClick={() => setLoginType('star')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                loginType === 'star' 
                  ? 'bg-white/5 text-amber-500 border-b-2 border-amber-500' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Crown size={16} />
              Star Login
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                {loginType === 'star' ? 'Creator Dashboard' : 'Welcome Back'}
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                {loginType === 'star' 
                  ? 'Manage your content and analytics.' 
                  : 'Login to access exclusive content and drops.'}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2 mb-6">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email / Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className={loginType === 'star' ? "text-amber-500" : "text-official-gold"} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors outline-none ${
                      loginType === 'star' ? 'focus:ring-amber-500' : 'focus:ring-official-gold'
                    }`}
                    placeholder={loginType === 'star' ? "star@starconnect.cm" : "fan@starconnect.cm"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className={loginType === 'star' ? "text-amber-500" : "text-official-gold"} />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors outline-none ${
                      loginType === 'star' ? 'focus:ring-amber-500' : 'focus:ring-official-gold'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400 hover:text-white cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded bg-black/20 border-white/10 text-official-gold focus:ring-offset-0 focus:ring-1 focus:ring-official-gold" />
                  Remember me
                </label>
                <a href="#" className="text-official-gold hover:text-white transition-colors">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-black flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                } ${
                  loginType === 'star' 
                    ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500' 
                    : 'bg-gradient-to-r from-official-gold to-yellow-300 hover:from-yellow-300 hover:to-yellow-200'
                }`}
              >
                {isLoading ? (
                  <span className="animate-pulse">Authenticating...</span>
                ) : (
                  <>
                    {loginType === 'star' ? 'Access Dashboard' : 'Enter The Inner Circle'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-black/20 p-4 text-center border-t border-white/10">
            <p className="text-gray-400 text-sm">
              Don't have an account? <Link href="/register" className="text-official-gold hover:text-white font-medium transition-colors">Join the Waitlist</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
