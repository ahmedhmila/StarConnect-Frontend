"use client";
import { Twitter, Facebook, Share2, Star, MessageCircle, Heart, Repeat } from "lucide-react";
import { useEffect, useState } from "react";

export default function SocialFeed() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Load initial posts (mock + local storage)
    const loadPosts = () => {
      const localPosts = JSON.parse(localStorage.getItem('fan_feed_posts') || '[]');
      
      const mockPosts = [
        {
          id: 'mock1',
          author: "Cameron (Official)",
          content: "We are proud to announce the new digital infrastructure project. Transparency is our priority. #Cameroon #Tech",
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2h ago
          platform: 'twitter',
          likes: 1240,
          shares: 450
        },
        {
          id: 'mock2',
          author: "Cameron Team",
          content: "Visit our new shop to support local initiatives. Click the link in bio!",
          timestamp: new Date(Date.now() - 18000000).toISOString(), // 5h ago
          platform: 'facebook',
          likes: 856,
          shares: 120,
          hasImage: true
        }
      ];

      // Merge and sort by date
      const allPosts = [...localPosts, ...mockPosts].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      setPosts(allPosts);
    };

    loadPosts();

    // Listen for updates from Dashboard
    window.addEventListener('feedUpdated', loadPosts);
    return () => window.removeEventListener('feedUpdated', loadPosts);
  }, []);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif font-bold text-official-dark flex items-center gap-2 text-xl">
          <Share2 size={24} className="text-official-gold" />
          Live Feed
        </h3>
        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold animate-pulse">
          ● Live Updates
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
                  {post.platform === 'twitter' && <Twitter size={16} className="text-black" />}
                  {post.platform === 'facebook' && <Facebook size={16} className="text-blue-600" />}
                  {!post.platform && <Star size={16} className="text-official-gold" />} {/* App exclusive */}
                  
                  <span className="font-bold text-sm text-official-dark">{post.author}</span>
                  {post.author.includes("Official") && (
                    <span className="bg-blue-500 text-white text-[10px] px-1 rounded-full">✓</span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{formatTime(post.timestamp)}</span>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {post.content}
              </p>
              
              {(post.hasImage || post.media) && (
                <div className="mt-3 mb-3 h-40 bg-gray-200 rounded-lg overflow-hidden relative">
                  <img 
                    src={post.media === "uploaded" ? "https://placehold.co/600x400/D4AF37/000000?text=New+Post" : "https://placehold.co/600x400/1a1a1a/ffffff?text=Update"} 
                    alt="Post attachment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-6 text-gray-400 text-xs font-bold pt-2 border-t border-gray-200/50">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart size={14} /> {post.likes || 0}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageCircle size={14} /> {Math.floor(Math.random() * 50)}
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Repeat size={14} /> {post.shares || 0}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
