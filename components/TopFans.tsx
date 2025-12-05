import { Trophy, Medal, Crown } from "lucide-react";

const FANS = [
  { name: "Sarah K.", points: 15400, avatar: "SK", rank: 1 },
  { name: "Mike D.", points: 12350, avatar: "MD", rank: 2 },
  { name: "Jessica R.", points: 9800, avatar: "JR", rank: 3 },
  { name: "Alex T.", points: 8500, avatar: "AT", rank: 4 },
  { name: "David B.", points: 7200, avatar: "DB", rank: 5 },
];

export default function TopFans() {
  return (
    <section className="py-16 bg-official-dark text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-official-gold/5 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h3 className="text-official-gold font-bold uppercase tracking-widest text-sm mb-2">
              Hall of Fame
            </h3>
            <h2 className="text-3xl font-serif font-bold">
              Top Supporters This Month
            </h2>
          </div>
          <div className="mt-4 md:mt-0 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
            <span className="text-sm font-bold">Your Rank: #842</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {FANS.map((fan) => (
            <div 
              key={fan.rank} 
              className={`relative p-6 rounded-xl border transition-all hover:scale-105 ${
                fan.rank === 1 
                  ? "bg-gradient-to-b from-official-gold/20 to-official-dark border-official-gold" 
                  : "bg-white/5 border-white/10"
              }`}
            >
              {fan.rank === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-official-gold">
                  <Crown size={32} fill="currentColor" />
                </div>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-3 ${
                  fan.rank === 1 ? "bg-official-gold text-official-dark" : "bg-white/10 text-white"
                }`}>
                  {fan.avatar}
                </div>
                
                <h4 className="font-bold text-lg mb-1">{fan.name}</h4>
                <p className="text-official-gold font-mono text-sm">{fan.points.toLocaleString()} pts</p>
                
                <div className="mt-3 text-xs opacity-50 uppercase tracking-wider">
                  Rank #{fan.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
