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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Simple */}
      <header className="bg-official-blue py-6 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-2xl font-serif font-bold text-white">MAIRIE DE STARCONNECT</h1>
          <p className="text-xs text-official-gold uppercase tracking-widest">Portail Citoyen Sécurisé</p>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
              <p className="text-gray-500 text-sm mt-2">Accédez à vos services administratifs et à votre espace personnel.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Identifiant National / Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue focus:border-official-blue transition-colors"
                    placeholder="exemple@citoyen.cm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue focus:border-official-blue transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs text-official-blue hover:underline">Mot de passe oublié ?</a>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-official-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? "Connexion en cours..." : (
                  <>
                    Se Connecter <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <a href="#" className="text-official-blue font-bold hover:underline">Créer un profil citoyen</a>
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
            Sécurisé par StarConnect CMS • République du Cameroun
          </div>
        </div>
      </div>
    </div>
  );
}
