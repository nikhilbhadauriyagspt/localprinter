import React from 'react';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

// Assets
import banner1 from '@/assets/bannerr/banner4.jpg';
import banner2 from '@/assets/bannerr/banner5.jpg';
import banner3 from '@/assets/bannerr/banner6.jpg';

const TripleBanners = () => {
  const banners = [
    {
      title: "Business Elite",
      highlight: "Laser Precision",
      description: "Optimized for high-volume output and clarity.",
      image: banner1,
      link: "/shop?category=laser-printers",
    },
    {
      title: "Creative Studio",
      highlight: "Inkjet Brilliance",
      description: "True-to-life colors for your most vivid projects.",
      image: banner2,
      link: "/shop?category=inkjet-printers",
    },
    {
      title: "Modern Office",
      highlight: "Smart Wireless",
      description: "Seamless connectivity for every workspace.",
      image: banner3,
      link: "/shop",
    }
  ];

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-28 font-jakarta overflow-hidden border-t border-red-900/5">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* --- EXPANDING GALLERY GRID --- */}
        <div className="flex flex-col md:flex-row h-[500px] md:h-[600px] gap-4 lg:gap-6">
          {banners.map((banner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex-1 hover:flex-[1.4] lg:hover:flex-[1.6] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative group overflow-hidden rounded-[3rem] border border-white shadow-lg bg-white"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                {/* Neutral Gradient Overlays */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#450a0a]/80 via-black/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">
                      {banner.title}
                    </h3>
                    <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
                      {banner.highlight}
                    </p>
                    {/* Added Description: Visible by default */}
                    <p className="text-white/40 text-[13px] font-light leading-relaxed max-w-[240px]">
                      {banner.description}
                    </p>
                  </div>

                  {/* Clean Link Overlay */}
                  <Link 
                    to={banner.link} 
                    className="flex items-center gap-3 text-white transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore</span>
                    <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <MoveRight size={14} className="text-white" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TripleBanners;
