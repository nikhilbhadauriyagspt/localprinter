import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import TripleBanners from "@/components/TripleBanners";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import bannerImg from "../assets/bannerr/banner6.jpg";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="DominicPrinters | Quality Printers & Hardware"
        description="Your trusted source for high-quality printers and printing hardware. Delivering excellence across the USA."
      />

      
      <Hero />


      <Features />      
     

      <ShopByCategory categories={data.categories} />
      <TripleBanners />
      <BestSellers products={data.all} />
      
      
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />
      <CategorySlider 
        title="Office Printers"  
        products={data.printers} 
      />
       
     {/* --- COMPACT CONTACT CTA SECTION --- */}
<section className="py-12 bg-white font-jakarta">
  <div className="max-w-[1200px] mx-auto px-6">
    <div className="relative rounded-[2.5rem] p-10 md:p-14 text-center overflow-hidden bg-[#FAF9F6] border border-red-900/5 shadow-sm group">
      
      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <span className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#450a0a]/40">Get in Touch</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#450a0a] leading-tight tracking-tight">
            How can we <span className="italic font-medium text-red-900">help you?</span>
          </h2>
          <p className="text-[#7A7A75] text-base font-light max-w-sm mx-auto leading-relaxed">
            Whether you have a simple question or need detailed guidance, our team is always here for you.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="bg-[#450a0a] text-white px-10 h-14 flex items-center justify-center rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.02] shadow-xl shadow-red-900/10"
          >
            Contact Us
          </Link>
          <Link
            to="/faq"
            className="bg-white border border-gray-100 text-[#450a0a] px-10 h-14 flex items-center justify-center rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#FAF9F6] shadow-sm"
          >
            View FAQ
          </Link>
        </div>
      </div>
      
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -mr-24 -mt-24 blur-[80px] opacity-50" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-900/5 rounded-full -ml-16 -mb-16 blur-[60px] opacity-40" />
    </div>
  </div>
</section>
    </div>
  );
}
