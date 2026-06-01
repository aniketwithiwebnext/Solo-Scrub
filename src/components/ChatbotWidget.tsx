import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, Phone } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-msg",
      sender: "ai",
      text: "Hello, I am Solomon, your Solo Scrub Caregiving Companion. How can I assist you with clinical, rinse-free sponge bathing, post-op recovery advice, or dementia caregiver support today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const SUGGESTIONS = [
    { label: "Post-op recovery sponge?", text: "Which Solo Scrub helps post-operative recovery?" },
    { label: "Dementia care bathing?", text: "Bathing causes stress for a dementia patient, which formulation should I buy?" },
    { label: "How to use?", text: "How do you activate the sponge lathers?" },
    { label: "Ship to Vancouver?", text: "Do you ship locally in Vancouver, BC?" }
  ];

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with our server proxy");
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.text || "I apologize, I received an incomplete response. Please call us directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorStatus("A connection issue occurred. Rest assured we're here for you.");
      
      const aiErrorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: "I apologize, but my digital system is experiencing a slight hiccup. You can get instant friendly human help by calling our Vancouver headquarters directly at 604-834-1207 or emailing ssolomon12@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiErrorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[calc(100vh-180px)] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col mb-4 ring-1 ring-slate-100 animate-fadeIn font-sans">
          {/* Header */}
          <div className="bg-blue-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-lg bg-[#10b981] flex items-center justify-center text-white relative shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="absolute bottom-[-1px] right-[-1px] w-2.5 h-2.5 bg-emerald-400 rounded-full border border-blue-900" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm leading-none text-white">Advisor Solomon</h3>
                <span className="text-[10px] text-emerald-400 tracking-wide font-semibold uppercase block mt-1">Solo Scrub AI Expert</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`p-3.5 rounded-xl text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none shadow-sm shadow-blue-100"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line font-medium text-[13px]">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">{m.timestamp}</span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="mr-auto items-start max-w-[85%] flex flex-col gap-1">
                <div className="bg-white text-slate-800 border border-slate-100 p-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#10b981] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#10b981] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#10b981] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-[9px] text-slate-400 italic animate-pulse">Solomon is writing response...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Help Suggestions inside chat box */}
          {messages.length === 1 && (
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5 font-mono">
                Suggested Care Topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(s.text)}
                    className="text-[11px] bg-white border border-slate-200 hover:border-blue-600 text-slate-600 hover:text-blue-600 rounded-lg px-2.5 py-1 transition-all font-medium"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 border-t border-slate-100 bg-white flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Solomon a caregiving question..."
              className="flex-1 bg-slate-50/80 rounded-xl py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-blue-605 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button triggers */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl p-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative group cursor-pointer"
        title="Consult Care Companion"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-300 font-bold text-xs uppercase tracking-wider whitespace-nowrap">
          Chat with Solomon
        </span>
        <span className="absolute top-0 right-0 w-3 h-3 bg-[#10b981] rounded-full border-2 border-white animate-ping" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-[#10b981] rounded-full border-2 border-white" />
      </button>
    </div>
  );
}
