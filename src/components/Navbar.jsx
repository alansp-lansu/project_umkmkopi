import { useState, useEffect } from 'react'; // 1. Tambah useEffect
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Badge } from './ui/badge';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // --- BAGIAN BARU (LOGIKA UPDATE OTOMATIS) ---
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCartCount(JSON.parse(cartData).length);
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    // Hitung saat pertama kali load
    updateCartCount();

    // Pasang "Telinga" untuk mendengar sinyal 'cart-updated'
    window.addEventListener('cart-updated', updateCartCount);

    // Bersihkan saat komponen ditutup
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);
  // ---------------------------------------------

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/produk', label: 'Produk' },
    { path: '/about', label: 'Tentang Kami' },
    { path: '/contact', label: 'Kontak' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white text-slate-900 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* BAGIAN KIRI: LOGO & NAMA TOKO */}
          <Link to="/" className="flex items-center gap-2 group">
            
            {/* 1. GAMBAR LOGO (Sesuai kodemu: .jpg) */}
            <img 
              src="/img/logo1.jpg" 
              alt="Logo Kopi Nusantara" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover group-hover:scale-105 transition-smooth"
            />

            {/* 2. TEKS NAMA TOKO */}
            <div className="hidden sm:block">
              <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              Argo Coffe
              </span>
              <p className="text-xs text-muted-foreground">Premium Coffee</p>
            </div>

          </Link>

          {/* BAGIAN KANAN: MENU + CART */}
          <div className="flex items-center gap-6">
            
            {/* Menu Links (Desktop) */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    className="transition-smooth"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Toggle */}
            <div className="flex items-center gap-2">
              <Link to="/cart">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {/* Gunakan state cartCount agar update otomatis */}
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  <Button variant={isActive(link.path) ? 'default' : 'ghost'} className="w-full justify-start">
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};