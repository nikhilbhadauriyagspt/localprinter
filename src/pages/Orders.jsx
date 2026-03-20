import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Loader2, Truck, ChevronLeft, Search, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your item is being prepared.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on the way.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your item will arrive today.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered to you.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

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
      console.error("Error fetching orders:", err);
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
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-20 pb-20 font-jakarta px-6 flex flex-col items-center justify-center text-[#450a0a]">
        <SEO title="Track Order | DominicPrinters" />
        <div className="max-w-[480px] w-full">
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
              Track <span className="font-black italic text-red-900 whitespace-nowrap">Order</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-12 border border-red-900/5 shadow-[0_30px_80px_-20px_rgba(69,10,10,0.08)] rounded-[3.5rem]"
          >
            <form onSubmit={handleGuestSearch} className="space-y-10">
              <div className="space-y-4 group">
                <label className="text-[10px] font-black text-[#450a0a]/40 uppercase tracking-[0.2em] ml-1">Order Email</label>
                <div className="relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-900/20 group-focus-within:text-[#450a0a] transition-colors">
                    <Search size={18} strokeWidth={1.5} />
                  </div>
                  <input 
                    type="email" required placeholder="YOUR REGISTERED EMAIL" value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full h-14 pl-8 bg-transparent border-b border-red-900/5 focus:border-[#450a0a] outline-none text-[13px] font-bold transition-all placeholder:text-[#450a0a]/10"
                  />
                </div>
              </div>
              <button className="group relative w-full inline-flex items-center justify-center gap-6 bg-[#450a0a] text-white h-16 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl shadow-red-900/20 active:scale-95">
                <span className="relative z-10 text-[12px] font-bold uppercase tracking-[0.3em]">Find Order</span>
                <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>
            <div className="mt-12 pt-8 border-t border-red-900/5 text-center">
              <Link to="/login" className="text-red-600 border-b-2 border-red-600/20 pb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#450a0a] hover:border-[#450a0a] transition-all">Sign in for full history</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO title="Order History | DominicPrinters" />
      
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-32 pb-16 px-6 lg:px-16 text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px w-10 bg-red-900/20" />
          <span className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#450a0a]/50 flex items-center gap-2">
            <Sparkles size={12} className="text-red-400/60" />
            Customer Portal
          </span>
          <div className="h-px w-10 bg-red-900/20" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#450a0a] tracking-tight leading-[0.9]"
        >
          My <br />
          <span className="font-black italic text-red-900/5 whitespace-nowrap">Orders</span>
        </motion.h1>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-16 py-12 md:py-20 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin h-8 w-8 text-red-900/20 mb-6" strokeWidth={1.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#450a0a]/30">Syncing History...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3.5rem] border border-red-900/5 shadow-sm">
            <Package size={48} strokeWidth={1} className="mx-auto text-red-900/10 mb-6" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#450a0a]">No orders found</h2>
            <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-[#450a0a] text-white h-16 px-12 rounded-2xl mt-10 overflow-hidden transition-all duration-500 shadow-xl shadow-red-900/20">
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Browse Catalog</span>
              <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-red-900/5 rounded-[3rem] overflow-hidden group hover:shadow-[0_40px_100px_-20px_rgba(69,10,10,0.06)] transition-all duration-700"
              >
                {/* Meta Header */}
                <div className="p-8 md:p-12 border-b border-red-900/5 flex flex-wrap items-center justify-between gap-8 bg-[#FAF9F6]/50">
                  <div className="flex flex-wrap items-center gap-10 md:gap-20">
                    <div>
                      <p className="text-[10px] font-black text-[#450a0a]/30 uppercase tracking-widest mb-2">Order Ref</p>
                      <h3 className="text-[15px] font-bold text-[#450a0a] tracking-tight uppercase">#{order.order_code || order.id}</h3>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#450a0a]/30 uppercase tracking-widest mb-2">Date</p>
                      <p className="text-[15px] font-bold text-[#450a0a]">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#450a0a]/30 uppercase tracking-widest mb-2">Total</p>
                      <p className="text-2xl font-black text-[#450a0a] tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                    order.status === 'delivered' ? "bg-green-50 text-green-700 border-green-100" : "bg-white text-[#450a0a] border-red-900/5"
                  )}>
                    {order.status}
                  </div>
                </div>

                {/* Items & Track */}
                <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-16 items-center">
                  <div className="flex-1 w-full space-y-10">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-10 group/item">
                        <div className="h-24 w-24 bg-[#FAF9F6] rounded-[2rem] border border-red-900/5 flex items-center justify-center p-5 shrink-0 group-hover/item:bg-white group-hover/item:shadow-xl transition-all duration-700 overflow-hidden relative">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[15px] font-bold text-[#450a0a] uppercase tracking-tight truncate mb-1.5">{item.product_name}</h4>
                          <p className="text-[11px] font-black text-[#450a0a]/30 uppercase tracking-widest">Qty: {item.quantity} • ${parseFloat(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[320px] shrink-0 w-full">
                    <button 
                      onClick={() => setSelectedOrder(order)} 
                      className="group relative w-full h-16 bg-[#450a0a] text-white rounded-full flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 shadow-xl shadow-red-900/20 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-4">
                        Live Tracking
                        <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- TRACKING MODAL: GLASS CANVAS --- */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-red-950/5 backdrop-blur-sm z-[1000]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
                exit={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                className="fixed top-1/2 left-1/2 w-full max-w-xl bg-white z-[1001] shadow-[0_60px_120px_-20px_rgba(69,10,10,0.12)] rounded-[4rem] p-10 md:p-16 font-jakarta border border-red-900/5 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-16">
                  <div className="space-y-1">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-900/20">Order Journey</span>
                     <h2 className="text-3xl font-bold text-[#450a0a] leading-none uppercase">Live <span className="font-black italic text-red-900/5">Status</span></h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 flex items-center justify-center bg-red-50 rounded-full text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all group">
                    <X size={24} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
                  </button>
                </div>
                
                <div className="space-y-12 relative px-4">
                  <div className="absolute left-[35px] top-4 bottom-4 w-[1.5px] bg-red-900/5" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-12 group/step">
                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all duration-1000 border-2", isCompleted ? 'bg-[#450a0a] text-white border-[#450a0a] shadow-xl' : 'bg-white text-red-900/10 border-red-900/5')}>
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 pt-1.5">
                          <h4 className={cn("text-[13px] font-black uppercase tracking-widest transition-colors duration-1000", isCompleted ? 'text-[#450a0a]' : 'text-red-900/20')}>{step.label}</h4>
                          <p className={cn("text-[12px] font-medium mt-1.5 leading-relaxed transition-colors duration-1000", isCompleted ? 'text-[#7A7A75]' : 'text-red-900/10')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setSelectedOrder(null)} className="w-full mt-16 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-900/20 hover:text-[#450a0a] border-t border-red-900/5 transition-all">Dismiss Tracking</button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-24 pt-12 border-t border-red-900/5 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#450a0a]/40 hover:text-[#450a0a] transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
