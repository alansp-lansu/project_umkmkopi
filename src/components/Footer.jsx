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
          <div className="space-y-4">
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
            <p className="text-sm text-muted-foreground">
              Menyajikan kopi berkualitas tinggi dari biji pilihan terbaik nusantara.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Dashboard</Link></li>
              <li><Link to="/produk" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Produk</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Tentang Kami</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">Jl. Argo Mulyo, Kec. Batu Ketulis,<br /> Lampung Barat, Lampung</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">+62 822-3155-8903</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Argocoffee93@gmail.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Ikuti Kami</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon"><Instagram className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Facebook className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Twitter className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} Argo Coffe</p>
        </div>
      </div>
    </footer>
  );
};