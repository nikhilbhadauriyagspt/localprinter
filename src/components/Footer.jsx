import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ArrowRight, Sparkles, ShieldCheck, Globe, MoveRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#FAF9F6] text-[#450a0a] pt-16 pb-10 font-jakarta border-t border-red-900/5">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
        
        {/* --- BRAND & NEWSLETTER TOP BAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-center">
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <Link to="/" className="inline-block transition-transform hover:scale-105 duration-500">
              <img src="/logo/logo.png" alt="DominicPrinters" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
            <p className="text-[#7A7A75] text-[15px] font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Precision engineered printing solutions for creative professionals and high-end workspaces.
            </p>
          </div>

          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-red-900/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group max-w-2xl w-full">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Sparkles size={14} className="text-red-400" />
                  <h3 className="text-lg font-bold text-[#450a0a] uppercase tracking-tight">Stay Updated</h3>
                </div>
                <p className="text-[14px] text-[#7A7A75] font-light">Join our community for the latest news.</p>
              </div>
              <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-3">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full md:w-64 bg-[#FAF9F6] border border-gray-100 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#450a0a] transition-all"
                />
                <button
                  disabled={loading}
                  className="h-14 w-14 bg-[#450a0a] text-white rounded-xl flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-red-900/10 shrink-0"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <MoveRight size={20} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- MAIN NAVIGATION LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-16 border-y border-red-900/5 py-16">
          
          {/* Corporate Info */}
          <div className="col-span-2 md:col-span-1 space-y-8">
            <h4 className="text-[11px] font-black text-[#450a0a] uppercase tracking-[0.3em]">Corporate Atelier</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group cursor-default">
                <MapPin size={16} className="text-red-900 shrink-0 mt-0.5" />
                <p className="text-[14px] font-medium text-[#450a0a]/80 leading-relaxed">1330 Keosauqua Way, Des Moines, IA 50309, United States</p>
              </div>
              <div className="flex items-center gap-4 group cursor-default">
                <Mail size={16} className="text-red-900 shrink-0" />
                <p className="text-[14px] font-medium text-[#450a0a]/80">info@dominicprinters.shop</p>
              </div>
            </div>
          </div>

          {/* Hardware */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-[#450a0a] uppercase tracking-[0.3em]">Hardware</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-[#7A7A75] hover:text-[#450a0a] transition-all text-[15px] font-medium flex items-center gap-2 group">
                    <div className="h-[1.5px] w-0 bg-[#450a0a] group-hover:w-3 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-[#450a0a] uppercase tracking-[0.3em]">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQs', path: '/faq' },
                { name: 'Track Orders', path: '/orders' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-[#7A7A75] hover:text-[#450a0a] transition-all text-[15px] font-medium flex items-center gap-2 group">
                    <div className="h-[1.5px] w-0 bg-[#450a0a] group-hover:w-3 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-[#450a0a] uppercase tracking-[0.3em]">Legal Policies</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Return Policy', path: '/return-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-[#7A7A75] hover:text-[#450a0a] transition-all text-[15px] font-medium flex items-center gap-2 group">
                    <div className="h-[1.5px] w-0 bg-[#450a0a] group-hover:w-3 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- FOOTER BOTTOM --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[13px] text-[#450a0a] font-medium">
            © 2026 DominicPrinters. <span className="text-[#450a0a] ml-2">All Rights Reserved.</span>
          </p>
          
          <div className="flex items-center gap-8 ">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="mt-12 text-center ">
          <p className="text-[#330505] text-[10px] font-black uppercase ">
            Disclaimer - For Informational only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}
