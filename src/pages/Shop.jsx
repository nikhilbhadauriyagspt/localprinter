import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  X,
  Loader2,
  ShoppingCart,
  SlidersHorizontal,
  Package,
  Plus,
  Heart,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          setBrands(d.data);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const availableBrands = brands.filter(b => {
    const brandName = b.name.toLowerCase().trim();
    const computerBrands = ['acer', 'asus', 'dell', 'lenovo'];
    if (computerBrands.includes(brandName)) return false;
    return products.some(p => 
      p.brand_id === b.id || 
      p.brand_name?.toLowerCase().trim() === brandName
    );
  });

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-jakarta text-[#450a0a] overflow-x-hidden">
      <SEO 
        title="Shop Collections | DominicPrinters" 
        description="Browse our curated selection of high-performance printers and professional hardware."
      />

      {/* --- REFINED BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-red-900/[0.02] border-l border-b border-red-900/[0.05] rounded-bl-[10rem]"
        />
      </div>
      
      {/* --- HERO HEADER --- */}
      <section className="relative pt-10 pb-12 px-6 lg:px-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#450a0a] tracking-tight leading-[0.9]"
        >
          Product  <span className="font-black italic text-red-900 whitespace-nowrap">Collections</span>
        </motion.h1>
      </section>

      {/* --- NEW: CINEMATIC TOOLBAR (REPLACED MINIMALIST ONE) --- */}
      <div className="sticky  z-40 px-6 lg:px-16 pb-4">
         <div className="max-w-[1920px] mx-auto">
            <div className="bg-white/90 backdrop-blur-2xl border border-red-900/5 shadow-[0_20px_50px_-15px_rgba(69,10,10,0.06)] rounded-[2.5rem] px-8 py-3 flex items-center justify-between gap-8 h-16 md:h-20">
              
              {/* Left: Integrated Search Pill */}
              <div className="hidden md:flex items-center flex-1 max-w-sm">
                <div className="flex items-center gap-4 bg-[#FAF9F6] border border-gray-100 rounded-2xl px-5 py-2.5 w-full group focus-within:border-[#450a0a]/20 transition-all">
                  <Search size={16} className="text-red-900/20 group-focus-within:text-[#450a0a] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Find a masterpiece..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="bg-transparent text-[11px] font-bold tracking-widest outline-none w-full placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Center: Dynamic Result Tag */}
              <div className="flex flex-col items-center">
                 
                 <span className="text-[11px] font-medium text-[#7A7A75] whitespace-nowrap">
                   Displaying <span className="text-[#450a0a] font-bold">{products.length}</span> Curated Items
                 </span>
              </div>

              {/* Right: Quality Controls */}
              <div className="flex items-center justify-end gap-4 flex-1">
                 <button 
                   onClick={() => setIsMobileFilterOpen(true)}
                   className="lg:hidden h-11 w-11 flex items-center justify-center rounded-2xl bg-[#FAF9F6] text-[#450a0a] border border-gray-100 shadow-sm"
                 >
                   <SlidersHorizontal size={18} />
                 </button>

                 <div className="relative group hidden sm:block">
                   <div className="flex items-center gap-3 bg-[#FAF9F6] border border-gray-100 rounded-2xl px-5 py-2.5 hover:border-[#450a0a]/20 transition-all cursor-pointer">
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#450a0a]/40">Arrange:</span>
                     <select 
                       value={sort} 
                       onChange={(e) => updateFilter('sort', e.target.value)}
                       className="bg-transparent text-[10px] font-bold uppercase tracking-widest cursor-pointer outline-none min-w-[120px] appearance-none"
                     >
                       <option value="newest">Latest Arrivals</option>
                       <option value="price_low">Value: Low to High</option>
                       <option value="price_high">Value: High to Low</option>
                       <option value="name_asc">A - Z Index</option>
                     </select>
                     <ChevronDown size={14} className="text-red-900/20" />
                   </div>
                 </div>

                 {/* Decorative Grid Icon */}
                 <div className="h-11 w-11 hidden xl:flex items-center justify-center rounded-2xl bg-[#450a0a] text-white shadow-lg shadow-red-900/10">
                    <Grid size={18} strokeWidth={2.5} />
                 </div>
              </div>
            </div>
         </div>
      </div>

      {/* --- MAIN SHOP CONTENT --- */}
      <section className="py-12 px-6 lg:px-16 relative z-10">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            
            {/* CLEAN SIDEBAR */}
            <aside className="hidden lg:block w-56 shrink-0 space-y-16">
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-900/20 border-b border-red-900/5 pb-4">Collections</h4>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "w-full text-left text-[12px] font-bold transition-all uppercase tracking-widest",
                      !category ? "text-red-600 pl-3 border-l-2 border-red-600" : "text-[#450a0a]/40 hover:text-black"
                    )}
                  >
                    Display All
                  </button>
                  
                  {/* --- SUB-CATEGORY PRINTER TYPES (10) --- */}
                  <div className="flex flex-col gap-3 pl-4 border-l border-red-900/5 mt-2 mb-4">
                    {[
                      'Inkjet Printers', 
                      'Laser Printers', 
                      'All-in-One', 
                      'Thermal Printers',
                      'Dot Matrix',
                      'Large Format',
                      'Photo Printers',
                      'Label & Barcode',
                      'Plotters',
                      'Supertank'
                    ].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFilter('search', type)}
                        className={cn(
                          "text-[10px] font-extrabold uppercase tracking-[0.2em] transition-all text-left",
                          search.toLowerCase() === type.toLowerCase() ? "text-red-600" : "text-[#450a0a]/30 hover:text-[#450a0a]"
                        )}
                      >
                        • {type}
                      </button>
                    ))}
                  </div>

                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "w-full text-left text-[12px] font-bold transition-all uppercase tracking-widest flex items-center gap-3",
                        category === cat.slug ? "text-red-600 pl-3 border-l-2 border-red-600" : "text-[#450a0a]/40 hover:text-black group"
                      )}
                    >
                      <span className="flex-1 line-clamp-1">{cat.name}</span>
                      <ArrowRight size={12} className={cn("transition-transform", category === cat.slug ? "opacity-100" : "opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0")} />
                    </button>
                  ))}
                </div>
              </div>

              
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                  <Loader2 className="animate-spin h-8 w-8 text-red-900/20 mb-6" strokeWidth={1.5} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#450a0a]/30">Curating Gallery...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-red-900/5 shadow-sm">
                  <Package size={48} strokeWidth={1} className="mx-auto text-red-900/10 mb-6" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#450a0a]">No results manifested</h2>
                  <button 
                    onClick={() => navigate('/shop')} 
                    className="mt-8 bg-[#450a0a] text-white px-10 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl shadow-red-900/10"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                  {products.map((p) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group relative flex flex-col h-full"
                      onMouseEnter={() => setHoveredId(p.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Image Platform: Compact & Refined */}
                      <div className="relative aspect-square w-full bg-white rounded-[2.5rem] border border-red-900/5 flex items-center justify-center p-8 overflow-hidden transition-all duration-700 group-hover:bg-[#FAF9F6] group-hover:shadow-[0_30px_70px_-20px_rgba(69,10,10,0.08)] group-hover:border-[#450a0a]/10">
                        <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                        
                        {/* Decorative Inner Frame */}
                        <div className="absolute inset-3 border border-red-900/5 rounded-[2rem] pointer-events-none transition-all duration-700 group-hover:inset-2" />

                        <motion.img 
                          src={getImagePath(p.images)} 
                          alt={p.name} 
                          className="max-h-full max-w-full object-contain mix-blend-multiply relative z-10"
                          animate={hoveredId === p.id ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        />

                        {/* Top Wishlist Overlay */}
                        <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                            className={cn(
                              "h-10 w-10 rounded-full flex items-center justify-center border border-red-900/5 bg-white/80 backdrop-blur-md shadow-xl transition-all duration-500",
                              isInWishlist(p.id) ? "text-red-600" : "text-[#450a0a] hover:bg-[#450a0a] hover:text-white"
                            )}
                          >
                            <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Bottom Quick Add Action */}
                        <div className="absolute bottom-5 left-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                          <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            className="w-full h-12 bg-[#450a0a] text-white rounded-xl flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                          >
                            <ShoppingBag size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Quick Add</span>
                          </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="pt-6 px-2 text-center space-y-1.5">
                        <Link to={`/product/${p.slug}`}>
                          <h3 className="text-[13px] font-bold text-[#450a0a] uppercase  line-clamp-1 group-hover:text-red-600 transition-colors duration-500">
                            {p.name}
                          </h3>
                        </Link>
                        <div className="flex flex-col items-center">
                          <span className="text-[15px] font-black text-[#450a0a] opacity-40 tracking-tight">${p.price}</span>
                          <div className="h-[1.5px] w-0 bg-red-900/20 transition-all duration-700 group-hover:w-10 mt-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-red-950/5 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-3 left-3 bottom-3 w-[calc(100%-24px)] sm:w-[380px] bg-white rounded-[2.5rem] z-[110] lg:hidden flex flex-col p-8 shadow-2xl border border-red-900/5 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-red-50 rounded-full flex items-center justify-center text-[#450a0a]">
                    <SlidersHorizontal size={16} />
                  </div>
                  <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#450a0a]">Refine Selection</h3>
                </div>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-9 w-9 rounded-full bg-red-50 text-[#450a0a] flex items-center justify-center transition-colors"><X size={20} strokeWidth={1.5} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-12">
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-900/20 border-b border-red-900/5 pb-4">Collections</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { updateFilter('category', ''); setIsMobileFilterOpen(false); }}
                      className={cn("w-full text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest rounded-2xl transition-all", !category ? "bg-[#450a0a] text-white shadow-xl" : "bg-red-50/50 text-[#450a0a]")}
                    >
                      Show All Pieces
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-6 py-4 text-[12px] font-bold uppercase tracking-widest rounded-2xl transition-all", category === cat.slug ? "bg-[#450a0a] text-white shadow-xl" : "bg-red-50/50 text-[#450a0a]")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
