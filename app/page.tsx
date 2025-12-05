import { fetchGlobalConfig, fetchArticles, getStrapiMedia } from "@/lib/api";
import CrisisOverlay from "@/components/CrisisOverlay";
import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";
import Tracker from "@/components/Tracker";
import ServiceGrid from "@/components/ServiceGrid";
import CitizenVoice from "@/components/CitizenVoice";
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Lock, 
  MessageCircle, 
  Heart, 
  Camera 
} from "lucide-react";

export default async function Home() {
  // 1. Fetch ALL data in parallel from Azure
  const [config, articles] = await Promise.all([
    fetchGlobalConfig(),
    fetchArticles()
  ]);

  // 2. CRISIS MODE CHECK (The "War Room" Toggle)
  if (config?.isCrisisMode) {
    return <CrisisOverlay config={config} />;
  }

  // 3. STANDARD INSTITUTIONAL VIEW
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Tracker /> {/* Proprietary Analytics running silently */}
      <Navbar />

      {/* RICH HERO SECTION */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-official-blue">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-official-blue via-[#004080] to-black opacity-90 z-0"></div>
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-4xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-official-gold text-official-blue font-bold px-4 py-1 rounded-full text-xs tracking-wider uppercase">
                Official Portal
              </span>
              <span className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                System Operational
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight">
              The Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-official-gold to-yellow-200">
                Local Governance.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 mb-10 font-light max-w-2xl leading-relaxed border-l-4 border-official-gold pl-6">
              Direct connection. Sovereign data. Unfiltered communication.
              Welcome to the digital heart of your municipality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-official-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-official-gold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Access E-Services
              </button>
              <button className="border border-white/30 bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
                Latest Statements
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* E-SERVICES GRID */}
      <ServiceGrid />

      {/* MAIN CONTENT AREA */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT COLUMN: News Feed (The CMS Content) */}
          <div className="lg:w-2/3">
            <h3 className="text-3xl font-serif font-bold text-official-blue mb-10 flex items-center gap-4">
              <span className="w-2 h-12 bg-official-gold rounded-full"></span>
              Official Statements & News
            </h3>

            <div className="space-y-10">
              {/* REAL DATA LOOP */}
              {articles && articles.map((article: any) => {
                // Handle Strapi v5 vs v4 data structure
                const attr = article.attributes || article;
                const imageRaw = attr.coverImage?.data?.attributes || attr.coverImage;
                const imageUrl = getStrapiMedia(imageRaw?.url);
                const department = attr.department || "Mayor's Office";
                const isPremium = attr.category === "Exclusive";

                return (
                  <article key={article.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                    
                    {/* VIP LOCK BADGE */}
                    {isPremium && (
                      <div className="absolute top-4 right-4 z-20 bg-official-gold text-official-blue font-bold px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg">
                        <Lock size={12} /> VIP Citizen Access
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8">
                      {/* IMAGE SECTION */}
                      <div className="md:w-1/3 h-52 bg-gray-200 rounded-xl overflow-hidden relative shrink-0">
                        {imageUrl ? (
                          <img src={imageUrl} alt={attr.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                        )}
                        
                        {/* Department Badge on Image */}
                        <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                          <span className="bg-official-blue text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            {attr.category || "General"}
                          </span>
                        </div>

                        {/* FAKE GALLERY INDICATOR */}
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-[10px] font-bold backdrop-blur-md flex items-center gap-1">
                          <Camera size={10} /> +4 Photos
                        </div>
                      </div>

                      {/* CONTENT SECTION */}
                      <div className="md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-full bg-official-gold flex items-center justify-center text-[10px] font-bold text-official-blue">
                              {department.charAt(0)}
                            </span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              Posted by {department}
                            </span>
                          </div>
                          
                          <h4 className="text-2xl font-bold text-official-blue mb-3 leading-tight group-hover:text-official-gold transition-colors">
                            {attr.title}
                          </h4>
                          
                          {/* Rich Text Preview with BLUR effect for Premium */}
                          <div className={`text-gray-500 leading-relaxed mb-4 line-clamp-2 ${isPremium ? 'blur-[3px] select-none opacity-60' : ''}`}>
                            {typeof attr.content === 'string' 
                              ? attr.content 
                              : (attr.content?.[0]?.children?.[0]?.text || "Read the full official statement...")}
                          </div>
                          
                          {isPremium && (
                            <div className="text-xs font-bold text-official-red uppercase tracking-widest mb-4">
                              Login to read full report
                            </div>
                          )}
                        </div>
                        
                        {/* FOOTER: Social Proof & Syndication */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                          
                          {/* Fake Engagement Metrics */}
                          <div className="flex gap-4 text-xs text-gray-400 font-bold">
                            <span className="flex items-center gap-1 hover:text-official-blue cursor-pointer transition-colors">
                              <MessageCircle size={14} /> {Math.floor(Math.random() * 40) + 5}
                            </span>
                            <span className="flex items-center gap-1 hover:text-official-red cursor-pointer transition-colors">
                              <Heart size={14} /> {Math.floor(Math.random() * 150) + 20}
                            </span>
                          </div>

                          {/* THE SYNDICATION ENGINE (Dynamic Icons) */}
                          <div className="flex items-center gap-3">
                            {(!attr.syndicateToX && !attr.syndicateToFacebook && !attr.syndicateToLinkedIn) ? (
                               <div className="text-[10px] font-bold text-official-gold bg-official-blue/5 px-2 py-1 rounded">
                                 ★ Site Exclusive
                               </div>
                            ) : (
                               <>
                                 <span className="text-[10px] text-gray-400 font-bold uppercase hidden sm:block">Syndicated:</span>
                                 <div className="flex gap-2">
                                   {attr.syndicateToX && (
                                     <div title="Auto-posted to X" className="bg-black text-white p-1.5 rounded-full hover:scale-110 transition-transform cursor-help">
                                       <Twitter size={12} />
                                     </div>
                                   )}
                                   {attr.syndicateToFacebook && (
                                     <div title="Auto-posted to Facebook" className="bg-[#1877F2] text-white p-1.5 rounded-full hover:scale-110 transition-transform cursor-help">
                                       <Facebook size={12} />
                                     </div>
                                   )}
                                   {attr.syndicateToLinkedIn && (
                                     <div title="Auto-posted to LinkedIn" className="bg-[#0A66C2] text-white p-1.5 rounded-full hover:scale-110 transition-transform cursor-help">
                                       <Linkedin size={12} />
                                     </div>
                                   )}
                                 </div>
                               </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {(!articles || articles.length === 0) && (
                <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-400 font-bold">System Online. Waiting for Official Content.</p>
                  <p className="text-sm text-gray-400 mt-2">Please log in to the Staff Portal to publish updates.</p>
                </div>
              )}
            </div>
            
            {/* Embedded Shop Section */}
            <div className="mt-24">
               <ShopSection />
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="lg:w-1/3 space-y-10">
            {/* Social Aggregator */}
            <SocialFeed />
            
            {/* Donation CTA */}
            <div className="bg-official-blue text-white p-8 rounded-2xl relative overflow-hidden text-center group shadow-xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              <h4 className="font-serif font-bold text-2xl mb-4 text-official-gold relative z-10">
                Support the Vision
              </h4>
              <p className="opacity-80 mb-8 leading-relaxed text-sm relative z-10">
                Your donations help us maintain digital sovereignty and independence from big tech algorithms.
              </p>
              <button className="bg-official-gold text-official-blue font-bold py-4 px-8 rounded-xl hover:bg-white w-full transition-all shadow-lg relative z-10 flex items-center justify-center gap-2">
                Donate via Mobile Money <Heart size={16} className="text-official-red fill-current" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CITIZEN REPORTING SECTION */}
      <CitizenVoice />

      <Footer />
    </main>
  );
}