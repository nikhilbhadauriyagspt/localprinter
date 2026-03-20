import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Buying",
    questions: [
      { q: "How do I buy a printer?", a: "It's easy! Just pick the printer you like, add it to your cart, and follow the steps at checkout to pay." },     
      { q: "Do I need an account to shop?", a: "No, you can check out as a guest. But having an account helps you see your order history later." },
      { q: "Where can I see my order?", a: "We'll send you an email as soon as you buy something. You can also check 'Track Order' at the top of the page." },
      { q: "Can I change my mind after buying?", a: "If we haven't sent your printer yet, we can change or cancel your order. Just message us as soon as possible!" },
      { q: "What ways can I pay?", a: "We take all major bank cards and PayPal. Everything is kept safe and private." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "Where do you deliver?", a: "We deliver to all homes and offices across the country." },
      { q: "How long will it take to get my printer?", a: "Most orders arrive in 3 to 7 days. We'll let you know exactly when it's on its way." },
      { q: "How much is the delivery fee?", a: "The fee depends on where you live and how heavy the printer is. You'll see the total before you pay." },
      { q: "How do I know where my package is?", a: "We'll email you a tracking number. You can use this to see where your printer is at any time." },
      { q: "What if I'm not home when it arrives?", a: "The delivery person will usually leave a note or try again the next day." }
    ]
  },
  {
    category: "About the Printers",
    questions: [
      { q: "Are the printers brand new?", a: "Yes, 100%. We only sell brand new, original printers in their original boxes." },
      { q: "Will I get a warranty?", a: "Yes, all printers come with a full warranty, so you're always protected." },
      { q: "Do you help with setting it up?", a: "Yes! If you find it hard to get your printer working, just reach out. We can guide you through it." },
      { q: "Do you sell ink and toner too?", a: "Yes, we have all the original ink and toner you'll need to keep printing." },
      { q: "How do I know which printer is best for me?", a: "Just think about what you print most. For letters and documents, a laser printer is great. For photos, go with inkjet. Still not sure? Ask us!" }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "Can I return a printer?", a: "Yes, if the printer is still in its box and hasn't been used, you can return it within 14 days." },
      { q: "How do I get my money back?", a: "Once we get the printer back and check it, we'll send your money back to your card within a few days." },
      { q: "What if the printer is broken?", a: "If there's any problem when it arrives, let us know right away. We will fix it or send you a new one." }
    ]
  },
  {
    category: "Support & Help",
    questions: [
      { q: "How can I contact you?", a: "You can send us an email or use the form on our Contact page. We're here to help every day." },
      { q: "When are you open?", a: "Our website is always open! Our team answers messages throughout the day, usually within 24 hours." },
      { q: "Can you help me find the right ink?", a: "Of course! Just tell us the name of your printer and we'll show you exactly what ink you need." }
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO 
        title="FAQ | DominicPrinters" 
        description="Find simple answers to your questions about printers, delivery, and support."
      />

      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>
      
      {/* --- HERO HEADER --- */}
      <section className="relative pt-28 pb-12 px-6 lg:px-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#450a0a] tracking-tight leading-[0.9]"
        >
          Common <span className="font-black italic text-red-900 whitespace-nowrap">Questions</span>
        </motion.h1>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- CATEGORY NAVIGATION: BOUTIQUE STYLE --- */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#450a0a] flex items-center justify-center text-white shadow-lg">
                  <HelpCircle size={18} />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#450a0a]">Categories</h4>
              </div>
              
              <div className="flex flex-col gap-3">
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                    className={cn(
                      "w-full text-left p-5 rounded-[2rem] text-[13px] font-bold transition-all uppercase tracking-widest border",
                      activeCategory === f.category 
                        ? "bg-[#450a0a] text-white border-[#450a0a] shadow-xl" 
                        : "bg-white text-[#450a0a]/40 border-red-900/5 hover:border-[#450a0a] hover:text-[#450a0a]"
                    )}
                  >
                    {f.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Bento Block */}
            <div className="p-8 rounded-[3rem] bg-white border border-red-900/5 shadow-sm space-y-4">
               <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#450a0a]">Support Live</span>
               </div>
               <p className="text-[13px] text-[#7A7A75] font-medium leading-relaxed">
                 Can't find what you need? Our team is available for direct assistance.
               </p>
            </div>
          </div>

          {/* --- ACCORDION PANEL: REFINED CANVAS --- */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {filteredFaqs.map((faq, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "bg-white rounded-[2.5rem] transition-all duration-500 overflow-hidden border border-red-900/5 shadow-sm",
                        activeIdx === i ? "shadow-xl border-[#450a0a]/10" : "hover:shadow-md"
                      )}
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between p-8 text-left group"
                      >
                        <span className={cn(
                          "text-lg font-bold transition-colors leading-snug pr-8",
                          activeIdx === i ? "text-[#450a0a]" : "text-[#450a0a]/60 group-hover:text-[#450a0a]"
                        )}>
                          {faq.q}
                        </span>
                        <div className={cn(
                          "h-10 w-10 rounded-full border border-red-900/5 flex items-center justify-center transition-all duration-500 shrink-0",
                          activeIdx === i ? "bg-[#450a0a] text-white rotate-180" : "bg-[#FAF9F6] text-[#450a0a]/40 group-hover:bg-[#450a0a] group-hover:text-white"
                        )}>
                          <ChevronDown size={18} strokeWidth={2} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {activeIdx === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                          >
                            <div className="px-8 pb-10 pt-2">
                              <div className="h-px w-full bg-red-900/5 mb-8" />
                              <p className="text-[#7A7A75] text-lg font-light leading-relaxed max-w-2xl">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <section className="py-32 md:py-48 bg-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/[0.02] rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-[#450a0a] tracking-tighter leading-[0.9]">
              Still Need <span className="font-black italic text-red-900 whitespace-nowrap">Clarity?</span>
            </h2>
          </div>

          <div className="flex justify-center">
            <Link 
              to="/contact" 
              className="group bg-[#450a0a] text-white px-12 h-16 flex items-center justify-center rounded-2xl font-bold text-[12px] uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl shadow-red-900/20"
            >
              <span>Speak with Our Team</span>
              <ArrowRight size={18} className="ml-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
