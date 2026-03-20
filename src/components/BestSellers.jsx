import { ChevronLeft, ChevronRight, Heart, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/navigation';

export default function BestSellers({ products = [] }) {
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
    <section className="bg-[#FAF9F6] py-16 md:py-24 w-full font-jakarta overflow-hidden border-t border-gray-100">

      <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
        
        {/* --- CENTERED COMPACT HEADER --- */}
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#450a0a] tracking-tight leading-tight"
          >
            Market <span className="italic font-medium text-red-900">Favorites</span>
          </motion.h2>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="relative group/carousel px-2">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 4.2 },
              1600: { slidesPerView: 5.2 },
            }}
            className="!overflow-visible"
          >
            {products.slice(0, 15).map((p) => (
              <SwiperSlide key={p.id}>
                <div 
                  className="group relative flex flex-col h-full transition-all duration-500"
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Card: Refined & Less Red */}
                  <div className="relative aspect-[4/5] w-full bg-white rounded-[2rem] flex items-center justify-center p-8 overflow-hidden transition-all duration-700 border border-gray-100 shadow-sm group-hover:shadow-xl group-hover:border-gray-200">
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                    
                    <motion.img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply relative z-10"
                      animate={hoveredId === p.id ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    />

                    {/* Quick Wishlist - Subtle */}
                    <div className="absolute top-5 right-5 z-20">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center border border-gray-100 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110",
                          isInWishlist(p.id) ? "text-red-500 border-red-50" : "text-gray-400 hover:text-[#450a0a]"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Quick Add Bottom Button - Clean & Persistent */}
                    <div className="absolute bottom-5 left-5 right-5 z-20">
                      <button 
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full h-12 bg-[#450a0a] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                      >
                        <ShoppingBag size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Quick Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Details - Stable & No Hover Effect */}
                  <div className="pt-6 px-2 text-center space-y-1">
                    <Link to={`/product/${p.slug}`} className="block">
                      <h3 className="text-[13px] font-bold text-[#450a0a] uppercase  line-clamp-1">
                        {p.name}
                      </h3>
                    </Link>
                    <span className="text-[14px] font-medium text-gray-400 tracking-wide">${p.price}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls - Smaller & Neutral */}
          <div className="flex justify-center gap-4 mt-12">
            <button className="bs-prev h-11 w-11 flex items-center justify-center rounded-full border border-gray-200 hover:bg-[#450a0a] hover:text-white transition-all duration-500 disabled:opacity-20 group">
              <ChevronLeft size={18} />
            </button>
            <button className="bs-next h-11 w-11 flex items-center justify-center rounded-full border border-gray-200 hover:bg-[#450a0a] hover:text-white transition-all duration-500 disabled:opacity-20 group">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
