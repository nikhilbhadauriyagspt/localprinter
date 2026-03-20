import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-jakarta pb-24 text-[#450a0a]">
      {/* --- HERITAGE BACKGROUND ACCENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-1/3 h-[40%] bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/[0.01] via-transparent to-transparent" />
      </div>

      {/* --- BOLD HERITAGE POLICY HEADER --- */}
      {title && (
        <section className="relative pt-15 pb-16 md:pt-15 md:pb-24 overflow-hidden">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-5xl space-y-12">
              
              {/* Badge & Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
              >
                <span className="h-px w-10 bg-red-900/20" />
                <div className="flex items-center gap-3 text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#450a0a]/60">
                  <Link to="/" className="hover:text-red-900 transition-colors">Home</Link>
                  <ChevronRight size={10} className="opacity-30" />
                  <span className="text-[#450a0a]">Legal Center</span>
                </div>
              </motion.div>

              {/* Cinematic Title Section */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="text-5xl md:text-[5.5rem] font-bold tracking-tight text-[#450a0a] "
                >
                  {title.split(' ').slice(0, -1).join(' ')} <span className="text-2xl md:text-5xl lg:text-6xl font-black italic text-red-900 whitespace-nowrap leading-none mt-2 block">
                    {title.split(' ').pop()}
                  </span>
                </motion.h1>
                
                {subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#7A7A75] text-base md:text-xl font-light max-w-2xl leading-relaxed pt-4"
                  >
                    {subtitle}
                  </motion.p>
                )}
              </div>

              {/* Meta Data Pill (Matching Hero Specs style) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-red-900/5 shadow-xl"
              >
                <div className="h-6 w-6 rounded-full bg-[#450a0a] flex items-center justify-center text-white">
                  <Clock size={12} strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-[#450a0a]/40 uppercase tracking-widest">Effective Date</span>
                  <div className="h-3 w-px bg-red-900/10" />
                  <span className="text-[11px] font-bold text-[#450a0a]">{lastUpdated}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* --- POLICY CONTENT --- */}
      <article className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12 md:py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl prose prose-slate prose-headings:font-bold prose-headings:text-[#450a0a] prose-h2:text-3xl prose-h2:pt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-red-900/5 prose-h2:pb-4 prose-p:text-[#7A7A75] prose-p:text-base prose-p:leading-relaxed prose-li:text-[#7A7A75] prose-li:text-base prose-strong:text-[#450a0a] prose-strong:font-semibold prose-a:text-red-900 prose-a:font-bold hover:prose-a:text-red-800 transition-colors"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
