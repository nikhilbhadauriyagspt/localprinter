import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
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

    const payload = {
      type: 'user',
      identifier: email.trim(),
      email: email.trim(),
      user_email: email.trim(),
      guest_email: email.trim(),
      username: email.trim(),
      password: password
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.status === 'success') {
        const userData = data.data || data.user || data;
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        navigate('/profile');
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Could not connect to the authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO title="Sign In " />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-20 md:pt-24 pb-14 md:pb-16">
        <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-amber-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-amber-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 mb-5">
              Account Access
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
              Sign <span className="text-amber-500">In</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-amber-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Access your account to manage orders and continue shopping with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Main layout changed */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left side info panel */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-5"
            >
              <div className="h-full rounded-[36px] border border-slate-200 bg-[#111111] p-8 md:p-10 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

                <div className="relative z-10">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-300 mb-5">
                    Welcome Back
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-5">
                    Sign in to your
                    <span className="block text-amber-400">customer account</span>
                  </h2>

                  <p className="text-sm md:text-base font-medium leading-relaxed text-slate-300 mb-8">
                    Log in to check your profile, review orders, and continue your shopping journey.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Manage your account details",
                      "Track your recent orders",
                      "Continue shopping faster"
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
                          <ShieldCheck size={16} />
                        </div>
                        <span className="text-sm font-semibold text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side form panel */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="lg:col-span-7"
            >
              <div className="rounded-[36px] border border-slate-200 bg-white p-7 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                <div className="mb-8">
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-4">
                    Sign In Form
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-3">
                    Access your
                    <span className="block text-amber-500">account here</span>
                  </h2>

                  <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500">
                    Enter your login details below.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-7">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-3">
                    <label className="text-[13px] font-black text-slate-900">Email Address</label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <label className="text-[13px] font-black text-slate-900">Password</label>
                      <Link
                        to="#"
                        className="text-[12px] font-black text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-900"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 border-t border-slate-200 pt-7 text-center">
                  <p className="text-sm font-semibold text-slate-500">
                    New here?{' '}
                    <Link
                      to="/signup"
                      className="font-black text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}