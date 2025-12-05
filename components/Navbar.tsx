"use client";

import { Menu, ShoppingBag, User, LogOut, LayoutDashboard, Crown, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  // Simple logic to determine if user is the "Star" (Admin)
  // In a real app, this would be a role check from the backend
  const isStar = user?.username?.toLowerCase() === "cameron" || user?.username?.toLowerCase() === "admin" || user?.email?.includes("starconnect.cm");

  return (
    <nav className="bg-official-dark text-white shadow-lg sticky top-0 z-50 border-b-4 border-official-gold">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-official-gold rounded-full flex items-center justify-center font-serif font-bold text-official-dark text-xl shadow-md group-hover:scale-105 transition-transform">
            SC
          </div>
          <div className="leading-tight">
            <h1 className="font-serif font-bold text-lg tracking-wide group-hover:text-official-gold transition-colors">STARCONNECT</h1>
            <p className="text-xs text-official-gold uppercase tracking-widest">Cameron's World</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
          <Link href="/" className="hover:text-official-gold transition-colors">Home</Link>
          <Link href="#news" className="hover:text-official-gold transition-colors">News</Link>
          <Link href="#shop" className="hover:text-official-gold transition-colors">Merch</Link>
          <Link href="#premium" className="hover:text-official-gold transition-colors">Premium</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition relative">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-official-red rounded-full"></span>
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                <div className={`w-2 h-2 rounded-full ${isStar ? "bg-amber-500 animate-pulse" : "bg-green-500"}`}></div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white leading-none">{user.username}</p>
                  <p className={`text-[10px] uppercase tracking-wider leading-none mt-1 ${isStar ? "text-amber-500" : "text-official-gold"}`}>
                    {isStar ? "The Star" : "Super Fan"}
                  </p>
                </div>
                {isStar ? <Crown size={16} className="text-amber-500" /> : <Star size={16} className="text-official-gold" />}
              </div>

              {/* Dashboard Link (Star Only) */}
              {isStar && (
                <Link 
                  href="/dashboard" 
                  className="hidden sm:flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-amber-500 transition shadow-md"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
              )}

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-bold hover:text-official-gold transition-colors hidden sm:block">
                Login
              </Link>
              <Link href="/register" className="flex items-center gap-2 bg-official-gold text-official-dark px-5 py-2 rounded-full font-bold text-xs hover:bg-white transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <User size={16} />
                <span>Join Now</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-official-dark border-t border-white/10 p-4 space-y-4">
          <Link href="/" className="block py-2 hover:text-official-gold">Home</Link>
          <Link href="#news" className="block py-2 hover:text-official-gold">News</Link>
          <Link href="#shop" className="block py-2 hover:text-official-gold">Merch</Link>
          {user && isStar && (
            <Link href="/dashboard" className="block py-2 text-amber-500 font-bold">Access Dashboard</Link>
          )}
          {!user && (
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link href="/login" className="block text-center py-2 border border-white/20 rounded-lg">Login</Link>
              <Link href="/register" className="block text-center py-2 bg-official-gold text-official-dark rounded-lg font-bold">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
