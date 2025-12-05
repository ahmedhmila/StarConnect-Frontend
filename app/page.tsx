import { fetchGlobalConfig, fetchArticles, getStrapiMedia } from "@/lib/api";
import CrisisOverlay from "@/components/CrisisOverlay";
import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";
import Tracker from "@/components/Tracker";
import ServiceGrid from "@/components/ServiceGrid";
import CitizenVoice from "@/components/CitizenVoice";
import WhatsAppFloat from "@/components/WhatsAppFloat"; // NEW
import ProjectTracker from "@/components/ProjectTracker"; // NEW
import { Twitter, Facebook, Linkedin, Lock, MessageCircle, Heart, Camera, MapPin } from "lucide-react";

export default async function Home() {
  const [config, articles] = await Promise.all([fetchGlobalConfig(), fetchArticles()]);

  if (config?.isCrisisMode) return <CrisisOverlay config={config} />;

  return (
    <main className="min-h-screen bg-official-light flex flex-col font-sans">
      <Tracker />
      <WhatsAppFloat /> {/* THE CAMEROON LIFELINE */}
      
      {/* UPDATED NAVBAR (Ideally update the component, but we can override styles here if needed) */}
      <Navbar /> 

      {/* HERO SECTION - CAMEROON COLORS */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-official-green">
        <div className="absolute inset-0 bg-gradient-to-br from-official-green via-[#005c26] to-black opacity-90 z-0"></div>
        {/* Pattern: African Geometric/Mudcloth simulation */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-4xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg" className="h-6 w-auto shadow-sm" alt="Cmr Flag"/>
              <span className="bg-official-yellow text-official-dark font-bold px-4 py-1 rounded-full text-xs tracking-wider uppercase">
                Portail Officiel / Official Portal
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Mairie de <br/>
              <span className="text-official-yellow">StarConnect</span>
            </h1>
            
            <p className="text-xl opacity-90 mb-10 font-light max-w-2xl leading-relaxed border-l-4 border-official-red pl-6">
              Développement Durable. Innovation. Proximité. <br/>
              <span className="text-sm opacity-75 italic">Sustainable Development. Innovation. Proximity.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-official-yellow text-official-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-colors shadow-lg">
                Services en Ligne
              </button>
              <button className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors">
                Communiqués Officiels
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* E-SERVICES (Already built, fits well) */}
      <ServiceGrid />

      {/* NEW: PROJECTS TRACKER */}
      <ProjectTracker />

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <h3 className="text-3xl font-serif font-bold text-official-green mb-10 flex items-center gap-4">
              <span className="w-2 h-12 bg-official-red rounded-full"></span>
              Actualités & News
            </h3>

            <div className="space-y-10">
              {/* REAL DATA LOOP */}
              {articles && articles.map((article: any) => {
                const attr = article.attributes || article;
                const imageRaw = attr.coverImage?.data?.attributes || attr.coverImage;
                const imageUrl = getStrapiMedia(imageRaw?.url);
                const department = attr.department || "Cabinet du Maire";
                const isPremium = attr.category === "Exclusive";

                return (
                  <article key={article.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                    {/* PREMIUM BADGE */}
                    {isPremium && (
                      <div className="absolute top-4 right-4 z-20 bg-official-yellow text-official-dark font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 shadow-lg">
                        <Lock size={12} /> Zone Réservée / VIP
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3 h-52 bg-gray-200 rounded-xl overflow-hidden relative shrink-0">
                        {imageUrl ? (
                          <img src={imageUrl} alt={attr.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                        )}
                        <span className="absolute top-4 left-4 bg-official-green text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase shadow-lg">
                          {attr.category || "General"}
                        </span>
                      </div>

                      <div className="md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin size={14} className="text-official-red" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              {department}
                            </span>
                          </div>
                          
                          <h4 className="text-2xl font-bold text-official-dark mb-3 leading-tight group-hover:text-official-green transition-colors">
                            {attr.title}
                          </h4>
                          
                          <div className={`text-gray-500 leading-relaxed mb-4 line-clamp-2 ${isPremium ? 'blur-[3px] select-none opacity-60' : ''}`}>
                            {typeof attr.content === 'string' ? attr.content : (attr.content?.[0]?.children?.[0]?.text || "Lire le communiqué...")}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                           <div className="flex gap-4 text-xs text-gray-400 font-bold">
                            <span className="flex items-center gap-1 hover:text-official-green cursor-pointer">
                              <MessageCircle size={14} /> {Math.floor(Math.random() * 40)}
                            </span>
                            <span className="flex items-center gap-1 hover:text-official-red cursor-pointer">
                              <Heart size={14} /> {Math.floor(Math.random() * 150)}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {(!attr.syndicateToX && !attr.syndicateToFacebook && !attr.syndicateToLinkedIn) ? (
                               <div className="text-[10px] font-bold text-official-yellow bg-official-dark px-2 py-1 rounded">
                                 ★ Site Officiel Uniquement
                               </div>
                            ) : (
                               <div className="flex gap-2">
                                   {attr.syndicateToX && <div className="bg-black text-white p-1.5 rounded hover:scale-110"><Twitter size={12} /></div>}
                                   {attr.syndicateToFacebook && <div className="bg-[#1877F2] text-white p-1.5 rounded hover:scale-110"><Facebook size={12} /></div>}
                               </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            
            <div className="mt-24">
               <ShopSection />
            </div>
          </div>

          <div className="lg:w-1/3 space-y-10">
            <SocialFeed />
            <div className="bg-official-green text-white p-8 rounded-2xl relative overflow-hidden text-center group shadow-xl">
              <h4 className="font-serif font-bold text-2xl mb-4 text-official-yellow relative z-10">
                Contribution Citoyenne
              </h4>
              <p className="opacity-80 mb-8 leading-relaxed text-sm relative z-10">
                Soutenez les projets communaux via Mobile Money.
              </p>
              {/* CAMEROON PAYMENT LOGOS SIMULATION */}
              <div className="flex justify-center gap-4 mb-6 relative z-10">
                 <div className="bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded w-12 h-8 flex items-center justify-center">MTN</div>
                 <div className="bg-orange-500 text-white font-bold text-xs px-2 py-1 rounded w-12 h-8 flex items-center justify-center">OM</div>
              </div>
              <button className="bg-white text-official-green font-bold py-4 px-8 rounded-lg hover:bg-official-yellow transition-all shadow-lg relative z-10 w-full">
                Contribuer / Donate
              </button>
            </div>
          </div>
        </div>
      </section>

      <CitizenVoice />
      <Footer />
    </main>
  );
}