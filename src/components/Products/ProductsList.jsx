import React, { useState, useEffect } from 'react';
import './Products.css';



const ProductsList = ({ title, searchQuery = '', category = 'Sve', sortBy = 'Najnovije', isOrganicOnly = false, products, onEdit, onDelete }) => {
  const [visibleCount, setVisibleCount] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  // Resetujemo visibleCount kada se promene filteri
  useEffect(() => {
    setVisibleCount(25);
  }, [searchQuery, category, sortBy, isOrganicOnly]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 25);
      setIsLoading(false);
    }, 800);
  };

  // Koristimo prosleđene proizvode
  const displayProducts = products || [];

  // Filtriranje i sortiranje
  let filteredProducts = displayProducts.filter(product => {
    const matchesSearch = (product.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'Sve' || product.category_name === category;
    const matchesOrganic = !isOrganicOnly || product.isOrganic;
    return matchesSearch && matchesCategory && matchesOrganic;
  });

  // Sortiranje
  if (sortBy === 'cijena-nizak') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'cijena-visok') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'ocjena') {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else {
    // Podrazumevano: Najnovije (po ID-u unazad)
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  const currentProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section className="products-section">
      {title && <h2 className="products-section-title"><span>{title}</span></h2>}
      
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>Trenutno nema proizvoda.</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {currentProducts.map(product => (
              <div key={product.id} className={`product-card ${product.isOrganic ? 'organic' : ''}`}>
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} />
                  {product.isOrganic && (
                    <div className="organic-label">
                      <svg viewBox="0 0 24 24" className="leaf-icon">
                        <path fill="currentColor" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                      </svg>
                      <span>Organsko</span>
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name || 'Proizvod'}</h3>
                  <span className="product-category">{product.category_name}</span>
                  <div className="product-meta">
                    <span className="product-price">{(Number(product.price) || 0).toFixed(2)} KM</span>
                  </div>
                  
                  {onEdit && onDelete ? (
                    <div className="product-actions-admin">
                      <button className="edit-btn" onClick={() => onEdit(product)}>
                        Izmjeni
                      </button>
                      <button className="delete-btn" onClick={() => onDelete(product)}>
                        Obriši
                      </button>
                    </div>
                  ) : (
                    <button className="add-to-cart-btn">Pogledaj detalje</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button 
                className={`load-more-btn ${isLoading ? 'loading' : ''}`} 
                onClick={loadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Učitavanje...
                  </>
                ) : (
                  'Učitaj još'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductsList;
