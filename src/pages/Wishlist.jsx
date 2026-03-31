import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, ChevronLeft, Trash2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO
        title="My Wishlist | Inktrix Printers"
        description="Review your saved products and move them to cart when ready."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-20 md:pt-24 pb-14 md:pb-16">
        <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
              Wishlist
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
              Saved <span className="text-blue-500">Products</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-blue-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Keep your favorite products in one place and add them to cart whenever you are ready.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                <div className="lg:col-span-5">
                  <div className="h-full rounded-[36px] border border-slate-200 bg-[#111111] p-8 md:p-10 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />

                    <div className="relative z-10">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-300 mb-5">
                        No Saved Items
                      </span>

                      <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-5">
                        Your wishlist is
                        <span className="block text-blue-400">currently empty</span>
                      </h2>

                      <p className="text-sm md:text-base font-medium leading-relaxed text-slate-300 mb-8">
                        Browse the shop and save products that you want to review later.
                      </p>

                      <div className="space-y-4">
                        {[
                          'Save products for later',
                          'Compare your favorites easily',
                          'Move selected items to cart quickly'
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-400 text-slate-950">
                              <Heart size={16} fill="currentColor" />
                            </div>
                            <span className="text-sm font-semibold text-white">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="h-full rounded-[36px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-8 md:p-12 text-center flex flex-col items-center justify-center">
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-blue-200 bg-blue-50 text-blue-500">
                      <Heart size={40} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                      No products saved yet
                    </h2>

                    <p className="max-w-xl text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-8">
                      Start exploring products and save the ones you like for future purchase.
                    </p>

                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
                    >
                      Explore Products
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                    <Heart size={15} className="text-blue-500" fill="currentColor" />
                    {wishlistCount} Saved Item{wishlistCount > 1 ? 's' : ''}
                  </div>

                  <Link
                    to="/shop"
                    className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    Continue Shopping
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="h-full"
                      >
                        <Link
                          to={`/product/${p.slug}`}
                          className="group/card block h-full"
                        >
                          <div className="h-full rounded-[34px] border border-slate-200 bg-white overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
                            {/* top image area */}
                            <div className="relative p-5">
                              <div className="relative rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] min-h-[280px] flex items-center justify-center overflow-hidden">
                                <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" />
                                <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-slate-200/40 blur-2xl" />

                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleWishlist(p);
                                  }}
                                  className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                                  title="Remove from wishlist"
                                >
                                  <Trash2 size={17} />
                                </button>

                                <img
                                  src={getImagePath(p.images)}
                                  alt={p.name}
                                  className="relative z-[2] h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover/card:scale-110"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                                  }}
                                />
                              </div>
                            </div>

                            {/* bottom content area */}
                            <div className="px-6 pb-6 pt-1">
                              <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                                Saved Product
                              </div>

                              <h3 className="min-h-[48px] text-lg font-black leading-snug text-slate-900 transition-colors group-hover/card:text-blue-600 line-clamp-2">
                                {p.name}
                              </h3>

                              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                                Keep this product saved and add it to cart anytime.
                              </p>

                              <div className="mt-5 flex items-center justify-between gap-4">
                                <div>
                                  <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                                    Price
                                  </span>
                                  <span className="text-2xl font-black tracking-tight text-slate-900">
                                    ${parseFloat(p.price).toLocaleString()}
                                  </span>
                                </div>

                                <button
                                  onClick={(e) => handleAddToCart(e, p)}
                                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
                                >
                                  <ShoppingBag size={15} />
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-14 pt-8 flex justify-center border-t border-slate-200">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Return to Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}