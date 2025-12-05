import { Hammer, Droplets, GraduationCap, ArrowRight } from "lucide-react";

// This interface matches what we expect from Strapi later
interface Project {
  id: number;
  attributes: {
    title: string;
    location: string;
    status: "starting" | "ongoing" | "finishing";
    progress: number;
    type: "infrastructure" | "water" | "education";
  };
}

export default function ProjectTracker({ projects = [] }: { projects?: Project[] }) {
  // Fallback data if Strapi is empty (Cameroon Context)
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: 1,
      attributes: {
        title: "Construction Route Principale",
        location: "Quartier Commercial",
        status: "ongoing",
        progress: 75,
        type: "infrastructure"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Forage d'Eau Potable",
        location: "Zone Nord",
        status: "starting",
        progress: 30,
        type: "water"
      }
    },
    {
      id: 3,
      attributes: {
        title: "Rénovation Lycée Bilingue",
        location: "Centre-Ville",
        status: "finishing",
        progress: 90,
        type: "education"
      }
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "infrastructure": return <Hammer size={24} />;
      case "water": return <Droplets size={24} />;
      case "education": return <GraduationCap size={24} />;
      default: return <Hammer size={24} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "starting": return "Démarrage / Starting";
      case "ongoing": return "En cours / Ongoing";
      case "finishing": return "Finition / Finishing";
      default: return status;
    }
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h3 className="text-official-green font-bold uppercase tracking-widest text-sm mb-2">
              Transparence / Transparency
            </h3>
            <h2 className="text-3xl font-serif font-bold text-official-dark">
              Projets &amp; Chantiers <span className="text-official-red">en cours</span>
            </h2>
          </div>
          <button className="text-official-green font-bold hover:underline mt-4 md:mt-0 flex items-center gap-2">
            Voir tous les projets <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.map((project: any) => {
            const attr = project.attributes || project;
            return (
              <div key={project.id} className="bg-official-light p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white p-3 rounded-full text-official-green shadow-sm">
                    {getIcon(attr.type)}
                  </div>
                  <span className="text-xs font-bold bg-official-yellow/20 text-official-dark px-2 py-1 rounded">
                    {getStatusLabel(attr.status)}
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-1 text-official-dark">{attr.title}</h4>
                <p className="text-xs text-gray-500 mb-4 uppercase">{attr.location}</p>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-official-green h-2.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${attr.progress}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs font-bold text-official-green">
                  {attr.progress}% Completed
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
