export default function Footer() {
  return (
    <footer className="bg-official-dark text-white pt-16 pb-8 border-t-8 border-official-gold">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="font-serif font-bold text-2xl mb-4 text-official-gold">StarConnect CMS</h3>
          <p className="opacity-80 max-w-sm">
            Empowering influencers and leaders with sovereign, secure technology. Own your data, own your future.
            <br/><span className="text-xs opacity-60 italic">Autonomiser les influenceurs grâce à une technologie souveraine.</span>
          </p>
        </div>
        
        <div className="bg-white/5 p-8 rounded-lg border border-white/10">
          <h4 className="font-bold mb-2">Join the Inner Circle</h4>
          <p className="text-sm opacity-70 mb-4">Get exclusive updates, drops, and personal news directly. No algorithms.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="fan@starconnect.cm" 
              className="bg-white/10 border border-white/20 rounded px-4 py-2 w-full text-white placeholder:text-white/30 focus:outline-none focus:border-official-gold"
            />
            <button className="bg-official-gold text-official-dark font-bold px-6 py-2 rounded hover:bg-white transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
  <div className="text-xs opacity-40">
    © 2025 StarConnect CMS. Sovereign Data Infrastructure.
  </div>
  
  {/* STAFF LOGIN BUTTON */}
  <a 
    href="https://starconnect-api-prod-a8bhddb7ccf7gugw.italynorth-01.azurewebsites.net/admin" 
    target="_blank"
    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-official-gold transition-colors"
  >
    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    Admin Login (Secure)
  </a>
</div>
    </footer>
  );
}