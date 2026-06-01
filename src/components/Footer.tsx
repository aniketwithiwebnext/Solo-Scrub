import React from "react";
import { Phone, Mail, MapPin, ShieldCheck, Award, Heart, Sparkles } from "lucide-react";

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-100 relative pt-16 pb-8 border-t-4 border-[#10b981]">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-[#10b981] to-blue-500" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-sans text-xl font-extrabold tracking-tight text-white">
                Solo Scrub
              </span>
            </div>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              We design clinically gentle, rinse-free sponge bath systems for post-operative recovery, dementia care, and dedicated family caregiving with dignity at heart.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-medium font-mono">
                <ShieldCheck className="w-4 h-4" />
                Dermatologist Tested
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-medium font-mono">
                <Award className="w-4 h-4" />
                pH 5.5 Balanced
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-sans font-bold uppercase tracking-wider text-xs mb-4 text-slate-400">
              Bathing Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-sans">
              <li>
                <button onClick={() => handleLinkClick("shop")} className="hover:text-blue-400 transition-all duration-150 text-left font-medium">
                  SOLO SCRUB COMFORT (Caregivers)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("shop")} className="hover:text-blue-400 transition-all duration-150 text-left font-medium">
                  SOLO SCRUB PURE (Post-Operative)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("shop")} className="hover:text-blue-400 transition-all duration-150 text-left font-medium">
                  SOLO SCRUB SHIELD (Skin Barrier)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("shop")} className="hover:text-blue-400 transition-all duration-150 text-left font-medium">
                  SOLO SCRUB CALM (Dementia Assistance)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-sans font-bold uppercase tracking-wider text-xs mb-4 text-slate-400">
              Corporate Overview
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-sans">
              <li>
                <button onClick={() => handleLinkClick("home")} className="hover:text-blue-400 transition-all font-medium">Home</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("shop")} className="hover:text-blue-400 transition-all font-medium">Care Catalog</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("about")} className="hover:text-blue-400 transition-all font-medium">Our Clinical Philosophy</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("contact")} className="hover:text-blue-400 transition-all font-medium">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Vancouver Local SEO Details */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold uppercase tracking-wider text-xs text-slate-400">
              Solo Scrub Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-slate-300 font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#10b981] shrink-0" />
                <span>Vancouver, British Columbia, Canada</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#10b981] shrink-0" />
                <a href="tel:604-834-1207" className="hover:text-blue-400 font-semibold">604-834-1207</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#10b981] shrink-0" />
                <a href="mailto:ssolomon12@gmail.com" className="hover:text-blue-400">ssolomon12@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Legal Required Statement */}
        <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <p>&copy; {currentYear} Solo Scrub Co. All rights reserved. Locally formulated and shipped from BC.</p>
          </div>
          <div className="flex items-center gap-4 font-normal">
            <span>Clinical Gentle Comfort Sponge Baths</span>
            <span>&bull;</span>
            <span className="font-semibold hover:text-[#FFFFFF] transition-colors">
              <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">
                Developed by iWebNext
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
