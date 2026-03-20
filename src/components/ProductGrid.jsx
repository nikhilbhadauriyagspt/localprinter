import { motion } from "framer-motion";
import { Heart, Plus, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
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

  return (
    <section className="bg-[#FAF9F6] py-16 md:py-24 w-full font-jakarta overflow-hidden border-t border-red-900/5">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
        
        {/* --- CENTERED REFINED HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
           
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#450a0a] tracking-tight leading-tight"
          >
            New <span className="italic font-medium text-red-900">Arrivals</span>
          </motion.h2>
        </div>

        {/* --- COMPACT BENTO GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 md:gap-6">
          {products.slice(0, 18).map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.05, duration: 0.6 }}
              className="group relative flex flex-col"
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Area: NEW "Floating Frame" Design */}
              <div className="relative aspect-square w-full bg-white rounded-3xl flex items-center justify-center p-6 overflow-hidden transition-all duration-500 border border-gray-100 shadow-sm group-hover:border-[#450a0a]/10 group-hover:shadow-xl group-hover:bg-[#FAF9F6]">
                <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                
                <motion.img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply relative z-10"
                  animate={hoveredId === p.id ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Top Wishlist Overlay */}
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center border border-red-900/5 bg-white/90 backdrop-blur-md shadow-sm transition-all",
                      isInWishlist(p.id) ? "text-red-600" : "text-[#450a0a] hover:bg-[#450a0a] hover:text-white"
                    )}
                  >
                    <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Bottom Quick Add: Minimal Pill */}
                <div className="absolute bottom-3 left-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    className="w-full h-10 bg-[#450a0a] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <ShoppingBag size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Add</span>
                  </button>
                </div>
              </div>

              {/* Minimalist Details Below */}
              <div className="pt-4 px-1 space-y-1 text-center">
                <Link to={`/product/${p.slug}`} className="block">
                  <h3 className="text-[13px] font-bold text-[#450a0a] uppercase  line-clamp-1 group-hover:text-red-600 transition-colors">
                    {p.name}
                  </h3>
                </Link>
                <div className="flex flex-col items-center">
                  <span className="text-[14px] font-black text-[#450a0a] opacity-40 tracking-tight">${p.price}</span>
                  <div className="h-px w-0 bg-red-900/20 transition-all duration-500 group-hover:w-8 mt-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- VIEW ALL BUTTON --- */}
        <div className="mt-16 text-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#450a0a] border border-gray-200 px-8 py-3 rounded-full hover:bg-[#450a0a] hover:text-white transition-all duration-500">
            View All Arrivals
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
