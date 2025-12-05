import { Lock, ShoppingBag, Video, Users, ArrowRight } from "lucide-react";

const SERVICES = [
  { icon: Lock, title: "Exclusive Content", desc: "Behind the scenes, unreleased footage & VIP blog." },
  { icon: ShoppingBag, title: "Official Merch", desc: "Limited edition drops, books & signature gear." },
  { icon: Video, title: "Personal Shoutouts", desc: "Get a personalized video message or booking." },
  { icon: Users, title: "Community Access", desc: "Join the private Discord & fan meetups." },
];

export default function ServiceGrid() {
  return (
    <section className="py-20 bg-white relative" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-official-gold font-bold tracking-widest uppercase text-sm">The Universe</span>
          <h2 className="text-4xl font-serif font-bold text-official-dark mt-2">
            Explore My World
          </h2>
          <div className="w-24 h-1 bg-official-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-official-gold/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
              
              <div className="w-14 h-14 bg-official-dark text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:bg-official-gold group-hover:text-official-dark transition-colors">
                <service.icon size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-official-dark mb-3">{service.title}</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">{service.desc}</p>
              
              <div className="flex items-center text-official-gold font-bold text-sm group-hover:gap-2 transition-all">
                Explore <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}