import React, { useState } from 'react';
import ProductsList from '../../components/Products/ProductsList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import './ProductsPage.css';

const ProductsPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Sve');
  const [sortBy, setSortBy] = useState('Najnovije');
  const [isOrganicOnly, setIsOrganicOnly] = useState(false);

  const categoryOptions = [
    'Sve',
    'Voće i povrće',
    'Žitarice i brašno',
    'Mliječni proizvodi',
    'Meso i mesni proizvodi',
    'Jaja',
    'Alkoholna pića',
    'Med i pčelinji proizvodi',
    'Bilje i čajevi',
    'Orašasti plodovi i sjemenke',
    'Bezalkoholna pića',
    'Prerađeni proizvodi',
    'Sadnice i rasad',
    'Zanatstvo i rukotvorine'
  ];

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
    <div className="products-page">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="products-main-content">
        <div className="products-page-container">
          <div className="page-header">
            <h1>Domaći Proizvodi</h1>
            <p>Otkrijte najbolje iz srca prirode - direktno sa domaćinstava</p>
          </div>

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
                    onChange={setCategory} 
                    options={categoryOptions} 
                    placeholder="Sve Kategorije"
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

          <ProductsList />
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
