'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db, User, Post, Product } from '@/lib/mock-db';
import Navbar from '@/components/Navbar';
import { ShoppingBag, Grid, User as UserIcon, Heart, MessageCircle, Share2 } from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'shop' | 'about'>('posts');

  useEffect(() => {
    // Initialize DB if needed
    db.init();
    
    const foundUser = db.users.getByUsername(username);
    const loggedIn = db.users.getCurrent();
    setCurrentUser(loggedIn);

    if (foundUser) {
      setUser(foundUser);
      setPosts(db.posts.getByAuthor(foundUser.id));
      if (foundUser.role === 'artist') {
        setProducts(db.products.getByArtist(foundUser.id));
      }
      
      if (loggedIn) {
        setIsFollowing(loggedIn.following.includes(foundUser.id));
      }
    }
  }, [username]);

  const handleFollow = () => {
    if (!currentUser || !user) return;
    
    if (isFollowing) {
      db.users.unfollow(currentUser.id, user.id);
      setIsFollowing(false);
    } else {
      db.users.follow(currentUser.id, user.id);
      setIsFollowing(true);
    }
    
    // Refresh user data
    const updatedUser = db.users.getByUsername(username);
    if (updatedUser) setUser(updatedUser);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-500">User Not Found</h1>
            <p className="text-neutral-400 mt-2">The user @{username} does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-20">
      <Navbar />
      
      {/* Banner */}
      <div className="h-48 md:h-64 w-full bg-neutral-800 relative overflow-hidden">
        {user.banner ? (
          <img src={user.banner} alt="Banner" className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-amber-900/20 to-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neutral-950 overflow-hidden bg-neutral-800">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            {user.role === 'artist' && (
              <div className="absolute bottom-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-neutral-950">
                STAR
              </div>
            )}
          </div>
          
          <div className="flex-1 mb-2">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              {user.name}
              {user.role === 'artist' && <span className="text-amber-500 text-xl">★</span>}
            </h1>
            <p className="text-neutral-400">@{user.username}</p>
            <p className="text-neutral-300 mt-2 max-w-xl">{user.bio}</p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            {currentUser && currentUser.id !== user.id && (
              <button 
                onClick={handleFollow}
                className={`px-6 py-2 font-bold rounded-full transition ${
                  isFollowing 
                    ? 'bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700' 
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
            <button className="p-2 border border-neutral-700 rounded-full hover:bg-neutral-800 transition">
              <Share2 className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-800 mt-10 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-medium text-sm transition relative ${
              activeTab === 'posts' ? 'text-amber-500' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Posts
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500" />
            )}
          </button>
          {user.role === 'artist' && (
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-6 py-3 font-medium text-sm transition relative ${
                activeTab === 'shop' ? 'text-amber-500' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Shop
              {activeTab === 'shop' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500" />
              )}
            </button>
          )}
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 font-medium text-sm transition relative ${
              activeTab === 'about' ? 'text-amber-500' : 'text-neutral-400 hover:text-white'
            }`}
          >
            About
            {activeTab === 'about' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[300px]">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="text-center py-10 text-neutral-500">No posts yet.</div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h3 className="font-bold text-white">{user.name}</h3>
                        <p className="text-xs text-neutral-500">{new Date(post.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {post.title && (
                      <h4 className="font-bold text-lg text-white mb-2">{post.title}</h4>
                    )}
                    <p className="text-neutral-200 mb-4 whitespace-pre-wrap">{post.content}</p>
                    {post.mediaUrl && (
                      <div className="rounded-lg overflow-hidden mb-4 border border-neutral-800">
                        {post.mediaType === 'video' ? (
                          <video src={post.mediaUrl} controls className="w-full max-h-[500px] object-cover" />
                        ) : (
                          <img src={post.mediaUrl} alt="Post content" className="w-full max-h-[500px] object-cover" />
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-6 text-neutral-400 text-sm">
                      <button className="flex items-center gap-2 hover:text-amber-500 transition">
                        <Heart className="w-4 h-4" /> {post.likes}
                      </button>
                      <button className="flex items-center gap-2 hover:text-white transition">
                        <MessageCircle className="w-4 h-4" /> Comment
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-10 text-neutral-500">No products available.</div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition">
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition">
                          View Item
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white text-lg">{product.name}</h3>
                      <p className="text-amber-500 font-medium mt-1">{product.price.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">About {user.name}</h3>
              <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">{user.bio}</p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-900 rounded-lg">
                  <div className="text-neutral-500 text-sm">Joined</div>
                  <div className="text-white font-medium">December 2025</div>
                </div>
                <div className="p-4 bg-neutral-900 rounded-lg">
                  <div className="text-neutral-500 text-sm">Role</div>
                  <div className="text-white font-medium capitalize">{user.role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
