import React from 'react';
import { ArrowRight, CheckCircle2, Printer, Shield, Truck, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

const About = () => {
  const highlights = [
    {
      icon: <Printer size={22} />,
      title: "Quality Products",
      desc: "A simple selection of printers and supplies for everyday needs."
    },
    {
      icon: <Shield size={22} />,
      title: "Trusted Support",
      desc: "Helpful assistance for choosing the right product."
    },
    {
      icon: <Truck size={22} />,
      title: "Fast Delivery",
      desc: "Smooth shipping process for quick order fulfillment."
    },
    {
      icon: <Headset size={22} />,
      title: "Customer First",
      desc: "Focused on making shopping easy and reliable."
    }
  ];

  const points = [
    "Easy-to-browse printer collection",
    "Useful options for home and office use",
    "Clear product information",
    "Simple and reliable shopping experience"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO
        title="About Local Printer | Reliable Printer Solutions"
        description="Learn about Local Printer and our focus on simple, reliable printer shopping and support."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-16 md:pb-20">
        <div className="absolute top-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-amber-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-amber-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 mb-5">
              About Us
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-slate-900">
              About <span className="text-amber-500">Local Printer</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-amber-500 mx-auto" />

            <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              We provide a simple and reliable place to explore printers, supplies, and essential solutions for everyday printing needs.
            </p>
          </div>
        </div>
      </section>

      {/* New main layout */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="rounded-[34px] border border-slate-200 bg-white p-7 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-5">
                  Who We Are
                </span>

                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-5">
                  Built to make printer shopping
                  <span className="block text-amber-500">simple and dependable.</span>
                </h2>

                <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-5">
                  Local Printer is focused on offering practical printing products with a smooth shopping experience. We believe customers should be able to find the right printer and accessories without confusion.
                </p>

                <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-8">
                  Our goal is to keep things clear, useful, and customer-friendly. From product browsing to checkout, we aim to make the experience easy for both home users and office buyers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {points.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                    >
                      <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right content */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="lg:col-span-5"
            >
              <div className="rounded-[34px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-7 md:p-8 h-full">
                <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-700 mb-5">
                  Our Approach
                </span>

                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-[1.1] text-slate-900 mb-5">
                  Clear products.
                  <span className="block text-amber-500">Better experience.</span>
                </h3>

                <div className="space-y-4">
                  {[
                    "Simple product discovery",
                    "Practical choices for users",
                    "Cleaner shopping journey",
                    "Support-focused experience"
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200 px-5 py-4 text-sm font-semibold text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-6 md:py-10">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-700 mb-4">
              Why Choose Us
            </span>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              What We Focus On
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              We keep our platform simple, useful, and focused on helping customers shop with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-500">
                  {item.icon}
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="rounded-[36px] border border-slate-200 bg-[#111111] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-8 md:p-12">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-300 mb-5">
                  Get Started
                </span>

                <h2 className="text-3xl md:text-4xl font-black leading-[1.08] text-white mb-4">
                  Explore products made for
                  <span className="block text-amber-400">everyday printing needs.</span>
                </h2>

                <p className="max-w-2xl text-sm md:text-base font-medium leading-relaxed text-slate-300">
                  Browse our collection and discover reliable options for your home, office, or workspace.
                </p>
              </div>

              <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-center gap-4 bg-white/5">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-950 transition-all hover:bg-amber-300"
                >
                  Browse Products
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-white hover:text-slate-900"
                >
                  Contact Us
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