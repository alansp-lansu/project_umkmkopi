const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors()); // Agar React boleh minta data
app.use(express.json());

// 1. Konfigurasi Koneksi ke XAMPP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // User default XAMPP
    password: '',      // Password default XAMPP (kosong)
    database: 'db_kopi' // Nama database yang tadi dibuat
});

// 2. Cek Koneksi
db.connect((err) => {
    if (err) {
        console.error('Error koneksi MySQL:', err);
    } else {
        console.log('Terhubung ke Database XAMPP!');
    }
});

// 3. Membuat "Pintu" (Endpoint) untuk mengambil data produk
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// 4. Jalankan Server di Port 5000
app.listen(5000, () => {
    console.log('Server berjalan di port 5000...');
});
// ... kode-kode sebelumnya ...

// 4. Endpoint untuk MENERIMA Pesanan (POST)
app.post('/orders', (req, res) => {
    // Ambil data yang dikirim dari Frontend
    const { product_name, quantity, weight, total_price } = req.body;

    const sql = 'INSERT INTO orders (product_name, quantity, weight, total_price) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [product_name, quantity, weight, total_price], (err, result) => {
        if (err) {
            console.error("Gagal menyimpan pesanan:", err);
            return res.status(500).json({ error: "Gagal menyimpan ke database" });
        }
        res.json({ message: "Pesanan berhasil disimpan!", orderId: result.insertId });
    });
});

// ... app.listen ada di bawah sini ...