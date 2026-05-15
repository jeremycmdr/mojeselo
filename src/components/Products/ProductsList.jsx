import React, { useState, useEffect } from 'react';
import './Products.css';

// Generišemo 50 proizvoda za demo (dupliranjem i modifikacijom postojećih)
const baseProducts = [
  { id: 1, name: "Šumski med - Domaćinstvo Petrović", price: 27.90, rating: 5, isOrganic: true, category: "Med i pčelinji proizvodi", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Mladi Travnički sir - Sirana Mešić", price: 13.90, rating: 5, category: "Mliječni proizvodi", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Organske paprike", price: 19.00, rating: 3, isOrganic: true, category: "Voće i povrće", image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Vranac - Vinarija Vukoje", price: 12.00, rating: 3, category: "Alkoholna pića", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Domaća jaja (30 kom) - Farma Zeleni Gaj", price: 12.00, rating: 5, isOrganic: true, category: "Jaja", image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Svježi krastavci - Bašta Delić", price: 3.50, rating: 4, category: "Voće i povrće", image: "https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Rakija Šljivovica (0.7l) - Destilerija Stari Hrast", price: 25.00, rating: 5, category: "Alkoholna pića", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Domaći pekmez od šljiva - Bakina kuhinja", price: 10.00, rating: 5, isOrganic: true, category: "Prerađeni proizvodi", image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Pšenično brašno (5kg) - Mlin Semberija", price: 9.00, rating: 4, category: "Žitarice i brašno", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "Svježe jagode - Plantaža Voće", price: 6.00, rating: 5, isOrganic: true, category: "Voće i povrće", image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 11, name: "Kozji sir u maslinovom ulju - Hercegovački krš", price: 18.00, rating: 5, category: "Mliječni proizvodi", image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 12, name: "Goveđi pršut - Sušara Mujić", price: 35.00, rating: 5, category: "Meso i mesni proizvodi", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
];

// Kreiramo 200 proizvoda za demo
const allProducts = Array.from({ length: 200 }, (_, i) => ({
  ...baseProducts[i % baseProducts.length],
  id: i + 1,
  // Malo variramo cene i ocene za bolji sort demo
  price: baseProducts[i % baseProducts.length].price + (i % 5),
  rating: Math.min(5, Math.max(1, baseProducts[i % baseProducts.length].rating - (i % 2)))
}));

const ProductsList = ({ title, searchQuery = '', category = 'Sve', sortBy = 'Najnovije', isOrganicOnly = false }) => {
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

  // Filtriranje i sortiranje
  let filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'Sve' || product.category === category;
    const matchesOrganic = !isOrganicOnly || product.isOrganic;
    return matchesSearch && matchesCategory && matchesOrganic;
  });

  // Sortiranje
  if (sortBy === 'cijena-nizak') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'cijena-visok') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'ocjena') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else {
    // Podrazumevano: Najnovije (po ID-u unazad)
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  const currentProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section className="products-section">
      {title && <h2 className="section-title"><span>{title}</span></h2>}
      
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>Nema pronađenih proizvoda koji odgovaraju vašim kriterijumima.</p>
          <button onClick={() => window.location.reload()} className="reset-btn">Prikaži sve</button>
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
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-meta">
                    <span className="product-price">{product.price.toFixed(2)} KM</span>
                    {product.rating > 0 && (
                      <div className="product-rating">
                        <div className="stars-list">
                          {[...Array(5)].map((_, index) => (
                            <span 
                              key={index} 
                              className={`star ${index >= product.rating ? 'empty' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="rating-value">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  <button className="add-to-cart-btn">Pogledaj detalje</button>
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
