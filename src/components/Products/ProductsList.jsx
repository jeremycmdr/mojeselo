import React from 'react';
import './Products.css';

const products = [
  {
    id: 1,
    name: "Šumski med - Domaćinstvo Petrović",
    price: "27,90 KM",
    rating: 5,
    image: "/honey.png"
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
    name: "Organske paprike",
    price: "19,00 KM",
    rating: 3,
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Vranac - Vinarija Vukoje",
    price: "12,00 KM",
    rating: 3,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Domaća jaja (30 kom) - Farma Zeleni Gaj",
    price: "12,00 KM",
    rating: 5,
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Svježi krastavci - Bašta Delić",
    price: "3,50 KM",
    rating: 4,
    image: "https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    name: "Rakija Šljivovica (0.7l) - Destilerija Stari Hrast",
    price: "25,00 KM",
    rating: 5,
    image: "/rakija.png"
  },
  {
    id: 8,
    name: "Domaći pekmez od šljiva - Bakina kuhinja",
    price: "10,00 KM",
    rating: 5,
    image: "/pekmez.png"
  },
  {
    id: 9,
    name: "Pšenično brašno (5kg) - Mlin Semberija",
    price: "9,00 KM",
    rating: 4,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 10,
    name: "Svježe jagode - Plantaža Voće",
    price: "6,00 KM",
    rating: 5,
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 11,
    name: "Kozji sir u maslinovom ulju - Hercegovački krš",
    price: "18,00 KM",
    rating: 5,
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 12,
    name: "Goveđi pršut - Sušara Mujić",
    price: "35,00 KM",
    rating: 5,
    image: "/prsut.png"
  }
];

const ProductsList = () => {
  return (
    <section className="products-section">
      <h2 className="section-title">NOVI PROIZVODI</h2>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
