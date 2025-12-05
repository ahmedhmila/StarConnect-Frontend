import { Music, Mic2 } from "lucide-react";

export default function LiveVibe() {
  return (
    <div className="absolute top-24 right-6 z-20 hidden md:block animate-in slide-in-from-right duration-1000">
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl w-64 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Current Vibe</span>
          </div>
          <Mic2 size={14} className="text-official-gold" />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 bg-official-gold rounded-lg overflow-hidden flex items-center justify-center shrink-0">
             {/* Fake Album Art */}
             <Music size={20} className="text-official-dark" />
             <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-[2px] h-4 items-end pb-1">
               <div className="w-[2px] bg-official-dark h-2 animate-[bounce_1s_infinite]"></div>
               <div className="w-[2px] bg-official-dark h-3 animate-[bounce_1.2s_infinite]"></div>
               <div className="w-[2px] bg-official-dark h-1 animate-[bounce_0.8s_infinite]"></div>
             </div>
          </div>
          
          <div className="overflow-hidden">
            <h4 className="text-white font-bold text-sm truncate">Studio Session #4</h4>
            <p className="text-xs text-gray-400 truncate">Recording new vocals...</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
           <div className="w-4 h-4 rounded-full bg-[#1DB954] flex items-center justify-center">
             <svg width="10" height="10" viewBox="0 0 24 24" fill="black"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.96 1.74.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
           </div>
           <span className="text-[10px] text-[#1DB954] font-bold">Listening on Spotify</span>
        </div>
      </div>
    </div>
  );
}
