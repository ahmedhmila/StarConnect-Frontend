"use client";
import { Twitter, Facebook, Share2, Star, MessageCircle, Heart, Repeat } from "lucide-react";
import { useEffect, useState } from "react";
import { db, Post, User } from "@/lib/mock-db";
import Link from "next/link";

interface EnrichedPost extends Post {
  author: User | undefined;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<EnrichedPost[]>([]);

  useEffect(() => {
    // Load initial posts (mock + local storage)
    const loadPosts = () => {
      db.init();
      const allPosts = db.posts.getAll();
      
      // Enrich with author data
      const enriched = allPosts.map(post => ({
        ...post,
        author: db.users.getAll().find(u => u.id === post.authorId)
      }));

      // Sort by date
      enriched.sort((a, b) => b.timestamp - a.timestamp);
      
      setPosts(enriched);
    };

    loadPosts();

    // Listen for updates from Dashboard
    window.addEventListener("feedUpdated", loadPosts);
    return () => window.removeEventListener("feedUpdated", loadPosts);
  }, []);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = (now - timestamp) / 1000; // seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif font-bold text-official-dark flex items-center gap-2 text-xl">
          <Share2 size={24} className="text-official-gold" />
          Live Feed
        </h3>
        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold animate-pulse">
           Live Updates
        </span>
      </div>

      <div className="space-y-6 relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100"></div>

        {posts.map((post) => (
          <div key={post.id} className="relative pl-10 group">
            {/* Timeline Dot */}
            <div className="absolute left-2 top-3 w-4 h-4 bg-white border-2 border-official-gold rounded-full z-10 group-hover:scale-125 transition-transform"></div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-official-gold" />
                  
                  <Link href={`/profile/${post.author?.username}`} className="font-bold text-sm text-official-dark hover:underline">
                    {post.author?.name || "Unknown User"}
                  </Link>
                  {post.author?.role === "artist" && (
                    <span className="bg-blue-500 text-white text-[10px] px-1 rounded-full">✓</span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{formatTime(post.timestamp)}</span>
              </div>
              
              {post.title && (
                <h4 className="font-serif font-bold text-lg text-official-dark mb-2">{post.title}</h4>
              )}

              <p className="text-sm text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">
                {post.content}
              </p>

              {post.mediaUrl && (
                <div className="mb-3 rounded-lg overflow-hidden border border-gray-200">
                  <img src={post.mediaUrl} alt="Post media" className="w-full h-auto max-h-64 object-cover" />
                </div>
              )}
              
              <div className="flex items-center gap-4 pt-2 border-t border-gray-200/50">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-official-red transition-colors">
                  <Heart size={14} /> {post.likes}
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle size={14} /> Comment
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-500 transition-colors ml-auto">
                  <Repeat size={14} /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No posts yet. Be the first to post!
          </div>
        )}
      </div>
    </div>
  );
}
