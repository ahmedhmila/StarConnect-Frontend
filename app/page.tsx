import { fetchGlobalConfig, getStrapiMedia } from "@/lib/api";
import CrisisOverlay from "@/components/CrisisOverlay";
import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import SocialFeed from "@/components/SocialFeed";
import FeaturedArticles from "@/components/FeaturedArticles";
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
  const config = await fetchGlobalConfig();

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
              Featured Articles
            </h3>
            <FeaturedArticles />

            <h3 className="text-3xl font-serif font-bold text-official-dark mb-10 mt-20 flex items-center gap-4">
              <span className="w-2 h-12 bg-official-gold rounded-full"></span>
              Live Feed
            </h3>
            <SocialFeed />
          </div>

          <div className="lg:w-1/3 space-y-10">
            <div id="shop">
               <ShopSection />
            </div>
          </div>
        </div>
      </section>

      <CitizenVoice />
      <Footer />
    </main>
  );
}

