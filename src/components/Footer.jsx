import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

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
    <footer className="relative overflow-hidden bg-[#0f1115] text-white pt-0 pb-8">
      {/* subtle bg */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-amber-300/10 blur-[100px]" />

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">

        {/* TOP NEWSLETTER STRIP - NEW LAYOUT */}
        <div className="translate-y-[-1px] border-b border-white/10 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-300 mb-4">
                <Sparkles size={12} />
                Stay Connected
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] text-white">
                Get updates on new arrivals,
                <span className="text-amber-400"> offers and essentials.</span>
              </h2>

              <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-400 max-w-xl">
                Join our newsletter for the latest printer collections, product updates, and shopping highlights.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-[460px] shrink-0"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={15}
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-[52px] w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-amber-400/40"
                  />
                </div>

                <button
                  disabled={loading}
                  className="h-[52px] px-7 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-[0.18em] hover:bg-amber-300 transition-all min-w-[150px]"
                >
                  {loading ? <Loader2 className="mx-auto animate-spin" size={16} /> : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* MAIN FOOTER GRID - NEW LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 md:py-14">
          {/* LEFT BRAND BLOCK */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/logo/logo.png"
                alt="Local Printer"
                className="h-15 w-auto object-contain"
              />
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-slate-400 mb-8">
              Reliable printers and essential supplies for your daily needs. Quality products and dependable support delivered across the USA.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-amber-400">
                  <MapPin size={16} />
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-300">
                  2026 W Flagler St. Miami, FL 33135, USA
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-amber-400">
                  <Mail size={16} />
                </div>
                <a
                  href="mailto:info@localprinter.shop"
                  className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
                >
                  info@localprinter.shop
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT LINKS AREA */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Printers */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-400 mb-5">
                  Printers
                </h4>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/shop?category=${cat.slug}`}
                        className="group inline-flex items-center gap-3 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <span className="h-[2px] w-2 bg-amber-400/60 transition-all group-hover:w-4" />
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-400 mb-5">
                  Company
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'About us', path: '/about' },
                    { name: 'Contact us', path: '/contact' },
                    { name: 'FAQs', path: '/faq' },
                    { name: 'Track order', path: '/orders' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="group inline-flex items-center gap-3 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <span className="h-[2px] w-2 bg-amber-400/60 transition-all group-hover:w-4" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-400 mb-5">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Privacy policy', path: '/privacy-policy' },
                    { name: 'Terms & conditions', path: '/terms-and-conditions' },
                    { name: 'Return policy', path: '/return-policy' },
                    { name: 'Shipping policy', path: '/shipping-policy' },
                    { name: 'Cookie policy', path: '/cookie-policy' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="group inline-flex items-center gap-3 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <span className="h-[2px] w-2 bg-amber-400/60 transition-all group-hover:w-4" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-center md:text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              © 2026 Local Printer. All rights reserved.
            </p>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-5 opacity-90"
              />
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <p className="mx-auto max-w-3xl text-[11px] font-bold uppercase tracking-[0.16em] leading-relaxed text-slate-500">
            Disclaimer: For informational purposes only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}