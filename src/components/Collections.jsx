import React from 'react';
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Assets
import banner10 from "@/assets/bannerr/newban1.jpg";
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner6 from "@/assets/bannerr/banner6.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-12 md:py-20 w-full overflow-hidden">
      <div className="w-full px-4 md:px-8">

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left Tall Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-7 relative min-h-[520px] md:min-h-[620px] rounded-[34px] overflow-hidden border border-slate-200 group bg-[#111111]"
          >
            <div className="absolute inset-0">
              <img
                src={banner6}
                alt="Reliable Printing Solutions"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-[#111111]/10" />
            </div>

            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-2xl p-8 md:p-12 lg:p-14">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-300/20 mb-6">
                  <Sparkles size={12} className="text-amber-300" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                    Limited Series 2026
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl xl:text-6xl font-black text-white leading-[1.02] tracking-tight mb-5">
                  Reliable Printing
                  <span className="block text-amber-400">Solutions</span>
                </h3>

                <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed max-w-lg mb-8">
                  Experience the next generation of precision printing. Designed for clarity,
                  speed, and heavy-duty office workflows.
                </p>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-7 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 transition-all hover:bg-amber-300 active:scale-95"
                >
                  Explore Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Mixed Layout */}
          <div className="xl:col-span-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
            
            {/* Top horizontal card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative min-h-[280px] rounded-[30px] overflow-hidden border border-slate-200 bg-white group"
            >
              <div className="absolute inset-0">
                <img
                  src={banner1}
                  alt="Elite Inventory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
              </div>

              <div className="relative z-10 h-full flex items-end p-7 md:p-8">
                <div className="max-w-[260px]">
                  <span className="inline-flex mb-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
                    Curated Selection
                  </span>

                  <h4 className="text-2xl md:text-[28px] font-black text-white leading-[1.05] tracking-tight mb-3">
                    Elite Inventory
                  </h4>

                  <p className="text-white/80 text-sm font-medium leading-relaxed mb-5">
                    Explore reliable printer accessories and essential add-ons.
                  </p>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-300"
                  >
                    Shop Now
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Bottom split card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="relative min-h-[280px] rounded-[30px] overflow-hidden border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] group"
            >
              <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-amber-200/40 blur-2xl" />
              <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-slate-200/50 blur-2xl" />

              <div className="relative z-10 h-full p-7 md:p-8 flex flex-col justify-between">
                <div className="h-14 w-14 rounded-[20px] bg-slate-900 text-amber-400 flex items-center justify-center shadow-lg">
                  <Zap size={24} />
                </div>

                <div>
                  <span className="inline-flex mb-4 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-amber-700">
                    Fast Service
                  </span>

                  <h4 className="text-2xl md:text-[28px] font-black text-slate-900 leading-[1.05] tracking-tight mb-3">
                    Fast Delivery
                  </h4>

                  <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[250px]">
                    Express shipping on all elite printers and essential supplies.
                  </p>
                </div>
              </div>

              <div className="absolute right-0 bottom-0 w-[180px] h-[180px] opacity-20">
                <img
                  src={banner10}
                  alt="Fast Delivery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}