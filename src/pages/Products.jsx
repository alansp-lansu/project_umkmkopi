import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ShoppingCart, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function Products() {
  // --- 1. DATA PRODUK MANUAL (STATIC) ---
  // Kita tulis langsung di sini supaya muncul di Vercel tanpa Backend
  const [products] = useState([
    { 
      id: 1, 
      name: "Kopi Bubuk Robusta", 
      price: 33000, 
      displayPrice: "Rp 33.000 - Rp 130.000",
      image: "/img/1kg.webp",
      description: "Argo Coffee merupakan brand kopi bubuk yang berasal dari Lampung Barat. 100% murni tanpa campuran.",
      badge: "Best Seller"
    },
    { 
      id: 2, 
      name: "Biji Kopi Robusta 1kg", 
      price: 80000, 
      image: "/img/greenbeens.webp",
      description: "Biji kopi robusta asli kopi lokal Lampung Barat.",
      badge: "Terlaris"
    },
    { 
      id: 3, 
      name: "Biji Kopi Roasting 1kg", 
      price: 130000, 
      image: "/img/roasting.webp", // Pastikan nama file ini benar di folder public
      description: "Biji kopi pilihan yang sudah di-roasting dengan tingkat kematangan sempurna.",
      badge: "Baru"
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [weight, setWeight] = useState('250');

  // --- FORMAT RUPIAH (Tanpa ,00) ---
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0  
    }).format(price);
  };

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setQuantity('1');
    setWeight('250');
  };

  // --- FUNGSI MASUK KERANJANG (Hanya LocalStorage) ---
  const handleAddToCart = () => {
    if (!selectedProduct) return;

    // Hitung harga total
    const calculatedPrice = selectedProduct.price * parseInt(quantity) * (parseInt(weight) / 250);

    // 1. Simpan ke LocalStorage (Browser Memory)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Cek apakah produk sama sudah ada (opsional, tumpuk aja biar gampang)
    const newItem = { 
      ...selectedProduct, 
      quantity: parseInt(quantity), 
      weight: parseInt(weight), 
      totalPrice: calculatedPrice 
    };
    
    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    // 2. TERIAK ke Navbar
    window.dispatchEvent(new Event('cart-updated'));

    // 3. Notifikasi Sukses
    toast.success("Berhasil masuk keranjang!");
    setSelectedProduct(null);

    // Catatan: Fetch ke backend saya hapus dulu supaya tidak error di Vercel
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#D4A373] text-white px-4 py-1 rounded-full mb-4 font-bold shadow-sm">
             <Package className="inline mr-2 h-4 w-4" /> Katalog Produk
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">Koleksi Kopi Premium</h1>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-hover transition-smooth flex flex-col h-full">
              
              <div className="relative overflow-hidden h-72 shrink-0">
                {/* Pastikan gambar ada di folder public/img/ */}
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                <div className="absolute top-4 left-4 bg-[#D4A373] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  {product.badge}
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <span className="font-bold text-primary">
                    {product.displayPrice ? product.displayPrice : formatRupiah(product.price)}
                  </span>
                </div>
                <CardDescription className="line-clamp-2 mt-2">{product.description}</CardDescription>
              </CardHeader>

              <CardFooter className="mt-auto">
                <Button className="w-full relative z-20 cursor-pointer" onClick={() => handleOrderClick(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />Pesan Sekarang
                </Button>
              </CardFooter>

            </Card>
          ))}
        </div>

        {/* Dialog Pop-up */}
        {selectedProduct && (
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Pesan {selectedProduct.name}</DialogTitle>
                <DialogDescription>Atur jumlah pesanan Anda</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label>Berat (gram)</Label>
                    <Select value={weight} onValueChange={setWeight}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="250">250g</SelectItem>
                        <SelectItem value="500">500g</SelectItem>
                        <SelectItem value="1000">1kg</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Jumlah</Label>
                    <Select value={quantity} onValueChange={setQuantity}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
                <DialogFooter>
                <Button onClick={handleAddToCart}>Tambah ke Keranjang</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        )}

      </div>
    </div>
  );
}