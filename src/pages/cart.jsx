import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Tambah useNavigate
import { toast } from 'sonner';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // 2. Aktifkan fitur navigasi

  // 1. Ambil data dari LocalStorage saat halaman dibuka
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. Fungsi Hapus Barang
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Beri tahu Navbar supaya angkanya berkurang
    window.dispatchEvent(new Event('cart-updated'));
    toast.success("Barang dihapus dari keranjang");
  };

  // 3. Hitung Total Bayar
  const totalPayment = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  // Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  // Jika Keranjang Kosong
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <div className="bg-muted p-6 rounded-full mb-4">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-muted-foreground mb-6">Sepertinya Anda belum memesan kopi apa pun.</p>
        <Link to="/produk">
          <Button size="lg">Lihat Katalog Kopi</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link to="/produk">
            <Button variant="ghost" className="mr-4"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali</Button>
          </Link>
          <h1 className="text-3xl font-display font-bold">Keranjang Saya ({cartItems.length} Item)</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* DAFTAR ITEM (Kiri) */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={index} className="flex flex-col sm:flex-row items-center p-4 gap-4 hover:shadow-md transition-smooth">
                {/* Gambar Kecil */}
                <div className="w-full sm:w-24 h-24 shrink-0 overflow-hidden rounded-md">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Info Produk */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    Berat: {item.weight}g | Jumlah: {item.quantity}
                  </div>
                  <div className="font-bold text-primary">
                    {formatRupiah(item.totalPrice)}
                  </div>
                </div>

                {/* Tombol Hapus */}
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => removeFromCart(index)}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* RINGKASAN PEMBAYARAN (Kanan) */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Ringkasan Belanja</h3>
              <div className="space-y-2 mb-4 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Harga</span>
                  <span className="font-bold">{formatRupiah(totalPayment)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total Bayar</span>
                <span className="text-primary">{formatRupiah(totalPayment)}</span>
              </div>
              
              {/* 3. TOMBOL CHECKOUT (Sudah Diperbaiki) */}
              <Button 
                onClick={() => navigate('/checkout')} 
                className="w-full py-6 text-lg font-bold bg-[#2C1810] hover:bg-[#3C2A21]"
              >
                Checkout Sekarang
              </Button>
              
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}