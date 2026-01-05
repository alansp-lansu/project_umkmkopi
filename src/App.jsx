import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contack';
import Cart from './pages/cart';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
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
    </div>
  );
}
