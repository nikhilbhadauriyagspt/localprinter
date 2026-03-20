import { MoveRight, Sparkles, Trophy, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import banner7 from "@/assets/bannerr/banner7.jpg";

export default function Collections() {
  return (
    <section className="bg-[#FAF9F6] py-20 md:py-32 font-jakarta overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        <div className="relative group">
          {/* --- MAIN SHOWCASE BOX --- */}
          <div className="relative flex flex-col lg:flex-row-reverse items-stretch bg-[#0A0A0A] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
            
            {/* --- IMAGE LAYER (RIGHT/LEFT ON DESKTOP) --- */}
            <div className="w-full lg:w-[60%] min-h-[400px] lg:min-h-[650px] relative overflow-hidden">
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={banner7}
                  alt="Flagship Performance"
                  className="w-full h-full object-cover transition-transform duration-[8000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black via-black/20 to-transparent hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </motion.div>

              {/* Decorative Floating Frame on Image */}
              <div className="absolute top-10 right-10 flex flex-col items-end gap-4">
                 <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl"
                 >
                    <Award size={32} className="text-white opacity-80" />
                 </motion.div>
              </div>
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="relative z-20 w-full lg:w-[40%] p-12 md:p-20 flex flex-col justify-center space-y-12">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="h-px w-12 bg-red-500/40" />
                  <span className="text-[11px] font-black tracking-[0.5em] uppercase text-white/40">
                    Industry Leader
                  </span>
                </motion.div>

                <div className="space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.85]"
                  >
                    The Best <br />
                    <span className="italic font-black text-red-600/20">Printing</span>
                  </motion.h2>
                  <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-[10px]">Professional Grade Solutions</p>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-white/50 font-light leading-relaxed max-w-sm"
                >
                  Unlock unparalleled output quality with our flagship series. Engineered for the most demanding creative environments.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/shop"
                  className="group relative h-16 px-12 bg-red-700 text-white rounded-2xl flex items-center justify-between transition-all hover:scale-[1.02] shadow-[0_20px_50px_rgba(185,28,28,0.3)]"
                >
                  <span className="text-[12px] font-black uppercase tracking-[0.3em]">View Lineup</span>
                  <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>

          </div>

          {/* Exterior Decorative Label */}
          <div className="absolute -left-10 bottom-20 hidden xl:block -rotate-90 origin-bottom-left select-none">
            <span className="text-[10px] font-black tracking-[1em] uppercase text-[#450a0a]/10">Flagship Collection 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
}
