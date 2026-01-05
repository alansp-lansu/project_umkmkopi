import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Coffee, ShoppingCart, Menu, X } from 'lucide-react';
import { Badge } from './ui/badge';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [cart, setCart] = useState([]);

  // Get cart from localStorage
  const getCartCount = () => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      return JSON.parse(cartData).length;
    }
    return 0;
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/produk', label: 'Produk' },
    { path: '/about', label: 'Tentang Kami' },
    { path: '/contact', label: 'Kontak' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-smooth">
              <Coffee className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl md:text-2xl font-bold text-foreground">
                Kopi Nusantara
              </span>
              <p className="text-xs text-muted-foreground">Premium Coffee</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs"
                  >
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
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