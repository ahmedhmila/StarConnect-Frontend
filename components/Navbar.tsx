import { Menu, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-official-blue text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-official-gold rounded-full flex items-center justify-center font-serif font-bold text-official-blue text-xl">
            SC
          </div>
          <div className="leading-tight">
            <h1 className="font-serif font-bold text-lg tracking-wide">MAIRIE DE STARCONNECT</h1>
            <p className="text-xs text-official-gold uppercase">Official Digital Portal</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
          <a href="#" className="hover:text-official-gold transition-colors">News</a>
          <a href="#shop" className="hover:text-official-gold transition-colors">Official Store</a>
          <a href="#social" className="hover:text-official-gold transition-colors">Social Feed</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition">
            <ShoppingBag size={20} />
          </button>
          <button className="flex items-center gap-2 bg-official-gold text-official-blue px-4 py-2 rounded-full font-bold text-xs hover:bg-white transition">
            <User size={16} />
            <span>Citizen Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
}