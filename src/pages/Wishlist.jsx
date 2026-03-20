import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingCart, Eye, X, ChevronLeft, Package, Plus, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-[#FAF9F6] text-[#450a0a]">
        <SEO title="Empty Wishlist | DominicPrinters" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-24 w-24 bg-white rounded-full border border-red-900/5 flex items-center justify-center mb-8 shadow-sm"
        >
          <Heart size={32} className="text-red-900/20" strokeWidth={1} />
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">Your wishlist is <span className="font-light italic text-red-900">empty</span></h2>
        <p className="text-[#7A7A75] text-sm font-light mb-10 text-center max-w-xs leading-relaxed">Save your favorite hardware here to easily find them later in your curated collection.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-[#450a0a] text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl shadow-red-900/20 active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Start Shopping</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO title="My Wishlist | DominicPrinters" description="Review your saved printers." />
      
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
          className="text-5xl md:text-7xl lg:text-6xl font-bold text-[#450a0a] tracking-tight leading-[0.9]"
        >
          My <span className="font-black italic text-red-900 whitespace-nowrap">Wishlist</span>
        </motion.h1>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-16 py-12 md:py-20 relative z-10">
        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, idx) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (idx % 4) * 0.05 }}
                className="group relative flex flex-col h-full"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Platform: Compact & Refined */}
                <div className="relative aspect-square w-full bg-white rounded-[2.5rem] border border-red-900/5 flex items-center justify-center p-8 overflow-hidden transition-all duration-700 group-hover:bg-[#FAF9F6] group-hover:shadow-[0_30px_70px_-20px_rgba(69,10,10,0.08)] group-hover:border-[#450a0a]/10">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  
                  {/* Decorative Inner Frame */}
                  <div className="absolute inset-3 border border-red-900/5 rounded-[2rem] pointer-events-none transition-all duration-700 group-hover:inset-2" />

                  <motion.img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply relative z-10"
                    animate={hoveredId === p.id ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  />

                  {/* Remove Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/80 backdrop-blur-md border border-red-900/5 flex items-center justify-center text-[#450a0a]/40 hover:text-red-600 hover:border-red-200 transition-all duration-300 z-20 shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>

                  {/* Bottom Quick Add Action */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="w-full h-12 bg-[#450a0a] text-white rounded-xl flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <ShoppingBag size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Quick Add</span>
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="pt-6 px-2 text-center space-y-1.5">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-bold text-[#450a0a] uppercase tracking-tighter line-clamp-1 group-hover:text-red-600 transition-colors duration-500">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="flex flex-col items-center">
                    <span className="text-[15px] font-black text-[#450a0a] opacity-40 tracking-tight">${p.price}</span>
                    <div className="h-[1.5px] w-0 bg-red-900/20 transition-all duration-700 group-hover:w-10 mt-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-24 pt-12 border-t border-red-900/5 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#450a0a] border border-red-900/10 px-8 py-4 rounded-full hover:bg-[#450a0a] hover:text-white transition-all duration-500 shadow-sm">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
