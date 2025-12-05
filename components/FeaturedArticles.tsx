"use client";

import React, { useEffect, useState } from 'react';
import { db, Post, User } from '@/lib/mock-db';
import { Lock, MapPin, MessageCircle, Heart, Twitter, Facebook } from 'lucide-react';

export default function FeaturedArticles() {
  const [articles, setArticles] = useState<(Post & { author: User })[]>([]);

  useEffect(() => {
    db.init();
    const allPosts = db.posts.getAll();
    const allUsers = db.users.getAll();
    
    // Filter posts that have a title (our proxy for "articles")
    const articlePosts = allPosts
      .filter(p => p.title)
      .map(p => ({
        ...p,
        author: allUsers.find(u => u.id === p.authorId) || allUsers[0]
      }))
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 3); // Show top 3

    setArticles(articlePosts);
  }, []);

  if (articles.length === 0) return null;

  return (
    <div className="space-y-10">
      {articles.map((article) => (
        <article key={article.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 h-52 bg-gray-200 rounded-xl overflow-hidden relative shrink-0">
              {article.mediaUrl ? (
                <img src={article.mediaUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
              )}
              <span className="absolute top-4 left-4 bg-official-dark text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase shadow-lg">
                Article
              </span>
            </div>

            <div className="md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-red-500" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    {article.author.name}
                  </span>
                </div>
                
                <h4 className="text-2xl font-bold text-official-dark mb-3 leading-tight group-hover:text-official-gold transition-colors">
                  {article.title}
                </h4>
                
                <div className="relative">
                  <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {article.content}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                 <div className="flex gap-4 text-xs text-gray-400 font-bold">
                  <span className="flex items-center gap-1 hover:text-official-dark cursor-pointer">
                    <MessageCircle size={14} /> {Math.floor(Math.random() * 40)}
                  </span>
                  <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                    <Heart size={14} /> {article.likes}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                   <div className="flex gap-2">
                       <div className="bg-black text-white p-1.5 rounded hover:scale-110 cursor-pointer"><Twitter size={12} /></div>
                       <div className="bg-[#1877F2] text-white p-1.5 rounded hover:scale-110 cursor-pointer"><Facebook size={12} /></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
