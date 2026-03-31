import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, ChevronDown, Send, MapPin, MessageSquare } from 'lucide-react';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General question',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General question',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO
        title="Contact Us "
        description="Get in touch with Local Printer for product questions, support, and general inquiries."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-16 md:pb-20">
        <div className="absolute top-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-amber-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-amber-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 mb-5">
              Contact Us
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-slate-900">
              We’re here to <span className="text-amber-500">help</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-amber-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Have a question about our products or need support with your order? Send us a message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="xl:col-span-4"
            >
              <div className="rounded-[34px] border border-slate-200 bg-[#111111] p-7 md:p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-300 mb-5">
                  Reach Us
                </span>

                <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-4">
                  Let’s make your
                  <span className="block text-amber-400">next step easy.</span>
                </h2>

                <p className="text-sm md:text-base font-medium leading-relaxed text-slate-300 mb-8">
                  Contact us for product questions, order support, or general help. We keep communication simple and clear.
                </p>

                <div className="space-y-4">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                          Email
                        </p>
                        <a
                          href="mailto:info@localprinter.shop"
                          className="text-sm md:text-base font-semibold text-white break-all hover:text-amber-300 transition-colors"
                        >
                          info@localprinter.shop
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                          Address
                        </p>
                        <p className="text-sm md:text-base font-semibold text-white leading-relaxed">
                          2026 W Flagler St. Miami, FL 33135, USA
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                          Support
                        </p>
                        <p className="text-sm md:text-base font-semibold text-white leading-relaxed">
                          General questions, product help, and order-related inquiries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side Form */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="xl:col-span-8"
            >
              <div className="rounded-[34px] border border-slate-200 bg-white p-6 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="py-10 md:py-14 text-center"
                    >
                      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-500">
                        <CheckCircle2 size={38} />
                      </div>

                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                        Message sent successfully
                      </h2>

                      <p className="mx-auto mb-8 max-w-md text-sm md:text-base font-medium leading-relaxed text-slate-500">
                        Thank you for contacting us. Our team will review your message and respond as soon as possible.
                      </p>

                      <button
                        onClick={() => setStatus(null)}
                        className="rounded-full bg-amber-500 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-950 transition-all hover:bg-amber-400"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div>
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-4">
                          Send a Message
                        </span>

                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-3">
                          Tell us how we can
                          <span className="block text-amber-500">help you.</span>
                        </h2>

                        <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500">
                          Fill out the form below and share your question with us.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[13px] font-black text-slate-900">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[13px] font-black text-slate-900">Email Address</label>
                          <input
                            required
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[13px] font-black text-slate-900">Phone (Optional)</label>
                          <input
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[13px] font-black text-slate-900">Subject</label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-5 pr-12 text-sm font-semibold outline-none transition-all cursor-pointer focus:border-amber-400 focus:bg-white"
                            >
                              <option>General question</option>
                              <option>Product support</option>
                              <option>Order help</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown
                              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                              size={18}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">Message</label>
                        <textarea
                          required
                          rows="6"
                          placeholder="Write your message here..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="min-h-[180px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                        <button
                          disabled={loading}
                          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-slate-900 px-8 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900 disabled:opacity-50"
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : "Submit Message"}
                          {!loading && <Send size={17} />}
                        </button>

                        {status === 'error' && (
                          <p className="text-sm font-semibold text-red-600">
                            Failed to send message. Please try again.
                          </p>
                        )}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}