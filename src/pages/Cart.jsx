import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, ShoppingBag, Package, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-[#FAF9F6] text-[#450a0a]">
        <SEO title="Empty Bag | DominicPrinters" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-24 w-24 bg-white rounded-full border border-red-900/5 flex items-center justify-center mb-8 shadow-sm"
        >
          <ShoppingBag size={32} className="text-red-900/20" strokeWidth={1} />
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">Your bag is <span className="font-light italic text-red-900">empty</span></h2>
        <p className="text-[#7A7A75] text-sm font-light mb-10 text-center max-w-xs leading-relaxed">Discover our collection of Quality hardware and find the perfect addition to your workspace.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-[#450a0a] text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl shadow-red-900/20 active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Start Shopping</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-jakarta text-[#450a0a] overflow-x-hidden pb-24">
      <SEO title="My Bag | DominicPrinters" description="Review your selected hardware before checkout." />
      
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-32 pb-16 px-6 lg:px-16 text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
         
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#450a0a] tracking-tight leading-[0.9]"
        >
          Shopping <span className="font-black italic text-red-900 whitespace-nowrap">Bag</span>
        </motion.h1>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-16 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- CART ITEMS --- */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row items-center gap-10 group relative pb-12 border-b border-red-900/5 last:border-0"
                >
                  {/* Image Platform: High End Frame */}
                  <div className="h-48 w-full sm:w-48 bg-white rounded-[2.5rem] border border-red-900/5 flex items-center justify-center p-8 shrink-0 transition-all duration-700 group-hover:bg-[#FAF9F6] group-hover:shadow-[0_20px_50px_-15px_rgba(69,10,10,0.06)] group-hover:border-[#450a0a]/10 overflow-hidden relative">
                    <Link to={`/product/${item.slug}`} className="absolute inset-0 z-10" />
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full py-2">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-3">
                        <span className="text-[9px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] bg-red-50/50 px-3 py-1 rounded-full">Imperial Selection</span>
                        <Link to={`/product/${item.slug}`}>
                           <h3 className="text-xl md:text-2xl font-bold text-[#450a0a] uppercase tracking-tighter leading-[0.9] group-hover:text-red-600 transition-colors line-clamp-2">{item.name}</h3>
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="h-10 w-10 rounded-full border border-red-900/5 flex items-center justify-center text-[#450a0a]/20 hover:text-red-600 hover:border-red-100 transition-all"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-red-900/5">
                      {/* Refined Counter */}
                      <div className="h-11 bg-[#FAF9F6] border border-red-900/5 rounded-full flex items-center justify-between px-1.5 w-[140px] shadow-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all shadow-sm"><Minus size={12} strokeWidth={2} /></button>
                        <span className="text-[13px] font-black text-[#450a0a]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all shadow-sm"><Plus size={12} strokeWidth={2} /></button>
                      </div>
                      
                      <div className="text-right flex flex-col">
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#450a0a]/30 mb-1">Item Total</span>
                         <span className="text-2xl font-black text-[#450a0a] tracking-tighter leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-[#450a0a]/40 hover:text-[#450a0a] transition-all pt-12 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Gallery
            </Link>
          </div>

          {/* --- SUMMARY SIDEBAR: BENTO CANVAS --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-[140px]">
            <div className="bg-white border border-red-900/5 p-10 rounded-[3.5rem] space-y-12 shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)]">
              <div className="space-y-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-900/20 border-b border-red-900/5 pb-4">Order Manifest</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#450a0a]/40 uppercase tracking-[0.2em]">Subtotal Value</span>
                    <span className="text-[15px] font-bold text-[#450a0a]">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#450a0a]/40 uppercase tracking-[0.2em]">Logistics</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 bg-red-50 px-4 py-1.5 rounded-full">Complimentary</span>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-red-900/5 space-y-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-900/20 mb-3">Total Investment</span>
                  <span className="text-5xl font-black text-[#450a0a] tracking-tighter leading-none">${total.toLocaleString()}</span>
                </div>

                <div className="space-y-6">
                  <Link 
                    to="/checkout"
                    className="group relative w-full h-16 bg-[#450a0a] text-white rounded-2xl flex items-center justify-center gap-6 text-[12px] font-bold uppercase tracking-[0.3em] transition-all hover:scale-[1.02] shadow-xl shadow-red-900/20 active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <ArrowRight size={20} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-3 py-2 text-[#450a0a]/30">
                    <ShieldCheck size={18} strokeWidth={1.5} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Checkout Verified</span>
                  </div>
                </div>
              </div>

              {/* Payments */}
              <div className="flex items-center justify-center gap-10 opacity-30 grayscale hover:opacity-100 transition-all duration-700">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
