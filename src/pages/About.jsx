import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Heart, Star, Globe, Target, TrendingUp, CheckCircle2, Award, Users2, Building2, Printer, Settings2, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import aboutHero from "@/assets/bannerr/about.jpg";
import sideBanner from "@/assets/bannerr/banner4.jpg";

const About = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-snpro text-slate-900 overflow-x-hidden">
      <SEO 
        title="About Our Mission | Printer Brother"
        description="Learn about the philosophy and engineering behind Printer Brother's professional printing solutions and our commitment to printing excellence."
      />

      {/* --- BENTO HERO SECTION --- */}
      <section className="pt-12 pb-24 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Main Text Block */}
            <div className="lg:col-span-7 bg-white border border-gray-100 p-10 md:p-16 flex flex-col justify-center space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#0047ab]" />
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-1 bg-[#0047ab]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Company Profile</span>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
                    Printing <br />
                    <span className="text-[#0047ab]">Redefined.</span>
                  </h1>
               </div>
               <p className="text-gray-500 text-sm md:text-xl font-medium leading-relaxed max-w-2xl">
                 Printer Brother is a specialized partner focused on bridging the gap between high-precision printing mechanics and seamless printing productivity. We provide the tools that keep your business moving.
               </p>
               <div className="pt-4">
                 <Link to="/shop" className="inline-flex items-center gap-4 bg-black text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl">
                    Explore Printers <ArrowRight size={18} strokeWidth={3} />
                 </Link>
               </div>
            </div>

            {/* Visual Block */}
            <div className="lg:col-span-5 relative h-[400px] lg:h-auto overflow-hidden group border border-gray-100">
               <img src={aboutHero} alt="Professional Printer Setup" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Print Standard</p>
                  <p className="text-xl font-black italic uppercase">Verified Precision.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY: BENTO GRID --- */}
      <section className="py-24 bg-white border-y border-gray-100 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="mb-20 space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-1 bg-[#0047ab]" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Our Methodology</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tighter">
                Print Solution <span className="text-[#0047ab]">Foundations.</span>
              </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Printer size={28} />, 
                title: "Genuine Hardware", 
                desc: "We stock only 100% original printers and accessories sourced directly from world-leading manufacturers.",
                accent: "bg-blue-50"
              },
              { 
                icon: <Settings2 size={28} />, 
                title: "Quality Calibration", 
                desc: "Every printer in our inventory undergoes a rigorous hardware diagnostic to ensure perfect output quality from day one.",
                accent: "bg-gray-50"
              },
              { 
                icon: <Zap size={28} />, 
                title: "Instant Deployment", 
                desc: "Our logistics network is optimized for the rapid delivery and setup of professional-grade printing terminals.",
                accent: "bg-[#0047ab]/5"
              }
            ].map((item, i) => (
              <div key={i} className={cn("p-10 border border-gray-100 space-y-6 group hover:border-[#0047ab]/30 transition-all duration-500", item.accent)}>
                <div className="h-14 w-14 bg-white border border-gray-100 flex items-center justify-center text-[#0047ab] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-black uppercase italic tracking-tight">{item.title}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTEGRATED CONTENT SECTION --- */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative h-[500px] overflow-hidden group border border-gray-100">
               <img src={sideBanner} alt="Ink and Toner details" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
            </div>

            <div className="space-y-12">
               <div className="space-y-6">
                  <h3 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tighter leading-tight">
                    Expert <br /> 
                    <span className="text-[#0047ab]">Print Support.</span>
                  </h3>
                  <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
                    We understand that a printer is more than just a peripheral—it's a critical part of your workflow. Our team consists of trained print specialists ready to provide clear, actionable advice on setup, maintenance, and supplies.
                  </p>
               </div>

               <div className="pt-4">
                  <Link to="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl">
                    Connect With a Specialist <ArrowRight size={16} strokeWidth={3} />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA: FINAL IMPACT --- */}
      <section className="pb-24 px-6 md:px-10">
         <div className="max-w-[1650px] mx-auto">
            <div className="bg-black p-12 md:p-24 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#0047ab]" />
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0047ab 1px, transparent 1px)', size: '20px 20px' }} />
               
               <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    Ready to upgrade <br /> 
                    <span className="text-[#0047ab]">Your Print Fleet?</span>
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link to="/shop" className="bg-[#0047ab] text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95 shadow-2xl shadow-[#0047ab]/20">
                      View All Printers
                    </Link>
                    <Link to="/contact" className="border border-white/20 text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:border-[#0047ab] hover:text-[#0047ab] transition-all active:scale-95">
                      Request a Quote
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
