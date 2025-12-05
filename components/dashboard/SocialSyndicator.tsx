"use client";

import React, { useState } from 'react';
import { Send, Image as ImageIcon, Video, Hash, Globe, CheckCircle2, Upload } from 'lucide-react';

export default function SocialSyndicator() {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState({
    twitter: true,
    facebook: false,
    tiktok: false,
    instagram: false,
    fanfeed: true // New option
  });
  const [isPosting, setIsPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [media, setMedia] = useState<string | null>(null);

  const handlePost = async () => {
    setIsPosting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // If posting to Fan Feed, store in localStorage for demo
    if (platforms.fanfeed) {
      const newPost = {
        id: Date.now(),
        content,
        media,
        timestamp: new Date().toISOString(),
        author: "Cameron (Official)"
      };
      
      const existing = JSON.parse(localStorage.getItem('fan_feed_posts') || '[]');
      localStorage.setItem('fan_feed_posts', JSON.stringify([newPost, ...existing]));
      
      // Dispatch event so other components can update
      window.dispatchEvent(new Event('feedUpdated'));
    }

    setIsPosting(false);
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setContent('');
      setMedia(null);
    }, 3000);
  };

  const handleMediaUpload = () => {
    // Simulate upload
    setMedia("uploaded");
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-500" />
          Social Syndication & Feed
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Broadcast to the world and your inner circle.</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Platform Selection */}
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'fanfeed', label: 'Fan Feed (App)', color: 'peer-checked:bg-amber-600 peer-checked:text-white' },
            { id: 'twitter', label: 'X (Twitter)', color: 'peer-checked:bg-black' },
            { id: 'facebook', label: 'Facebook', color: 'peer-checked:bg-blue-600' },
            { id: 'instagram', label: 'Instagram', color: 'peer-checked:bg-pink-600' },
            { id: 'tiktok', label: 'TikTok', color: 'peer-checked:bg-cyan-500' }
          ].map((platform) => (
            <label key={platform.id} className="cursor-pointer relative">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={platforms[platform.id as keyof typeof platforms]}
                onChange={() => setPlatforms(prev => ({ ...prev, [platform.id]: !prev[platform.id as keyof typeof platforms] }))}
              />
              <div className={`px-4 py-2 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-400 text-sm font-medium transition-all hover:border-zinc-600 peer-checked:text-white peer-checked:border-transparent ${platform.color}`}>
                {platform.label}
              </div>
            </label>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in your world?"
            className="w-full h-40 bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 resize-none"
          />
          <div className="absolute bottom-3 right-3 text-xs text-zinc-500">
            {content.length} chars
          </div>
        </div>

        {/* Media Preview */}
        {media && (
          <div className="bg-zinc-800/50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-700 rounded flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-300">media_upload_v1.jpg</span>
            </div>
            <button onClick={() => setMedia(null)} className="text-zinc-500 hover:text-red-400">Remove</button>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={handleMediaUpload}
              className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors relative group"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Add Photo</span>
            </button>
            <button className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors">
              <Hash className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handlePost}
            disabled={!content || isPosting || posted}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all
              ${posted 
                ? 'bg-green-500/20 text-green-500 cursor-default' 
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isPosting ? (
              <span className="animate-pulse">Broadcasting...</span>
            ) : posted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Sent!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Broadcast
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
