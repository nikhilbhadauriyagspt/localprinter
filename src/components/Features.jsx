import React from 'react';
import { Globe, ShieldCheck, Box, RefreshCcw } from 'lucide-react';

const features = [
  {
    icon: <Globe className="text-amber-500 group-hover:text-slate-900" size={20} strokeWidth={2.5} />,
    title: "Global Shipping",
    desc: "Reliable worldwide delivery."
  },
  {
    icon: <ShieldCheck className="text-amber-500 group-hover:text-slate-900" size={20} strokeWidth={2.5} />,
    title: "Secure Checkout",
    desc: "100% protected payments."
  },
  {
    icon: <Box className="text-amber-500 group-hover:text-slate-900" size={20} strokeWidth={2.5} />,
    title: "Elite Inventory",
    desc: "Curated reliable printing."
  },
  {
    icon: <RefreshCcw className="text-amber-500 group-hover:text-slate-900" size={20} strokeWidth={2.5} />,
    title: "Easy Returns",
    desc: "Hassle-free 30-day policy."
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className="mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-center gap-4">
                <div className="relative shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-slate-50 border border-amber-100 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-400 group-hover:border-amber-400">
                  <div className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-amber-200/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.icon}
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="text-[13px] md:text-[14px] font-black text-slate-900 uppercase tracking-[0.12em] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-slate-500 text-[11px] md:text-[12px] font-semibold leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}