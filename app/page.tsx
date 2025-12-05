// frontend/app/page.tsx
import { fetchGlobalConfig } from "@/lib/api";
import CrisisOverlay from "@/components/CrisisOverlay";

export default async function Home() {
  // 1. Fetch the state from the backend
  const config = await fetchGlobalConfig();

  // 2. THE KILL SWITCH
  if (config?.isCrisisMode) {
    return <CrisisOverlay config={config} />;
  }

  // 3. Normal Website
  return (
    <main className="min-h-screen bg-official-gray">
      <header className="bg-official-blue text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-official-gold">
            Mairie de StarConnect
          </h1>
          <nav className="space-x-6 text-sm font-semibold uppercase tracking-wide">
            <a href="#" className="hover:text-official-gold">News</a>
            <a href="#" className="hover:text-official-gold">Services</a>
            <a href="#" className="hover:text-official-gold">Shop</a>
          </nav>
        </div>
      </header>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl text-official-blue font-bold mb-4">
            Welcome to the Official Portal
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparency, Innovation, and Direct Communication with your Citizens.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-official-blue mb-8 border-l-4 border-official-gold pl-4">
          Latest Updates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-48 bg-gray-200 mb-4 rounded-md"></div>
              <h4 className="font-bold text-lg mb-2 text-official-blue">Public Infrastructure Update #{i}</h4>
              <p className="text-gray-500 text-sm">Read the official report regarding the new development projects...</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}