import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, Activity, ArrowRight, ShieldCheck } from "lucide-react";

interface HeroProps {
  setView: (view: string) => void;
}

export default function Hero({ setView }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-16 pb-24 border-b border-slate-100">
      {/* Abstract Animated Ambient Orbs representing gentle care bubbles & foam */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-blue-400/10 rounded-full filter blur-[100px] opacity-25 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/10 rounded-full filter blur-[120px] opacity-25 animate-pulse" style={{ animationDuration: "8s" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Section (7 Cols) */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-100/80 mx-auto lg:mx-0 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Vancouver's Premium Choice</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B192C] leading-[1.1] tracking-tight">
                Clinically Gentle.<br />
                <span className="text-blue-600">Emotionally Human.</span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Introducing Solo Scrub — the first clinically gentle, medical-grade, rinse-free sponge bath system designed specifically for fragile skin, post-op patient recovery, and caregiving peace of mind.
              </p>
            </motion.div>

            {/* Dynamic Interactive Benefit Pills */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2"
            >
              {[
                { icon: Heart, label: "Warm Cleansing Touch", color: "text-red-400" },
                { icon: ShieldCheck, label: "Soap-Free Formula pH 5.5", color: "text-emerald-500" },
                { icon: Activity, label: "Dermatologist Tested", color: "text-blue-500" },
              ].map((b, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-100 shadow-sm hover:scale-102 transition-transform duration-200"
                >
                  <b.icon className={`w-4 h-4 ${b.color}`} />
                  <span className="text-xs font-semibold tracking-wide text-slate-700">{b.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
            >
              <button
                onClick={() => setView("shop")}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Browse Care Catalog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setView("about")}
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Learn Our Science
              </button>
            </motion.div>
          </div>

          {/* Interactive Image Display Section (6 Cols) with "3D style Mockup" */}
          <div className="lg:col-span-6 relative flex justify-center h-full min-h-[380px] items-center">
            <div className="absolute w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-3xl" />
            
            <div className="relative flex gap-4 md:gap-5 select-none scale-90 sm:scale-100">
              {/* Card 1: PURE COMFORT */}
              <div className="w-36 h-56 sm:w-44 sm:h-64 bg-white rounded-3xl shadow-2xl border border-white p-4 flex flex-col justify-between transform -rotate-6 hover:-translate-y-2 hover:rotate-[-4deg] transition-all duration-300">
                <div className="flex justify-between items-center text-slate-400 text-[8px] font-mono tracking-widest">
                  <span>SOLO</span>
                  <span>25 Sponges</span>
                </div>
                <div className="w-12 h-24 sm:w-16 sm:h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg mx-auto opacity-80 shadow-md" />
                <span className="text-[10px] font-extrabold text-slate-500 text-center tracking-wider">PURE</span>
              </div>

              {/* Card 2: ACTIVE MULTI-SURFACE */}
              <div className="w-40 h-64 sm:w-52 sm:h-72 bg-white rounded-3xl shadow-2xl border border-white p-5 flex flex-col justify-between z-10 scale-105 hover:-translate-y-3 hover:scale-108 transition-all duration-300">
                <div className="flex justify-between items-center text-slate-400 text-[8px] font-mono tracking-widest">
                  <span className="bg-emerald-500 text-white font-sans text-[7px] px-1.5 py-0.5 rounded font-extrabold">BEST</span>
                  <span>30 Sponges</span>
                </div>
                <div className="w-16 h-28 sm:w-20 sm:h-36 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-lg mx-auto shadow-md" />
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight">COMFORT</span>
                  <span className="text-[9px] text-blue-600 font-bold block mt-0.5">Primary Care Bath</span>
                </div>
              </div>

              {/* Card 3: HEAVY SHIELD */}
              <div className="w-36 h-56 sm:w-44 sm:h-64 bg-white rounded-3xl shadow-2xl border border-white p-4 flex flex-col justify-between transform rotate-6 hover:-translate-y-2 hover:rotate-[4deg] transition-all duration-300">
                <div className="flex justify-between items-center text-slate-400 text-[8px] font-mono tracking-widest">
                  <span>SHIELD</span>
                  <span>20 Sponges</span>
                </div>
                <div className="w-12 h-24 sm:w-16 sm:h-32 bg-gradient-to-b from-slate-400 to-slate-600 rounded-lg mx-auto opacity-80 shadow-md" />
                <span className="text-[10px] font-extrabold text-slate-500 text-center tracking-wider">CALM</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
