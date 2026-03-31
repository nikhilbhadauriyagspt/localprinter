import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [], loading = false }) {
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
    <section className="w-full bg-white py-14 md:py-20 overflow-hidden">
      <div className="w-full px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 mb-5">
            Explore Categories
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.05]">
            Shop By <span className="text-amber-500">Category</span>
          </h2>

          <div className="h-1 w-20 bg-amber-500 mt-4 rounded-full" />

          <p className="mt-4 max-w-xl text-sm md:text-[15px] leading-relaxed text-slate-500 font-medium">
            Discover our extensive collection of high-performance printers and professional supplies.
          </p>
        </div>

        {/* Slider */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.4}
            navigation={{
              prevEl: '.cat-prev-modern',
              nextEl: '.cat-next-modern',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 2.1 },
              640: { slidesPerView: 3.1 },
              768: { slidesPerView: 4.1 },
              1024: { slidesPerView: 5.1 },
              1280: { slidesPerView: 6.1 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="rounded-[30px] border border-slate-200 bg-white overflow-hidden">
                    <div className="p-4">
                      <Skeleton className="w-full aspect-square rounded-[24px] bg-slate-100" />
                    </div>
                    <div className="px-4 pb-5">
                      <Skeleton className="h-4 w-2/3 mx-auto bg-slate-100" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              subcategories.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.45 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/shop?category=${item.slug}`}
                      className="group/card block"
                    >
                      <div className="relative rounded-[30px] bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] hover:border-amber-200">
                        
                        {/* top bg panel */}
                        <div className="relative px-4 pt-4 pb-2">
                          <div className="relative rounded-[26px] bg-gradient-to-br from-[#fff8eb] via-[#ffffff] to-[#f8fafc] min-h-[250px] overflow-hidden">
                            
                            {/* soft decorative shapes */}
                            <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-amber-200/40 blur-2xl" />
                            <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-slate-200/50 blur-2xl" />

                            {/* Image */}
                            <div className="relative w-full aspect-square flex items-center justify-center z-[2]">
                              <img
                                src={getImagePath(item.image)}
                                alt={item.name}
                                className="w-full h-full object-contain p-5 transition-transform duration-700 ease-out group-hover/card:scale-110"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/400x400?text=" + item.name;
                                }}
                              />
                            </div>

                            {/* hover icon */}
                            <div className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/95 border border-white shadow-md flex items-center justify-center text-slate-900 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                              <ArrowRight size={16} className="group-hover/card:translate-x-[2px] transition-transform duration-300" />
                            </div>
                          </div>
                        </div>

                        {/* Bottom content */}
                        <div className="px-5 pb-5 pt-1 text-center">
                          <h4 className="text-[14px] md:text-[15px] font-black text-slate-800 tracking-tight leading-tight transition-colors duration-300 group-hover/card:text-amber-600">
                            {item.name}
                          </h4>
                        </div>

                        {/* bottom accent */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* Navigation */}
          <button className="cat-prev-modern absolute top-1/2 -left-4 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)] border border-slate-200 text-slate-900 hover:bg-amber-500 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
            <ChevronLeft size={22} />
          </button>

          <button className="cat-next-modern absolute top-1/2 -right-4 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)] border border-slate-200 text-slate-900 hover:bg-amber-500 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}