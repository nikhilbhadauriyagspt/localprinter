import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, MessageCircle, ShieldCheck, Truck, Info, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders",
    icon: <ShieldCheck size={18} />,
    questions: [
      { q: "How do I place an order?", a: "Browse products, add the item to your cart, and complete checkout with your shipping and payment details." },
      { q: "Do I need an account to order?", a: "No, you can place an order as a guest. Creating an account simply makes future orders easier." },
      { q: "Can I cancel my order?", a: "If your order has not been shipped yet, you can contact support to request a cancellation." }
    ]
  },
  {
    category: "Shipping",
    icon: <Truck size={18} />,
    questions: [
      { q: "Where do you ship?", a: "We ship across the United States to both home and business addresses." },
      { q: "How long does delivery take?", a: "Delivery times may vary, but standard shipping usually takes a few business days." },
      { q: "How can I track my shipment?", a: "Once your order is shipped, you will receive tracking details by email." }
    ]
  },
  {
    category: "Products",
    icon: <Info size={18} />,
    questions: [
      { q: "Are your products new?", a: "Yes, all listed products are new and ready for purchase unless otherwise stated." },
      { q: "Do printers come with warranty?", a: "Warranty details depend on the product and manufacturer. You can review the details on the product page." },
      { q: "How do I choose the right printer?", a: "You can compare features on the product pages or contact us if you need help selecting the right option." }
    ]
  },
  {
    category: "Returns",
    icon: <RotateCcw size={18} />,
    questions: [
      { q: "Can I return a product?", a: "Return eligibility depends on the product condition and return policy terms." },
      { q: "What if my item arrives damaged?", a: "If your item arrives damaged, contact us as soon as possible so we can assist you." },
      { q: "How are refunds processed?", a: "Approved refunds are sent back to the original payment method." }
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find(f => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO
        title="Frequently Asked Questions "
        description="Find answers to common questions about orders, shipping, products, and returns."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-16 md:pb-20">
        <div className="absolute top-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
              Help Center
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-slate-900">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-blue-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Find quick answers about orders, shipping, products, and returns.
            </p>
          </div>
        </div>
      </section>

      {/* New layout */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

            {/* Left sidebar */}
            <div className="xl:col-span-4">
              <div className="rounded-[34px] border border-slate-200 bg-[#111111] p-6 md:p-8 text-white sticky top-28">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-300 mb-5">
                  Browse Topics
                </span>

                <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-4">
                  Need quick
                  <span className="block text-blue-400">answers?</span>
                </h2>

                <p className="text-sm md:text-base font-medium leading-relaxed text-slate-300 mb-8">
                  Choose a category and view the most common questions in one place.
                </p>

                <div className="space-y-3">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        "w-full text-left rounded-2xl px-5 py-4 border transition-all duration-300 flex items-center gap-3 text-sm font-black uppercase tracking-[0.08em]",
                        activeCategory === f.category
                          ? "bg-blue-400 text-slate-950 border-blue-400"
                          : "bg-white/5 text-white border-white/10 hover:border-blue-300 hover:text-blue-300"
                      )}
                    >
                      <span>{f.icon}</span>
                      {f.category}
                    </button>
                  ))}
                </div>

                <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3 mb-3 text-blue-300">
                    <MessageCircle size={18} />
                    <h4 className="text-sm font-black uppercase tracking-[0.14em]">
                      Need More Help
                    </h4>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-slate-300 mb-4">
                    If you still need help, contact us and our team will assist you.
                  </p>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-black text-white hover:text-blue-300 transition-colors"
                  >
                    Contact Us
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right accordion area */}
            <div className="xl:col-span-8">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-500">
                  {currentCategoryData?.icon}
                </div>

                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Selected Category
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {activeCategory}
                  </h2>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {filteredFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-[28px] border overflow-hidden transition-all duration-300 bg-white",
                        activeIdx === i
                          ? "border-blue-200 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                          : "border-slate-200 hover:border-blue-200"
                      )}
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-6 text-left group"
                      >
                        <span
                          className={cn(
                            "text-lg md:text-xl font-black leading-snug transition-colors",
                            activeIdx === i ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
                          )}
                        >
                          {faq.q}
                        </span>

                        <div
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300",
                            activeIdx === i
                              ? "bg-blue-500 text-slate-950 border-blue-500 rotate-180"
                              : "bg-slate-50 text-slate-500 border-slate-200 group-hover:border-blue-200 group-hover:text-blue-500"
                          )}
                        >
                          <ChevronDown size={20} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {activeIdx === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 md:px-8 pb-6 md:pb-8">
                              <div className="mb-5 h-px w-full bg-slate-200" />
                              <p className="text-sm md:text-base font-medium leading-relaxed text-slate-600 max-w-3xl">
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
      </section>

      {/* Bottom CTA */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="rounded-[36px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-8 md:p-12 text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 mb-5">
              Still Need Help
            </span>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-4">
              Looking for more support?
            </h2>

            <p className="max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-8">
              Contact us for more help or browse our products to find the right option for your needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}