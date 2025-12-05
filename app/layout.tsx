import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google"; // Professional Fonts
import "./globals.css";
import { Phone } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({ 
  weight: ["400", "700"], 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Mairie Connect - Official Portal",
  description: "Services en ligne et communication officielle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${merriweather.variable} font-sans bg-gray-50`}>
        {children}
        
        {/* Floating Action Button (WhatsApp/Support) - Critical for Cameroon */}
        <a 
          href="https://wa.me/237600000000" 
          target="_blank"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50 flex items-center gap-2"
        >
          <Phone size={24} />
          <span className="hidden md:inline font-bold">Nous Contacter</span>
        </a>
      </body>
    </html>
  );
}