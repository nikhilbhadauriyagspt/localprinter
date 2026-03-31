import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  Package,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShoppingCart,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Profile() {
  const getInitialUser = () => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored || stored === 'undefined') return null;
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast('Profile updated successfully', 'success');
      }
    } catch (err) {
      showToast('Update failed', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast('Password changed successfully', 'success');
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast('Security update failed', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO title="My Account | Inktrix Printers" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-20 md:pt-24 pb-14 md:pb-16">
        <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-amber-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-amber-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 mb-5">
                My Account
              </span>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
                Account <span className="text-amber-500">Profile</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm md:text-base font-medium leading-relaxed text-slate-500">
                Manage your details, review your orders, and update your account settings.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Main layout */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

            {/* Left side */}
            <div className="xl:col-span-4 space-y-6">
              <div className="rounded-[36px] border border-slate-200 bg-[#111111] p-8 md:p-10 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-amber-400 text-slate-950">
                    <User size={28} />
                  </div>

                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-300 mb-5">
                    Account Summary
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-3">
                    Welcome
                    <span className="block text-amber-400">{user.name}</span>
                  </h2>

                  <p className="text-sm md:text-base font-medium leading-relaxed text-slate-300 mb-8">
                    Keep your account details updated and review recent purchases from one place.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-amber-300" />
                        <span className="text-sm font-semibold text-white break-all">{user.email}</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-amber-300" />
                        <span className="text-sm font-semibold text-white">
                          {profileForm.phone || 'No phone added'}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-amber-300 mt-0.5" />
                        <span className="text-sm font-semibold text-white leading-relaxed">
                          {profileForm.address || 'No address added'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                <div className="space-y-2">
                  {[
                    { id: 'profile', label: 'My Details', icon: User },
                    { id: 'orders', label: 'Order History', icon: Package },
                    { id: 'security', label: 'Account Security', icon: Lock }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-black transition-all border",
                        activeTab === tab.id
                          ? "bg-amber-50 text-slate-900 border-amber-200"
                          : "bg-white text-slate-500 border-transparent hover:border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon size={18} className={activeTab === tab.id ? "text-amber-600" : ""} />
                        {tab.label}
                      </div>
                      <ChevronRight size={16} className={activeTab === tab.id ? "text-amber-600" : "text-slate-300"} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="xl:col-span-8">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="rounded-[36px] border border-slate-200 bg-white p-7 md:p-10 lg:p-12 shadow-[0_18px_45px_rgba(15,23,42,0.04)]"
                  >
                    <div className="mb-8">
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-4">
                        Profile Details
                      </span>

                      <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-3">
                        Update your
                        <span className="block text-amber-500">personal details</span>
                      </h2>

                      <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500">
                        Keep your name, phone number, and address up to date.
                      </p>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[13px] font-black text-slate-900">Full Name</label>
                          <input
                            required
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all focus:border-amber-400 focus:bg-white"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[13px] font-black text-slate-900">Phone Number</label>
                          <input
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all focus:border-amber-400 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">Default Address</label>
                        <textarea
                          rows="4"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold outline-none transition-all resize-none focus:border-amber-400 focus:bg-white"
                        />
                      </div>

                      <button
                        disabled={isUpdating}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900 disabled:opacity-50"
                      >
                        {isUpdating ? 'Saving...' : 'Update Profile'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6"
                  >
                    <div className="rounded-[36px] border border-slate-200 bg-white p-7 md:p-10 lg:p-12 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-4">
                            Recent Orders
                          </span>

                          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-3">
                            Review your
                            <span className="block text-amber-500">recent purchases</span>
                          </h2>
                        </div>

                        <Link
                          to="/orders"
                          className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-amber-600 transition-colors"
                        >
                          View All History
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                      {loading ? (
                        <div className="py-20 flex flex-col items-center">
                          <Loader2 className="animate-spin text-amber-500 mb-4" />
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                            Loading Orders
                          </p>
                        </div>
                      ) : orders.length === 0 ? (
                        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] py-16 text-center">
                          <ShoppingCart size={42} strokeWidth={1.5} className="text-amber-400 mx-auto mb-6" />
                          <p className="text-lg font-black text-slate-900 mb-3">No orders found</p>
                          <p className="text-sm font-medium text-slate-500 mb-6">
                            Start shopping to see your order history here.
                          </p>
                          <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-amber-600 hover:text-amber-700"
                          >
                            Start Shopping
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {orders.slice(0, 5).map((order) => (
                            <div
                              key={order.id}
                              className="rounded-[24px] border border-slate-200 bg-slate-50/60 p-5 md:p-6 transition-all hover:border-amber-200"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-center">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                                    Order ID
                                  </p>
                                  <h4 className="text-sm font-black text-slate-900">
                                    #{order.order_code || order.id}
                                  </h4>
                                </div>

                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                                    Date
                                  </p>
                                  <p className="text-sm font-black text-slate-900">
                                    {new Date(order.created_at).toLocaleDateString()}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                                    Amount
                                  </p>
                                  <p className="text-sm font-black text-slate-900">
                                    ${parseFloat(order.total_amount).toLocaleString()}
                                  </p>
                                </div>

                                <div className="flex xl:justify-end">
                                  <div
                                    className={cn(
                                      "inline-flex rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] border",
                                      order.status === 'delivered'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                    )}
                                  >
                                    {order.status.replace('_', ' ')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="rounded-[36px] border border-slate-200 bg-white p-7 md:p-10 lg:p-12 shadow-[0_18px_45px_rgba(15,23,42,0.04)]"
                  >
                    <div className="mb-8">
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-4">
                        Security Settings
                      </span>

                      <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-3">
                        Update your
                        <span className="block text-amber-500">password</span>
                      </h2>

                      <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500">
                        Choose a new password and keep your account secure.
                      </p>
                    </div>

                    <form onSubmit={handleSecurityUpdate} className="space-y-7">
                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type={showPass ? 'text' : 'password'}
                            required
                            value={securityForm.password}
                            onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm font-semibold outline-none transition-all focus:border-amber-400 focus:bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                          >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">Confirm Password</label>
                        <div className="relative">
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type={showPass ? 'text' : 'password'}
                            required
                            value={securityForm.confirmPassword}
                            onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all focus:border-amber-400 focus:bg-white"
                          />
                        </div>
                      </div>

                      <button
                        disabled={isUpdating}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900 disabled:opacity-50"
                      >
                        {isUpdating ? 'Processing...' : 'Update Password'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}