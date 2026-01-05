import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Coffee className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-foreground">
                  Kopi Nusantara
                </span>
                <p className="text-xs text-muted-foreground">Premium Coffee</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Menyajikan kopi berkualitas tinggi dari biji pilihan terbaik nusantara.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/produk" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Jl. Kopi Raya No. 123<br />Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +62 812-3456-7890
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  info@kopinusantara.com
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Ikuti Kami</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Dapatkan update terbaru tentang produk dan promo spesial kami!
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Kopi Nusantara. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};