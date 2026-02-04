import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { CreditCard, Copy, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // State untuk Data Diri Pembeli
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Data Rekening (Bisa kamu ganti nanti)
  const bankInfo = {
    bank: "BRI",
    number: "0603 0105 1858 509",
    name: "ALAN SUTRISNO PUTRA"
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    const total = savedCart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    setTotalPrice(total);
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi Salin No Rekening
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankInfo.number);
    toast.success("Nomor rekening berhasil disalin!");
  };

  const handleProcessOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Keranjang kosong!");
      return;
    }

    // --- FORMAT PESAN WHATSAPP BARU ---
    let message = `*HALO ADMIN ARGO COFFEE* 👋\n`;
    message += `Saya sudah melakukan pembayaran via transfer.\n\n`;
    
    message += `*--- DATA PEMBELI ---*\n`;
    message += `👤 Nama: ${formData.name}\n`;
    message += `📱 No HP: ${formData.phone}\n`;
    message += `📍 Alamat: ${formData.address}\n`;
    if(formData.notes) message += `📝 Catatan: ${formData.notes}\n`;
    
    message += `\n*--- DETAIL PESANAN ---*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.weight}g) x ${item.quantity} = ${formatRupiah(item.totalPrice)}\n`;
    });
    
    message += `\n💰 *TOTAL TRANSFER: ${formatRupiah(totalPrice)}*\n`;
    message += `--------------------------------\n`;
    message += `Mohon segera diproses ya kak. Terima kasih!`;

    // Kirim ke WhatsApp
    const phoneNumber = "6282231558903"; // Ganti No WA Kamu
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Hapus Keranjang & Redirect
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cart-updated'));
    window.open(waLink, '_blank');
    toast.success("Mengarahkan ke WhatsApp...");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-slate-800">Checkout & Pembayaran</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* KOLOM KIRI: FORM PENGIRIMAN */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
              📍 Alamat Pengiriman
            </h2>
            <form id="checkout-form" onSubmit={handleProcessOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
                <input required type="text" name="name" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#D4A373] outline-none" placeholder="Nama Lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                <input required type="tel" name="phone" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#D4A373] outline-none" placeholder="08xxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea required name="address" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg h-24 focus:ring-2 focus:ring-[#D4A373] outline-none" placeholder="Jalan, RT/RW, Kecamatan, Kota, Kode Pos"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (Opsional)</label>
                <input type="text" name="notes" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#D4A373] outline-none" placeholder="Contoh: Titip di satpam, dll" />
              </div>
            </form>
          </div>

          {/* KOLOM KANAN: RINCIAN & PEMBAYARAN */}
          <div className="space-y-6">
            
            {/* 1. KOTAK INFORMASI REKENING (BARU) */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CreditCard size={100} />
              </div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">Transfer Pembayaran ke:</h3>
              <div className="text-2xl font-bold tracking-wider mb-2">{bankInfo.bank}</div>
              
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg w-fit mb-4 backdrop-blur-sm">
                <span className="text-xl font-mono tracking-widest font-semibold">{bankInfo.number}</span>
                <button onClick={copyToClipboard} className="text-xs bg-white/20 hover:bg-white/30 p-2 rounded transition-colors" title="Salin">
                  <Copy size={16} />
                </button>
              </div>
              
              <div className="text-sm text-slate-300">
                A.n <span className="font-semibold text-white">{bankInfo.name}</span>
              </div>
            </div>

            {/* 2. RINGKASAN ITEM */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm border-b border-dashed pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.weight}g x {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-700">{formatRupiah(item.totalPrice)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t-2 border-slate-100 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total yang harus dibayar:</span>
                  <span className="text-2xl font-bold text-[#D4A373]">{formatRupiah(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* 3. TOMBOL KONFIRMASI */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-800 mb-3 leading-relaxed">
                <strong>Instruksi:</strong> Silakan transfer sesuai total tagihan di atas. Jika sudah, klik tombol di bawah untuk kirim bukti transfer ke WhatsApp Admin.
              </p>
              <Button 
                type="submit" 
                form="checkout-form"
                className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-200/50 transition-all"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle size={20} /> Konfirmasi Pembayaran
                </span>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}