import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadCart = () => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].totalPrice = updatedCart[index].price * newQuantity * (updatedCart[index].weight / 250);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success('Jumlah diperbarui');
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success('Item dihapus dari keranjang');
    window.dispatchEvent(new Event('storage'));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Keranjang Anda kosong');
      return;
    }
    
    // Mock: Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: getTotalPrice(),
      status: 'Menunggu Pembayaran',
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    setCart([]);
    
    toast.success('Pesanan berhasil dibuat! Silakan lakukan pembayaran.');
    window.dispatchEvent(new Event('storage'));
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border text-center py-12">
              <CardContent className="space-y-6">
                <div className="bg-muted/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold mb-2">Keranjang Kosong</h2>
                  <p className="text-muted-foreground">
                    Belum ada produk di keranjang Anda. Mari mulai berbelanja!
                  </p>
                </div>
                <Link to="/produk">
                  <Button size="lg">
                    <Package className="mr-2 h-5 w-5" />
                    Lihat Produk
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/produk">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Lanjut Belanja
            </Button>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Keranjang Belanja
          </h1>
          <p className="text-muted-foreground mt-2">
            {cart.length} item di keranjang Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.weight}g
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground line-through">
                            Rp {(item.price * (item.weight / 250)).toLocaleString('id-ID')}
                          </p>
                          <p className="text-xl font-bold text-primary">
                            Rp {item.totalPrice.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border sticky top-24">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      Rp {getTotalPrice().toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkir</span>
                    <Badge variant="outline" className="text-xs">Gratis</Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">
                    Rp {getTotalPrice().toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    🎉 Gratis ongkir untuk semua pesanan!
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Checkout Sekarang
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Pembayaran aman dengan berbagai metode
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}