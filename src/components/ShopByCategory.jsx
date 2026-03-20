import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { cn } from '../lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const [hoveredId, setHoveredId] = useState(null);

  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    });

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-24 w-full overflow-hidden font-jakarta border-t border-red-900/5">
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
            Shop by <span className="italic font-medium text-red-900">Category</span>
          </motion.h2>
        </div>

        {/* --- NEW GALLERY FRAME CAROUSEL --- */}
        <div className="relative group/carousel px-4">
          <Swiper
            modules={[Navigation]}
            spaceBetween={40}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1440: { slidesPerView: 5.2 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="block group"
                >
                  <div className="flex flex-col items-center gap-6">
                    {/* The "Frame" Image Container */}
                    <div className="relative w-full aspect-[1/1] rounded-full p-2 border border-red-900/5 bg-white shadow-lg transition-all duration-700 group-hover:border-[#450a0a]/20 group-hover:shadow-2xl overflow-hidden">
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF9F6] relative">
                        <motion.img 
                          src={getImagePath(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-1000"
                          animate={hoveredId === item.id ? { scale: 1.15 } : { scale: 1 }}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                        <div className="absolute inset-0 bg-[#450a0a]/0 group-hover:bg-[#450a0a]/5 transition-colors duration-700" />
                      </div>
                      
                      {/* Floating Indicator */}
                      <motion.div 
                        animate={hoveredId === item.id ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                      >
                        <div className="h-12 w-12 rounded-full bg-[#450a0a] text-white flex items-center justify-center shadow-xl">
                          <MoveRight size={20} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Clean Label Below */}
                    <div className="text-center space-y-1 transition-transform duration-500 group-hover:-translate-y-1">
                      <h4 className="text-[13px] font-extrabold text-[#450a0a] tracking-widest uppercase">
                        {item.name}
                      </h4>
                      <div className="h-px w-0 bg-red-900/20 mx-auto transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls - Moved below carousel for cleaner header */}
          <div className="flex justify-center gap-6 mt-16">
            <button className="cat-prev h-12 w-12 flex items-center justify-center rounded-full border border-red-900/10 hover:bg-[#450a0a] hover:text-white transition-all duration-500 disabled:opacity-20">
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button className="cat-next h-12 w-12 flex items-center justify-center rounded-full border border-red-900/10 hover:bg-[#450a0a] hover:text-white transition-all duration-500 disabled:opacity-20">
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
