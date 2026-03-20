import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  CheckCircle,
  ShoppingBag,
  Info,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    openCartDrawer();
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] font-jakarta">
        <Loader2 className="animate-spin h-8 w-8 text-red-900/20 mb-6" strokeWidth={1.5} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#450a0a]/30">Retrieving Masterpiece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#FAF9F6] font-jakarta text-[#450a0a]">
        <div className="h-24 w-24 bg-white rounded-full border border-red-900/5 flex items-center justify-center mb-8 shadow-sm">
           <ShoppingBag size={32} className="text-red-900/20" strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">Piece Not Found</h2>
        <Link to="/shop" className="group relative inline-flex items-center gap-4 bg-[#450a0a] text-white h-12 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95">
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em]">Return to Gallery</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-24 font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO title={`${product.name} | DominicPrinters`} description={product.description?.substring(0, 160)} />
      
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-16 relative z-10">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#450a0a]/30 mb-12">
          <Link to="/" className="hover:text-[#450a0a] transition-colors">Atelier</Link>
          <ChevronRight size={12} strokeWidth={1.5} className="text-red-900/20" />
          <Link to="/shop" className="hover:text-[#450a0a] transition-colors">Gallery</Link>
          <ChevronRight size={12} strokeWidth={1.5} className="text-red-900/20" />
          <span className="text-[#450a0a] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- LEFT: GALLERY CANVAS --- */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-square bg-white rounded-[4rem] md:rounded-[5rem] flex items-center justify-center p-12 md:p-20 overflow-hidden border border-red-900/5 shadow-[0_40px_100px_-20px_rgba(69,10,10,0.06)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF9F6] via-transparent to-transparent pointer-events-none opacity-50" />
              
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                src={mainImage} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain mix-blend-multiply relative z-10 transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-10 right-10 z-20">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-14 w-14 rounded-full transition-all duration-500 flex items-center justify-center active:scale-90 shadow-xl border border-white/50 backdrop-blur-md",
                    isInWishlist(product.id) ? "bg-red-600 text-white shadow-red-900/20" : "bg-white/80 text-[#450a0a] hover:bg-[#450a0a] hover:text-white"
                  )}
                >
                  <Heart size={22} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="absolute bottom-12 left-12 z-20">
                 <div className="bg-[#FAF9F6] text-[#450a0a] border border-red-900/5 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-sm flex items-center gap-2">
                    <Sparkles size={12} className="text-red-400" />
                    {product.brand_name || 'Imperial Series'}
                 </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 px-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-24 w-24 md:h-28 md:w-28 shrink-0 border transition-all duration-500 flex items-center justify-center p-4 bg-white rounded-[2rem] group overflow-hidden shadow-sm",
                      activeImage === idx ? "border-[#450a0a] shadow-xl ring-4 ring-red-900/5" : "border-red-900/5 hover:border-red-900/20"
                    )}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFORMATION STACK --- */}
          <div className="lg:col-span-5 space-y-12 lg:pt-6">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                 <span className="w-12 h-px bg-red-900/20"></span>
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-900/20">Detailed Analysis</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#450a0a] tracking-tight leading-[0.85] mb-4">
                {product.name.split(' ').slice(0, -1).join(' ')} <br/>
                <span className="font-black italic text-red-900/5">{product.name.split(' ').pop()}</span>
              </h1>

              <div className="flex items-baseline gap-8 pt-4">
                <span className="text-5xl font-black text-[#450a0a] tracking-tighter">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-2xl font-bold text-red-900/10 line-through tracking-tight">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Info size={16} className="text-red-600" strokeWidth={2} />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#450a0a]">Brief Summary</h4>
               </div>
               <p className="text-[#7A7A75] text-lg leading-relaxed font-light">
                 {product.description || "A high-performance hardware solution engineered for professional creative environments. Delivering consistent precision and absolute reliability."}
               </p>
            </div>

            <div className="space-y-10 pt-10 border-t border-red-900/5">
              <div className="flex flex-col sm:flex-row items-stretch gap-6">
                {/* Minimalist Counter */}
                <div className="h-16 bg-white border border-red-900/5 rounded-full flex items-center justify-between px-2 w-full sm:w-[180px] shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-12 w-12 flex items-center justify-center rounded-full bg-[#FAF9F6] text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all shadow-inner"><Minus size={16} strokeWidth={2} /></button>
                  <span className="text-[15px] font-black text-[#450a0a]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-12 w-12 flex items-center justify-center rounded-full bg-[#FAF9F6] text-[#450a0a] hover:bg-[#450a0a] hover:text-white transition-all shadow-inner"><Plus size={16} strokeWidth={2} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="group relative flex-1 h-16 rounded-2xl overflow-hidden transition-all duration-500 active:scale-95 shadow-xl shadow-red-900/20 bg-[#450a0a] text-white"
                >
                  <span className="relative z-10 flex items-center justify-center gap-6 text-[12px] font-bold uppercase tracking-[0.3em]">
                    {isAdded ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                    {isAdded ? "Added to Bag" : "Secure to Cart"}
                  </span>
                  {!isAdded && <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#450a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                </button>
              </div>

              {/* Minimal Trust Grid */}
              <div className="grid grid-cols-3 gap-8 pt-4">
                {[
                  { icon: <Truck size={22} />, label: "Express" },
                  { icon: <ShieldCheck size={22} />, label: "Secure" },
                  { icon: <RefreshCcw size={22} />, label: "Refunds" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group">
                    <div className="text-red-900/20 group-hover:text-red-600 transition-all duration-500 group-hover:scale-110">{item.icon}</div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#450a0a]/30">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-red-900/5">
            <div className="flex flex-col items-center text-center mb-20 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-900/20">Curated Pairings</span>
              <h2 className="text-4xl md:text-6xl font-bold text-[#450a0a] tracking-tight leading-[0.9]">
                You might <br />
                <span className="font-black italic text-red-900/5 whitespace-nowrap">Also Need</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10">
              {relatedProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="group relative flex flex-col h-full">
                  <div className="relative aspect-square w-full bg-white rounded-[2.5rem] border border-red-900/5 flex items-center justify-center p-8 overflow-hidden transition-all duration-700 group-hover:bg-[#FAF9F6] group-hover:shadow-[0_30px_70px_-20px_rgba(69,10,10,0.08)] group-hover:border-[#450a0a]/10">
                    <img src={getImagePath(p.images)} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" alt={p.name} />
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  </div>

                  <div className="pt-6 px-2 text-center space-y-1.5">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[13px] font-bold text-[#450a0a] uppercase tracking-tighter line-clamp-1 group-hover:text-red-600 transition-colors duration-500">{p.name}</h3>
                    </Link>
                    <div className="flex flex-col items-center">
                      <span className="text-[15px] font-black text-[#450a0a] opacity-40 tracking-tight">${parseFloat(p.price).toLocaleString()}</span>
                      <div className="h-[1.5px] w-0 bg-red-900/20 transition-all duration-700 group-hover:w-10 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
