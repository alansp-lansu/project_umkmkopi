import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const handleSubmit = (e) => { e.preventDefault(); toast.success('Pesan terkirim!'); };

  return (
    <div className="min-h-screen bg-background py-12 container mx-auto px-4">
      <div className="text-center mb-12"><h1 className="font-display text-4xl font-bold">Hubungi Kami</h1></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="text-primary"/> Alamat</CardTitle></CardHeader><CardContent>Jl. Argo Mulyo, Kec. Batu Ketulis</CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Phone className="text-primary"/> Telepon</CardTitle></CardHeader><CardContent>+62 822-3155-8903</CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Mail className="text-primary"/> Email</CardTitle></CardHeader><CardContent>Argocoffee93@gmail.com</CardContent></Card>
        </div>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label>Nama</Label><Input required placeholder="Nama Anda" /></div>
              <div className="space-y-2"><Label>Email</Label><Input required type="email" placeholder="email@anda.com" /></div>
              <div className="space-y-2"><Label>Pesan</Label><Textarea required placeholder="Tulis pesan..." rows={4} /></div>
              <Button type="submit" className="w-full"><Send className="mr-2 h-4 w-4"/> Kirim Pesan</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}