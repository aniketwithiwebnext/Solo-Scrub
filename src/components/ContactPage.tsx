import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, HelpCircle, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [segment, setSegment] = useState("general");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      
      {/* Page Title header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="text-brand-sage text-xs uppercase font-bold tracking-widest bg-brand-sage/10 px-3 py-1 rounded-full inline-block">
          Connect With Us
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#14263F]">
          Vancouver Headquarters & Care Consultation
        </h1>
        <p className="font-sans text-brand-navy/60 text-sm sm:text-base font-light leading-relaxed">
          Whether you are a professional geriatric nurse seeking wholesale sponges, a caregiver with skin barrier safety questions, or require immediate post-op shipping, we are here to support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-brand-navy/5 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#14263F] border-b border-[#14263F]/10 pb-3">Corporate Contact</h2>
            
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#14263F]/5 flex items-center justify-center text-brand-sage shrink-0">
                  <Phone className="w-5 h-5 text-brand-sage" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-navy uppercase font-mono">Bathing Hotline</h4>
                  <a href="tel:604-834-1207" className="text-sm sm:text-base font-bold text-[#14263F] hover:text-brand-sage block pt-0.5">
                    604-834-1207
                  </a>
                  <p className="text-xs text-brand-navy/50 font-light mt-0.5">Toll-free across British Columbia (Mon-Sun: 8am - 8pm PST)</p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#14263F]/5 flex items-center justify-center text-brand-sage shrink-0">
                  <Mail className="w-5 h-5 text-brand-sage" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-navy uppercase font-mono">Clinician Mail</h4>
                  <a href="mailto:ssolomon12@gmail.com" className="text-sm sm:text-base font-bold text-[#14263F] hover:text-brand-sage block pt-0.5">
                    ssolomon12@gmail.com
                  </a>
                  <p className="text-xs text-brand-navy/50 font-light mt-0.5">We respond within 4 hours to caregiving inquiries.</p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#14263F]/5 flex items-center justify-center text-brand-sage shrink-0">
                  <MapPin className="w-5 h-5 text-brand-sage" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-navy uppercase font-mono">Primary Warehouse</h4>
                  <span className="text-xs sm:text-sm font-bold text-[#14263F] block pt-0.5">
                    Vancouver, British Columbia, Canada
                  </span>
                  <p className="text-xs text-brand-navy/50 font-light mt-0.5">Lower Mainland fulfilment dispatch hub.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map layout representation */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-brand-navy/5 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-sm text-[#14263F] uppercase tracking-wider">B.C. Local Distribution Area Map</h3>
            
            {/* Elegant Map Mockup */}
            <div className="aspect-video bg-gradient-to-r from-brand-cream/40 to-brand-light-cream rounded-xl border border-brand-navy/5 relative overflow-hidden flex flex-col justify-center items-center text-center p-4">
              <div className="absolute top-4 left-4 bg-brand-navy text-white text-[9px] font-mono p-1 rounded uppercase">Vancouver BC</div>
              
              <div className="relative z-10 space-y-2">
                <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center animate-bounce text-brand-sage mx-auto">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <h4 className="font-serif font-bold text-[#14263F] text-xs leading-tight">Solo Scrub Vancouver</h4>
                <p className="text-[10px] text-brand-navy/60 font-light">49.2827&deg; N, 123.1207&deg; W</p>
                <p className="text-[9px] bg-brand-sage/20 text-brand-navy px-2 py-0.5 rounded-full inline-block font-mono max-w-[210px] mx-auto text-center font-bold">1-Day Service Area Activated</p>
              </div>

              {/* Styled Mock map background pattern lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10%" y1="0%" x2="50%" y2="100%" stroke="#14263F" strokeWidth="2" />
                  <line x1="0%" y1="40%" x2="100%" y2="80%" stroke="#14263F" strokeWidth="1" />
                  <line x1="80%" y1="0%" x2="20%" y2="100%" stroke="#14263F" strokeWidth="1.5" />
                  <circle cx="50%" cy="50%" r="50" fill="none" stroke="#9BAF9B" strokeWidth="3" strokeDasharray="5,5" />
                  <circle cx="30%" cy="70%" r="20" fill="none" stroke="#14263F" strokeWidth="1" />
                </svg>
              </div>
            </div>
            
            <p className="text-[10px] text-brand-navy/40 italic leading-relaxed text-center">
              *Map placeholder showing Vancouver metropolitan delivery radius. Standard Next-Day delivery options apply automatically upon checkout within the region.
            </p>
          </div>

        </div>

        {/* Right column: Interactive Form (7 Cols) */}
        <div className="lg:col-span-12 xl:col-span-7">
          <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-brand-navy/5 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#14263F] border-b border-[#14263F]/10 pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-sage" /> Submit Consultation Request
            </h2>

            {isSubmitted ? (
              <div className="p-8 text-center bg-brand-sage/10 rounded-2xl border border-brand-sage/20 space-y-4 max-w-md mx-auto">
                <CheckCircle className="w-12 h-12 text-brand-sage mx-auto" />
                <h3 className="font-serif font-bold text-[#14263F] text-lg">Thank You, {name}!</h3>
                <p className="text-xs sm:text-sm text-brand-navy/80 font-light leading-relaxed">
                  Your care request has been routed to our senior advisor queue. We will telephone you at <b>{phone || "(recorded)"}</b> or contact your inbox at <b>{email}</b> within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 border rounded-full text-xs font-semibold hover:bg-brand-light-cream text-brand-navy"
                >
                  Send another inquiries
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sandra Solomon"
                      className="w-full bg-brand-light-cream/70 rounded-lg py-3 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sandrasolomon@gmail.com"
                      className="w-full bg-brand-light-cream/70 rounded-lg py-3 px-3.5 text-sm text-[#14263F] border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Telephone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="604-834-1207"
                      className="w-full bg-brand-light-cream/70 rounded-lg py-3 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Formulation Area Of Interest</label>
                    <select
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      className="w-full h-[46px] bg-brand-light-cream/70 rounded-lg px-3 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none"
                    >
                      <option value="general">Help me choose optimal SKU</option>
                      <option value="comfort">COMFORT formula (Family Caregivers)</option>
                      <option value="pure">PURE formula (Fragrance-free Post-Op)</option>
                      <option value="shield">SHIELD formula (Barrier Incontinence)</option>
                      <option value="calm">CALM formula (Lavender Dementia Care)</option>
                      <option value="wholesale">Institutional Wholesale Sponges</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Bathing Concerns Or Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details of skin concerns or caregiver questions..."
                    className="w-full bg-brand-light-cream/70 rounded-lg py-3 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage resize-none"
                  />
                </div>

                <p className="text-[10px] text-[#14263F]/50 leading-relaxed font-light">
                  *By submitting this care advice contact, you consent to our Lower Mainland medical specialists calling or emailing with private, secure, dignity-centered cleansing follow-ups. We protect all inputs under local HIPAA/PIPEDA confidentiality definitions.
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy text-[#F6F1E7] hover:bg-brand-sage hover:text-brand-navy font-bold uppercase tracking-wider text-xs rounded-full shadow-md hover:scale-101 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Secure Request</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
