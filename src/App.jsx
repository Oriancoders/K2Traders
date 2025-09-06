import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/commoncomponents/Header.jsx';
import Footer from './components/commoncomponents/Footer.jsx';
import Home from './pages/Home.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import AboutPage from './pages/AboutPage.jsx';
import BrandStoryPage from './pages/BrandStoryPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishListContext.jsx';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
        <div className="min-h-screen max-w-[100vw]">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/brand-story" element={<BrandStoryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;