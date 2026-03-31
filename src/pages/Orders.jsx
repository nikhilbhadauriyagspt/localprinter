import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  X,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Loader2,
  Truck,
  ChevronLeft,
  Search,
  History,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

function ProductImage({ item, getImagePath }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const existingImage =
      item.images ||
      item.image ||
      item.product_images ||
      item.product_image ||
      item.product?.images ||
      item.product?.image;

    if (existingImage) {
      setImageUrl(getImagePath(existingImage));
      return;
    }

    const identifier = item.product_slug || item.slug;
    if (identifier) {
      fetch(`${API_BASE_URL}/products/${identifier}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data.images) {
            setImageUrl(getImagePath(data.data.images));
          }
        })
        .catch(() => {});
    }
  }, [item, getImagePath]);

  return (
    <img
      src={imageUrl || "https://via.placeholder.com/400x400?text=Product"}
      className="w-full h-full object-contain"
      alt=""
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/400x400?text=Product";
      }}
    />
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your order is being prepared.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order has been shipped.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your order is arriving soon.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Your order has been delivered.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex((s) => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  const getImagePath = (images) => {
    if (!images) return "https://via.placeholder.com/400x400?text=Product";
    try {
      if (typeof images === 'string') {
        if (images.startsWith('[') || images.startsWith('{')) {
          const imgs = JSON.parse(images);
          if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
        }
        return `/${images}`;
      }
      if (Array.isArray(images) && images.length > 0) return `/${images[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
        <SEO title="Track Order | Inktrix Printers" />

        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-20 md:pt-24 pb-14 md:pb-16">
          <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
          <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[90px]" />

          <div className="relative w-full px-4 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
                Track Order
              </span>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
                Find your <span className="text-blue-500">order</span>
              </h1>

              <div className="mt-4 h-1 w-20 rounded-full bg-blue-500 mx-auto" />

              <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
                Enter your email address to check your order status and recent updates.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="w-full px-4 md:px-8 lg:px-12">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5">
                <div className="h-full rounded-[36px] border border-slate-200 bg-[#111111] p-8 md:p-10 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
                  <div className="relative z-10">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-300 mb-5">
                      Guest Tracking
                    </span>

                    <h2 className="text-3xl md:text-4xl font-black leading-[1.08] tracking-tight mb-5">
                      Check your
                      <span className="block text-blue-400">order status</span>
                    </h2>

                    <p className="text-sm md:text-base font-medium leading-relaxed text-slate-300 mb-8">
                      Use the same email address that was used while placing the order.
                    </p>

                    <div className="space-y-4">
                      {[
                        'Track recent order updates',
                        'Check delivery progress',
                        'View purchase status quickly'
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-400 text-slate-950">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-sm font-semibold text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-7"
              >
                <div className="rounded-[36px] border border-slate-200 bg-white p-7 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                  <div className="mb-8">
                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-4">
                      Search Order
                    </span>

                    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08] text-slate-900 mb-3">
                      Enter your
                      <span className="block text-blue-500">email address</span>
                    </h2>

                    <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500">
                      We will show orders linked with this email.
                    </p>
                  </div>

                  <form onSubmit={handleGuestSearch} className="space-y-7">
                    <div className="space-y-3">
                      <label className="text-[13px] font-black text-slate-900">Email Address</label>
                      <div className="relative">
                        <Search
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          type="email"
                          required
                          placeholder="Enter your email address"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                        />
                      </div>
                    </div>

                    <button className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900">
                      Find Order
                      <ArrowRight size={16} />
                    </button>
                  </form>

                  <div className="mt-8 border-t border-slate-200 pt-7 text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      Sign in for full history
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-jakarta text-slate-900">
      <SEO title="Order History | Inktrix Printers" />

      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-20 md:pt-24 pb-14 md:pb-16">
        <div className="absolute top-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
              Order History
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-slate-900">
              Your <span className="text-blue-500">Orders</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-blue-500 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Review your orders, check product details, and track delivery progress.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="mb-5 h-10 w-10 animate-spin text-blue-500" />
              <p className="text-sm font-semibold text-slate-500">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="max-w-4xl mx-auto rounded-[36px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-8 md:p-14 text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-blue-200 bg-blue-50 text-blue-500">
                <Package size={40} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
                No orders yet
              </h2>

              <p className="max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-8">
                You have not placed any orders yet. Start exploring products from the shop.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
              >
                Explore Products
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                <History size={15} className="text-blue-500" />
                {orders.length} Order{orders.length > 1 ? 's' : ''}
              </div>

              <div className="space-y-6">
                {orders.map((order, orderIdx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: orderIdx * 0.06 }}
                    key={order.id}
                    className="rounded-[34px] border border-slate-200 bg-white overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
                  >
                    {/* top */}
                    <div className="border-b border-slate-200 bg-gradient-to-r from-[#fffaf0] to-white px-6 md:px-8 py-6">
                      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                              Order ID
                            </p>
                            <h3 className="text-sm md:text-base font-black text-slate-900">
                              #{order.order_code || order.id}
                            </h3>
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                              Date
                            </p>
                            <p className="text-sm md:text-base font-black text-slate-900">
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                              Amount
                            </p>
                            <p className="text-lg font-black tracking-tight text-slate-900">
                              ${parseFloat(order.total_amount).toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">
                              Status
                            </p>
                            <div
                              className={cn(
                                "inline-flex rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] border",
                                order.status === 'delivered'
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              )}
                            >
                              {order.status.replace('_', ' ')}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-7 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
                        >
                          Track Order
                          <Truck size={16} />
                        </button>
                      </div>
                    </div>

                    {/* body */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 md:p-8">
                      {/* items */}
                      <div className="xl:col-span-7 space-y-4">
                        {order.items && order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 rounded-[24px] border border-slate-200 bg-slate-50/60 p-4"
                          >
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] border border-slate-200 bg-white p-3 overflow-hidden">
                              <ProductImage item={item} getImagePath={getImagePath} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="line-clamp-1 text-sm md:text-[15px] font-black text-slate-900">
                                {item.product_name}
                              </h4>

                              <div className="mt-2 flex items-center gap-3 flex-wrap">
                                <span className="text-xs font-semibold text-slate-500">
                                  Qty: {item.quantity}
                                </span>
                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                <span className="text-sm font-black text-blue-600">
                                  ${parseFloat(item.price).toLocaleString()}
                                </span>
                              </div>
                            </div>

                            <Link
                              to={`/product/${item.product_slug}`}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-blue-200 hover:text-blue-600"
                            >
                              <ExternalLink size={16} />
                            </Link>
                          </div>
                        ))}
                      </div>

                      {/* journey */}
                      <div className="xl:col-span-5">
                        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] p-6">
                          <div className="mb-6 flex items-center justify-between">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-900">
                              Order Progress
                            </h5>
                            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                              Live Status
                            </span>
                          </div>

                          <div className="relative pl-2">
                            <div className="absolute left-[10px] top-3 bottom-3 w-[2px] bg-slate-200" />
                            <div
                              className="absolute left-[10px] top-3 w-[2px] bg-blue-500 transition-all duration-700"
                              style={{
                                height: `${(getStatusIndex(order.status) / (statusMap.length - 1)) * 100}%`
                              }}
                            />

                            <div className="space-y-8 relative">
                              {statusMap.map((step, idx) => {
                                const active = getStatusIndex(order.status) >= idx;
                                return (
                                  <div key={step.key} className={cn("flex items-start gap-5", !active && "opacity-45")}>
                                    <div
                                      className={cn(
                                        "z-10 mt-1 h-5 w-5 rounded-full border-4 border-white",
                                        active ? "bg-blue-500" : "bg-slate-300"
                                      )}
                                    />
                                    <div>
                                      <h6 className={cn(
                                        "text-[13px] font-black uppercase",
                                        active ? "text-slate-900" : "text-slate-400"
                                      )}>
                                        {step.label}
                                      </h6>
                                      {active && (
                                        <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
                                          {step.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '-48%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-48%', x: '-50%' }}
              className="fixed left-1/2 top-1/2 z-[1001] w-[calc(100%-24px)] max-w-2xl rounded-[36px] border border-slate-200 bg-white p-7 md:p-10 shadow-2xl"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 mb-4">
                    Order Tracking
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                    Order Status
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-900"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-7">
                {statusMap.map((step, idx) => {
                  const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex items-start gap-5">
                      <div
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border",
                          isCompleted
                            ? "border-blue-200 bg-blue-50 text-blue-500"
                            : "border-slate-200 bg-slate-50 text-slate-300"
                        )}
                      >
                        <Icon size={22} />
                      </div>

                      <div className="flex-1 pt-1">
                        <h4
                          className={cn(
                            "text-base font-black uppercase",
                            isCompleted ? "text-slate-900" : "text-slate-400"
                          )}
                        >
                          {step.label}
                        </h4>

                        {isCompleted && (
                          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                            {step.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-blue-500 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="pb-16 pt-4 flex justify-center">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Return to Shop
        </Link>
      </div>
    </div>
  );
}