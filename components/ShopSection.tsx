"use client";
import { ShoppingCart, Star, Tag } from "lucide-react";

const PRODUCTS = [
  { 
    id: 1, 
    name: "Signature Hoodie - Black/Gold", 
    price: "25,000 FCFA", 
    image: "https://placehold.co/400x400/1a1a1a/D4AF37?text=Hoodie",
    tag: "Best Seller"
  },
  { 
    id: 2, 
    name: "Cameron World Tour Tee", 
    price: "10,000 FCFA", 
    image: "https://placehold.co/400x400/ffffff/000000?text=T-Shirt",
    tag: "Limited Edition"
  },
  { 
    id: 3, 
    name: "VIP Access Pass (Digital)", 
    price: "50,000 FCFA", 
    image: "https://placehold.co/400x400/D4AF37/000000?text=VIP+Pass",
    tag: "Exclusive"
  },
];

export default function ShopSection() {
  const handleBuy = (item: string) => {
    // Simulation logic
    alert(`Initiating Mobile Money payment for: ${item}\n\nProvider: MTN/Orange Money\nStatus: Pending Confirmation...`);
  };

  return (
    <section id="shop" className="py-20 bg-zinc-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-official-gold/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-official-dark/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-official-gold font-bold tracking-widest uppercase text-sm mb-2 block">Official Store</span>
            <h2 className="text-4xl font-serif font-bold text-official-dark">
              Wear The <span className="text-official-gold">Legacy</span>
            </h2>
          </div>
          <button className="text-official-dark font-bold border-b-2 border-official-gold hover:text-official-gold transition-colors pb-1">
            View Full Collection
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                
                {/* Tag */}
                <div className="absolute top-4 left-4 bg-official-dark/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag size={12} className="text-official-gold" />
                  {product.tag}
                </div>

                {/* Overlay Action */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <button 
                    onClick={() => handleBuy(product.name)}
                    className="w-full bg-official-gold text-official-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                  >
                    <ShoppingCart size={18} /> Buy Now
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-official-dark leading-tight">{product.name}</h3>
                  <div className="flex text-official-gold">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
