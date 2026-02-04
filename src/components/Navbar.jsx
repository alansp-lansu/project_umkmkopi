import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button'; // Pastikan path ini benar sesuai struktur foldermu
import { Badge } from './ui/badge';   // Pastikan path ini benar sesuai struktur foldermu
import { ShoppingCart, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State untuk angka merah
  const location = useLocation();

  // --- 1. LOGIKA UPDATE KERANJANG (WAITING LISTENER) ---
  const updateCartCount = () => {
    // Ambil data dari LocalStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Hitung total item (Menggunakan reduce agar jumlah quantity juga terhitung)
    // Contoh: Beli 2 bungkus kopi -> Angka jadi 2 (bukan 1)
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    setCartCount(total);
  };

  useEffect(() => {
    // Cek saat pertama kali web dibuka
    updateCartCount();

    // Pasang "Telinga" untuk mendengar teriakan 'cart-updated' dari halaman Produk
    window.addEventListener('cart-updated', updateCartCount);

    // Bersihkan telinga saat pindah halaman (Cleanup)
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);
  // -----------------------------------------------------

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
            
            {/* Logo Bulat */}
            <img 
              src="/img/logo1.jpg" 
              alt="Logo Argo Coffe" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover group-hover:scale-105 transition-smooth"
            />

            {/* Nama Toko */}
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
                  
                  {/* 👇 INI KODINGAN ANGKA MERAHNYA */}
               {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                 {cartCount}
               </span>
                  )}
                  
                </Button>
              </Link>
              
              {/* Tombol Menu Mobile (Hamburger) */}
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

        {/* Mobile Menu Dropdown */}
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