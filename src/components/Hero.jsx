import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
  CheckCircle2,
  Package,
  Headset,
  Zap,
  Printer,
  BadgePercent,
} from 'lucide-react';

// Main banner image
import banner2 from '@/assets/bannerr/banner5.jpg';

// Portrait side banners
import sideBanner1 from '@/assets/bannerr/4.jpg';
import sideBanner2 from '@/assets/bannerr/banner4.jpg';

const Hero = () => {
  return (
    <section className="w-full h-[85vh] min-h-[700px] bg-white overflow-hidden">
      <div className="w-full h-full px-4 md:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">

          {/* LEFT BIG HERO BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-9 relative h-full rounded-[28px] overflow-hidden group"
          >
            {/* Background Image */}
            <img
              src={banner2}
              alt="reliable printer collection"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_30%)]" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-3xl px-8 md:px-12 lg:px-16">
              

                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="text-white text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-5"
                >
                  Find the Right
                  <span className="block text-blue-400">Printer for Every Need</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-8"
                >
                  Explore reliable printers for home, office, and business use with
                  quality performance, smooth printing, and dependable support for
                  everyday productivity.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-4 mb-8"
                >
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-slate-950 font-extrabold transition-all shadow-lg shadow-blue-500/20"
                  >
                    Shop Now
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold border border-white/15 backdrop-blur-sm transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>

                
              </div>
            </div>
          </motion.div>

          {/* RIGHT PORTRAIT BANNERS */}
          <div className="lg:col-span-3 h-full flex flex-col gap-4">
            
            {/* Portrait Banner 1 */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative flex-1 min-h-[250px] rounded-[28px] overflow-hidden group"
            >
              <img
                src={sideBanner1}
                alt="Office printer offer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />

              <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-blue-400">
                  <Printer size={24} />
                </div>

                <div>
                  
                  <h3 className="text-white text-2xl font-black leading-tight mb-2">
                    Best Printers
                  </h3>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    Reliable options for daily printing at home and office.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Portrait Banner 2 */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative flex-1 min-h-[250px] rounded-[28px] overflow-hidden group bg-slate-950"
            >
              <img
                src={sideBanner2}
                alt="Printer deals"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85" />

              <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                <div className="h-12 w-12 rounded-2xl bg-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <BadgePercent size={22} />
                </div>

                <div>
                 
                  <h3 className="text-white text-2xl font-black leading-tight mb-2">
                    Up to 40% Off
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Shop selected printer models with value-driven deals.
                  </p>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors"
                  >
                    Explore Deals
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="hidden xl:grid grid-cols-4 gap-4 mt-4"
        >
          {[
            { icon: <ShieldCheck size={20} />, label: 'Warranty Support' },
            { icon: <Clock size={20} />, label: 'Fast Delivery' },
            { icon: <Headset size={20} />, label: 'Customer Assistance' },
            { icon: <Star size={20} />, label: 'Top Quality Picks' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-5 py-4 rounded-[22px] border border-slate-200 bg-white"
            >
              <div className="text-blue-500">{item.icon}</div>
              <span className="text-sm font-extrabold tracking-wide text-slate-700 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;