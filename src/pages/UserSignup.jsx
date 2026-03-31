import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user',
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO title="Create Account " />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-20 md:pt-24 pb-14 md:pb-16">
        <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
              Create Account
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
              Join <span className="text-blue-500">Local Printer</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-blue-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Create your account to manage orders, save details, and enjoy a smoother shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main layout */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left info side */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-5"
            >
              <div className="h-full rounded-[36px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-8 md:p-10 overflow-hidden relative">
                <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" />
                <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-slate-200/40 blur-2xl" />

                <div className="relative z-10">
                  <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 mb-5">
                    New Customer
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-5 text-slate-900">
                    Create your
                    <span className="block text-blue-500">account today</span>
                  </h2>

                  <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-8">
                    Sign up in a few simple steps and keep your shopping details in one place.
                  </p>

                  <div className="space-y-4">
                    {[
                      'Save your account details',
                      'View and manage your orders',
                      'Enjoy a faster checkout experience'
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-500">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right form side */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="lg:col-span-7"
            >
              <div className="rounded-[36px] border border-slate-200 bg-white p-7 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                <div className="mb-8">
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-4">
                    Sign Up Form
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-3">
                    Enter your
                    <span className="block text-blue-500">details below</span>
                  </h2>

                  <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500">
                    Fill in the form to create your customer account.
                  </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-7">
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
                    <label className="text-[13px] font-black text-slate-900">Full Name</label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        required
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                      />
                    </div>
                  </div>

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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[13px] font-black text-slate-900">Password</label>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          required
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[13px] font-black text-slate-900">Confirm Password</label>
                      <div className="relative">
                        <ShieldCheck
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          required
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-slate-600">
                      Show password fields
                    </span>
                  </label>

                  <button
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 border-t border-slate-200 pt-7 text-center">
                  <p className="text-sm font-semibold text-slate-500">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-black text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Sign In
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