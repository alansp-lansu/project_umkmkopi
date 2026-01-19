import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => { const data = localStorage.getItem('cart'); if(data) setCart(JSON.parse(data)); };
    loadCart();
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const updateQty = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if(newCart[index].quantity < 1) return;
    newCart[index].totalPrice = newCart[index].price * newCart[index].quantity * (newCart[index].weight / 250);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const remove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success('Item dihapus');
    window.dispatchEvent(new Event('storage'));
  };

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  if (cart.length === 0) return (<div className="min-h-screen py-20 text-center"><h2 className="text-2xl font-bold mb-4">Keranjang Kosong</h2><Link to="/produk"><Button>Belanja Sekarang</Button></Link></div>);

  return (
    <div className="min-h-screen py-12 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <Card key={i} className="flex flex-row items-center p-4 gap-4">
              <img src={item.image} className="w-20 h-20 rounded object-cover" alt={item.name}/>
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.weight}g</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="icon" variant="outline" className="h-6 w-6" onClick={()=>updateQty(i, -1)}><Minus className="h-3 w-3"/></Button>
                  <span>{item.quantity}</span>
                  <Button size="icon" variant="outline" className="h-6 w-6" onClick={()=>updateQty(i, 1)}><Plus className="h-3 w-3"/></Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold mb-2">Rp {item.totalPrice.toLocaleString('id-ID')}</p>
                <Button size="icon" variant="ghost" onClick={()=>remove(i)} className="text-red-500"><Trash2 className="h-4 w-4"/></Button>
              </div>
            </Card>
          ))}
        </div>
        <Card className="h-fit">
          <CardHeader><CardTitle>Ringkasan</CardTitle></CardHeader>
          <CardContent><div className="flex justify-between text-lg font-bold"><span>Total</span><span>Rp {total.toLocaleString('id-ID')}</span></div></CardContent>
          <CardFooter><Button className="w-full" onClick={() => toast.success('Checkout Berhasil!')}>Checkout</Button></CardFooter>
        </Card>
      </div>
    </div>
  );
}