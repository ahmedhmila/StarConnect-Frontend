import { Menu, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-official-green text-white shadow-lg sticky top-0 z-50 border-b-4 border-official-red">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-official-yellow rounded-full flex items-center justify-center font-serif font-bold text-official-green text-xl shadow-md group-hover:scale-105 transition-transform">
            SC
          </div>
          <div className="leading-tight">
            <h1 className="font-serif font-bold text-lg tracking-wide group-hover:text-official-yellow transition-colors">MAIRIE DE STARCONNECT</h1>
            <p className="text-xs text-official-yellow uppercase tracking-widest">Portail Numérique Officiel</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
          <Link href="/" className="hover:text-official-yellow transition-colors">Accueil</Link>
          <Link href="#news" className="hover:text-official-yellow transition-colors">Actualités</Link>
          <Link href="#services" className="hover:text-official-yellow transition-colors">Services</Link>
          <Link href="#shop" className="hover:text-official-yellow transition-colors">Boutique</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition relative">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-official-red rounded-full"></span>
          </button>
          <Link href="/login" className="flex items-center gap-2 bg-official-yellow text-official-dark px-5 py-2 rounded-full font-bold text-xs hover:bg-white transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <User size={16} />
            <span>Espace Citoyen</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}