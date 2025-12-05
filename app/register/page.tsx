"use client";

import { useState } from "react";
import { User, Lock, Mail, ArrowRight, AlertCircle, Music, Crown, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerType, setRegisterType] = useState<'fan' | 'star'>('fan');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://starconnect-api-prod-a8bhddb7ccf7gugw.italynorth-01.azurewebsites.net";
      
      const res = await fetch(`${apiUrl}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message || "Registration failed");
      }

      // Store token and user info
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on type
      if (registerType === 'star') {
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
            {registerType === 'star' ? 'Creator Registration' : 'Join the Inner Circle'}
          </p>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Type Toggle */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setRegisterType('fan')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                registerType === 'fan' 
                  ? 'bg-white/5 text-official-gold border-b-2 border-official-gold' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Star size={16} />
              Fan Account
            </button>
            <button
              onClick={() => setRegisterType('star')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                registerType === 'star' 
                  ? 'bg-white/5 text-amber-500 border-b-2 border-amber-500' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Crown size={16} />
              Creator Account
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                registerType === 'star' ? 'bg-amber-500/20' : 'bg-official-gold/20'
              }`}>
                {registerType === 'star' ? (
                  <Crown className="text-amber-500 w-8 h-8" />
                ) : (
                  <Music className="text-official-gold w-8 h-8" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {registerType === 'star' ? 'Start Your Legacy' : 'Create Account'}
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                {registerType === 'star' 
                  ? 'Build your brand and connect with your audience.' 
                  : "Get exclusive access to Cameron's world."}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2 mb-6">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className={registerType === 'star' ? "text-amber-500" : "text-official-gold"} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors outline-none ${
                      registerType === 'star' ? 'focus:ring-amber-500' : 'focus:ring-official-gold'
                    }`}
                    placeholder={registerType === 'star' ? "OfficialName" : "SuperFan2025"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className={registerType === 'star' ? "text-amber-500" : "text-official-gold"} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors outline-none ${
                      registerType === 'star' ? 'focus:ring-amber-500' : 'focus:ring-official-gold'
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className={registerType === 'star' ? "text-amber-500" : "text-official-gold"} />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors outline-none ${
                      registerType === 'star' ? 'focus:ring-amber-500' : 'focus:ring-official-gold'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-bold text-black flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    registerType === 'star'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500'
                      : 'bg-gradient-to-r from-official-gold to-yellow-300 hover:from-yellow-300 hover:to-yellow-200'
                  }`}
                >
                  {isLoading ? (
                    <span className="animate-pulse">Creating Account...</span>
                  ) : (
                    <>
                      {registerType === 'star' ? 'Launch Platform' : 'Join The Family'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-black/20 p-4 text-center border-t border-white/10">
            <p className="text-gray-400 text-sm">
              Already have an account? <Link href="/login" className="text-official-gold hover:text-white font-medium transition-colors">Login Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
