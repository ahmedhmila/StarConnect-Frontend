import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a 
      href="https://wa.me/237600000000" // Replace with Mairie number
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 font-bold border-2 border-white"
    >
      <MessageCircle size={24} />
      <span className="hidden md:inline">Chat with Mayor</span>
    </a>
  );
}