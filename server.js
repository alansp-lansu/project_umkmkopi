import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- 1. DATA DUMMY PRODUK ---
const productsData = [
  { 
    id: 1, 
    name: "Kopi Arabika Gayo", 
    price: 75000, 
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1000",
    description: "Kopi dengan aroma fruity yang kuat dan tingkat keasaman yang seimbang.",
    badge: "Best Seller"
  },
  { 
    id: 2, 
    name: "Robusta Lampung", 
    price: 60000, 
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000",
    description: "Kopi strong dengan body tebal dan rasa coklat pahit yang nikmat.",
    badge: "Terlaris"
  },
  { 
    id: 3, 
    name: "Espresso House Blend", 
    price: 85000, 
    image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=1000",
    description: "Campuran Arabika & Robusta khusus untuk mesin espresso.",
    badge: "Baru"
  }
];

// --- 2. VARIABLE PENAMPUNG PESANAN ---
let orders = []; 

// --- 3. ROUTES ---
app.get('/', (req, res) => {
  res.send('Server Kopi Berjalan (ES Module)!');
});

app.get('/products', (req, res) => {
  res.json(productsData);
});

app.post('/orders', (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  console.log("Pesanan Masuk:", newOrder);
  res.status(201).json({ message: "Pesanan diterima!", data: newOrder });
});

// --- 4. JALANKAN SERVER ---
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});