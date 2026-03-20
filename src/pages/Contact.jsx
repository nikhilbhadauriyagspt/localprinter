import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, ChevronDown, Sparkles, MessageCircle, Send, Globe } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
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
        setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
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
    <div className="bg-[#FAF9F6] min-h-screen font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO 
        title="Contact Our Atelier | DominicPrinters" 
        description="Connect with DominicPrinters. Our dedicated team is here to help you."
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
          Contact <span className="font-black italic text-red-900 whitespace-nowrap">Us</span>
        </motion.h1>
      </section>

      {/* --- MAIN CONTACT CONTENT --- */}
      <section className="py-12 md:py-20 px-6 lg:px-16 relative z-10">
        <div className="max-w-[1440px] mx-auto space-y-20">
          
          {/* --- COMPACT INFO PILLS ROW (REDUCED) --- */}
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {[
              { icon: <Mail />, title: "Send an Email", value: "info@dominicprinters.shop" },
              { icon: <Globe />, title: "Visit Atelier", value: "1330 Keosauqua Way, Des Moines, IA 50309, United States" }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-6 rounded-[2.5rem] border border-red-900/5 shadow-sm hover:shadow-xl hover:border-[#450a0a]/10 transition-all duration-500 flex items-center gap-6 min-w-[320px]"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#FAF9F6] flex items-center justify-center text-[#450a0a] group-hover:bg-[#450a0a] group-hover:text-white transition-all duration-500 shadow-inner">
                  {React.cloneElement(card.icon, { size: 20, strokeWidth: 1.5 })}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-900/20">{card.title}</p>
                  <p className="text-[15px] font-bold text-[#450a0a]">{card.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* LEFT: SIMPLIFIED CONTENT */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px w-10 bg-red-900/20" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#450a0a]">Direct Assistance</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#450a0a] tracking-tight leading-tight">
                  How can we <br /> <span className="italic font-black text-red-900 text-5xl">help you?</span>
                </h2>
                <p className="text-lg text-[#7A7A75] font-light leading-relaxed">
                  Our team is here to listen and help you find exactly what you're looking for. Reach out to us for any questions or support.
                </p>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM CANVAS */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 lg:p-16 rounded-[4rem] border border-red-900/5 shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)]"
              >
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-24 w-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-red-100">
                        <CheckCircle2 size={40} strokeWidth={1} />
                      </div>
                      <h2 className="text-4xl font-bold text-[#450a0a] mb-4">Message Received.</h2>
                      <p className="text-[#7A7A75] mb-10 max-w-sm mx-auto font-light leading-relaxed">Thank you for reaching out. Our team will be in touch with you shortly.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="text-[11px] font-black uppercase tracking-[0.3em] text-[#450a0a] border-b-2 border-red-600 pb-1 hover:text-red-600 transition-all"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Identity</label>
                          <input 
                            required type="text" placeholder="YOUR FULL NAME" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Contact Email</label>
                          <input 
                            required type="email" placeholder="YOUR EMAIL ADDRESS" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Phone (Optional)</label>
                          <input 
                            type="tel" placeholder="YOUR MOBILE NUMBER" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Inquiry Motif</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-14 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all appearance-none cursor-pointer pr-12 text-[#450a0a]"
                            >
                              <option>General Inquiry</option>
                              <option>Product Support</option>
                              <option>Order Help</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-red-900/20 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Message Detail</label>
                        <textarea 
                          required rows="4" placeholder="HOW CAN WE ASSIST YOU TODAY?" value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full py-6 bg-[#FAF9F6] border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all resize-none placeholder:text-[#450a0a]/10 min-h-[120px]"
                        ></textarea>
                      </div>

                      <div className="pt-6">
                        <button 
                          disabled={loading}
                          className="group relative inline-flex items-center gap-10 bg-[#450a0a] text-white h-16 px-12 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl shadow-red-900/20 active:scale-95 disabled:opacity-50"
                        >
                          <span className="relative z-10 text-[12px] font-bold uppercase tracking-[0.3em]">
                            {loading ? "Transmitting..." : "Send Inquiry"}
                          </span>
                          {!loading && <Send size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1" />}
                          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mt-6">Transmission failed. Please verify detail.</p>}
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
