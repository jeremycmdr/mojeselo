import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import ProductsList from '../../components/Products/ProductsList';
import ReliabilityText from '../../components/Reliability/ReliabilityText';
import CategoryList from '../../components/Categories/CategoryList';
import TourismList from '../../components/Tourism/TourismList';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main className="home-main-content">
        <div className="left-column">
          <Hero />
          
          <div className="mobile-categories">
            <CategoryList />
          </div>

          <div className="left-middle-section">
            <ProductsList />
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
    </div>
  );
};

export default Home;
