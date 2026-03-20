import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Loader2, Sparkles, UserPlus } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-jakarta text-[#450a0a] overflow-x-hidden pt-8 pb-20">
      <SEO title="Join Us | DominicPrinters" />
      
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>

      <div className="max-w-[540px] w-full mx-auto relative px-6 z-10">
        {/* --- MAJESTIC HEADER --- */}
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4"
          >
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-[#450a0a] tracking-tight leading-[0.9]"
          >
            Create <span className="font-black italic text-red-900 whitespace-nowrap">Account</span>
          </motion.h1>
        </div>

        {/* --- FORM PANEL: BENTO CANVAS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[3.5rem] p-8 md:p-12 border border-red-900/5 shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)]"
        >
          <form onSubmit={handleSignup} className="space-y-10">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest text-center border border-red-100 rounded-2xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 group">
                  <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors" size={16} strokeWidth={1.5} />
                    <input 
                      required type="text" placeholder="NAME" value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-12 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                    />
                  </div>
                </div>
                <div className="space-y-4 group">
                  <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors" size={16} strokeWidth={1.5} />
                    <input 
                      required type="tel" placeholder="MOBILE" value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full h-12 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 group">
                <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Identity</label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    required type="email" placeholder="EMAIL ADDRESS" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-12 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 group">
                  <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors" size={16} strokeWidth={1.5} />
                    <input 
                      required type="password" placeholder="••••••••" value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full h-12 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                    />
                  </div>
                </div>
                <div className="space-y-4 group">
                  <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Confirm</label>
                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors" size={16} strokeWidth={1.5} />
                    <input 
                      required type="password" placeholder="••••••••" value={formData.password_confirmation}
                      onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                      className="w-full h-12 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                disabled={loading}
                className="group relative w-full inline-flex items-center justify-center gap-6 bg-[#450a0a] text-white h-16 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl shadow-red-900/20 active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 text-[12px] font-bold uppercase tracking-[0.3em]">
                  {loading ? "Creating..." : "Create Account"}
                </span>
                {!loading && <UserPlus size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />}
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-red-900/5 text-center">
            <p className="text-[10px] font-bold text-[#450a0a]/40 uppercase tracking-[0.2em]">
              Already a member?
              <Link to="/login" className="text-red-600 border-b-2 border-red-600/20 pb-0.5 ml-3 hover:text-[#450a0a] hover:border-[#450a0a] transition-all">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
