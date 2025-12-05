
"use client";
import { Camera, Send, Share2 } from "lucide-react";
import { useState } from "react";

export default function CitizenVoice() {
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message Sent!\n\nVisibility: ${isPublic ? "Posted to Community Wall" : "Private Message"}`);
  };

  return (
    <section className="py-20 bg-official-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <h2 className="text-4xl font-serif font-bold mb-6">Connect With Me</h2>
          <p className="text-lg opacity-80 mb-8 leading-relaxed">
            Have a question? Want to collaborate? Or just want to say hi? 
            Send a message directly to my team. You can also post publicly to the community wall.
          </p>
          
          <div className="flex gap-4">
            <div className="flex-1 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <h4 className="font-bold text-official-gold text-2xl mb-1">10k+</h4>
              <p className="text-sm">Community Members</p>
            </div>
            <div className="flex-1 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <h4 className="font-bold text-official-gold text-2xl mb-1">Weekly</h4>
              <p className="text-sm">Live Q&A Sessions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-official-dark mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
              <input type="text" placeholder="e.g. Collab, Question, Fan Art" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-official-gold outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea rows={3} placeholder="Write your message here..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-official-gold outline-none"></textarea>
            </div>

            <div className="flex items-center gap-4 py-2">
              <button type="button" className="flex items-center gap-2 text-gray-500 hover:text-official-blue transition">
                <Camera size={20} /> <span className="text-sm">Add Photo</span>
              </button>
            </div>

            {/* THE SYNDICATION CHOICE */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
              <input 
                type="checkbox" 
                id="public-syndication" 
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mt-1 w-4 h-4 text-official-blue rounded focus:ring-official-gold" 
              />
              <label htmlFor="public-syndication" className="text-sm text-official-blue cursor-pointer select-none">
                <strong>Public Syndication:</strong> Post this report to the Community Social Feed automatically?
              </label>
            </div>

            <button type="submit" className="w-full bg-official-gold text-official-blue font-bold py-4 rounded-lg hover:bg-official-blue hover:text-white transition-all flex items-center justify-center gap-2">
              <Send size={20} /> Submit Report
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}