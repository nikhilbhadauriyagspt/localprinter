import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  Mail,
  LayoutGrid,
  MapPin,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap(parent => parent.children || []);
          const printerCats = allCats.filter(cat => {
            const name = cat.name.toLowerCase();
            return !name.includes('laptop') && !name.includes('computer');
          });
          setCategories(printerCats);
        }
      } catch (err) {
        console.error('Category Fetch Error:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAllDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      let url = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== 'All Categories') {
        const cat = categories.find(c => c.name === selectedCategory);
        if (cat) url += `&category=${cat.slug}`;
      }
      navigate(url);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') {
          setUser(null);
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop'},
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header className={cn(
        "w-full z-[100] transition-all duration-300 bg-white sticky top-0",
        isScrolled ? "shadow-xl border-b border-slate-100" : "border-b border-slate-50"
      )}>
        {/* --- MAIN HEADER --- */}
        <div className="w-full mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4 lg:gap-10">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img 
              src="/logo/logo.png" 
              alt="Logo" 
              className="h-8 md:h-14 lg:h-14"
            />
          </Link>

          {/* Shop By Category & Search Bar Container */}
          <div className="hidden lg:flex flex-1 max-w-4xl items-center gap-3">
            {/* Category Dropdown */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button 
                onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                className={cn(
                  "flex items-center gap-2 h-11 px-5 text-[12px] font-black uppercase tracking-wider transition-all rounded-full border-2",
                  isAllDropdownOpen 
                    ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-100" 
                    : "bg-white border-slate-100 text-slate-700 hover:border-amber-500 hover:text-amber-600"
                )}
              >
                <LayoutGrid size={16} />
                Categories
                <ChevronDown size={14} className={cn("transition-transform duration-200", isAllDropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isAllDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-[240px] bg-white shadow-2xl z-[500] border border-slate-100 rounded-2xl mt-2 overflow-hidden"
                  >
                    <div className="py-2">
                      {categories.map(cat => (
                        <Link 
                          key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsAllDropdownOpen(false)}
                          className="flex items-center justify-between px-5 py-3 hover:bg-yellow-50 text-slate-700 font-bold text-[13px] transition-all group"
                        >
                          {cat.name}
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                      <div className="p-2 border-t border-slate-50">
                        <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-colors">
                           View All Inventory <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pill Search Bar */}
            <div className="flex-1 relative">
              <form onSubmit={handleSearch} className="w-full flex items-center bg-slate-50 rounded-full border-2 border-transparent focus-within:border-amber-500 focus-within:bg-white transition-all overflow-hidden h-11">
                <input 
                  type="text" 
                  placeholder="Search for printers, ink, or accessories..." 
                  className="flex-1 bg-transparent px-6 py-2 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white h-full px-6 flex items-center justify-center transition-all">
                  <Search size={18} strokeWidth={2.5} />
                </button>
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-2xl overflow-hidden z-[110] border border-slate-100 mt-2"
                  >
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8 gap-3">
                        <Loader2 size={20} className="animate-spin text-amber-500" />
                        <span className="text-sm text-slate-500 font-bold">Searching...</span>
                      </div>
                    ) : suggestions.products.length > 0 ? (
                      <div className="p-2">
                        {suggestions.products.map(p => {
                          const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                          const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                          return (
                            <Link 
                              key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                              className="flex items-center gap-4 p-3 hover:bg-yellow-50 rounded-xl transition-all border-b border-slate-50 last:border-0 group"
                            >
                              <div className="h-12 w-12 bg-white rounded-lg border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                <img src={imageSrc} className="max-h-full max-w-full object-contain p-1 group-hover:scale-110 transition-transform" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-bold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">{p.name}</h4>
                                <p className="text-[12px] font-black text-amber-600">${p.price}</p>
                              </div>
                              <ChevronRight size={16} className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-sm text-slate-400 font-bold">No results found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Account */}
            <Link to={user ? "/profile" : "/login"} className="hidden sm:flex items-center gap-3 group">
               <div className="h-11 w-11 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all border border-slate-100">
                  <User size={20} />
               </div>
               <div className="hidden xl:block text-left">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-0.5">{user ? user.name.split(' ')[0] : 'Sign In'}</p>
                  <p className="text-[12px] font-black text-slate-900 leading-none">Account</p>
               </div>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden md:flex items-center justify-center h-11 w-11 bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-600 rounded-full transition-all relative border border-slate-100">
              <Heart size={20} className={cn(wishlistCount > 0 && "fill-current text-amber-500")} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-amber-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button 
               onClick={openCartDrawer} 
               className="flex items-center gap-2.5 bg-slate-900 text-white hover:bg-amber-500 py-2.5 px-4 md:px-5 rounded-full transition-all shadow-lg shadow-slate-200 active:scale-95 group"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-3 -right-3 h-5 w-5 bg-amber-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-900 group-hover:border-white transition-colors">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[12px] font-black leading-none uppercase tracking-wide">Cart</p>
              </div>
            </button>
            
            {/* Mobile Toggle */}
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden flex items-center justify-center h-10 w-10 bg-slate-50 text-slate-900 hover:bg-amber-50 hover:text-amber-600 rounded-full border border-slate-100">
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* --- SECONDARY NAVIGATION --- */}
        <div className="hidden lg:block border-t border-slate-50 bg-white">
          <div className="w-full mx-auto px-8 flex items-center justify-between">
            <nav className="flex items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} to={link.path} 
                  className={cn(
                    "py-3.5 px-6 text-[12px] font-black uppercase tracking-[0.1em] transition-all relative group",
                    location.pathname === link.path ? "text-amber-600" : "text-slate-500 hover:text-amber-600"
                  )}
                >
                  {link.name}
                  <div className={cn(
                    "absolute bottom-0 left-6 right-6 h-0.5 bg-amber-500 transition-transform origin-center",
                    location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-slate-400 group">
                  <Mail size={14} className="text-amber-500" />
                  <span className="text-[11px] font-bold group-hover:text-slate-600 transition-colors">info@localprinter.shop</span>
               </div>
               <div className="h-4 w-[1px] bg-slate-100"></div>
               <Link to="/orders" className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-all font-black uppercase tracking-wider text-[11px]">
                  <MapPin size={14} />
                  Track Order
               </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE SEARCH --- */}
      <div className="lg:hidden bg-white px-4 py-3 border-b border-slate-50">
        <form onSubmit={handleSearch} className="flex items-center bg-slate-50 rounded-full border border-slate-100 overflow-hidden h-10">
          <input 
            type="text" 
            placeholder="Search our store..." 
            className="flex-1 bg-transparent px-5 py-2 text-[13px] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-slate-900 text-white px-5 h-full">
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="bg-amber-500 text-white p-6">
                <div className="flex justify-between items-center mb-6">
                   <img src="/logo/logo.png" alt="" className="h-8 brightness-0 invert" />
                   <button onClick={() => setIsSidebarOpen(false)} className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                      <X size={20} />
                   </button>
                </div>
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                      <User size={24} />
                   </div>
                   <div>
                      <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Welcome Guest</p>
                      <h2 className="text-lg font-black tracking-tight">{user ? user.name : 'Sign In / Register'}</h2>
                   </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-2">
                <div className="mb-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3 px-4">Menu Navigation</h3>
                  <div className="grid gap-1">
                    {navLinks.map(link => (
                      <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-all">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3 px-4">Categories</h3>
                  <div className="grid gap-1">
                    {categories.slice(0, 8).map(cat => (
                       <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-yellow-50 text-slate-700 font-bold transition-all group">
                         {cat.name} 
                         <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-600" />
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-50">
                {user ? (
                   <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="flex items-center justify-center gap-3 w-full py-4 bg-red-50 text-red-600 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-red-100 transition-all">
                     <LogOut size={18} />
                     Sign Out
                   </button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-center gap-3 w-full py-4 bg-amber-500 text-white rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-900 transition-all shadow-lg shadow-yellow-100">
                    <User size={18} />
                    Login Account
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
