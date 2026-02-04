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
    name: "Kopi bubuk 250g-1kg", 
    price: 33000-130000, 
    displayPrice: "Rp 33.000 - Rp 130.000",
    image: "/img/1kg.webp",
    description: "bubuk argo coffee 100% murni tanpa campuran", 
    badge: "Best Seller"
  },
  { 
    id: 2, 
    name: "Biji kopi robusta 1kg", 
    price: 80000, 
    displayPrice: null,
    image: "/img/greenbeens.webp",
    description: "Biji kopi robusta asli kopi lokal lampung barat",
    badge: "Terlaris"
  },
  { 
    id: 3, 
    name: "biji kopi roasting 1kg",
    price: 130000, 
    displayPrice: null,
    image: "/img/roasting.webp",
    description: "biji kopi yang sudah di roasting",
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