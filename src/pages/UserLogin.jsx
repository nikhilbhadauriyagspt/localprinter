import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles, UserCircle } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-jakarta text-[#450a0a] overflow-x-hidden pt-15 pb-20">
      <SEO title="Sign In | DominicPrinters" />
      
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>

      <div className="max-w-[480px] w-full mx-auto relative px-6 z-10">
        {/* --- MAJESTIC HEADER (Matches Contact/Shop) --- */}
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
            Welcome <span className="font-black italic text-red-900 whitespace-nowrap">Back</span>
          </motion.h1>
        </div>

        {/* --- FORM PANEL: BENTO CANVAS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[3.5rem] p-8 md:p-12 border border-red-900/5 shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)]"
        >
          <form onSubmit={handleLogin} className="space-y-10">
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
              {/* Identity Field */}
              <div className="space-y-4 group">
                <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Identity</label>
                <div className="relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors">
                    <UserCircle size={18} strokeWidth={1.5} />
                  </div>
                  <input 
                    required type="email" placeholder="YOUR EMAIL ADDRESS" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-4 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em]">Secret Key</label>
                  <Link to="#" className="text-[9px] font-black text-red-600 hover:text-[#450a0a] transition-colors uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors">
                    <Lock size={18} strokeWidth={1.5} />
                  </div>
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-8 pr-12 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-red-900/20 hover:text-[#450a0a] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                disabled={loading}
                className="group relative w-full inline-flex items-center justify-center gap-6 bg-[#450a0a] text-white h-16 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl shadow-red-900/20 active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 text-[12px] font-bold uppercase tracking-[0.3em]">
                  {loading ? "Authenticating..." : "Sign In"}
                </span>
                {!loading && <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />}
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-red-900/5 text-center">
            <p className="text-[10px] font-bold text-[#450a0a]/40 uppercase tracking-[0.2em]">
              New to our Atelier?
              <Link to="/signup" className="text-red-600 border-b-2 border-red-600/20 pb-0.5 ml-3 hover:text-[#450a0a] hover:border-[#450a0a] transition-all">Join Now</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
