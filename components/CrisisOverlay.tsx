// frontend/components/CrisisOverlay.tsx
import { AlertTriangle, FileText } from "lucide-react";

export default function CrisisOverlay({ config }: { config: any }) {
  return (
    <div className="min-h-screen bg-official-red text-white flex flex-col items-center justify-center p-8 text-center font-serif">
      <div className="bg-black/20 p-6 rounded-full mb-6 animate-pulse">
        <AlertTriangle size={64} />
      </div>
      
      <h1 className="text-5xl font-bold mb-4 uppercase tracking-widest border-b-4 border-white pb-2">
        {config?.crisisTitle || "OFFICIAL STATE OF EMERGENCY"}
      </h1>
      
      <div className="max-w-2xl text-xl leading-relaxed mb-8 bg-white/10 p-6 rounded-lg border border-white/20">
        {config?.crisisMessage || "An official statement has been released regarding the current situation."}
      </div>

      {config?.officialPDF?.data && (
        <a 
          href={config.officialPDF.data.attributes.url}
          target="_blank"
          className="flex items-center gap-3 bg-white text-official-red px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-transform hover:scale-105"
        >
          <FileText size={24} />
          Download Official Communiqué (PDF)
        </a>
      )}

      <div className="mt-12 text-sm opacity-75">
        OFFICIAL COMMUNICATION CHANNEL • SECURE BROADCAST
      </div>
    </div>
  );
}