import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API_URL from '../../config';
import ProductsList from '../../components/Products/ProductsList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import './ProductsPage.css';

const ProductsPage = () => {
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Sve');
  const [sortBy, setSortBy] = useState('Najnovije');
  const [isOrganicOnly, setIsOrganicOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Sve']);

  // Handle category from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    if (catParam) {
      setCategory(catParam);
    }
  }, [location.search]);

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

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        if (data.success) {
          setCategories(['Sve', ...data.data.map(cat => cat.name)]);
        }
      } catch (error) {
        console.error("Greška pri preuzimanju kategorija:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const sortOptions = [
    { label: 'Najnovije', value: 'Najnovije' },
    { label: 'Cijena: Niža ka višoj', value: 'cijena-nizak' },
    { label: 'Cijena: Viša ka nižoj', value: 'cijena-visok' },
    { label: 'Najbolje ocijenjeno', value: 'ocjena' }
  ];

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="products-page site-wrapper">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="products-main-content main-content">
        <div className="products-hero">
          <div className="products-page-container">
            <div className="hero-content">
              <h1>Domaći Proizvodi</h1>
              <p>Otkrijte najbolje iz srca prirode - direktno sa domaćinstava</p>
            </div>
          </div>
        </div>

        <div className="products-page-container">
          <div className="products-toolbar">
            <div className="toolbar-left">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Pretraži proizvode..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="toolbar-right">
              <div className="filter-group">
                <label>Kategorija:</label>
                <div style={{ width: '280px' }}>
                  <CustomSelect 
                    value={category} 
                    onChange={(val) => setCategory(val)} 
                    options={categories} 
                    placeholder="Sve kategorije"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Sortiraj:</label>
                <div style={{ width: '200px' }}>
                  <CustomSelect 
                    value={sortOptions.find(o => o.value === sortBy)?.label || sortBy} 
                    onChange={(val) => {
                      const selected = sortOptions.find(o => o.label === val || o.value === val);
                      setSortBy(selected?.value || val);
                    }} 
                    options={sortOptions} 
                    placeholder="Najnovije"
                  />
                </div>
              </div>

              <div className="organic-toggle">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={isOrganicOnly}
                    onChange={(e) => setIsOrganicOnly(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label">Samo Organsko</span>
              </div>
            </div>
          </div>

          <div className="active-filters">
            {searchQuery && <span className="filter-chip">Pretraga: {searchQuery} <button onClick={() => setSearchQuery('')}>×</button></span>}
            {category !== 'Sve' && <span className="filter-chip">Kategorija: {category} <button onClick={() => setCategory('Sve')}>×</button></span>}
            {isOrganicOnly && <span className="filter-chip">Organsko <button onClick={() => setIsOrganicOnly(false)}>×</button></span>}
          </div>

          <ProductsList 
            searchQuery={searchQuery}
            category={category}
            sortBy={sortBy}
            isOrganicOnly={isOrganicOnly}
            products={products}
          />
        </div>
      </main>

      <Footer />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
};

export default ProductsPage;
