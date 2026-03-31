import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    removeFromCart,
    updateQuantity,
    cartCount
  } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/100x100?text=Product";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 z-[1000] bg-black/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[1001] flex w-full sm:w-[480px] md:w-[520px] flex-col overflow-hidden border-l border-slate-200 bg-white font-jakarta shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] to-white px-6 md:px-7 pt-7 pb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 mb-4">
                    Shopping Cart
                  </span>

                  <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-[1.05] text-slate-900">
                    Your <span className="text-amber-500">Cart</span>
                  </h2>

                  <p className="mt-2 text-[12px] md:text-[13px] font-semibold text-slate-500">
                    {cartCount} item{cartCount !== 1 ? 's' : ''} selected
                  </p>
                </div>

                <button
                  onClick={closeCartDrawer}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-slate-900"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50/60 px-5 md:px-6 py-5 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-[28px] border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-amber-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.06)]"
                    >
                      <div className="flex gap-4">
                        {/* image */}
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[22px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-3">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                              <h3 className="line-clamp-2 text-[14px] font-black leading-snug text-slate-900 transition-colors hover:text-amber-600">
                                {item.name}
                              </h3>
                            </Link>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-1 h-10">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-white hover:text-slate-900"
                              >
                                <Minus size={12} />
                              </button>

                              <span className="w-8 text-center text-sm font-black text-slate-900">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-white hover:text-slate-900"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                                Total
                              </span>
                              <span className="text-xl font-black tracking-tight text-slate-900">
                                ${(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center px-4">
                  <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] border border-amber-200 bg-amber-50 text-amber-500">
                    <ShoppingBag size={40} />
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-3">
                    Your cart is empty
                  </h3>

                  <p className="max-w-[260px] text-sm font-medium leading-relaxed text-slate-500 mb-7">
                    Browse products and add items to your cart when you are ready.
                  </p>

                  <Link
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-7 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900"
                  >
                    Explore Products
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-slate-200 bg-white px-5 md:px-6 py-5">
                <div className="rounded-[28px] bg-[#111111] p-5 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-amber-400/10 blur-3xl" />

                  <div className="relative z-10">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Order Summary
                      </span>
                      <span className="text-sm font-black text-amber-300">
                        ${total.toLocaleString()}
                      </span>
                    </div>

                    <div className="mb-5 flex items-center justify-between text-sm font-semibold text-slate-300">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>

                    <div className="mb-6 h-px w-full bg-white/10" />

                    <div className="mb-6">
                      <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                        Estimated Total
                      </span>
                      <span className="mt-1 block text-4xl font-black tracking-tight text-amber-400">
                        ${total.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Link
                        to="/checkout"
                        onClick={closeCartDrawer}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-950 transition-all hover:bg-amber-300"
                      >
                        Proceed to Checkout
                        <ArrowRight size={16} />
                      </Link>

                      <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-300">
                        <ShieldCheck size={14} className="text-amber-300" />
                        Safe & Secure Checkout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}