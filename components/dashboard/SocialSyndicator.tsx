"use client";

import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, Video, Hash, Globe, CheckCircle2, Upload, X } from 'lucide-react';
import { db } from '@/lib/mock-db';

export default function SocialSyndicator() {
  const [title, setTitle] = useState('');
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = async () => {
    if (!content && !media) return;
    
    setIsPosting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If posting to Fan Feed, use our DB
    if (platforms.fanfeed) {
      // Get current user (assuming admin/star for this component)
      // In a real app, this would come from auth context
      const currentUser = db.users.getCurrent() || db.users.getByUsername('cameron');
      
      if (currentUser) {
        db.posts.create({
          authorId: currentUser.id,
          title: title || undefined,
          content,
          mediaUrl: media || undefined,
          mediaType: media ? 'image' : undefined, // Simplified for now, assumes image
        });
      }
    }

    setIsPosting(false);
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setTitle('');
      setContent('');
      setMedia(null);
    }, 3000);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeMedia = () => {
    setMedia(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title (Optional - for Articles)"
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
          />
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
        </div>

        {/* Media Preview */}
        {media && (
          <div className="relative w-full h-48 bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 group">
            <img src={media} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={removeMedia}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleMediaUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex gap-2">
            <button 
              onClick={triggerFileInput}
              className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition"
              title="Add Image"
            >
              <ImageIcon size={20} />
            </button>
            <button className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition">
              <Video size={20} />
            </button>
            <button className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition">
              <Hash size={20} />
            </button>
          </div>

          <button
            onClick={handlePost}
            disabled={isPosting || (!content && !media)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
              posted 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-black hover:bg-amber-500 hover:text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {posted ? (
              <>
                <CheckCircle2 size={18} />
                Posted!
              </>
            ) : (
              <>
                <Send size={18} />
                {isPosting ? 'Publishing...' : 'Publish Post'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
