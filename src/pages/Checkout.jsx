import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Box, CheckCircle2, Loader2, ShoppingCart, Zap, FileText, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const finalTotal = total + shipping;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-[#FAF9F6] text-[#450a0a]">
        <SEO title="Empty Checkout | DominicPrinters" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="h-24 w-24 bg-white rounded-full border border-red-900/5 flex items-center justify-center mb-8 shadow-sm"
        >
             <ShoppingBag size={32} className="text-red-900/20" strokeWidth={1} />
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">Your bag is <span className="font-light italic text-red-900">empty</span></h2>
        <p className="text-[#7A7A75] text-sm font-light mb-10 text-center max-w-xs leading-relaxed">Please add some hardware to your selection before proceeding to checkout.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-[#450a0a] text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl shadow-red-900/20 active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Browse Catalog</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-jakarta bg-[#FAF9F6] text-center text-[#450a0a]">
        <SEO title="Order Confirmed | DominicPrinters" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-8">
          <div className="h-28 w-28 bg-red-50 text-red-600 flex items-center justify-center shadow-xl border border-red-100 rounded-full mx-auto">
            <CheckCircle2 size={48} strokeWidth={1} />
          </div>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-none uppercase text-[#450a0a]">Order <span className="font-black italic text-red-900/5">Confirmed</span></h1>
        <p className="text-[#7A7A75] font-light text-base mb-12 uppercase tracking-widest">Your hardware is being prepared for dispatch.</p>
        
        <div className="bg-white p-12 border border-red-900/5 mb-12 max-w-sm w-full rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)]">
          <p className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.3em] mb-3">Order Reference</p>
          <p className="text-3xl font-black text-[#450a0a] tracking-tighter">#{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/" className="group relative inline-flex items-center justify-center gap-6 bg-[#450a0a] text-white h-16 px-14 rounded-2xl overflow-hidden transition-all duration-500 shadow-xl shadow-red-900/20 active:scale-95">
          <span className="relative z-10 text-[12px] font-bold uppercase tracking-[0.3em]">Back to Home</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO title="Secure Checkout | DominicPrinters" />
      
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-16 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 border-b border-red-900/5 pb-12">
          <div className="flex flex-col items-start space-y-6">
            <Link to="/cart" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#450a0a]/40 hover:text-[#450a0a] transition-all group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Bag
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#450a0a] leading-[0.9]">
              Secure <span className="font-black italic text-red-900 whitespace-nowrap">Checkout</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className={cn("px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 border", step >= 1 ? "bg-[#450a0a] text-white border-[#450a0a] shadow-lg" : "bg-white text-[#450a0a]/20 border-red-900/5")}>
               01 Logistics
            </div>
            <div className="h-px w-8 bg-red-900/10" />
            <div className={cn("px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 border", step >= 2 ? "bg-[#450a0a] text-white border-[#450a0a] shadow-lg" : "bg-white text-[#450a0a]/20 border-red-900/5")}>
               02 Settlement
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
                  {/* Section 1: Email */}
                  <div className="space-y-10 bg-white p-10 md:p-16 rounded-[3.5rem] shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)] border border-red-900/5">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-red-900/20">Personal Information</span>
                      <div className="flex-1 h-px bg-red-900/5" />
                    </div>
                    <div className="space-y-4 group">
                       <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
                       <div className="relative">
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors">
                           <Mail size={18} strokeWidth={1.5} />
                         </div>
                         <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="ENTER EMAIL ADDRESS" className="w-full h-14 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10" />
                       </div>
                    </div>
                  </div>

                  {/* Section 2: Address */}
                  <div className="space-y-12 bg-white p-10 md:p-16 rounded-[3.5rem] shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)] border border-red-900/5">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-red-900/20">Shipping Logistics</span>
                      <div className="flex-1 h-px bg-red-900/5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4 group">
                         <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">First name</label>
                         <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="FIRST NAME" className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10 px-4 rounded-t-xl" />
                      </div>
                      <div className="space-y-4 group">
                         <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Last name</label>
                         <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="LAST NAME" className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10 px-4 rounded-t-xl" />
                      </div>
                    </div>
                    <div className="space-y-4 group">
                       <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Street Address</label>
                       <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="FULL DESTINATION ADDRESS" className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10 px-4 rounded-t-xl" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4 group">
                         <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">City</label>
                         <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="CITY" className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10 px-4 rounded-t-xl" />
                      </div>
                      <div className="space-y-4 group">
                         <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Zip Code</label>
                         <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP CODE" className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10 px-4 rounded-t-xl" />
                      </div>
                    </div>
                    <div className="space-y-4 group">
                       <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                       <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="CONTACT NUMBER" className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10 px-4 rounded-t-xl" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
                  <div className="space-y-12 bg-white p-10 md:p-16 rounded-[3.5rem] shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)] border border-red-900/5">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-red-900/20">Payment Selection</span>
                      <div className="flex-1 h-px bg-red-900/5" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-10 border rounded-[3rem] cursor-pointer transition-all duration-700 flex flex-col justify-between h-56 relative overflow-hidden",
                          formData.paymentMethod === 'cod' ? "border-[#450a0a] bg-white shadow-xl" : "border-red-900/5 bg-[#FAF9F6] hover:border-[#450a0a]/20 shadow-sm"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-[#450a0a] bg-[#450a0a]" : "border-red-900/20")}>
                            {formData.paymentMethod === 'cod' && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                          <Truck size={32} strokeWidth={1} className={cn("transition-colors", formData.paymentMethod === 'cod' ? "text-red-600" : "text-red-900/20")} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-bold text-[#450a0a] uppercase tracking-tight leading-none">Pay on Delivery</h4>
                           <p className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em]">Flexible settlement upon hardware arrival</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-10 border rounded-[3rem] cursor-pointer transition-all duration-700 flex flex-col justify-between h-56 relative overflow-hidden",
                          formData.paymentMethod === 'paypal' ? "border-[#450a0a] bg-white shadow-xl" : "border-red-900/5 bg-[#FAF9F6] hover:border-[#450a0a]/20 shadow-sm"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-[#450a0a] bg-[#450a0a]" : "border-red-900/20")}>
                            {formData.paymentMethod === 'paypal' && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                          <div className={cn("transition-colors", formData.paymentMethod === 'paypal' ? "opacity-100" : "opacity-30 grayscale")}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-bold text-[#450a0a] uppercase tracking-tight leading-none">Secure Digital</h4>
                           <p className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em]">Instant encrypted gateway transaction</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-10 pt-10">
                          <div className="p-12 bg-[#FAF9F6] border border-red-900/5 rounded-[3rem] text-center space-y-6 shadow-inner">
                            <ShieldCheck className="mx-auto text-red-600" size={40} strokeWidth={1} />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#450a0a]/40">High-Security Gateway Active</p>
                            <div className="max-w-xs mx-auto">
                              <PayPalButtons 
                                style={{ layout: "vertical", shape: "pill", label: "pay" }}
                                createOrder={(data, actions) => {
                                  return actions.order.create({
                                    purchase_units: [{ amount: { value: finalTotal.toString() }, description: `DominicPrinters - Order Checkout` }],
                                  });
                                }}
                                onApprove={async (data, actions) => {
                                  try {
                                    const details = await actions.order.capture();
                                    await handleOrderSuccess(details);
                                  } catch (err) { alert("Payment failed. Please try again."); }
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-12 flex flex-col items-center gap-8 mt-8">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="group relative h-16 px-24 bg-[#450a0a] text-white rounded-2xl flex items-center justify-center gap-6 text-[12px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-red-900/20 active:scale-95 disabled:opacity-50 w-full md:w-auto overflow-hidden"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <span className="relative z-10 flex items-center gap-4">
                      {step === 1 ? 'Confirm Logistics' : 'Finalize Settlement'}
                      <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-[#450a0a]/40 hover:text-[#450a0a] uppercase tracking-[0.3em] transition-all flex items-center gap-3 group/back">
                   <ChevronLeft size={16} className="group-hover/back:-translate-x-1 transition-transform text-red-900/40" /> Back to Logistics
                </button>
              )}
            </div>
          </div>

          {/* --- SUMMARY SIDEBAR: GLASS CANVAS --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px]">
            <div className="bg-white border border-red-900/5 p-10 rounded-[3.5rem] space-y-12 shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)]">
              <div className="space-y-10">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-900/20 border-b border-red-900/5 pb-4 inline-block">Order Manifest</h3>
                 <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-6 group/item">
                        <div className="h-20 w-20 bg-[#FAF9F6] flex items-center justify-center p-4 shrink-0 border border-red-900/5 rounded-2xl overflow-hidden relative group-hover/item:bg-white group-hover/item:shadow-lg transition-all">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center space-y-1">
                          <h4 className="text-[13px] font-bold text-[#450a0a] uppercase tracking-tight truncate leading-tight">{item.name}</h4>
                          <p className="text-[11px] font-black text-[#450a0a]/30 uppercase tracking-[0.2em]">Qty: {item.quantity} • ${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6 border-t border-red-900/5 pt-10">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#450a0a]/40">
                  <span>Subtotal Value</span>
                  <span className="text-[#450a0a]">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#450a0a]/40">
                  <span>Logistics</span>
                  <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full font-black">Complimentary</span>
                </div>
                <div className="flex flex-col pt-10 border-t border-red-900/5 mt-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-900/20 mb-3">Settlement Total</span>
                  <span className="text-5xl font-black text-[#450a0a] leading-none tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 opacity-30 grayscale border-t border-red-900/5 pt-8">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}