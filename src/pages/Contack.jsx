    import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock: Save to localStorage
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({
      ...formData,
      date: new Date().toISOString(),
      id: Date.now(),
    });
    localStorage.setItem('messages', JSON.stringify(messages));

    toast.success('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      details: ['Jl. Kopi Raya No. 123', 'Jakarta Selatan, DKI Jakarta', 'Indonesia 12345'],
    },
    {
      icon: Phone,
      title: 'Telepon',
      details: ['+62 812-3456-7890', '+62 21-1234-5678'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@kopinusantara.com', 'support@kopinusantara.com'],
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu: 09:00 - 15:00', 'Minggu: Tutup'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-coffee-dark via-coffee-medium to-mocha text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532713107108-dfb5d8d2fc42?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-cream/20 text-cream border-cream/30">
              <MessageSquare className="mr-2 h-3 w-3" />
              Hubungi Kami
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Kami Siap Membantu Anda
            </h1>
            <p className="text-lg text-cream/90">
              Ada pertanyaan? Tim kami siap memberikan jawaban terbaik untuk Anda
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-10">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-border hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground mb-1">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Kirim Pesan</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Hubungi Tim Kami
              </h2>
              <p className="text-muted-foreground">
                Isi form di bawah ini dan kami akan merespon dalam 1x24 jam
              </p>
            </div>

            <Card className="border-border shadow-elegant">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Masukkan nama Anda"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+62 812-3456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subjek *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Tentang apa pesan Anda?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tulis pesan Anda di sini..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Dengan mengirimkan form ini, Anda menyetujui bahwa data Anda akan digunakan
                      untuk keperluan komunikasi sesuai dengan kebijakan privasi kami.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Peta lokasi akan ditampilkan di sini
                </p>
                <p className="text-sm text-muted-foreground">
                  Jl. Kopi Raya No. 123, Jakarta Selatan
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">FAQ</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Pertanyaan yang Sering Diajukan
              </h2>
            </div>

            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Bagaimana cara memesan kopi?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Anda dapat memesan melalui halaman Produk kami, pilih kopi yang diinginkan,
                    tentukan jumlah dan berat, lalu tambahkan ke keranjang. Setelah itu lanjutkan ke checkout.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Berapa lama pengiriman?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pesanan akan dikirim dalam 1-2 hari kerja setelah pembayaran dikonfirmasi.
                    Pengiriman biasanya memakan waktu 2-3 hari untuk wilayah Jawa dan 3-5 hari untuk luar Jawa.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Apakah ada minimum pembelian?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tidak ada minimum pembelian. Anda dapat membeli mulai dari 250g untuk setiap jenis kopi.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}