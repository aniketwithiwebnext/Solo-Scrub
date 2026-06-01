import React, { useState } from "react";
import { ArrowLeft, Star, Heart, Check, HelpCircle, Shield, ShoppingCart, RefreshCw, Award } from "lucide-react";
import { Product, CartItem, Review } from "../types";
import { REVIEWS } from "../productsData";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  cart: CartItem[];
}

export default function ProductDetailPage({
  product,
  onBack,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  cart
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "ingredients" | "reviews">("features");
  const [isFlipped, setIsFlipped] = useState(false);

  const productReviews = REVIEWS.filter((r) => 
    r.title.toLowerCase().includes(product.name.toLowerCase()) || 
    r.content.toLowerCase().includes(product.name.toLowerCase()) ||
    product.id === "solo-scrub-comfort" && r.id === "rev-1" ||
    product.id === "solo-scrub-pure" && r.id === "rev-2" ||
    product.id === "solo-scrub-shield" && r.id === "rev-4" ||
    product.id === "solo-scrub-calm" && r.id === "rev-1"
  );

  const formatReviewDate = (val: string) => {
    return new Date(val).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    alert(`Success: Added ${quantity} pouch(es) of ${product.fullName} to your shopping cart.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-sage transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Care Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Left Column: Visual Mockup Container (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-blue-50/10 to-slate-100/40 rounded-3xl p-8 border border-slate-100 flex flex-col items-center justify-center relative min-h-[460px] shadow-sm">
            
            {/* Stock status indicator */}
            <span className={`absolute top-4 left-4 z-20 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              product.availability === "In Stock" ? "bg-green-50 text-green-700 border border-green-100" : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}>
              {product.availability} ({product.stockCount} left)
            </span>

            {/* Interactive 3D Flip Card Container */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full max-w-[325px] h-[380px] cursor-pointer group"
              style={{ perspective: "1000px" }}
            >
              <div 
                className="w-full h-full relative transition-all duration-700 select-none pb-0"
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                {/* Front Side: Real Product Image */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img 
                    src={product.image} 
                    alt={product.fullName} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle hover prompt overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                    <RefreshCw className="w-8 h-8 text-white animate-spin-slow mb-2" />
                    <span className="text-xs font-bold tracking-wider uppercase">Click to view clinical packaging specs</span>
                  </div>
                </div>

                {/* Back Side: Simulated Clinical Bag */}
                <div 
                  className={`absolute inset-0 w-full h-full rounded-2xl ${product.colorScheme.primary} shadow-xl border border-brand-navy/10 flex flex-col justify-between p-6`}
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div className="flex justify-between text-[8px] font-mono tracking-widest text-[#14263F]/50">
                    <span>SOLO SCRUB CLINICAL</span>
                    <span>{product.pouchSize}</span>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#9BAF9B]">{product.headline}</span>
                    <h3 className="font-serif font-black text-brand-navy text-3xl mt-1">{product.fullName}</h3>
                    <p className="text-xs text-brand-navy/80 italic mt-1.5">“{product.tagline}”</p>
                  </div>

                  <div className="space-y-2 border-t border-brand-navy/5 pt-4 text-[9px] font-medium text-brand-navy/70 leading-relaxed">
                    {product.benefitStack.slice(0, 3).map((item, id) => (
                      <p key={id} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>

                  <div className="border-t border-brand-navy/5 pt-3 flex justify-between items-center text-[8px] text-brand-navy/40 font-mono">
                    <span>BC STANDARD</span>
                    <span>pH 5.5 CLINICALLY BALANCED</span>
                  </div>
                  {/* Hover prompt */}
                  <div className="absolute inset-x-0 bottom-2 text-center text-[7px] text-brand-navy/40 uppercase font-black tracking-wide">
                    Click to view product photo
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#2563eb] rounded-lg transition-colors text-xs font-bold font-sans cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? "Show Product Photo" : "Show Packaging Specs"}</span>
            </button>
          </div>
          
          <p className="text-[11px] text-slate-400 text-center font-medium font-sans">
            <b>Product Visualization:</b> {product.heroImageDesc}
          </p>
        </div>

        {/* Right Column: Specification details (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Brand positioning row */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[#9BAF9B] text-xs font-bold tracking-widest uppercase block">{product.categoryLabel}</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-navy mt-1 leading-tight">{product.fullName}</h1>
              </div>
              
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-3 rounded-full bg-[#14263F]/5 text-brand-navy hover:text-red-500 hover:bg-red-50/50 transition-colors"
                title={isWishlisted ? "Saved" : "Save Draft"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-400 text-red-400" : ""}`} />
              </button>
            </div>

            {/* Custom clinical claim rating */}
            <div className="flex flex-wrap items-center gap-4 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-brand-navy">{product.rating} / 5</span>
              </div>
              <span className="text-[#14263F]/40">|</span>
              <span className="text-xs font-semibold text-brand-sage uppercase tracking-wider">Approved Clinical Formula</span>
              <span className="text-[#14263F]/40">|</span>
              <span className="text-xs text-brand-navy/60 font-mono">{product.pouchSize} per package</span>
            </div>

            {/* Price section */}
            <div className="bg-brand-cream/25 border border-brand-cream border-l-4 border-l-brand-sage p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-navy/55 block font-light">Price per package</span>
                <span className="font-serif font-black text-2xl text-brand-navy">${product.price.toFixed(2)} <span className="text-xs font-semibold font-sans text-brand-navy/60">CAD</span></span>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-700 font-bold block">✓ Local Express Shipping</span>
                <span className="text-[10px] text-brand-navy/50">Shipped direct from Richmond, BC hub</span>
              </div>
            </div>

            {/* Headline and core promise */}
            <div className="space-y-2">
              <p className="text-sm font-mono text-brand-sage font-bold uppercase tracking-wider">{product.headline}</p>
              <h3 className="font-serif text-lg font-semibold text-brand-navy leading-relaxed">{product.corePromise}</h3>
              <p className="font-sans text-sm sm:text-base text-brand-navy/75 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Benefit Bullets checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#FFFFFF] rounded-2xl border border-brand-navy/5">
              {product.benefitStack.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#14263F]/5 flex items-center justify-center text-brand-sage shrink-0">
                    <Check className="w-3 h-3 text-brand-sage font-bold" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-brand-navy">{b}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Add-to-cart controller */}
          <div className="border-t border-[#14263F]/10 pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              
              <div className="flex items-center border border-brand-navy/15 rounded-full overflow-hidden bg-white w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 hover:bg-brand-cream/30 text-brand-navy font-bold transition-all text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-5 text-sm font-bold text-brand-navy font-mono min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(20, quantity + 1))}
                  className="px-4 py-2.5 hover:bg-brand-cream/30 text-brand-navy font-bold transition-all text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full sm:flex-1 py-3.5 px-6 bg-brand-navy text-[#F6F1E7] hover:bg-brand-sage hover:text-brand-navy font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingCart className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                <span>Add {quantity} Pack(s) to Basket &bull; ${(product.price * quantity).toFixed(2)} CAD</span>
              </button>

            </div>

            <div className="flex justify-between items-center text-xs text-brand-navy/60 font-light px-2 pt-1 gap-2 flex-wrap">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-brand-sage" /> Soap-free gentle lipids</span>
              <span className="flex items-center gap-1"><RefreshCw className="w-4 h-4 text-brand-sage animate-spin-slow" /> 100% Satisfaction Guarantee</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4 text-brand-sage" /> High-contrast clinical packaging</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs section: Science story, ingredients list, and verified reviews */}
      <div className="border-t border-[#14263F]/10 pt-10">
        <div className="flex border-b border-[#14263F]/10 mb-8 overflow-x-auto gap-1 sm:gap-4 scrollbar-none">
          {[
            { id: "features", label: "Product Features & Science" },
            { id: "ingredients", label: "Skin-Respect Ingredients" },
            { id: "reviews", label: `Verified Reviews (${productReviews.length || 0})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-serif text-sm tracking-wide border-b-2 font-medium transition-all shadow-none shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "border-brand-sage text-brand-navy font-bold"
                  : "border-transparent text-[#14263F]/60 hover:text-brand-navy"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content 1: Features & Science */}
        {activeTab === "features" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 border border-brand-navy/5 space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-navy border-b border-brand-navy/10 pb-2">{product.backOfPackHeadline}</h3>
              <p className="text-[#14263F]/75 font-light leading-relaxed text-sm md:text-base">
                {product.backOfPackCopy}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {product.features.map((f, i) => (
                <div key={i} className="p-5 border border-brand-navy/5 rounded-2xl bg-[#FFFFFF] hover:border-brand-sage/50 transition-colors">
                  <h4 className="font-serif font-bold text-base text-brand-navy mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-sage" />
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-navy/70 leading-relaxed font-light">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab content 2: Ingredients */}
        {activeTab === "ingredients" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 border border-brand-navy/5 space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-navy">Core Ingredient Safety System</h3>
              <p className="text-xs text-brand-navy/55 uppercase tracking-wider font-mono">Formula Scent Profile: {product.scent}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="p-3 bg-[#FBF9F6] border border-[#14263F]/5 rounded-xl flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-sage shrink-0" />
                    <span className="text-xs font-semibold text-brand-navy leading-relaxed">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-brand-cream/20 border border-brand-cream rounded-xl">
              <h4 className="font-serif text-brand-navy font-bold text-sm mb-1.5 flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-brand-sage" /> What does pH 5.5 Balanced mean for seniors?</h4>
              <p className="text-xs text-brand-navy/70 font-light leading-relaxed">
                As skin ages (or undergoes surgery), its outer acid mantle weakens, raising the skin's pH closer to neutral. This breakdown induces intense dryness, vulnerable micro-tears, and infection portals. By maintaining an exact formulation of pH 5.5 buffered with natural lactic acid, Solo Scrub respects this barrier defense, ensuring friction-free sponge baths without raw irritation.
              </p>
            </div>
          </div>
        )}

        {/* Tab content 3: Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-fadeIn">
            {productReviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-brand-navy/5">
                <Star className="w-8 h-8 text-brand-navy/20 mx-auto mb-2" />
                <p className="text-sm font-semibold text-brand-navy">No reviews recorded yet for this segment.</p>
                <p className="text-xs text-brand-navy/50 mt-1">Be the first to review your Solo Scrub purchase!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {productReviews.map((r) => (
                  <div key={r.id} className="p-5 bg-white rounded-2xl border border-brand-navy/5 space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-mono text-[#9BAF9B] tracking-wider block">{formatReviewDate(r.date)}</span>
                        <h4 className="font-serif font-bold text-brand-navy text-base mt-0.5">{r.title}</h4>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-brand-navy/75 leading-relaxed font-light">{r.content}</p>
                    <div className="flex items-center gap-1.5 pt-1.5 text-xs text-brand-sage font-medium">
                      <div className="w-4 h-4 rounded-full bg-brand-sage/15 text-brand-sage flex items-center justify-center text-[10px] font-bold">✓</div>
                      <span>Verified Solo Scrub Caregiver ({r.author})</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
