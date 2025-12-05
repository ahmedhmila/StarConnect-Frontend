import { Heart, Mic2, ShoppingBag, ArrowRight } from "lucide-react";

// This interface matches what we expect from Strapi later
interface Project {
  id: number;
  attributes: {
    title: string;
    location: string;
    status: "live" | "upcoming" | "completed";
    progress: number;
    type: "charity" | "tour" | "collab";
  };
}

export default function ProjectTracker({ projects = [] }: { projects?: Project[] }) {
  // Fallback data if Strapi is empty
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: 1,
      attributes: {
        title: "National Charity Gala",
        location: "Yaoundé Convention Center",
        status: "upcoming",
        progress: 0,
        type: "charity"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Summer Music Tour 2025",
        location: "Douala, Buea, Garoua",
        status: "live",
        progress: 45,
        type: "tour"
      }
    },
    {
      id: 3,
      attributes: {
        title: "Exclusive Merch Drop",
        location: "Online Store",
        status: "completed",
        progress: 100,
        type: "collab"
      }
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "charity": return <Heart size={24} />;
      case "tour": return <Mic2 size={24} />;
      case "collab": return <ShoppingBag size={24} />;
      default: return <Heart size={24} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "live": return "Live Now";
      case "upcoming": return "Coming Soon";
      case "completed": return "Sold Out / Done";
      default: return status;
    }
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h3 className="text-official-green font-bold uppercase tracking-widest text-sm mb-2">
              Impact & Activities
            </h3>
            <h2 className="text-3xl font-serif font-bold text-official-dark">
              Active <span className="text-official-red">Campaigns</span>
            </h2>
          </div>
          <button className="text-official-green font-bold hover:underline mt-4 md:mt-0 flex items-center gap-2">
            View All Activities <ArrowRight size={16} />
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
                
                {attr.status === "live" && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-official-green h-2.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${attr.progress}%` }}
                    ></div>
                    <div className="text-right text-xs font-bold text-official-green mt-1">
                      {attr.progress}% Goal Reached
                    </div>
                  </div>
                )}
                
                {attr.status === "upcoming" && (
                   <div className="text-sm text-gray-500 italic">Tickets available soon</div>
                )}

                 {attr.status === "completed" && (
                   <div className="text-sm text-official-red font-bold">Event Concluded</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
