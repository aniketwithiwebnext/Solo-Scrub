import React from "react";
import { Sparkles, Heart, Shield, Activity, MapPin, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn">
      
      {/* Editorial Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-brand-sage text-xs uppercase font-bold tracking-widest bg-brand-sage/10 px-3.5 py-1.5 rounded-full inline-block">
          Our Care Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-brand-navy leading-tight">
          How Caregiving Becomes Gentler, Simpler, and Dignified.
        </h1>
        <p className="font-sans text-brand-navy/70 text-lg sm:text-xl font-light leading-relaxed">
          Based in Vancouver, Solo Scrub represents the white space traditional medical companies ignore: high-grade clinical efficacy paired with true emotional warmth.
        </p>
      </div>

      {/* Two-Column Company Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-brand-sage">The Origin Story</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#14263F]">Born Out of Love & Necessity</h2>
          <div className="text-brand-navy/80 space-y-4 font-light text-sm sm:text-base leading-relaxed">
            <p>
              Solo Scrub was founded in Vancouver, British Columbia after our family found themselves caring for an aging patriarch. Bathing times, once a normal morning routine, transformed overnight into severe source of anxiety, dangerous drafts, and escalating conflict as cognitive decline advanced.
            </p>
            <p>
              When we searched for waterless solutions, we found nothing but freezing, chemical-heavy medical wipes or thin import polyester mesh scrubs that got cold instantly and left red abrasive lines on fragile skin.
            </p>
            <p>
              We decided caregivers and their loved ones deserved better. Working alongside Local BC dermatologists and geriatric nurse consultants, we designed a needle-punched cotton-soft sponge bath system that holds comforting steam warmth, respects the skin barrier, and infuses sensory comfort directly into care routines.
            </p>
          </div>
        </div>

        {/* Styled Visual Panel representation */}
        <div className="relative">
          <div className="absolute inset-0 bg-brand-cream rounded-3xl transform rotate-2 opacity-40 shadow-sm" />
          <div className="relative bg-white border border-[#14263F]/10 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center text-brand-cream">
              <Award className="w-6 h-6 text-brand-sage" />
            </div>
            <h3 className="font-serif text-brand-navy text-xl font-bold">The Solo Scrub Promise</h3>
            <blockquote className="border-l-4 border-brand-sage pl-4 py-1 italic text-brand-navy/75 text-sm sm:text-base leading-relaxed">
              “Every product Solo Scrub formulates must immediately communicate safety, absolute respect, and comfort. We do not design cold medical commodities; we build warm human care solutions.”
            </blockquote>
            <p className="text-xs text-brand-navy/60 font-semibold uppercase tracking-wider font-mono flex items-center gap-1.5 pt-2">
              <MapPin className="w-4 h-4 text-brand-sage" /> locally manufactured & managed in Vancouver, BC
            </p>
          </div>
        </div>
      </div>

      {/* Three Pillars of Dignity Grid */}
      <div className="space-y-8 pt-8 border-t border-[#14263F]/10">
        <div className="text-center space-y-2">
          <span className="text-[11px] text-[#9BAF9B] font-mono font-bold uppercase tracking-widest">Our Engineering DNA</span>
          <h2 className="font-serif text-[#14263F] text-2xl sm:text-3xl font-extrabold">The Four Pillars of Clinical Comfort</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Needle-Punched Softness",
              desc: "Cotton-soft sponges that holds warmth twice as long as competitor mesh and generates luxurious whipped foam without friction."
            },
            {
              icon: Shield,
              title: "Skin Respect Formula",
              desc: "Physiological pH 5.5 balanced, soap-free, utilizing gentle cleansers to preserve frail outer lipid barriers."
            },
            {
              icon: Activity,
              title: "Water-Activated Lather",
              desc: "Transforms instantly with a splash of warm water. No secondary rinse or towel dry cleanups required."
            },
            {
              icon: Heart,
              title: "Dignity-First Design",
              desc: "Custom medical grade packaging built with senior high-contrast layout, minimizing daily caregivers stress and patient resistance."
            }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white border border-[#14263F]/5 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-sage mx-auto">
                <item.icon className="w-5 h-5 text-brand-sage" />
              </div>
              <h4 className="font-serif text-brand-navy font-bold text-sm tracking-wide">{item.title}</h4>
              <p className="text-xs text-brand-navy/70 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Local Vancouver commitment Callout */}
      <div className="bg-brand-navy text-[#F6F1E7] p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage filter blur-[80px] opacity-15 rounded-full" />
        <div className="max-w-2xl space-y-6 relative z-10">
          <span className="text-brand-sage text-xs uppercase font-bold tracking-widest">Vancouver, Canada Pledge</span>
          <h2 className="font-serif text-white text-2xl sm:text-3xl font-black">Proudly Rooted in British Columbia</h2>
          <p className="text-xs sm:text-sm text-[#F6F1E7]/80 font-light leading-relaxed">
            By coordinating our formulation logistics, premium fiber sourcing, and customer care hub out of the Lower Mainland of Richmond and Vancouver, we guarantee swift 1-to-2 day local delivery directly to medical offices, spinal care centres, and private family homes. For custom wholesale solutions, caregiver inquiries, or general support, you can reach Solomon’s parent office at <b>604-834-1207</b>.
          </p>
        </div>
      </div>

    </div>
  );
}
