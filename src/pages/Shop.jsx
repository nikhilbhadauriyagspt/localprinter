import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  Loader2,
  Package,
  Heart,
  ChevronDown,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import { ProductCardSkeleton } from '@/components/ui/skeleton';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { category: pathCategory } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || pathCategory || '';
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
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
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
  }, [searchParams, pathCategory, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
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
        title="Shop All Products "
        description="Browse our curated selection of high-performance printers and professional supplies."
      />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#fffaf0] via-white to-white pt-24 pb-14">
        <div className="absolute top-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="absolute right-0 top-10 h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[90px]" />

        <div className="relative w-full px-4 md:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 mb-5">
              Explore Products
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-slate-900">
              Our <span className="text-blue-500">Shop</span>
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-blue-500" />

            <p className="mt-6 max-w-3xl text-sm md:text-base font-medium leading-relaxed text-slate-500">
              Precision-engineered printing solutions curated for professional and everyday productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-[72px] md:top-[88px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="w-full px-4 md:px-8 py-5">
          <div className="mx-auto flex max-w-[1920px] flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full xl:w-auto">
              <button
                onClick={() => updateFilter('category', '')}
                className={cn(
                  "h-11 px-5 rounded-full text-[11px] font-black uppercase tracking-[0.16em] whitespace-nowrap transition-all border",
                  !category
                    ? "bg-blue-500 text-slate-950 border-blue-500"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-slate-900"
                )}
              >
                All Products
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.slug)}
                  className={cn(
                    "h-11 px-5 rounded-full text-[11px] font-black uppercase tracking-[0.16em] whitespace-nowrap transition-all border",
                    category === cat.slug
                      ? "bg-blue-500 text-slate-950 border-blue-500"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-slate-900"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex w-full xl:w-auto items-center gap-3">
              <div className="relative flex-1 xl:w-96 group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-[13px] font-semibold outline-none transition-all focus:border-blue-400 focus:bg-white"
                />
              </div>

              <div className="relative flex items-center rounded-2xl border border-slate-200 bg-slate-50 h-12 px-4 hover:bg-white transition-all">
                <select
                  value={sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="appearance-none bg-transparent pr-7 text-[11px] font-black uppercase tracking-[0.14em] outline-none cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low-High</option>
                  <option value="price_high">Price: High-Low</option>
                  <option value="name_asc">A-Z</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 text-slate-400" size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="px-4 md:px-8 py-12 md:py-14">
        <div className="max-w-[1920px] mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[30px] border border-slate-200 bg-white overflow-hidden shadow-sm"
                >
                  <div className="p-4">
                    <div className="rounded-[24px] overflow-hidden">
                      <ProductCardSkeleton />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-slate-300 bg-gradient-to-br from-[#fffaf0] to-white py-24 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-blue-500">
                <Package size={34} />
              </div>

              <h2 className="text-2xl font-black uppercase tracking-[0.14em] text-slate-900 mb-3">
                No Products Found
              </h2>

              <p className="mb-8 text-sm md:text-base font-medium text-slate-500">
                Try adjusting your filters or search terms.
              </p>

              <button
                onClick={() => navigate('/shop')}
                className="rounded-full bg-blue-500 px-8 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-950 transition-all hover:bg-blue-400"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                <Package size={14} />
                Showing {products.length} products
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-6">
                {products.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 6) * 0.04 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/product/${p.slug}`} className="block group/card">
                      <div className="relative rounded-[30px] bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] hover:border-blue-200">

                        {/* top bg panel */}
                        <div className="relative px-4 pt-4 pb-2">
                          <div className="relative rounded-[26px] bg-gradient-to-br from-[#fff8eb] via-[#ffffff] to-[#f8fafc] min-h-[250px] overflow-hidden">
                            <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-blue-200/40 blur-2xl" />
                            <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-slate-200/50 blur-2xl" />

                            {/* Wishlist */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className={cn(
                                "absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/95 border border-white shadow-md flex items-center justify-center transition-all duration-300",
                                isInWishlist(p.id)
                                  ? "text-red-500"
                                  : "text-slate-400 hover:text-blue-500"
                              )}
                            >
                              <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                            </button>

                            {/* Image */}
                            <div className="relative w-full aspect-square flex items-center justify-center z-[2]">
                              <img
                                src={getImagePath(p.images)}
                                alt={p.name}
                                className="w-full h-full object-contain p-5 transition-transform duration-700 ease-out group-hover/card:scale-110"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bottom content */}
                        <div className="px-5 pb-5 pt-1">
                          <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-[0.12em] leading-[1.45] line-clamp-2 min-h-[38px] max-h-[38px] overflow-hidden transition-colors duration-300 group-hover/card:text-blue-600 text-center">
                            {p.name}
                          </h3>

                          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                              Price:
                            </span>
                            <span className="text-lg font-black text-slate-900 tracking-tight">
                              ${p.price}
                            </span>
                          </div>

                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="mt-4 w-full h-11 rounded-full bg-slate-900 text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] hover:bg-blue-500 hover:text-slate-900 transition-all"
                          >
                            <ShoppingBag size={15} />
                            Add to Cart
                          </button>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}