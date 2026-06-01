import React, { useState } from "react";
import { ShoppingBag, Heart, Menu, X, Sparkles, MapPin } from "lucide-react";
import { CartItem } from "../types";

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  cart: CartItem[];
  wishlist: string[];
  setSelectedProductId?: (id: string) => void;
}

export default function Header({ currentView, setView, cart, wishlist, setSelectedProductId }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      {/* Top Banner with Vancouver location context for Local SEO */}
      <div className="bg-[#1e3a8a] text-blue-50 text-xs py-2.5 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 font-sans">
        <span className="flex items-center gap-1.5 font-medium tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-[#10b981]" /> Proudly Serving Vancouver & British Columbia, Canada
        </span>
        <span className="font-semibold tracking-wider text-[11px] uppercase opacity-90">
          Clinically Gentle. Emotionally Human. | Call: 604-834-1207
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick("home")}
          >
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-100 group-hover:scale-105 transition-all duration-300">
              <div className="w-4 h-4 bg-white rounded-full opacity-90 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
              </div>
            </div>
            <div>
              <span className="font-sans text-xl font-extrabold tracking-tight text-blue-950">
                SOLO<span className="text-blue-600">SCRUB</span>
              </span>
              <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-0.5 leading-none">
                Sleek Clean
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-9">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold tracking-tight transition-all duration-200 relative py-2 ${
                  currentView === item.id
                    ? "text-[#2563eb]"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {item.label}
                {currentView === item.id && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2.5px] bg-[#10b981] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Cart & Wishlist Controls */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavClick("shop")}
              className="text-slate-600 hover:text-[#10b981] transition-colors relative p-2"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-400 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick("cart")}
              className="flex items-center gap-2.5 px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-100 transition-all duration-300 group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-wider uppercase">Cart</span>
              <span className="bg-[#10b981] text-white font-bold text-xs px-2.5 py-0.5 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => handleNavClick("cart")}
              className="relative p-2 text-slate-700"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#10b981] text-white rounded-full text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 shadow-lg animate-fadeIn">
          <div className="px-3 pt-3 pb-8 space-y-1 text-center bg-white">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full px-4 py-3 text-base font-semibold tracking-tight rounded-xl ${
                  currentView === item.id
                    ? "text-[#2563eb] bg-blue-50/50"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-5 mt-5 border-t border-slate-100 flex justify-center gap-8">
              <button 
                onClick={() => handleNavClick("shop")}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                <Heart className="w-5 h-5 text-red-500" />
                Wishlist ({wishlist.length})
              </button>
              <button
                onClick={() => handleNavClick("cart")}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <ShoppingBag className="w-5 h-5 text-[#10b981]" />
                Cart ({cartCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
