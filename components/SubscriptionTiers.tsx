import { Check, Star, Crown, Zap } from "lucide-react";

const TIERS = [
  {
    name: "Follower",
    price: "Free",
    icon: Star,
    features: ["Public Feed Access", "Official Updates", "Community Polls"],
    cta: "Join Now",
    highlight: false
  },
  {
    name: "Super Fan",
    price: "$4.99/mo",
    icon: Zap,
    features: ["Exclusive Photos", "Behind the Scenes", "Early Access to Merch", "Supporter Badge"],
    cta: "Become a Super Fan",
    highlight: true
  },
  {
    name: "Inner Circle",
    price: "$19.99/mo",
    icon: Crown,
    features: ["Direct DM Access", "Private Live Streams", "Personal Shoutout", "VIP Event Invites"],
    cta: "Join Inner Circle",
    highlight: false
  }
];

export default function SubscriptionTiers() {
  return (
    <section className="py-20 bg-gray-50" id="premium">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-official-gold font-bold tracking-widest uppercase text-sm">Unlock More</span>
          <h2 className="text-4xl font-serif font-bold text-official-dark mt-2">
            Choose Your Access Level
          </h2>
          <div className="w-24 h-1 bg-official-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                tier.highlight 
                  ? "bg-official-dark text-white shadow-2xl border-2 border-official-gold scale-105 z-10" 
                  : "bg-white text-gray-800 shadow-lg border border-gray-100"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-official-gold text-official-dark font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${
                tier.highlight ? "bg-white/10 text-official-gold" : "bg-official-light text-official-dark"
              }`}>
                <tier.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold text-center mb-2">{tier.name}</h3>
              <div className="text-center mb-8">
                <span className="text-4xl font-bold">{tier.price}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className={`p-1 rounded-full ${tier.highlight ? "bg-official-gold text-official-dark" : "bg-green-100 text-green-600"}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="opacity-90">{feat}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-colors ${
                tier.highlight 
                  ? "bg-official-gold text-official-dark hover:bg-white" 
                  : "bg-official-dark text-white hover:bg-gray-800"
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
