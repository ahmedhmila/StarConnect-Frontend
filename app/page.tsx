import { fetchGlobalConfig, fetchArticles, getStrapiMedia } from "@/lib/api";
import CrisisOverlay from "@/components/CrisisOverlay";
import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";
import Tracker from "@/components/Tracker";
import ServiceGrid from "@/components/ServiceGrid";
import ProjectTracker from "@/components/ProjectTracker";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import TopFans from "@/components/TopFans";
import CitizenVoice from "@/components/CitizenVoice";
import StarAI from "@/components/StarAI";
import LiveVibe from "@/components/LiveVibe";
import { Twitter, Facebook, Linkedin, Lock, MessageCircle, Heart, MapPin } from "lucide-react";

export default async function Home() {
  const [config, articles] = await Promise.all([fetchGlobalConfig(), fetchArticles()]);

  if (config?.isCrisisMode) return <CrisisOverlay config={config} />;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Tracker />
      <StarAI />
      
      {/* UPDATED NAVBAR */}
      <Navbar /> 

      {/* HERO SECTION - CAMEROON COLORS */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-official-dark">
        <LiveVibe />
        <div className="absolute inset-0 bg-gradient-to-br from-official-dark via-[#000000] to-black opacity-90 z-0"></div>
        {/* Pattern: African Geometric/Mudcloth simulation */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-4xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg" className="h-6 w-auto shadow-sm" alt="Cmr Flag"/>
              <span className="bg-official-gold text-official-dark font-bold px-4 py-1 rounded-full text-xs tracking-wider uppercase">
                Cameron's Official Hub / Le Hub Officiel de Cameron
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Welcome to <br/>
              <span className="text-official-gold">Cameron's World</span>
            </h1>
            
            <p className="text-xl opacity-90 mb-10 font-light max-w-2xl leading-relaxed border-l-4 border-official-gold pl-6">
              Experience the music. Join the journey. Connect with Cameron. <br/>
              <span className="text-sm opacity-75 italic">Vivez la musique. Rejoignez l'aventure. Connectez-vous avec Cameron.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#shop" className="bg-official-gold text-official-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-colors shadow-lg text-center">
                Get Merch
              </a>
              <a href="#news" className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors text-center">
                Tour Dates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* E-SERVICES */}
      <ServiceGrid />

      {/* PROJECTS TRACKER - TRANSPARENCY */}
      <ProjectTracker />

      {/* SUBSCRIPTION TIERS */}
      <SubscriptionTiers />

      {/* TOP FANS LEADERBOARD */}
      <TopFans />

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-6 py-20" id="news">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <h3 className="text-3xl font-serif font-bold text-official-dark mb-10 flex items-center gap-4">
              <span className="w-2 h-12 bg-official-gold rounded-full"></span>
              Latest Updates
            </h3>

            <div className="space-y-10">
              {/* REAL DATA LOOP */}
              {articles && articles.length > 0 ? (
                articles.map((article: any) => {
                  const attr = article.attributes || article;
                  const imageRaw = attr.coverImage?.data?.attributes || attr.coverImage;
                  const imageUrl = getStrapiMedia(imageRaw?.url);
                  const department = attr.department || "Official Team";
                  const isPremium = attr.category === "Exclusive";

                  return (
                    <article key={article.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                      {/* PREMIUM BADGE */}
                      {isPremium && (
                        <div className="absolute top-4 right-4 z-20 bg-official-gold text-official-dark font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 shadow-lg">
                          <Lock size={12} /> VIP / Exclusive
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 h-52 bg-gray-200 rounded-xl overflow-hidden relative shrink-0">
                          {imageUrl ? (
                            <img src={imageUrl} alt={attr.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                          )}
                          <span className="absolute top-4 left-4 bg-official-dark text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase shadow-lg">
                            {attr.category || "General"}
                          </span>
                        </div>

                        <div className="md:w-2/3 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <MapPin size={14} className="text-red-500" />
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                {department}
                              </span>
                            </div>
                            
                            <h4 className="text-2xl font-bold text-official-dark mb-3 leading-tight group-hover:text-official-gold transition-colors">
                              {attr.title}
                            </h4>
                            
                            <div className="relative">
                              <div className={`text-gray-500 leading-relaxed mb-4 line-clamp-2 ${isPremium ? "blur-sm select-none opacity-50" : ""}`}>
                                {typeof attr.content === "string" ? attr.content : (attr.content?.[0]?.children?.[0]?.text || "Read more...")}
                              </div>
                              
                              {isPremium && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <button className="bg-official-gold text-official-dark font-bold text-xs px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                                    <Lock size={12} /> Unlock Post
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                             <div className="flex gap-4 text-xs text-gray-400 font-bold">
                              <span className="flex items-center gap-1 hover:text-official-dark cursor-pointer">
                                <MessageCircle size={14} /> {Math.floor(Math.random() * 40)}
                              </span>
                              <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                                <Heart size={14} /> {Math.floor(Math.random() * 150)}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              {(!attr.syndicateToX && !attr.syndicateToFacebook && !attr.syndicateToLinkedIn) ? (
                                 <div className="text-[10px] font-bold text-official-gold bg-official-dark px-2 py-1 rounded">
                                   ★ Exclusive
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
                })
              ) : (
                <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="text-gray-400 mb-4">Aucune actualité disponible pour le moment.</div>
                  <div className="text-sm text-red-500 bg-red-50 inline-block px-4 py-2 rounded-full">
                    Debug: Check Strapi Permissions (Public {">"} Article {">"} find) & Publish Status
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-20" id="shop">
               <ShopSection />
            </div>
          </div>

          <div className="lg:w-1/3 space-y-10">
            <SocialFeed />
          </div>
        </div>
      </section>

      <CitizenVoice />
      <Footer />
    </main>
  );
}

