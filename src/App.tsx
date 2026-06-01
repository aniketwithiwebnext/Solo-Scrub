import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUp, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Check, 
  MailCheck, 
  Activity, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  ShoppingBag,
  Clock,
  ThumbsUp
} from "lucide-react";

// Components imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import ProductDetailPage from "./components/ProductDetailPage";
import CartAndCheckout from "./components/CartAndCheckout";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ChatbotWidget from "./components/ChatbotWidget";

// Static Data imports
import { PRODUCTS, REVIEWS } from "./productsData";
import { Product, CartItem } from "./types";

export default function App() {
  const [view, setView] = useState<string>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Floating Actions Scroll To Top Logic
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Shop Page States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operation
  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId);

  // Route back on detail interaction
  const handleViewProductDetails = (id: string) => {
    setSelectedProductId(id);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Newsletter subscription simulation
  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
  };

  // Filtered/Sorted Products lists for Shop Page
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.scent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "popular") return b.rating - a.rating;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  // Inject dynamic JSON-LD Local business SEO markup
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Solo Scrub",
      "alternateName": "Solo Scrub Cleansing Sponges",
      "description": "Premium patient care & caregiver comforting water-activated sponge bath systems proudly engineered in Vancouver, BC.",
      "url": "https://iwebnext.com",
      "telephone": "+1-604-834-1207",
      "email": "ssolomon12@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 49.2827,
        "longitude": -123.1207
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      "sameAs": [
        "https://iwebnext.com"
      ]
    };

    const scriptId = "solo-scrub-seo-schema";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("id", scriptId);
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schema);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 relative font-sans">
      
      {/* Header Container */}
      <Header 
        currentView={view} 
        setView={setView} 
        cart={cart} 
        wishlist={wishlist}
        setSelectedProductId={setSelectedProductId}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20 pb-20"
            >
              {/* Hero Banner Component */}
              <Hero setView={setView} />

              {/* Quick Stats / Trust Bar */}
              <section className="bg-slate-950 text-white py-12 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 items-center">
                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <span className="text-[#10b981] text-3xl font-extrabold">4.9/5</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Average Patient Rating</span>
                  </div>
                  <div className="hidden md:block h-10 w-px bg-slate-800 self-center justify-self-center"></div>
                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <span className="text-white text-3xl font-extrabold animate-pulse">100%</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Biodegradable Cloths</span>
                  </div>
                  <div className="hidden md:block h-10 w-px bg-slate-800 self-center justify-self-center"></div>
                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <span className="text-white text-3xl font-extrabold">24HR</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Metro Van Delivery</span>
                  </div>
                  <div className="hidden md:block h-10 w-px bg-slate-800 self-center justify-self-center"></div>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/15">
                      <ShieldCheck className="w-5.5 h-5.5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">Secure Checkout</p>
                      <p className="text-slate-500 text-[10px] font-medium font-mono">Stripe &amp; PayPal Active</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Specialized Care Selection Grid (Featured Sponges) */}
              <section className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
                  <span className="text-[11px] font-sans text-blue-600 font-extrabold uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full inline-block border border-blue-100">
                    The Solo Scrub Collection
                  </span>
                  <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
                    Expert Formulations for Dignified Baths
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    Designed to simplify demanding routines, preserve fragile outer lipids, and target exact clinical demands: Post-op, Dementia, Incontinence, and Everyday Family Care.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PRODUCTS.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onViewDetails={handleViewProductDetails}
                      onAddToCart={(prod) => {
                        handleAddToCart(prod);
                        alert(`Added pouch of ${prod.fullName} to your cart!`);
                      }}
                      isWishlisted={wishlist.includes(p.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              </section>

              {/* Competitive Advantages Story & Texture Showcases */}
              <section className="bg-brand-navy text-[#F6F1E7] py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <span className="text-brand-sage text-xs uppercase tracking-widest font-bold">Why Solo Scrub Outperforms</span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
                        Engineered to Eliminate Cruel Institutional Rubbing
                      </h2>
                      <p className="text-sm sm:text-base text-[#F6F1E7]/75 font-light leading-relaxed">
                        Competitors utilize thin plastic polyester mesh. During sponge baths, this coarse mesh scratches delicate, paper-thin senior skin, fails to contain heat, and turns cold in under half a minute.
                      </p>
                      
                      <div className="space-y-4 pt-2">
                        {[
                          { title: "Needle-Punched Warm Touch", text: "Holds luxurious micro-steam within soft fibers for deep prolonged heat." },
                          { title: "Lactic-Buffered Defense pH 5.5", text: "Respects acid mantle equilibrium to reject raw dry peeling." },
                          { title: "SCI Soap-Free Cleansing System", text: "No artificial dyes, harsh sodium sulfates, or alcohol sting." }
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="w-5 h-5 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center text-xs font-bold font-mono mt-0.5">✓</span>
                            <div>
                              <h4 className="text-xs font-mono tracking-wider font-extrabold uppercase text-brand-cream">{item.title}</h4>
                              <p className="text-xs text-[#F6F1E7]/60 mt-0.5">{item.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Creative Graphic Display of Sponges attributes */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { num: "Hold Warmth", label: "Holds warmth 2x longer", text: "Insulating needle-punched design holds deep therapeutic steam." },
                        { num: "0% Residue", label: "No soapy tacky residue", text: "Dermatologist-formulated soap-free lipids disappear completely." },
                        { num: "pH 5.5", label: "Skin respects mantle", text: "Keeps fragile skin safe from alkaline friction." },
                        { num: "No Sting", label: "No alcohol itch", text: "Buffered with colloidal oatmeal extract to soothe chafing." }
                      ].map((item, id) => (
                        <div key={id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                          <span className="font-serif font-black text-xl text-brand-sage leading-none block">{item.num}</span>
                          <h4 className="text-xs font-bold text-white mt-1.5 uppercase font-mono tracking-wider leading-none">{item.label}</h4>
                          <p className="text-[11px] text-[#F6F1E7]/50 mt-1 font-light leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </section>

              {/* Vancouver Local SEO Promotional Offer Banner */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#FFFFFF] border-l-4 border-l-brand-sage p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] tracking-widest font-black uppercase text-brand-sage block">Richmond BC Logistic Hub</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">Save $5.00 CAD on your initial checkout order!</h3>
                    <p className="text-xs sm:text-sm text-brand-navy/60 font-light max-w-xl leading-relaxed">
                      Enter checkout promotional voucher code <b className="font-mono text-brand-navy">VANCOUVER</b> in your transaction form to unlock digital savings instantly.
                    </p>
                  </div>
                  <button
                    onClick={() => setView("shop")}
                    className="px-6 py-3 bg-[#14263F] text-brand-cream hover:bg-[#9BAF9B] hover:text-brand-navy text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer"
                  >
                    Redeem Code &bull; Shop Now
                  </button>
                </div>
              </section>

              {/* Customer Testimonials section */}
              <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-brand-sage tracking-widest block">In Loving Caregivers Words</span>
                  <h2 className="font-serif text-[#14263F] text-2xl sm:text-3xl font-extrabold text-center">Bathing Safety Restored</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {REVIEWS.slice(0, 2).map((item) => (
                    <div key={item.id} className="p-6 bg-white border border-brand-navy/5 rounded-2xl shadow-sm space-y-3 relative flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex text-amber-400 gap-0.5">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <h4 className="font-serif font-bold text-brand-navy text-sm sm:text-base leading-tight">&ldquo;{item.title}&rdquo;</h4>
                        <p className="text-xs text-brand-navy/70 leading-relaxed font-light italic">
                          {item.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 border-t border-brand-navy/5 pt-3 mt-4 text-[11px] font-semibold text-brand-sage">
                        <span>✓ Verified Caregiver ({item.author})</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center pt-2">
                  <button
                    onClick={() => setView("shop")}
                    className="text-xs font-serif font-bold underline hover:text-brand-sage transition-colors text-brand-navy cursor-pointer"
                  >
                    View more caregiver reviews on detail specification tabs
                  </button>
                </div>
              </section>

              {/* Newsletter Subscription signup container */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-brand-cream/40 rounded-3xl p-8 sm:p-12 border border-brand-cream relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                  <div className="space-y-2 max-w-xl">
                    <h3 className="font-serif font-black text-2xl text-brand-navy">Learn Better Skin Care Management</h3>
                    <p className="text-xs sm:text-sm text-brand-navy/65 leading-relaxed font-light">
                      Register your email below to receive diagnostic skin guidelines, medical expert bathing tips, and exclusive B.C. resident product promotion codes. We never sell your credentials.
                    </p>
                  </div>

                  <div className="w-full max-w-md">
                    {newsletterSuccess ? (
                      <div className="p-4 bg-brand-sage/20 text-brand-navy rounded-xl border border-brand-sage/25 flex items-center justify-center gap-2 text-xs font-bold animate-fadeIn">
                        <MailCheck className="w-5 h-5 text-brand-sage shrink-0" />
                        <span>Welcome to our list! Your Vancouver care guidebook has been sent.</span>
                      </div>
                    ) : (
                      <form onSubmit={handleSubscribeNewsletter} className="flex flex-col sm:flex-row gap-2.5">
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Registered carer Email Address..."
                          className="flex-1 bg-[#FFFFFF] rounded-full py-3 px-4.5 text-xs text-brand-navy placeholder-[#14263F]/45 border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-brand-navy hover:bg-brand-sage text-[#F6F1E7] hover:text-brand-navy text-xs font-bold rounded-full cursor-pointer transition-colors"
                        >
                          Join Community
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* SHOP VIEW */}
          {view === "shop" && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
            >
              <div className="space-y-3 text-center sm:text-left">
                <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#14263F]">Specialized Cleansing Categories</h1>
                <p className="text-brand-navy/60 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                  Browse and filtering Solo Scrub clinical pouches to fulfill unique post-op, dementia care, incontinence, and family caregivers comfort routines.
                </p>
              </div>

              {/* Filtering, Search & Sorting Panel controls */}
              <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-brand-navy/5 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                  
                  {/* Search Bar */}
                  <div className="relative w-full lg:max-w-md">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-brand-navy/40" />
                    <input
                      type="text"
                      placeholder="Search formulas, scents, ingredients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-brand-light-cream/70 rounded-full py-2.5 pl-10 pr-4 text-xs font-medium placeholder-brand-navy/40 text-brand-navy border border-brand-navy/5 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    />
                  </div>

                  {/* Sorting controls */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <span className="text-xs text-brand-navy/60 flex items-center gap-1.5 font-light"><SlidersHorizontal className="w-3.5 h-3.5 text-brand-sage" /> Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-[#FBF9F6] text-xs font-semibold rounded-lg p-2 text-[#14263F] border border-[#14263F]/10 outline-none"
                    >
                      <option value="popular">Best Customer rating</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Categories filtering bar */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#14263F]/5">
                  {[
                    { id: "all", label: "All Formulations" },
                    { id: "family", label: "Comfort (Family Carers)" },
                    { id: "post-op", label: "Pure (Post-Operative)" },
                    { id: "incontinence", label: "Shield (Skin Barrier)" },
                    { id: "dementia", label: "Calm (Memory Assistance)" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4.5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                        selectedCategory === cat.id
                          ? "bg-brand-navy text-[#F6F1E7] font-bold shadow-sm"
                          : "bg-brand-light-cream hover:bg-brand-cream/35 text-brand-navy/70 hover:text-brand-navy"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Products Catalog Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-brand-navy/5">
                  <span className="text-xs font-bold text-brand-navy/40 uppercase block">No results matched</span>
                  <p className="text-sm text-brand-navy flex items-center gap-1.5 justify-center mt-2">Could not find any Solo Scrub formulas of that spec.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} 
                    className="text-xs text-brand-sage underline font-bold mt-4"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onViewDetails={handleViewProductDetails}
                      onAddToCart={(prod) => {
                        handleAddToCart(prod);
                        alert(`Added ${prod.fullName} to your basket.`);
                      }}
                      isWishlisted={wishlist.includes(p.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}

            </motion.div>
          )}

          {/* DYNAMIC PRODUCT DETAIL VIEW */}
          {view === "product" && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => setView("shop")}
              onAddToCart={(prod, qty) => {
                handleAddToCart(prod, qty);
              }}
              isWishlisted={wishlist.includes(selectedProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              cart={cart}
            />
          )}

          {/* ABOUT PAGE VIEW */}
          {view === "about" && (
            <AboutPage />
          )}

          {/* CONTACT PAGE VIEW */}
          {view === "contact" && (
            <ContactPage />
          )}

          {/* CART & CHECKOUT PAGE VIEW */}
          {view === "cart" && (
            <CartAndCheckout
              cart={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              setView={setView}
            />
          )}

        </AnimatePresence>
      </main>

      {/* Corporate Footer */}
      <Footer setView={setView} />

      {/* COMPASSIONATE AI CHATBOT WIDGET */}
      <ChatbotWidget />

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 left-6 z-50 p-4 bg-slate-900 text-white hover:bg-blue-600 hover:text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-white/10 flex items-center justify-center cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
