import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Star, ShoppingCart, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [weight, setWeight] = useState('250');

  const products = [
    { id: 1, name: 'Arabica Gayo', price: 95000, image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?w=800&q=80', description: 'Kopi premium dari dataran tinggi Gayo.', origin: 'Aceh', roast: 'Medium', notes: 'Floral, Citrus', rating: 4.8, badge: 'Best Seller' },
    { id: 2, name: 'Robusta Lampung', price: 75000, image: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=800&q=80', description: 'Rasa kuat dengan aroma yang khas.', origin: 'Lampung', roast: 'Dark', notes: 'Earthy, Nutty', rating: 4.6, badge: 'Popular' },
    { id: 3, name: 'Blend Nusantara', price: 85000, image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?w=800&q=80', description: 'Perpaduan Arabica dan Robusta.', origin: 'Mix', roast: 'Medium-Dark', notes: 'Caramel', rating: 4.7, badge: 'Special' },
  ];

  const handleOrderClick = (product) => { setSelectedProduct(product); setQuantity('1'); setWeight('250'); };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = { ...selectedProduct, quantity: parseInt(quantity), weight: parseInt(weight), totalPrice: selectedProduct.price * parseInt(quantity) * (parseInt(weight) / 250) };
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${selectedProduct.name} ditambahkan ke keranjang!`);
    setSelectedProduct(null);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4"><Package className="mr-2 h-3 w-3" />Katalog Produk</Badge>
          <h1 className="font-display text-4xl font-bold mb-4">Koleksi Kopi Premium</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-hover transition-smooth">
              <div className="relative overflow-hidden h-72">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                <Badge className="absolute top-4 left-4">{product.badge}</Badge>
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.origin} | {product.roast}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" onClick={() => handleOrderClick(product)}><ShoppingCart className="mr-2 h-4 w-4" />Pesan Sekarang</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Pesan {selectedProduct?.name}</DialogTitle><DialogDescription>Atur jumlah pesanan Anda</DialogDescription></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2"><Label>Berat (gram)</Label><Select value={weight} onValueChange={setWeight}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="250">250g</SelectItem><SelectItem value="500">500g</SelectItem><SelectItem value="1000">1kg</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Jumlah</Label><Select value={quantity} onValueChange={setQuantity}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem></SelectContent></Select></div>
            </div>
            <DialogFooter><Button onClick={handleAddToCart}>Tambah ke Keranjang</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}