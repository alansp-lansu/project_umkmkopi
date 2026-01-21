import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Coffee, Award, Truck, Star, ArrowRight, Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
  const featuredProducts = [
    { 
      id: 1, 
      name: 'Arabica Gayo', 
      price: 95000, 
      image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?w=800&q=80', 
      description: 'Kopi premium dari dataran tinggi Gayo', 
      badge: 'Best Seller' 
    },
    { 
      id: 2, 
      name: 'Robusta Lampung', 
      price: 75000, 
      image: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=800&q=80', 
      description: 'Rasa kuat dengan aroma yang khas', 
      badge: 'Popular' 
    },
    { 
      id: 3, 
      name: 'Blend Nusantara', 
      price: 85000, 
      image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?w=800&q=80', 
      description: 'Perpaduan sempurna arabica dan robusta', 
      badge: 'Special' 
    },
  ];

  const features = [
    { icon: Coffee, title: 'Kualitas Premium', description: 'Biji kopi pilihan terbaik' },
    { icon: Award, title: 'Bersertifikat', description: 'Standar kualitas internasional' },
    { icon: Truck, title: 'Pengiriman Cepat', description: 'Dikirim fresh dalam 1-2 hari' },
  ];

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) { 
      existingItem.quantity += 1; 
    } else { 
      cart.push({ ...product, quantity: 1, weight: 250, totalPrice: product.price }); 
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} ditambahkan ke keranjang!`);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-coffee-dark via-coffee-medium to-mocha text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532713107108-dfb5d8d2fc42?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="-mb-4 inline-block px-4 py-1.5 mb-4 rounded-full bg-[#C05621] text-white font-bold tracking-wide shadow-sm">☕ Kopi Premium Nusantara</Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">Nikmati Kopi<br />Berkualitas Tinggi</h1>
              <p className="text-lg sm:text-xl text-cream/90 leading-relaxed">Dari biji pilihan terbaik hingga secangkir kopi sempurna.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/produk">
                  <Button size="lg" className="bg-cream text-coffee-dark hover:bg-cream/90 shadow-elegant">
                    Lihat Produk <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="bg-cream text-coffee-dark hover:bg-cream/90 shadow-elegant">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1608552265232-3a1e3feb0271?w=800&q=80" alt="Coffee brewing" className="rounded-2xl shadow-hover animate-float" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-elegant transition-smooth">
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Produk Unggulan</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Kopi Pilihan Terbaik</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-hover transition-smooth group">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-smooth" />
                    <div className="absolute top-4 left-4 bg-[#D4A373] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-none">{product.badge}</div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{product.name}</span>
                    <div className="flex items-center gap-1 text-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                    <span className="text-sm text-muted-foreground">/250g</span>
                  </div>
                  <Button className="w-full" onClick={() => addToCart(product)}>
                    <Heart className="mr-2 h-4 w-4" />Tambah ke Keranjang
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}