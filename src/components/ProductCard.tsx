import React from "react";
import { Star, ShieldAlert, Heart, Calendar, ArrowRight, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: (id: string) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export default function ProductCard({ 
  product, 
  onViewDetails, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}: ProductCardProps) {
  // Extract custom color states for border lines
  const borderHighlight = product.name === "PURE" 
    ? "border-brand-navy/10" 
    : product.name === "CALM" 
    ? "border-brand-sage/40" 
    : product.name === "SHIELD" 
    ? "border-[#14263F]/25" 
    : "border-brand-cream/60";

  return (
    <div className={`relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border ${borderHighlight} flex flex-col group`}>
      
      {/* Category Ribbon / Stock Alert */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
        <span className="bg-brand-navy/95 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md shadow-sm">
          {product.categoryLabel}
        </span>
        
        {product.availability === "Low Stock" && (
          <span className="bg-red-50 text-red-600 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded flex items-center gap-1 border border-red-100">
            <ShieldAlert className="w-3 h-3" /> Only {product.stockCount} left
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-brand-navy/5 text-brand-navy/60 hover:text-red-400 shadow-sm transition-colors cursor-pointer"
        title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart className={`w-4.5 h-4.5 transition-transform duration-200 hover:scale-110 ${isWishlisted ? "fill-red-400 text-red-400" : ""}`} />
      </button>

      {/* Product Image representation / Canvas */}
      <div 
        className="h-64 relative overflow-hidden bg-gradient-to-b from-blue-50/10 to-slate-100/40 flex items-center justify-center cursor-pointer group-hover:bg-slate-50 transition-colors"
        onClick={() => onViewDetails(product.id)}
      >
        {/* Real Product Image as default */}
        <img 
          src={product.image} 
          alt={product.fullName} 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-20"
        />

        {/* Decorative Graphic Elements simulating medical-grade soft-pouch, showing on hover */}
        <div className={`absolute inset-6 rounded-xl ${product.colorScheme.primary} shadow-md border border-brand-navy/5 flex flex-col justify-between p-4 transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300`}>
          <div className="flex justify-between items-center text-brand-navy/50 text-[8px] font-mono tracking-widest">
            <span>SS POUCH</span>
            <span>{product.pouchSize}</span>
          </div>
          
          <div className="text-center py-2">
            <h4 className="font-serif font-black text-[#14263F] text-2xl tracking-tight">{product.fullName}</h4>
            <span className="text-[10px] tracking-wide text-brand-navy/60 uppercase">{product.tagline}</span>
          </div>

          <div className="flex justify-center gap-1.5 text-[8px] font-semibold text-emerald-600 border-t border-brand-navy/5 pt-2">
            <span>pH 5.5 Balanced</span>
            <span>&bull;</span>
            <span>Skin Respect Formula</span>
          </div>
        </div>
      </div>

      {/* Product Information Box */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-brand-navy">{product.rating}</span>
            <span className="text-[11px] text-brand-navy/40">({product.reviewsCount} verified reviews)</span>
          </div>

          {/* Title */}
          <h3 
            className="font-serif font-bold text-lg text-[#14263F] hover:text-brand-sage transition-colors cursor-pointer"
            onClick={() => onViewDetails(product.id)}
          >
            {product.fullName}
          </h3>

          {/* Scent & Formulation Description preview */}
          <p className="text-xs text-[#14263F]/55 font-mono"><b>Scent Profile:</b> {product.scent}</p>
          <p className="text-sm text-brand-navy/75 font-light line-clamp-2 h-10 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Call to Actions */}
        <div className="border-t border-[#14263F]/10 pt-4 mt-4 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-light text-[#14263F]/50">Rinse-Free Pouch</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[#14263F]/60 text-xs font-light">CAD</span>
              <span className="font-serif font-bold text-xl text-brand-navy">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails(product.id)}
              className="w-full text-xs font-bold text-brand-navy hover:text-brand-sage h-10 border border-brand-navy/15 hover:border-brand-sage rounded-full flex items-center justify-center gap-1 transition-all"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full h-10 bg-brand-navy text-[#F6F1E7] hover:bg-brand-sage hover:text-brand-navy text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
