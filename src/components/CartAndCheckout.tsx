import React, { useState } from "react";
import { ShoppingBag, ArrowRight, Trash2, Tag, Percent, ShieldCheck, CreditCard, CheckCircle, Truck, Info, Phone } from "lucide-react";
import { CartItem, Product, OrderSummary } from "../types";

interface CartAndCheckoutProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  setView: (view: string) => void;
}

export default function CartAndCheckout({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setView
}: CartAndCheckoutProps) {
  const [couponCode, setCouponCode] = useState("");
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; value: number; type: "fixed" | "percent" } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Checkout Form Details
  const [shippingName, setShippingName] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("Vancouver");
  const [shippingProvince, setShippingProvince] = useState("BC");
  const [shippingPostal, setShippingPostal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; user: string } | null>(null);

  // Math Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (activeDiscount) {
    if (activeDiscount.type === "fixed") {
      discountAmount = activeDiscount.value;
    } else {
      discountAmount = (subtotal * activeDiscount.value) / 100;
    }
  }

  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  // PST is 7%, GST is 5% in BC. Sponges are taxed standard.
  const PST_RATE = 0.07;
  const GST_RATE = 0.05;
  const combinedTaxRate = PST_RATE + GST_RATE; // 12% BC combined
  const taxAmount = subtotalAfterDiscount * combinedTaxRate;

  // Free shipping over $50, otherwise $5.99 CAD flat local courier
  const shippingCost = subtotalAfterDiscount >= 50 || subtotal === 0 ? 0 : 5.99;
  const totalAmount = subtotalAfterDiscount + taxAmount + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = couponCode.trim().toUpperCase();
    if (code === "VANCOUVER") {
      setActiveDiscount({ code: "VANCOUVER", value: 5.0, type: "fixed" });
      setCouponSuccess("✓ Local coupon applied! Save $5.00 CAD off your purchase.");
    } else if (code === "CARING") {
      setActiveDiscount({ code: "CARING", value: 10.0, type: "percent" });
      setCouponSuccess("✓ Compassion coupon applied! 10% discount subtracted from your subtotal.");
    } else {
      setCouponError("Invalid promo code. Try 'VANCOUVER' or 'CARING'");
    }
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setActiveDiscount(null);
    setCouponSuccess("");
    setCouponError("");
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingEmail || !shippingAddress || !shippingPostal || !shippingPhone) {
      alert("Please complete all shipping address fields and your phone number for BC tracking.");
      return;
    }

    if (paymentMethod === "stripe" && cardNumber.length < 12) {
      alert("Please input a valid card details credential.");
      return;
    }

    const orderId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccess({ orderId, user: shippingName });
    onClearCart();
  };

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-brand-sage mx-auto border-2 border-brand-sage/20">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <span className="text-[#9BAF9B] text-xs font-bold tracking-widest uppercase">Thank you for your trust</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-navy">Order Placed Successfully!</h1>
          <p className="text-sm text-brand-navy/60 font-mono">Invoice Number: <b className="text-brand-navy">{orderSuccess.orderId}</b></p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-brand-navy/5 max-w-md mx-auto text-left space-y-4">
          <h4 className="font-serif font-bold text-base text-brand-navy border-b border-brand-navy/10 pb-2">Richmond Fulfilment Details</h4>
          <p className="text-xs sm:text-sm text-brand-navy/80 font-light leading-relaxed">
            Dear <b>{orderSuccess.user}</b>, your Solo Scrub order has been registered at our local BC warehouse. 
            Estimated delivery to your Vancouver address is <b>1 to 2 business days</b> via local courier.
          </p>
          <div className="p-3 bg-brand-cream/20 text-brand-navy rounded-lg text-xs leading-relaxed">
            We will email a tracking link to your registered inbox. If you have immediate care questions, do not hesitate to reach us at <b>604-834-1207</b>.
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setView("shop")}
            className="px-6 py-3 bg-brand-navy text-[#F6F1E7] hover:bg-brand-sage hover:text-brand-navy font-bold rounded-full shadow-md text-sm transition-all cursor-pointer"
          >
            Return to Care Catalog
          </button>
          <button
            onClick={() => setView("home")}
            className="px-6 py-3 bg-white hover:bg-brand-light-cream text-brand-navy font-semibold border border-brand-navy/15 rounded-full text-sm transition-all"
          >
            Home Overview
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 bg-[#14263F]/5 rounded-full flex items-center justify-center text-brand-sage mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-brand-navy">Your Basket is Empty</h2>
          <p className="text-sm text-brand-navy/60 font-light leading-relaxed">
            Choose from our specialized post-op, dementia care, skin respect, or caregiver comfort sponges to begin.
          </p>
        </div>
        <button
          onClick={() => setView("shop")}
          className="px-6 py-3 bg-brand-navy text-[#F6F1E7] hover:bg-brand-sage hover:text-brand-navy font-bold rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
        >
          <span>Shop Specialized Pouches</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <h1 className="font-serif text-3xl font-bold text-[#14263F] mb-8">Shopping Basket & Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Cart items and Shipping validation (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Cart items list */}
          <div className="bg-white rounded-2xl p-6 border border-brand-navy/5 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-brand-navy border-b border-[#14263F]/10 pb-3">Selected Items ({cart.length})</h2>
            
            <div className="divide-y divide-[#14263F]/5 space-y-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 pt-6 first:pt-0 items-start sm:items-center">
                  
                  {/* Visual block */}
                  <div className={`w-20 h-24 rounded-xl ${item.product.colorScheme.primary} border border-brand-navy/5 flex-shrink-0 flex flex-col justify-between p-2 text-center relative`}>
                    <span className="text-[6px] font-mono tracking-widest text-[#14263F]/40">SOLO</span>
                    <span className="font-serif font-black text-xs text-brand-navy leading-none">{item.product.name}</span>
                    <span className="text-[6px] text-brand-navy/50">{item.product.pouchSize.split(" ")[0]} Sponges</span>
                  </div>

                  {/* Text attributes */}
                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-brand-navy">{item.product.fullName}</h4>
                    <p className="text-xs text-brand-navy/50 font-mono italic">{item.product.pouchSize} per pouch</p>
                    <p className="text-xs font-semibold text-brand-sage uppercase tracking-wider">{item.product.categoryLabel}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-brand-navy/15 bg-brand-light-cream/40 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-brand-navy font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold font-mono text-brand-navy">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, Math.min(20, item.quantity + 1))}
                        className="px-2 py-1 text-brand-navy font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-serif font-bold text-sm text-[#14263F]">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                        title="Delete items"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Checkout shipping address details form */}
          <div className="bg-white rounded-2xl p-6 border border-brand-navy/5 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-brand-navy border-b border-[#14263F]/10 pb-3 flex items-center gap-1.5">
              <Truck className="w-5 h-5 text-brand-sage" /> Vancouver Local Shipping Address
            </h2>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">Receiver Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="Recipient Full Name"
                    className="w-full bg-brand-light-cream/70 rounded-lg py-2.5 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">BC Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="e.g. 604-834-1207"
                    className="w-full bg-brand-light-cream/70 rounded-lg py-2.5 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">Street Address *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="e.g. 1055 Dunsmuir St"
                  className="w-full bg-brand-light-cream/70 rounded-lg py-2.5 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">City *</label>
                  <input
                    type="text"
                    required
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full bg-brand-light-cream/40 rounded-lg py-2.5 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">Province *</label>
                  <input
                    type="text"
                    required
                    disabled
                    value={shippingProvince}
                    className="w-full bg-brand-light-cream/40 rounded-lg py-2.5 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={shippingPostal}
                    onChange={(e) => setShippingPostal(e.target.value)}
                    placeholder="V6B 1A1"
                    className="w-full bg-brand-light-cream/70 rounded-lg py-2.5 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">Registered Email Address *</label>
                <input
                  type="email"
                  required
                  value={shippingEmail}
                  onChange={(e) => setShippingEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-brand-light-cream/70 rounded-lg py-2.5 px-3.5 text-sm text-brand-navy border border-brand-navy/10 focus:outline-none focus:ring-1 focus:ring-brand-sage"
                />
              </div>

              {/* Secure payment method configuration */}
              <div className="border-t border-brand-navy/10 pt-6 space-y-4">
                <h3 className="font-serif font-bold text-sm text-[#14263F] uppercase tracking-wider">Simulated Payment Integration</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("stripe")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer ${
                      paymentMethod === "stripe" 
                        ? "border-brand-navy bg-brand-navy/5 text-brand-navy" 
                        : "border-brand-navy/10 bg-white text-brand-navy/60"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Secure Card (Stripe proxy)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer ${
                      paymentMethod === "paypal" 
                        ? "border-brand-navy bg-brand-navy/5 text-brand-navy" 
                        : "border-brand-navy/10 bg-white text-brand-navy/60"
                    }`}
                  >
                    <Percent className="w-4 h-4" /> PayPal Express
                  </button>
                </div>

                {paymentMethod === "stripe" ? (
                  <div className="p-4 bg-[#FBF9F6] border border-brand-navy/5 rounded-xl space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-brand-navy uppercase">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white rounded-lg py-2 px-3 text-sm border focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-navy uppercase">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white rounded-lg py-2 px-3 text-sm border focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-navy uppercase">CVC</label>
                        <input
                          type="password"
                          placeholder="123"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value)}
                          className="w-full bg-white rounded-lg py-2 px-3 text-sm border focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#FBF9F6] border border-brand-navy/5 rounded-xl text-center text-xs text-brand-navy/70 font-light leading-relaxed">
                    You will be directed to PayPal window popup to execute authentic token confirmation upon clicking submit order.
                  </div>
                )}
              </div>

              {/* Submit Checkout button */}
              <button
                type="submit"
                className="w-full py-4 bg-brand-navy hover:bg-brand-sage text-[#F6F1E7] hover:text-brand-navy font-bold uppercase tracking-wider text-sm rounded-full shadow-lg transition-transform hover:scale-101 cursor-pointer"
              >
                Execute Order &bull; ${totalAmount.toFixed(2)} CAD
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Order Calculation summary (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Detailed Calculations summary */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-brand-navy/10 shadow-sm space-y-6">
            <h3 className="font-serif font-black text-brand-navy text-lg border-b border-[#14263F]/10 pb-3">Order Summary</h3>
            
            <div className="space-y-3.5 text-sm text-brand-navy">
              <div className="flex justify-between font-light">
                <span>Subtotal ({cart.length} item pouches)</span>
                <span>${subtotal.toFixed(2)} CAD</span>
              </div>

              {activeDiscount && (
                <div className="flex justify-between text-brand-sage font-medium">
                  <span className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5" /> Coupon ({activeDiscount.code})
                  </span>
                  <span>-${discountAmount.toFixed(2)} CAD</span>
                </div>
              )}

              <div className="flex justify-between font-light">
                <span className="flex items-center gap-1">
                  BC Sales Tax <span className="text-[10px] text-brand-navy/40 font-mono">(5% GST + 7% PST)</span>
                </span>
                <span>${taxAmount.toFixed(2)} CAD</span>
              </div>

              <div className="flex justify-between font-light items-center">
                <span>Shipping Cost</span>
                <span>{shippingCost === 0 ? <span className="text-brand-sage font-bold">FREE</span> : `$${shippingCost.toFixed(2)} CAD`}</span>
              </div>

              {shippingCost > 0 && (
                <p className="text-[10px] text-brand-navy/50 bg-brand-cream/15 p-2 rounded leading-relaxed">
                  💡 Tip: Add <b>${(50 - subtotalAfterDiscount).toFixed(2)} CAD</b> more and unlock <b>Free Shipping</b> anywhere in Vancouver limit!
                </p>
              )}

              <div className="border-t border-[#14263F]/10 pt-4 mt-4 flex justify-between items-baseline">
                <span className="font-serif font-bold text-base text-brand-navy">Grand Total</span>
                <span className="font-serif font-black text-2xl text-brand-navy">${totalAmount.toFixed(2)} CAD</span>
              </div>
            </div>
          </div>

          {/* Promotional coupon form */}
          <div className="bg-white rounded-2xl p-6 border border-brand-navy/5 shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-navy flex items-center gap-1"><Tag className="w-4 h-4 text-brand-sage" /> Coupon Discount Voucher</h4>
            
            {!activeDiscount ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Try VANCOUVER or CARING"
                  className="flex-1 bg-brand-light-cream/70 rounded-full py-2.5 px-4 text-xs font-mono text-brand-navy border border-brand-navy/10 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-navy text-[#F6F1E7] rounded-full text-xs font-bold hover:bg-brand-sage hover:text-brand-navy transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="p-3 bg-brand-sage/10 text-brand-navy rounded-xl flex items-center justify-between text-xs font-medium">
                <span>Active Voucher: <b>{activeDiscount.code}</b></span>
                <button 
                  onClick={handleRemoveCoupon} 
                  className="text-red-500 font-bold hover:underline py-0 bg-transparent shadow-none hover:bg-transparent"
                >
                  Remove
                </button>
              </div>
            )}

            {couponError && <p className="text-xs text-red-500 font-medium">{couponError}</p>}
            {couponSuccess && <p className="text-xs text-brand-sage font-medium">{couponSuccess}</p>}
          </div>

          {/* Secure assurances banner */}
          <div className="p-4 rounded-2xl bg-brand-cream/15 border border-brand-cream space-y-2 text-center">
            <ShieldCheck className="w-6 h-6 text-brand-sage mx-auto" />
            <h4 className="font-serif text-brand-navy font-bold text-xs">Caregiver Assurance Guarantee</h4>
            <p className="text-[10px] text-brand-navy/70 leading-relaxed font-light">
              Your hygiene transaction utilizes SSL secure tokens. We do not store financial keys. Under Vancouver corporate registry Solo Scrub complies fully with local consumer safety guarantees.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
