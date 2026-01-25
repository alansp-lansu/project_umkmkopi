import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Coffee, Award, Users, Heart } from 'lucide-react';

export default function About() {
  const values = [
    { icon: Coffee, title: 'Kualitas Premium', desc: 'Kami hanya memilih biji kopi terbaik.' },
    { icon: Award, title: 'Standar Internasional', desc: 'Memenuhi standar kualitas tinggi.' },
    { icon: Heart, title: 'Pelayanan Terbaik', desc: 'Melayani dari hati untuk Anda.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-gradient-to-br from-coffee-dark via-coffee-medium to-mocha text-primary-foreground text-center">
         <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#C05621] text-white font-bold tracking-wide shadow-sm text-sm">Tentang Kami</div>
        <h1 className="font-display text-4xl font-bold mb-4">Passion Kami adalah Kopi</h1>
        <p className="max-w-2xl mx-auto px-4">Kopi Nusantara lahir dari kecintaan mendalam terhadap kekayaan alam Indonesia.</p>
      </section>
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Card key={i} className="text-center">
              <CardHeader><div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4"><v.icon className="h-6 w-6 text-primary"/></div><CardTitle>{v.title}</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">{v.desc}</p></CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}