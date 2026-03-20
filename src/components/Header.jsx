import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [] });
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
     
      {/* --- FLOATING PILL BENTO HEADER --- */}
      <header 
        className={cn(
          "fixed left-0 w-full z-[100] font-jakarta transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none",
          
        )}
      >
        <div className="w-full  flex justify-center px-4 md:px-8">
          <div 
            className={cn(
              "flex items-center  justify-between w-full pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
              (scrolled)
                ? "max-w-[1100px] bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.04)] rounded-[2.5rem] px-8 py-5 mt-2" 
                : "max-w-[1920px] bg-transparent px-4 py-6 mt-0"
            )}
          >
            {/* Left: Original Logo Only */}
            <div className="flex-1 flex justify-start items-center">
              <Link to="/" className="transition-transform hover:scale-[1.02] duration-500">
                <img src="/logo/logo.png" alt="DominicPrinters" className="h-8 md:h-13 w-auto object-contain brightness-90" />
              </Link>
            </div>

            {/* Center: Navigation Pill */}
            <div className="hidden lg:flex items-center justify-center flex-[2] relative px-4">
              <AnimatePresence mode="wait">
                {!isSearchOpen ? (
                  <motion.nav 
                    key="nav"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex items-center gap-1.5 p-1 bg-gray-50/80 border border-gray-100 rounded-full"
                  >
                    {navLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        to={link.path} 
                        className={cn(
                          "text-[12px] font-semibold tracking-wide px-6 py-2 rounded-full transition-all duration-300",
                          location.pathname === link.path 
                            ? "bg-white text-[#1A1A1A] shadow-sm" 
                            : "text-[#7A7A75] hover:text-[#1A1A1A] hover:bg-white/50"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.nav>
                ) : (
                  <motion.div 
                    key="search"
                    initial={{ opacity: 0, width: '90%' }}
                    animate={{ opacity: 1, width: '100%' }}
                    exit={{ opacity: 0, width: '90%' }}
                    className="w-full max-w-xl relative"
                  >
                    <form onSubmit={handleSearch} className="w-full flex items-center bg-gray-50/80 border border-gray-200 rounded-full p-1 shadow-inner">
                      <div className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1A1A1A]">
                        <Search size={16} strokeWidth={1.5} />
                      </div>
                      <input 
                        type="text" autoFocus
                        placeholder="Search our collection..." 
                        className="flex-1 bg-transparent px-5 text-[14px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#B0B0AC]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button 
                        type="button" 
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} 
                        className="h-9 w-9 rounded-full hover:bg-white flex items-center justify-center transition-all text-[#B0B0AC] hover:text-[#1A1A1A]"
                      >
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </form>

                    {/* SUGGESTIONS DROPDOWN */}
                    <AnimatePresence>
                      {searchQuery.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-[calc(100%+12px)] left-0 w-full bg-white shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-gray-100 rounded-[2rem] overflow-hidden z-[110]"
                        >
                          <div className="p-5 space-y-2">
                            {isSearching ? (
                              <div className="flex flex-col items-center justify-center py-10 gap-3">
                                <Loader2 size={20} className="animate-spin text-[#D1D1CB]" strokeWidth={1.5} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B0B0AC]">Searching...</span>
                              </div>
                            ) : suggestions.products.length > 0 ? (
                              <>
                                <div className="grid gap-1.5">
                                  {suggestions.products.map(p => {
                                    const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                                    const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                                    return (
                                      <Link 
                                        key={p.id} to={`/product/${p.slug}`} onClick={() => setIsSearchOpen(false)}
                                        className="flex items-center gap-4 p-2.5 hover:bg-gray-50 rounded-2xl transition-all duration-300 group border border-transparent"
                                      >
                                        <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center p-2 shrink-0 border border-gray-100">
                                          <img src={imageSrc} className="max-h-full max-w-full object-contain" alt="" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="text-[14px] font-bold text-[#1A1A1A] line-clamp-1">{p.name}</h4>
                                          <p className="text-[12px] font-semibold text-[#7A7A75] mt-0.5">${p.price}</p>
                                        </div>
                                        <div className="h-8 w-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                          <ArrowRight size={14} strokeWidth={1.5} />
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                                <button onClick={handleSearch} className="w-full py-3.5 mt-2 bg-gray-50 hover:bg-[#1A1A1A] hover:text-white rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] transition-all duration-500">
                                  View All Results
                                </button>
                              </>
                            ) : (
                              <div className="py-12 text-center">
                                <p className="text-[12px] font-semibold uppercase tracking-widest text-[#D1D1CB]">No matches found</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center justify-end gap-2 md:gap-3 flex-1">
              {!isSearchOpen && (
                <button 
                  onClick={() => setIsSearchOpen(true)} 
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-white hover:shadow-sm transition-all duration-300 text-[#1A1A1A] border border-transparent hover:border-gray-200"
                >
                  <Search size={17} strokeWidth={1.5} />
                </button>
              )}

              <Link 
                to={user ? "/profile" : "/login"} 
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-white hover:shadow-sm transition-all duration-300 text-[#1A1A1A] border border-transparent hover:border-gray-200"
              >
                <User size={17} strokeWidth={1.5} />
              </Link>

              <Link 
                to="/wishlist" 
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-white hover:shadow-sm transition-all duration-300 text-[#1A1A1A] relative border border-transparent hover:border-gray-200"
              >
                <Heart size={17} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-[9px] font-bold h-4.5 w-4.5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button 
                onClick={openCartDrawer} 
                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-sm hover:scale-[1.05] transition-all duration-300 relative group"
              >
                <ShoppingCart size={17} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#1A1A1A] text-[9px] font-bold h-4.5 w-4.5 flex items-center justify-center rounded-full border-2 border-[#1A1A1A] shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-[#1A1A1A] ml-1 border border-gray-100">
                <Menu size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacing adjustments */}
      {!isHomePage && <div className="h-32 md:h-36" />}
      {isHomePage && <div className="h-12 md:h-0" />}

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[200] bg-black/5 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-3 right-3 bottom-3 w-[calc(100%-24px)] sm:w-[380px] bg-[#FAF9F6] rounded-[2.5rem] z-[210] flex flex-col shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden"
            >
              <div className="flex justify-between items-center p-8 border-b border-gray-100">
                <img src="/logo/logo.png" alt="DominicPrinters" className="h-7 w-auto" />
                <button onClick={() => setIsSidebarOpen(false)} className="h-9 w-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#1A1A1A] transition-colors">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col p-8 gap-3 overflow-y-auto">
                {navLinks.map((link, idx) => (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.05 }} key={link.name}>
                    <Link to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                      <span className="text-[22px] font-medium text-[#1A1A1A]">{link.name}</span>
                      <ArrowRight size={18} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#1A1A1A]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto p-8 bg-gray-50/50 border-t border-gray-100 grid gap-3">
                <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-[#1A1A1A]">
                  <User size={18} />
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">My Account</span>
                </Link>
                <Link to="/wishlist" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-[#1A1A1A]">
                  <Heart size={18} />
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">Wishlist</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
