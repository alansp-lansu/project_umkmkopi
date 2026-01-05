import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Coffee, Award, Users, Heart, Leaf, TrendingUp } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Coffee,
      title: 'Kualitas Premium',
      description: 'Kami hanya memilih biji kopi terbaik dari perkebunan pilihan di seluruh nusantara. Setiap biji melalui proses seleksi ketat untuk memastikan kualitas tertinggi.',
    },
    {
      icon: Award,
      title: 'Standar Internasional',
      description: 'Kopi kami memenuhi standar kualitas internasional dan telah mendapatkan berbagai sertifikasi untuk menjamin kepuasan Anda.',
    },
    {
      icon: Heart,
      title: 'Pelayanan Terbaik',
      description: 'Tim kami berdedikasi memberikan pelayanan terbaik. Dari konsultasi pemilihan kopi hingga after-sales support, kami siap membantu Anda.',
    },
    {
      icon: Leaf,
      title: 'Berkelanjutan',
      description: 'Kami berkomitmen pada praktik pertanian berkelanjutan dan mendukung petani lokal untuk masa depan yang lebih baik.',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Seleksi Biji',
      description: 'Biji kopi pilihan terbaik dari perkebunan premium',
    },
    {
      number: '02',
      title: 'Roasting Sempurna',
      description: 'Proses sangrai yang tepat untuk menghasilkan rasa optimal',
    },
    {
      number: '03',
      title: 'Quality Control',
      description: 'Pemeriksaan kualitas di setiap tahap produksi',
    },
    {
      number: '04',
      title: 'Fresh Packaging',
      description: 'Dikemas dengan teknologi yang menjaga kesegaran',
    },
  ];

  const stats = [
    { value: '500+', label: 'Pelanggan Puas' },
    { value: '10+', label: 'Varian Kopi' },
    { value: '5+', label: 'Tahun Pengalaman' },
    { value: '100%', label: 'Kepuasan Terjamin' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-coffee-dark via-coffee-medium to-mocha text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507915135761-41a0a222c709?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-cream/20 text-cream border-cream/30">
              Tentang Kami
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Passion Kami adalah Kopi Berkualitas
            </h1>
            <p className="text-lg text-cream/90 leading-relaxed">
              Kopi Nusantara lahir dari kecintaan mendalam terhadap kopi Indonesia.
              Kami percaya bahwa setiap cangkir kopi harus menjadi pengalaman yang istimewa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Nilai-Nilai Kami</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Komitmen Kami untuk Kualitas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Setiap aspek bisnis kami didasarkan pada nilai-nilai yang kuat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Proses Kami</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Dari Kebun hingga Cangkir Anda
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Setiap langkah diperhitungkan untuk menghasilkan kopi terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <Card key={index} className="relative overflow-hidden border-border hover:shadow-elegant transition-smooth">
                <div className="absolute top-0 right-0 text-8xl font-bold text-muted/10 font-display">
                  {step.number}
                </div>
                <CardHeader>
                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-primary mb-2 font-display">
                      {step.number}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge>Dedikasi Kami</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Sistem Pelayanan Prima
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Kami memahami bahwa kepuasan pelanggan adalah prioritas utama.
                Tim customer service kami siap membantu Anda 24/7 untuk memastikan
                pengalaman berbelanja yang menyenangkan.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Konsultasi Personal</h3>
                    <p className="text-sm text-muted-foreground">
                      Tim ahli kami siap membantu Anda memilih kopi yang sesuai dengan selera
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Jaminan Kualitas</h3>
                    <p className="text-sm text-muted-foreground">
                      100% garansi uang kembali jika produk tidak sesuai harapan
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-first md:order-last">
              <img
                src="https://images.unsplash.com/photo-1507915135761-41a0a222c709?w=800&q=80"
                alt="Coffee craftsmanship"
                className="rounded-2xl shadow-hover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-warm border-0 text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Mari Bergabung dengan Keluarga Kami
              </h2>
              <p className="text-lg text-cream/90 mb-8 max-w-2xl mx-auto">
                Dapatkan update terbaru tentang produk baru, tips seduh kopi,
                dan promo eksklusif langsung ke email Anda
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}