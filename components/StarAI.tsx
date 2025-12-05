"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";

export default function StarAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey! I'm the digital twin of StarConnect. Ask me anything about my music, tour dates, or exclusive content! " }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking with RAG (Retrieval Augmented Generation)
    setTimeout(() => {
      let response = "That's an interesting question! Stay tuned for updates.";
      
      if (userMsg.toLowerCase().includes("tour") || userMsg.toLowerCase().includes("concert")) {
        response = "I'm currently planning the Summer 2025 tour! We'll be hitting Douala, Yaoundé, and maybe Paris. Check the 'Campaigns' section for dates! ";
      } else if (userMsg.toLowerCase().includes("album") || userMsg.toLowerCase().includes("music")) {
        response = "I'm in the studio right now working on the new album. It's going to be fire!  Expect a drop next month.";
      } else if (userMsg.toLowerCase().includes("love") || userMsg.toLowerCase().includes("fan")) {
        response = "I love my fans so much! You guys are the reason I do this. ";
      } else if (userMsg.toLowerCase().includes("hello") || userMsg.toLowerCase().includes("hi")) {
        response = "Hey there! Thanks for stopping by my official space. What's on your mind?";
      }

      setMessages(prev => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-official-gold text-official-dark p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/20 ${isOpen ? "hidden" : "flex"}`}
      >
        <MessageSquare size={28} fill="currentColor" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-official-dark border border-official-gold/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-official-gold to-yellow-600 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-official-dark text-sm">Star AI Twin</h3>
              <p className="text-[10px] text-official-dark/80 font-mono uppercase">Powered by RAG</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-official-dark hover:bg-white/20 rounded-full p-1 transition">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 bg-black/90 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === "user" 
                  ? "bg-official-gold text-official-dark rounded-tr-none" 
                  : "bg-white/10 text-white rounded-tl-none border border-white/5"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-official-dark border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-official-gold"
          />
          <button type="submit" className="bg-official-gold text-official-dark p-2 rounded-full hover:bg-white transition">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
