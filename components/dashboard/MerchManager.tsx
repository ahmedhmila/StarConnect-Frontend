"use client";

import React, { useState, useEffect } from 'react';
import { db, Product, User } from '@/lib/mock-db';
import { Plus, Trash2, DollarSign, Image as ImageIcon, ShoppingBag } from 'lucide-react';

export default function MerchManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    db.init();
    const currentUser = db.users.getCurrent();
    if (currentUser) {
      setUser(currentUser);
      setProducts(db.products.getByArtist(currentUser.id));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newProduct = db.products.create({
      artistId: user.id,
      name,
      price: parseInt(price),
      description,
      image: imageUrl || 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&q=80' // Default placeholder
    });

    setProducts([newProduct, ...products]);
    setIsAdding(false);
    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Merchandise Store</h2>
          <p className="text-zinc-400">Manage your products and inventory.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-amber-500 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-400 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {isAdding && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 animate-in slide-in-from-top-4">
          <h3 className="text-lg font-bold text-white mb-4">New Product Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                  placeholder="e.g. Tour T-Shirt 2025"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Price (XAF)</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-3.5 text-zinc-500" />
                  <input 
                    type="number" 
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-3 pl-10 text-white focus:border-amber-500 outline-none"
                    placeholder="25000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Description</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none h-24 resize-none"
                placeholder="Describe your product..."
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Image URL</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <ImageIcon size={16} className="absolute left-3 top-3.5 text-zinc-500" />
                  <input 
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-3 pl-10 text-white focus:border-amber-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">Paste a direct image link (Unsplash, etc.)</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-zinc-200 transition"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                {product.price.toLocaleString()} XAF
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-white mb-1">{product.name}</h4>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{product.description}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShoppingBag size={12} /> In Stock
                </span>
                <button className="text-red-400 hover:text-red-300 flex items-center gap-1">
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {products.length === 0 && !isAdding && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-zinc-800 rounded-xl">
            <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400">No products in your shop yet.</p>
            <button onClick={() => setIsAdding(true)} className="text-amber-500 text-sm mt-2 hover:underline">
              Add your first product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
