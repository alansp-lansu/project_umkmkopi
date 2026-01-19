import './App.css';
import { HashRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
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