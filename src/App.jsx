import './App.css';
// Import yang sudah dirapikan (tidak double HashRouter)
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Import Halaman
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-background text-foreground">
      <HashRouter>
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produk" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-center" />
      </HashRouter>
    </div>
  );
}

export default App;
// ⛔️ STOP DI SINI. Jangan ada codingan lagi di bawah baris ini.