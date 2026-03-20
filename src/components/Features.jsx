import { Truck, RotateCcw, Headset, ShieldCheck, Printer, Zap, Award, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={24} strokeWidth={1} />,
    title: "Express Printer Shipping",
    desc: "Direct to your creative workspace"
  },
  {
    icon: <RotateCcw size={24} strokeWidth={1} />,
    title: "Elite Satisfaction",
    desc: "Quality 30-day trial period"
  },
  {
    icon: <Zap size={24} strokeWidth={1} />,
    title: "Expert Concierge",
    desc: "Specialized expert hardware support"
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={1} />,
    title: "Imperial Security",
    desc: "Private encrypted transactions"
  }
];

export default function Features() {
  return (
    <section className="relative z-30 -mt-10 md:-mt-12 pb-20 font-jakarta">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto bg-white border border-red-900/5 shadow-[0_30px_70px_rgba(69,10,10,0.04)] rounded-[2.5rem] overflow-hidden backdrop-blur-xl bg-white/90">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-red-900/5">
            {features.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center text-center gap-6 p-12 lg:p-16 group hover:bg-red-50/30 transition-all duration-700"
              >
                {/* Icon Container */}
                <div className="h-16 w-16 border border-red-900/10 flex items-center justify-center rounded-2xl bg-white shadow-sm group-hover:bg-[#450a0a] group-hover:border-[#450a0a] transition-all duration-700 shrink-0">
                  <div className="group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-700 text-[#450a0a] group-hover:text-white">
                    {item.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h4 className="text-[13px] font-extrabold text-[#450a0a] tracking-widest uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#7A7A75] font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
