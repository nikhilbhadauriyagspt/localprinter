import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight, ShoppingBag, Trash2, ChevronLeft, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/200x200?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
        <SEO title="Empty Cart " />

        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-16 md:pb-20">
          <div className="absolute top-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-amber-200/30 blur-[90px]" />
          <div className="relative w-full px-4 md:px-8 lg:px-12 text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 mb-5">
              Your Cart
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-slate-900">
              Cart is <span className="text-amber-500">Empty</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-amber-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              You have not added any products yet. Browse the shop and find the right printer for your needs.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="w-full px-4 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto rounded-[36px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-8 md:p-14 text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-amber-200 bg-amber-50 text-amber-500">
                <ShoppingBag size={42} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                Your shopping cart is empty
              </h2>

              <p className="max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-8">
                Start exploring our collection and add products to your cart when you are ready.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900"
              >
                Explore Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO title="Shopping Cart " />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-16 md:pb-20">
        <div className="absolute top-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-amber-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-amber-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 mb-5">
              Shopping Cart
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-slate-900">
              Review Your <span className="text-amber-500">Cart</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-amber-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Check your selected items, update quantities, and continue to checkout when ready.
            </p>
          </div>
        </div>
      </section>

      {/* New Layout */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

            {/* Left list */}
            <div className="xl:col-span-8 space-y-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Selected Items
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                    {cart.length} item{cart.length > 1 ? 's' : ''} in your cart
                  </h2>
                </div>

                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-amber-600 transition-colors"
                >
                  <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  Continue Shopping
                </Link>
              </div>

              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="rounded-[32px] border border-slate-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-amber-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)] gap-5 md:gap-6 items-center">
                      {/* image */}
                      <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-4 flex items-center justify-center min-h-[140px]">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="max-h-[120px] max-w-full object-contain"
                        />
                      </div>

                      {/* content */}
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <Link to={`/product/${item.slug}`}>
                              <h3 className="text-lg md:text-xl font-black leading-tight text-slate-900 hover:text-amber-600 transition-colors line-clamp-2">
                                {item.name}
                              </h3>
                            </Link>

                            <p className="mt-2 text-sm font-medium text-slate-500">
                              Simple product selection for your printing needs.
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 h-12 w-fit">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-slate-900 transition-all"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="w-10 text-center text-sm font-black text-slate-900">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-slate-900 transition-all"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          <div className="flex flex-col lg:items-end">
                            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                              ${parseFloat(item.price).toLocaleString()} each
                            </span>
                            <span className="mt-1 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right summary */}
            <div className="xl:col-span-4">
              <div className="sticky top-28 rounded-[34px] border border-slate-200 bg-[#111111] p-7 md:p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

                <div className="relative z-10">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-300 mb-5">
                    Order Summary
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-8">
                    Summary of
                    <span className="block text-amber-400">your order</span>
                  </h2>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
                      <span>Items total</span>
                      <span className="text-white">${total.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
                      <span>Shipping</span>
                      <span className="text-amber-300">Included</span>
                    </div>

                    <div className="h-px w-full bg-white/10" />

                    <div className="flex items-end justify-between gap-4">
                      <span className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
                        Total
                      </span>
                      <span className="text-4xl md:text-5xl font-black tracking-tight text-amber-400">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Link
                      to="/checkout"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-950 transition-all hover:bg-amber-300"
                    >
                      Proceed to Checkout
                      <ArrowRight size={16} />
                    </Link>

                    <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-300">
                      <ShieldCheck size={15} className="text-amber-300" />
                      Secure Checkout
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}