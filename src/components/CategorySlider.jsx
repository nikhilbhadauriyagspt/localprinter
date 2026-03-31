import React from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ProductCardSkeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider({ title, products = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();

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
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  const words = title?.split(" ") || [];
  const firstWord = words[0] || "";
  const restWords = words.slice(1).join(" ");

  return (
    <section className="bg-white py-12 md:py-20 w-full overflow-hidden">
      <div className="w-full px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
            Featured Collection
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.05]">
            {firstWord} {restWords ? <span className="text-blue-500">{restWords}</span> : null}
          </h2>

          <div className="h-1 w-20 bg-blue-500 mt-4 rounded-full" />

          <p className="text-slate-500 text-sm md:text-[15px] font-medium mt-4 max-w-lg leading-relaxed">
            Discover our reliable selection of {title?.toLowerCase()} tailored for high-performance and reliability.
          </p>
        </div>

        {/* Slider */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.cs-prev-ref',
              nextEl: '.cs-next-ref',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1280: { slidesPerView: 5.2 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="rounded-[30px] border border-slate-200 bg-white overflow-hidden shadow-sm">
                    <div className="p-4">
                      <div className="rounded-[24px] overflow-hidden">
                        <ProductCardSkeleton />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              products.slice(0, 15).map((p, index) => (
                <SwiperSlide key={p.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/product/${p.slug}`}
                      className="block group/card"
                    >
                      <div className="relative rounded-[30px] bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] hover:border-blue-200">

                        {/* top bg panel */}
                        <div className="relative px-4 pt-4 pb-2">
                          <div className="relative rounded-[26px] bg-gradient-to-br from-[#fff8eb] via-[#ffffff] to-[#f8fafc] min-h-[250px] overflow-hidden">
                            
                            {/* decorative shapes */}
                            <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" />
                            <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-slate-200/50 blur-2xl" />

                            {/* Wishlist */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className={cn(
                                "absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/95 border border-white shadow-md flex items-center justify-center transition-all duration-300",
                                isInWishlist(p.id)
                                  ? "text-red-500"
                                  : "text-slate-400 hover:text-blue-500"
                              )}
                            >
                              <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                            </button>

                            {/* Image */}
                            <div className="relative w-full aspect-square flex items-center justify-center z-[2]">
                              <img
                                src={getImagePath(p.images)}
                                alt={p.name}
                                className="w-full h-full object-contain p-5 transition-transform duration-700 ease-out group-hover/card:scale-110"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bottom content */}
                        <div className="px-5 pb-5 pt-1">
                          <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-[0.12em] leading-[1.45] line-clamp-2 min-h-[38px] max-h-[38px] overflow-hidden transition-colors duration-300 group-hover/card:text-blue-600 text-center">
                            {p.name}
                          </h4>

                          <div className="mt-3 flex items-center justify-center gap-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                              Price:
                            </span>
                            <span className="text-lg font-black text-slate-900 tracking-tight">
                              ${p.price}
                            </span>
                          </div>

                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="mt-4 w-full h-11 rounded-full bg-slate-900 text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] hover:bg-blue-500 hover:text-slate-900 transition-all"
                          >
                            <ShoppingBag size={15} />
                            Add to Cart
                          </button>
                        </div>

                        {/* bottom accent */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="cs-prev-ref absolute top-1/2 -left-4 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)] border border-slate-200 text-slate-900 hover:bg-blue-500 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
            <ChevronLeft size={22} />
          </button>

          <button className="cs-next-ref absolute top-1/2 -right-4 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)] border border-slate-200 text-slate-900 hover:bg-blue-500 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Bottom CTA */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link
              to={`/shop?category=${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-slate-900 text-sm font-black uppercase tracking-[0.16em] hover:bg-blue-400 transition-all"
            >
              Browse All {title}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}