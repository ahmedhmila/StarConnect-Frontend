"use client";

import { Menu, ShoppingBag, User, LogOut, LayoutDashboard, Crown, Star, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { db, User as DBUser } from "@/lib/mock-db";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DBUser[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Init DB for search
    db.init();

    // Click outside to close search
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsSearchOpen(true);
      const results = db.users.getAll().filter(u => 
        u.username.toLowerCase().includes(query.toLowerCase()) || 
        u.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Simple logic to determine if user is the "Star" (Admin)
  // In a real app, this would be a role check from the backend
  const isStar = user?.role === 'artist' || user?.username?.toLowerCase() === "cameron" || user?.username?.toLowerCase() === "admin" || user?.email?.includes("starconnect.cm");

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

        {/* Search Bar */}
        <div className="hidden md:block relative mx-8 flex-1 max-w-md" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for stars or fans..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setIsSearchOpen(true)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-official-gold focus:bg-white/20 transition-all"
            />
            <Search size={16} className="absolute left-3.5 top-2.5 text-gray-400" />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">
              {searchResults.map(result => (
                <Link 
                  key={result.id} 
                  href={`/profile/${result.username}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                  <img src={result.avatar} alt={result.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-white flex items-center gap-1">
                      {result.name}
                      {result.role === 'artist' && <Star size={10} className="text-official-gold fill-official-gold" />}
                    </p>
                    <p className="text-xs text-gray-400">@{result.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold tracking-wider uppercase">
          <Link href="/" className="hover:text-official-gold transition-colors">Home</Link>
          <Link href="#news" className="hover:text-official-gold transition-colors">News</Link>
          <Link href="#shop" className="hover:text-official-gold transition-colors">Merch</Link>
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
              <Link href={`/profile/${user.username}`} className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition cursor-pointer">
                <div className={`w-2 h-2 rounded-full ${isStar ? "bg-amber-500 animate-pulse" : "bg-green-500"}`}></div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white leading-none">{user.username}</p>
                  <p className={`text-[10px] uppercase tracking-wider leading-none mt-1 ${isStar ? "text-amber-500" : "text-official-gold"}`}>
                    {isStar ? "The Star" : "Super Fan"}
                  </p>
                </div>
                {isStar ? <Crown size={16} className="text-amber-500" /> : <Star size={16} className="text-official-gold" />}
              </Link>

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
