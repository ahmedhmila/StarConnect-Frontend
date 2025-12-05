import { fetchGlobalConfig, fetchArticles, getStrapiMedia } from "@/lib/api";
import CrisisOverlay from "@/components/CrisisOverlay";
import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";
import Tracker from "@/components/Tracker";
import ServiceGrid from "@/components/ServiceGrid";
import CitizenVoice from "@/components/CitizenVoice";
import { Twitter, Facebook, Linkedin } from "lucide-react";

export default async function Home() {
  // 1. Fetch ALL data in parallel
  const [config, articles] = await Promise.all([
    fetchGlobalConfig(),
    fetchArticles()
  ]);

  // 2. Crisis Check
  if (config?.isCrisisMode) {
    return <CrisisOverlay config={config} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Tracker />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-official-blue">
        <div className="absolute inset-0 bg-gradient-to-br from-official-blue via-[#004080] to-black opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-3xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <span className="bg-official-gold text-official-blue font-bold px-4 py-1 rounded-full text-xs tracking-wider uppercase mb-6 inline-block">
              Official Portal
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-none">
              The Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-official-gold to-yellow-200">Governance.</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10 font-light max-w-2xl leading-relaxed">
              Direct connection. Sovereign data. Unfiltered communication.
            </p>
          </div>
        </div>
      </section>

      <ServiceGrid />

      {/* DYNAMIC NEWS SECTION */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <h3 className="text-3xl font-serif font-bold text-official-blue mb-10 flex items-center gap-4">
              <span className="w-2 h-12 bg-official-gold rounded-full"></span>
              Official Statements
            </h3>

            <div className="space-y-8">
              {/* REAL DATA LOOP */}
              {articles && articles.map((article: any) => {
                // FIX: Handle Strapi v5 (Flat) and v4 (Nested)
                const attr = article.attributes || article;
                
                // FIX: Handle Image structure for v5 and v4
                const imageRaw = attr.coverImage?.data?.attributes || attr.coverImage;
                const imageUrl = getStrapiMedia(imageRaw?.url);
                
                const department = attr.department || "Mayor's Office";

                return (
                  <article key={article.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Image */}
                      <div className="md:w-1/3 h-48 bg-gray-200 rounded-xl overflow-hidden relative">
                        {imageUrl ? (
                          <img src={imageUrl} alt={attr.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                        )}
                        <span className="absolute top-4 left-4 bg-official-blue text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">
                          {attr.category || "General"}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">
                              Posted by {department}
                            </span>
                          </div>
                          
                          <h4 className="text-2xl font-bold text-official-blue mb-3 group-hover:text-official-gold transition-colors">
                            {attr.title}
                          </h4>
                          {/* Rich Text Preview */}
                          <div className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
                            {/* Handle Rich Text Blocks or String */}
                            {typeof attr.content === 'string' 
                              ? attr.content 
                              : (attr.content?.[0]?.children?.[0]?.text || "Click to read more...")}
                          </div>
                        </div>
                        
                        {/* Syndication Icons */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                          <span className="text-xs text-gray-400 font-bold">SYNDICATED TO:</span>
                          <div className="flex gap-3">
                            <div className="bg-black text-white p-2 rounded-full w-8 h-8 flex items-center justify-center"><Twitter size={14} /></div>
                            <div className="bg-blue-600 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center"><Facebook size={14} /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {(!articles || articles.length === 0) && (
                <div className="p-8 text-center text-gray-500 bg-gray-100 rounded-xl">
                  No articles found. Please publish content in the Staff Portal.
                </div>
              )}
            </div>
            
            <div className="mt-20">
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