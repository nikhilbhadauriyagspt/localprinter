import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoveRight, Sparkles, ChevronLeft, ChevronRight, Cpu, Layers, Zap, Printer } from 'lucide-react';
import { cn } from '../lib/utils';

// Assets
import png1 from '@/assets/bannerr/png-1.png';
import png2 from '@/assets/bannerr/png-2.png';
import png3 from '@/assets/bannerr/png-3.png';
import banner1 from '@/assets/bannerr/newban1.jpg';
import banner2 from '@/assets/bannerr/newban2.jpg';
import banner3 from '@/assets/bannerr/newban3.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "Imperial Collection",
      title: "The Best Modern",
      subtitle: "Digital Printer Series",
      desc: "Experience the pinnacle of printing luxury. Engineered with crimson-tier technology for the most discerning creators.",
      image: png1,
      banner: banner1,
      specs: [
        { label: "4K Precision", icon: <Layers size={12} /> },
        { label: "Crimson Core", icon: <Cpu size={12} /> },
        { label: "Elite Tier", icon: <Zap size={12} /> }
      ]
    },
    {
      id: 2,
      tag: "Elite Performance",
      title: "High Speed Laser",
      subtitle: "Professional Quality Output",
      desc: "Unleash a spectrum of vivid excellence. Our flagship series redefined for the modern high-end workspace.",
      image: png2,
      banner: banner2,
      specs: [
        { label: "Vivid Sync", icon: <Layers size={12} /> },
        { label: "Pro Optics", icon: <Cpu size={12} /> },
        { label: "Zero Noise", icon: <Zap size={12} /> }
      ]
    },
    {
      id: 3,
      tag: "The Craft 2026",
      title: "Ultimate Inkjet Tech",
      subtitle: "Reliable Office Solutions",
      desc: "Where heritage meets the future of hardware. A bold statement in every print, delivered with silent efficiency.",
      image: png3,
      banner: banner3,
      specs: [
        { label: "Eco Shield", icon: <Layers size={12} /> },
        { label: "Grand Flow", icon: <Cpu size={12} /> },
        { label: "2026 Spec", icon: <Zap size={12} /> }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-screen flex flex-col bg-[#FAF9F6] font-jakarta overflow-hidden pt-20">
      
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-1/3 h-2/3 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/[0.01] via-transparent to-transparent" />
      </div>

      <div className="max-w-[1800px] mx-auto w-full px-6 lg:px-12 relative z-10 flex-1 flex flex-col justify-between py-8">
        
        {/* TOP SECTION: REFINED BOLD TYPOGRAPHY & CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-10 bg-red-900/20" />
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#450a0a]/60">
                  {slides[currentSlide].tag}
                </span>
              </div>

              {/* Scaled down heading sizes with more words */}
              <h1 className="text-4xl md:text-[4rem] lg:text-[5.5rem] font-bold tracking-tight text-[#450a0a] leading-[0.9] mb-3">
                {slides[currentSlide].title}
              </h1>
              <div className="flex items-center gap-6 pl-1 mb-8">
                 <h2 className="text-2xl md:text-4xl lg:text-5xl font-black italic text-red-900 whitespace-nowrap leading-none">
                  {slides[currentSlide].subtitle}
                </h2>
                <div className="hidden md:block h-px flex-1 bg-red-900/10 max-w-[120px]" />
              </div>

              {/* DESCRIPTION & SHOP NOW */}
              <div className="max-w-md space-y-6">
                <p className="text-[#7A7A75] text-base md:text-lg font-light leading-relaxed">
                  {slides[currentSlide].desc}
                </p>
                <div className="flex items-center gap-6">
                  <Link 
                    to="/shop" 
                    className="group relative inline-flex h-14 px-10 bg-[#450a0a] text-white rounded-full items-center justify-center gap-4 transition-all hover:scale-[1.05] shadow-lg shadow-red-900/20"
                  >
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em]">Shop Now</span>
                    <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* --- RIGHT TOP AREA: CINEMATIC FRAME WITH INTEGRATED BUTTON --- */}
          <div className="hidden lg:block relative lg:-translate-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-[420px] h-[280px] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white bg-white group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`detail-bg-${currentSlide}`}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full relative"
                >
                  <img src={slides[currentSlide].banner} className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-red-950/10 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Integrated Heritage Label & Button Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-4">
                    
                    
                    <Link 
                      to="/shop" 
                      className="group/btn h-12 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white text-white hover:text-[#450a0a] rounded-2xl flex items-center justify-between px-6 transition-all duration-500"
                    >
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.1em]">Browse Collection</span>
                      <MoveRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION: STABLE PRODUCT STAGE WITH FLOATING SPECS */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-[500px] mt-4 overflow-visible">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`product-stage-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full flex items-center justify-center relative"
              >
                <div className="relative w-full h-full max-w-[2000px] flex items-center justify-center">
                  
                  {/* FLOATING SPEC LABELS */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <motion.div 
                      initial={{ opacity: 0, x: -20, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute top-[25%] left-[20%] bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-red-900/5 shadow-xl flex items-center gap-2.5"
                    >
                      <div className="h-6 w-6 rounded-full bg-[#450a0a] flex items-center justify-center text-white">
                        {slides[currentSlide].specs[0].icon}
                      </div>
                      <span className="text-[11px] font-bold text-[#450a0a] whitespace-nowrap">{slides[currentSlide].specs[0].label}</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 20, y: -20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="absolute bottom-[30%] right-[20%] bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-red-900/5 shadow-xl flex items-center gap-2.5"
                    >
                      <div className="h-6 w-6 rounded-full bg-[#450a0a] flex items-center justify-center text-white">
                        {slides[currentSlide].specs[1].icon}
                      </div>
                      <span className="text-[11px] font-bold text-[#450a0a] whitespace-nowrap">{slides[currentSlide].specs[1].label}</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute top-[20%] right-[25%] bg-[#450a0a] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2"
                    >
                      <span className="text-[9px] font-bold text-white uppercase tracking-widest">{slides[currentSlide].specs[2].label}</span>
                      <Sparkles size={10} className="text-white/60" />
                    </motion.div>
                  </div>

                  <motion.img 
                    key={`img-${currentSlide}`}
                    initial={{ scale: 0.85, y: 30, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: -20, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    src={slides[currentSlide].image} 
                    className="max-h-full max-w-full object-contain drop-shadow-[0_40px_80px_rgba(69,10,10,0.12)] relative z-10" 
                    alt="Quality Product" 
                  />
                  
                  <div className="absolute inset-0 bg-red-900/[0.02] rounded-full blur-[120px] scale-75 -z-10" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Overlay */}
          <div className="absolute inset-x-0 bottom-4 px-6 md:px-12 flex items-center justify-between z-30">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className="group py-3">
                  <div className={cn(
                    "h-1 rounded-full transition-all duration-700",
                    currentSlide === i ? "w-12 bg-[#450a0a]" : "w-3 bg-[#450a0a]/10 group-hover:bg-[#450a0a]/30"
                  )} />
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={prevSlide} className="h-12 w-12 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm flex items-center justify-center text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all duration-500">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="h-12 w-12 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm flex items-center justify-center text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all duration-500">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
