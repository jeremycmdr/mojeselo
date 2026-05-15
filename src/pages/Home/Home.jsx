import React, { useState, useEffect } from 'react';
import API_URL from '../../config';
import './Home.css';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import ProductsList from '../../components/Products/ProductsList';
import ReliabilityText from '../../components/Reliability/ReliabilityText';
import CategoryList from '../../components/Categories/CategoryList';
import TourismList from '../../components/Tourism/TourismList';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();
        
        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Greška pri preuzimanju proizvoda:", error);
      }
    };
    fetchProducts();
  }, []);

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  return (
    <div className="home-page site-wrapper">
      <Header onOpenAuth={openAuth} />
      
      <main className="home-main-content main-content">
        <div className="left-column">
          <Hero />
          
          <div className="mobile-categories">
            <CategoryList />
          </div>

          <div className="left-middle-section">
            <ProductsList title="NOVI PROIZVODI" products={products} />
          </div>

          <div className="mobile-tourism">
            <TourismList />
          </div>
          
          <ReliabilityText />
        </div>
        
        <aside className="right-column">
          <div className="desktop-categories">
            <CategoryList />
          </div>
          <div className="desktop-tourism">
            <TourismList />
          </div>
        </aside>
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </div>
  );
};

export default Home;
