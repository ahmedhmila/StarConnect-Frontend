import { Hammer, Droplets, GraduationCap } from "lucide-react";

const PROJECTS = [
  { 
    title: "Construction Route Principale", 
    loc: "Quartier Commercial", 
    progress: 75, 
    icon: Hammer,
    status: "En cours / Ongoing" 
  },
  { 
    title: "Forage d'Eau Potable", 
    loc: "Zone Nord", 
    progress: 30, 
    icon: Droplets,
    status: "Démarrage / Starting" 
  },
  { 
    title: "Rénovation Lycée Bilingue", 
    loc: "Centre-Ville", 
    progress: 90, 
    icon: GraduationCap,
    status: "Finition / Finishing" 
  }
];

export default function ProjectTracker() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h3 className="text-official-green font-bold uppercase tracking-widest text-sm mb-2">Transparence / Transparency</h3>
            <h2 className="text-3xl font-serif font-bold text-official-dark">
              Projets & Chantiers <span className="text-official-red">en cours</span>
            </h2>
          </div>
          <button className="text-official-green font-bold hover:underline mt-4 md:mt-0">
            Voir tous les projets →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <div key={i} className="bg-official-light p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white p-3 rounded-full text-official-green shadow-sm">
                  <p.icon size={24} />
                </div>
                <span className="text-xs font-bold bg-official-yellow/20 text-official-dark px-2 py-1 rounded">
                  {p.status}
                </span>
              </div>
              <h4 className="font-bold text-lg mb-1">{p.title}</h4>
              <p className="text-xs text-gray-500 mb-4 uppercase">{p.loc}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-official-green h-2.5 rounded-full" 
                  style={{ width: `${p.progress}%` }}
                ></div>
              </div>
              <div className="text-right text-xs font-bold text-official-green">{p.progress}% Completed</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}