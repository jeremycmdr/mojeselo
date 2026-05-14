import React from 'react';
import './Products.css';

const products = [
  {
    id: 1,
    name: "Šumski med - Domaćinstvo Petrović",
    price: "27,90 KM",
    rating: 5,
    image: "https://images.unsplash.com/photo-1587049352847-4d4b1ed7fa32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Mladi Travnički sir - Sirana Mešić",
    price: "13,90 KM",
    rating: 5,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Organske paprike - Fresh Voće i Povrće",
    price: "19,00 Tr",
    rating: 0,
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Vranac - Vinarija Vukoje",
    price: "12,00 Tr",
    rating: 0,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

const ProductsList = () => {
  return (
    <section className="products-section">
      <h2 className="section-title">NOVI PROIZVODI NA TRŽNICI</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-meta">
                <span className="product-price">{product.price}</span>
                {product.rating > 0 && (
                  <span className="product-rating">
                    <span className="star">★</span> {product.rating}
                  </span>
                )}
              </div>
              <button className="btn-primary add-to-cart-btn">DODAJ U KORPU</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
