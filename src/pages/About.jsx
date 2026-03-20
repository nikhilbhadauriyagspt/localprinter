import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award, Sparkles, MoveRight, Printer, CheckCircle2, Quote, ArrowDownRight, Heart, Sparkle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import banner1 from "@/assets/bannerr/banner1.jpg";
import newban2 from "@/assets/bannerr/about2.jpg";

const About = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO 
        title="Our Story | DominicPrinters"
        description="Discover the philosophy behind DominicPrinters. We combine luxury design with high-performance printing technology."
      />

      {/* --- SECTION 1: ARCHITECTURAL INTRO --- */}
      <section className="relative pt-12 pb-20 px-6 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          

            {/* Right: Main Content Grid */}
            <div className="flex-1 space-y-20">
              <div className="max-w-8xl space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                 
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-[4.5rem] font-bold  text-[#450a0a] mb-10"
                >
                  Pure Printing. <span className="italic font-black text-red-900">Better Living.</span>
                </motion.h1>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                   <p className="text-xl text-[#7A7A75] font-light leading-relaxed flex-1">
                    DominicPrinters was founded on a simple idea that beautiful design should extend to every corner of your life. We curate Quality tools that blend seamlessly into your home and inspire your best work.
                   </p>
                   <div className="flex items-center gap-4 pt-4 border-t border-red-900/10 md:border-t-0 md:pt-0">
                      <div className="h-12 w-12 rounded-full border border-[#450a0a] flex items-center justify-center">
                         <ArrowDownRight size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Story</span>
                   </div>
                </div>
              </div>

              {/* Overlapping Image Composition */}
              <div className="relative w-full h-[400px] md:h-[600px]">
                 <motion.div 
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 rounded-[4rem] overflow-hidden shadow-2xl border border-white"
                 >
                    <img src={banner1} className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#450a0a]/20 via-transparent to-transparent" />
                 </motion.div>
                 
                 {/* Floating Info Box */}
                 <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -bottom-10 -right-6 md:right-12 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-red-900/5 max-w-sm hidden md:block z-20"
                 >
                    <Quote size={32} className="text-red-600/20 mb-6" />
                    <p className="text-[#450a0a] text-lg font-medium italic leading-relaxed">
                      "We focus on creating products that look as good as they perform."
                    </p>
                 </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE THREE PILLARS (BENTO) --- */}
      <section className="py-32 px-6 lg:px-16 bg-white border-y border-red-900/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '01', title: "Quality Quality", desc: "Every item is selected for its exceptional build and lasting reliability in your daily life.", icon: <Shield /> },
              { id: '02', title: "Effortless Ease", desc: "Designed for comfort and simplicity. Our tools work for you, so you can focus on what matters.", icon: <Zap /> },
              { id: '03', title: "Modern Style", desc: "Items that elevate your space. We prioritize elegant lines and a timeless architectural feel.", icon: <Award /> }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 md:p-12 rounded-[3.5rem] bg-[#FAF9F6] border border-red-900/5 hover:bg-[#450a0a] transition-all duration-700"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-4xl font-black text-red-900/10 group-hover:text-white/10 transition-colors">{pillar.id}</span>
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-[#450a0a] shadow-sm group-hover:scale-110 transition-transform">
                    {React.cloneElement(pillar.icon, { size: 20, strokeWidth: 1.5 })}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#450a0a] group-hover:text-white transition-colors tracking-tight">{pillar.title}</h3>
                  <p className="text-sm text-[#7A7A75] group-hover:text-white/60 transition-colors font-light leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: LIFESTYLE SHOWCASE (SPLIT) --- */}
      <section className="py-32 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
               <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square max-w-[500px] mx-auto"
               >
                  <div className="absolute inset-0 rounded-full border border-red-900/10" />
                  <div className="absolute inset-10 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                    <img src={newban2} className="w-full h-full object-cover" alt="" />
                  </div>
                  {/* Floating Icon instead of technical label */}
                  <div className="absolute top-0 right-0 bg-white p-6 rounded-full shadow-xl border border-red-900/5 flex items-center justify-center">
                     <Heart size={24} className="text-red-600 fill-red-600" />
                  </div>
               </motion.div>
            </div>

            <div className="w-full lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#450a0a]/40">Built for you</span>
                <h2 className="text-5xl md:text-7xl font-bold text-[#450a0a] ">
                  Quality <br />
                  <span className="italic font-black text-red-900">In Detail.</span>
                </h2>
              </div>
              <p className="text-lg text-[#7A7A75] font-light leading-relaxed max-w-xl">
                We believe in products that stand the test of time. Every piece of printer in our collection is carefully chosen to bring joy and reliability to your daily experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Beautiful Colors", "Quiet Operation", "Simple Setup", "Lasting Quality"].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-red-900/5 shadow-sm">
                    <Sparkle size={16} className="text-red-600" />
                    <span className="text-[13px] font-bold text-[#450a0a]/80">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: FINAL CTA --- */}
      <section className="py-32 md:py-48 bg-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/[0.02] rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-[1440px] mx-auto px-6  space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-5xl font-bold text-[#450a0a]  leading-[0.9]">
              Find your <span className="font-black italic text-red-900">Perfect Printer.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link 
              to="/shop" 
              className="group bg-[#450a0a] text-white px-12 h-16 flex items-center justify-center rounded-2xl font-bold text-[12px] uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl shadow-red-900/20 w-full sm:w-auto"
            >
              <span>Explore Collection</span>
              <MoveRight size={18} className="ml-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="group flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#450a0a] hover:text-red-600 transition-colors"
            >
              <span>Speak with us</span>
              <ArrowDownRight size={18} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
