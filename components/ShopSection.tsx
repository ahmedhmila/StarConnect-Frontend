"use client";
import { ShoppingCart } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Official City Mug", price: "5,000 FCFA", image: "https://placehold.co/400x400/003366/D4AF37?text=Mug" },
  { id: 2, name: "Civic Duty Handbook", price: "2,500 FCFA", image: "https://placehold.co/400x400/D4AF37/003366?text=Book" },
  { id: 3, name: "Mayor's Signature Pen", price: "15,000 FCFA", image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Pen" },
];

export default function ShopSection() {
  const handleBuy = (item: string) => {
    // Simulation logic
    alert(`Initiating Mobile Money payment for: ${item}\n\nProvider: MTN/Orange Money\nStatus: Pending Confirmation...`);
  };

  return (
    <section id="shop" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-serif font-bold text-official-blue border-l-8 border-official-gold pl-4">
            Official Merchandising
          </h2>
          <span className="text-sm text-gray-500">Support your municipality</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleBuy(product.name)}
                    className="bg-official-gold text-official-blue font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    <ShoppingCart size={18} /> Buy Now
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-official-blue mb-2">{product.name}</h3>
                <p className="text-official-red font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}