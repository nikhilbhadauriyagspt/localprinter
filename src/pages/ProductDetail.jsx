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
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
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

          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter((p) => p.id !== data.data.id));
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
      return Array.isArray(imgs) ? imgs.map((img) => `/${img}`) : [];
    } catch (e) {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-jakarta flex flex-col items-center justify-center text-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500 mb-5" strokeWidth={1.8} />
        <p className="text-sm font-semibold text-slate-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white font-jakarta flex flex-col items-center justify-center text-center px-6 text-slate-900">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-amber-200 bg-amber-50 text-amber-500">
          <ShoppingBag size={38} />
        </div>

        <h2 className="text-3xl font-black tracking-tight mb-4">Product not found</h2>

        <p className="max-w-md text-sm md:text-base font-medium leading-relaxed text-slate-500 mb-8">
          We could not find the product you are looking for.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage =
    images.length > 0
      ? images[activeImage]
      : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28 pb-20 font-jakarta text-slate-900 overflow-x-hidden">
      <SEO
        title={`${product.name} | Inktrix Printers`}
        description={product.description?.substring(0, 160)}
      />

      <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">

        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 overflow-hidden text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
          <Link to="/" className="shrink-0 hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="shrink-0 hover:text-amber-600 transition-colors">Shop</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="truncate text-slate-900">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left side gallery */}
          <div className="xl:col-span-6">
            <div className="rounded-[36px] border border-slate-200 bg-white p-5 md:p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              <div className="relative rounded-[30px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] min-h-[420px] md:min-h-[540px] flex items-center justify-center overflow-hidden group">
                <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-amber-200/40 blur-2xl" />
                <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-slate-200/40 blur-2xl" />

                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  src={mainImage}
                  alt={product.name}
                  className="relative z-[2] max-h-full max-w-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "absolute top-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300",
                    isInWishlist(product.id)
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-slate-200 bg-white text-slate-400 hover:border-amber-200 hover:text-red-500"
                  )}
                >
                  <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {images.length > 1 && (
                <div className="mt-5 flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-[22px] border bg-white p-3 transition-all",
                        activeImage === idx
                          ? "border-amber-400 shadow-sm"
                          : "border-slate-200 hover:border-amber-200"
                      )}
                    >
                      <img
                        src={img}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side info */}
          <div className="xl:col-span-6">
            <div className="rounded-[36px] border border-slate-200 bg-white p-7 md:p-8 lg:p-10 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-700 mb-5">
                Product Details
              </span>

              <h1 className="text-3xl md:text-2xl  leading-[1.08] text-slate-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-end gap-4 flex-wrap mb-6">
                <span className="text-4xl md:text-3xl font-black tracking-tight text-slate-900">
                  ${parseFloat(product.price).toLocaleString()}
                </span>

                {product.sale_price && (
                  <span className="text-md font-semibold text-slate-400 line-through">
                    ${parseFloat(product.sale_price).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 mb-8">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                  <Info size={16} />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.16em]">
                    Description
                  </h4>
                </div>

                <p className="text-sm md:text-base font-medium leading-relaxed text-slate-600">
                  {product.description ||
                    "A reliable product designed for everyday printing needs with simple performance and practical use."}
                </p>
              </div>

              <div className="space-y-6">
                {/* Quantity and add button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex h-14 items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-2 w-full sm:w-[170px]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-all hover:bg-slate-900 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="text-sm font-black text-slate-900">{quantity}</span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-all hover:bg-slate-900 hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className="inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-amber-500 hover:text-slate-900 disabled:opacity-60"
                  >
                    {isAdded ? <CheckCircle size={16} /> : <ShoppingBag size={16} />}
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>

                {/* Trust points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    { icon: <Truck size={18} />, label: 'Fast Shipping' },
                    { icon: <ShieldCheck size={18} />, label: 'Safe Payment' },
                    { icon: <RefreshCcw size={18} />, label: 'Easy Returns' }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-5 text-center"
                    >
                      <div className="mb-3 flex justify-center text-amber-500">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 mb-3">
                  More Products
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                  Related <span className="text-amber-500">Products</span>
                </h2>
              </div>

              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-amber-600 transition-colors"
              >
                View All
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-6">
              {relatedProducts.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="rounded-[30px] border border-slate-200 bg-white overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] group"
                >
                  <Link to={`/product/${p.slug}`} className="block">
                    <div className="p-4">
                      <div className="relative rounded-[24px] border border-slate-200 bg-gradient-to-br from-[#fff8eb] via-white to-[#f8fafc] aspect-square flex items-center justify-center overflow-hidden">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-1">
                      <h3 className="line-clamp-2 min-h-[44px] text-[14px] font-black leading-snug text-slate-900 transition-colors group-hover:text-amber-600">
                        {p.name}
                      </h3>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-md font-black tracking-tight text-slate-900">
                          ${parseFloat(p.price).toLocaleString()}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                          View
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}