import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import ProductsList from '../../components/Products/ProductsList';
import NewsWidget from '../../components/News/NewsWidget';
import ReliabilityText from '../../components/Reliability/ReliabilityText';
import CategoryList from '../../components/Categories/CategoryList';
import TourismList from '../../components/Tourism/TourismList';
import FarmItemsList from '../../components/FarmItems/FarmItemsList';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main className="home-main-content">
        <div className="left-column">
          <Hero />
          
          <div className="left-middle-section">
            <div className="products-area">
              <ProductsList />
            </div>
            <div className="news-area">
              <NewsWidget />
            </div>
          </div>
          
          <ReliabilityText />
        </div>
        
        <aside className="right-column">
          <CategoryList />
          <TourismList />
          <FarmItemsList />
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
