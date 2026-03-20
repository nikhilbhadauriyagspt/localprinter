import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingCart, Package, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Glassmorphic Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-red-950/5 backdrop-blur-sm z-[1000]"
          />

          {/* Luxury Minimal Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-3 right-3 bottom-3 w-[calc(100%-24px)] sm:w-[480px] bg-white rounded-[3.5rem] z-[1001] flex flex-col font-jakarta shadow-[0_40px_100px_-20px_rgba(69,10,10,0.15)] border border-red-900/5 overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-10 flex items-center justify-between border-b border-red-900/5">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-900/20 block">Your Selection</span>
                <h2 className="text-2xl font-bold text-[#450a0a] leading-none uppercase">Shopping <span className="font-black italic text-red-900">Bag</span></h2>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-11 w-11 flex items-center justify-center rounded-full bg-[#FAF9F6] text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all group border border-red-900/5"
              >
                <X size={20} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-6 relative"
                    >
                      {/* Image Platform */}
                      <div className="h-28 w-28 bg-[#FAF9F6] rounded-[2rem] flex items-center justify-center flex-shrink-0 p-4 overflow-hidden relative group-hover:bg-white group-hover:shadow-xl transition-all duration-700 border border-red-900/5">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col py-1">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] bg-red-50/50 px-2.5 py-0.5 rounded-full">Imperial</span>
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="text-red-900/20 hover:text-red-600 transition-colors p-1"
                            >
                              <X size={14} strokeWidth={2} />
                            </button>
                          </div>
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[13px] font-bold text-[#450a0a] leading-snug line-clamp-2 hover:text-red-600 transition-colors uppercase tracking-tight">{item.name}</h3>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-red-900/5">
                          <div className="flex items-center bg-[#FAF9F6] border border-red-900/5 rounded-full h-8 px-1 shadow-inner">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-6 flex items-center justify-center bg-white rounded-full text-[#450a0a] shadow-sm"><Minus size={10} strokeWidth={2} /></button>
                            <span className="text-[11px] font-black w-6 text-center text-[#450a0a]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-6 flex items-center justify-center bg-white rounded-full text-[#450a0a] shadow-sm"><Plus size={10} strokeWidth={2} /></button>
                          </div>
                          <span className="text-[15px] font-black text-[#450a0a] tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="h-24 w-24 bg-[#FAF9F6] rounded-full flex items-center justify-center border border-red-900/5">
                    <ShoppingBag size={32} strokeWidth={1} className="text-red-900/20" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold uppercase tracking-widest text-[#450a0a]">Your bag is empty</h3>
                    <p className="text-[10px] font-black text-[#450a0a]/30 uppercase tracking-[0.3em] leading-relaxed">Curate your Quality hardware</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="group relative inline-flex items-center gap-4 bg-[#450a0a] text-white h-12 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95"
                  >
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em]">Start Shopping</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 space-y-8 bg-white border-t border-red-900/5">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                     <span className="text-[9px] font-black text-[#450a0a]/40 uppercase tracking-[0.3em] block">Estimated Total</span>
                     <span className="text-4xl font-black text-[#450a0a] tracking-tighter leading-none">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-900/20">
                    <Package size={14} strokeWidth={1.5} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{cartCount} Pieces</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="group relative w-full h-16 bg-[#450a0a] text-white rounded-2xl overflow-hidden transition-all duration-500 shadow-xl shadow-red-900/20 active:scale-95 flex items-center justify-center gap-6"
                  >
                    <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Secure Checkout</span>
                    <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <button 
                    onClick={closeCartDrawer}
                    className="w-full text-center py-2 text-[9px] font-black uppercase tracking-[0.4em] text-[#450a0a]/30 hover:text-[#450a0a] transition-colors"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
