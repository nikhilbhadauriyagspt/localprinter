import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  Loader2,
  CheckCircle2,
  Package,
  Phone,
  Wallet,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'paypal',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();

          if (data && data.address) {
            const addr = data.address;
            setFormData(prev => ({
              ...prev,
              city: addr.city || addr.town || addr.village || addr.suburb || '',
              zipCode: addr.postcode || '',
              address:
                `${addr.road || ''} ${addr.neighbourhood || addr.suburb || ''}`.trim() ||
                data.display_name.split(',')[0]
            }));
          }
        } catch (err) {}
      });
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotal = total;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: total,
        items: cart,
        payment_details: paymentDetails,
        source: 'axelprinting.shop',
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setOrderId(data.order_id || data.data?.order_code || data.data?.id);
        setStep(3);
        clearCart();
      } else {
        alert(data.message || 'Error placing order.');
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (step === 1) {
      window.scrollTo(0, 0);
      setStep(2);
    } else if (formData.paymentMethod === 'cod') {
      await handleOrderSuccess();
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/100x100?text=Product";
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
        <SEO title="Empty Cart " />

        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-16">
          <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
          <div className="relative w-full px-4 md:px-8 lg:px-12 text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
              Checkout
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
              No items for <span className="text-blue-500">checkout</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-blue-500 mx-auto" />
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto rounded-[36px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-8 md:p-14 text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-blue-200 bg-blue-50 text-blue-500">
              <Package size={40} />
            </div>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
              Your cart is empty
            </h2>

            <p className="max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-8">
              Please add some products to your cart before moving to checkout.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
            >
              Return to Shop
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
        <SEO title="Order Confirmed " />

        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 py-24">
          <div className="max-w-3xl mx-auto w-full rounded-[40px] border border-slate-200 bg-white p-8 md:p-14 text-center shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-500"
            >
              <CheckCircle2 size={42} />
            </motion.div>

            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 mb-5">
              Order Confirmed
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] text-slate-900 mb-4">
              Thank you for your order
            </h1>

            <p className="max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-3">
              Your order has been placed successfully.
            </p>

            <p className="max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-10">
              Order ID: <span className="font-black text-slate-900">#{orderId}</span><br />
              Confirmation sent to <span className="font-black text-slate-900">{formData.email}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/orders"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
              >
                Track Order
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
              >
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO title="Secure Checkout " />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-14">
        <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 mb-5">
                Secure Checkout
              </span>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
                {step === 1 ? 'Shipping Details' : 'Payment Method'}
              </h1>

              <p className="mt-4 text-sm md:text-base font-medium text-slate-500">
                Step {step} of 2
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    step >= s ? "w-12 bg-blue-500" : "w-8 bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          {/* Left content */}
          <div className="xl:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  className="space-y-8"
                >
                  {/* Contact block */}
                  <div className="rounded-[34px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-500">
                        <Mail size={20} />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                          Contact
                        </span>
                        <h2 className="text-2xl font-black text-slate-900">Contact Information</h2>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[13px] font-black text-slate-900">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Shipping block */}
                  <div className="rounded-[34px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-500">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                          Shipping
                        </span>
                        <h2 className="text-2xl font-black text-slate-900">Shipping Details</h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">First Name</label>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all focus:border-blue-400 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">Last Name</label>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all focus:border-blue-400 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[13px] font-black text-slate-900">Street Address</label>
                        <input
                          required
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all focus:border-blue-400 focus:bg-white"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">City</label>
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all focus:border-blue-400 focus:bg-white"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[13px] font-black text-slate-900">Zip Code</label>
                        <input
                          required
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold outline-none transition-all focus:border-blue-400 focus:bg-white"
                        />
                      </div>

                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[13px] font-black text-slate-900">Phone Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all focus:border-blue-400 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        type="submit"
                        className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
                      >
                        Continue to Payment
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  className="space-y-8"
                >
                  <div className="rounded-[34px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-500">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                          Payment
                        </span>
                        <h2 className="text-2xl font-black text-slate-900">Choose Payment Method</h2>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {[
                        {
                          id: 'paypal',
                          label: 'PayPal / Card',
                          icon: CreditCard,
                          desc: 'Pay securely with PayPal or card.'
                        },
                        {
                          id: 'cod',
                          label: 'Cash on Delivery',
                          icon: Wallet,
                          desc: 'Pay when your order is delivered.'
                        }
                      ].map((method) => (
                        <button
                          type="button"
                          key={method.id}
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className={cn(
                            "w-full rounded-[24px] border p-5 text-left transition-all duration-300",
                            formData.paymentMethod === method.id
                              ? "border-blue-300 bg-blue-50"
                              : "border-slate-200 bg-white hover:border-blue-200"
                          )}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-2xl border",
                                formData.paymentMethod === method.id
                                  ? "border-blue-300 bg-white text-blue-500"
                                  : "border-slate-200 bg-slate-50 text-slate-400"
                              )}>
                                <method.icon size={18} />
                              </div>

                              <div>
                                <p className="text-base font-black text-slate-900">
                                  {method.label}
                                </p>
                                <p className="text-sm font-medium text-slate-500">
                                  {method.desc}
                                </p>
                              </div>
                            </div>

                            <div className={cn(
                              "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                              formData.paymentMethod === method.id
                                ? "border-blue-500"
                                : "border-slate-300"
                            )}>
                              {formData.paymentMethod === method.id && (
                                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-8 flex flex-col items-start gap-4">
                      {formData.paymentMethod === 'paypal' ? (
                        <div className="w-full max-w-md">
                          <PayPalButtons
                            style={{ layout: "vertical", shape: "rect", label: "pay" }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: { value: total.toString() }
                                  }
                                ]
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order.capture().then((details) => {
                                handleOrderSuccess(details);
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900 disabled:opacity-50"
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Complete Order'}
                          {!loading && <CheckCircle2 size={16} />}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        <ChevronLeft size={16} />
                        Change Shipping Info
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right summary */}
          <div className="xl:col-span-4">
            <div className="sticky top-28 rounded-[34px] border border-slate-200 bg-[#111111] p-6 md:p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-blue-400/10 blur-3xl" />

              <div className="relative z-10">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-300 mb-5">
                  Order Summary
                </span>

                <h2 className="text-3xl font-black leading-[1.08] tracking-tight mb-6">
                  Review your
                  <span className="block text-blue-400">items</span>
                </h2>

                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-1 text-sm font-black text-white">
                          {item.name}
                        </h4>
                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-black text-blue-300">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
                    <span>Shipping</span>
                    <span className="text-blue-300">Free</span>
                  </div>

                  <div className="h-px w-full bg-white/10" />

                  <div className="flex items-end justify-between gap-4">
                    <span className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
                      Grand Total
                    </span>
                    <span className="text-4xl font-black tracking-tight text-blue-400">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-300">
                  <Lock size={14} className="text-blue-300" />
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>

        </form>
      </section>
    </div>
  );
}