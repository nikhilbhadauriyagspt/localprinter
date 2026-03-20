import { motion } from "framer-motion";
import { Heart, Plus, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function CategorySlider({ title, products = [] }) {
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

  if (products.length === 0) return null;

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-24 w-full font-jakarta overflow-hidden border-t border-red-900/5">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
        
        {/* --- CENTERED REFINED HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#450a0a]  leading-tight"
          >
            {title.split(' ').slice(0, -1).join(' ')} <span className="italic font-medium text-red-900">{title.split(' ').pop()}</span>
          </motion.h2>
        </div>

        {/* --- REFINED LANDSCAPE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {products.slice(0, 9).map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.05, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-row items-center gap-6 p-4 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#450a0a]/10 transition-all duration-500"
            >
              {/* Landscape Image Container */}
              <div className="relative w-32 h-32 md:w-36 md:h-36 shrink-0 bg-[#FAF9F6] rounded-2xl flex items-center justify-center p-4 overflow-hidden border border-gray-100 group-hover:bg-white transition-all duration-500">
                <motion.img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply relative z-10"
                  animate={hoveredId === p.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Micro Wishlist Overlay */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-md shadow-sm transition-all",
                    isInWishlist(p.id) ? "text-red-600" : "text-[#450a0a]/20 hover:text-[#450a0a]"
                  )}
                >
                  <Heart size={12} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2} />
                </button>
              </div>

              {/* Landscape Info Area */}
              <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                <div className="space-y-1">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[14px] font-bold text-[#450a0a] uppercase tracking-tighter line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <span className="text-[15px] font-black text-[#450a0a] opacity-40 tracking-tight">${p.price}</span>
                </div>

                <div className="mt-4 flex justify-start">
                  {/* Floating Add Button */}
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    className="h-10 w-10 bg-[#450a0a] text-white rounded-xl flex items-center justify-center hover:scale-110 shadow-lg active:scale-95 transition-all"
                  >
                    <ShoppingBag size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- CENTERED VIEW ALL --- */}
        <div className="mt-16 text-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#450a0a] border border-gray-200 px-8 py-3 rounded-full hover:bg-[#450a0a] hover:text-white transition-all duration-500 shadow-sm">
            Discover Full Series
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
