import React from 'react';
import './Categories.css';

const categories = [
  { id: 1, name: "Mliječni proizvodi", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 2, name: "Voće i Povrće", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 3, name: "Med i Pčelarstvo", image: "https://images.unsplash.com/photo-1587049352851-8d4e89134a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 4, name: "Meso", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 5, name: "Domaći Sokovi", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" }
];

const CategoryList = () => {
  return (
    <section className="categories-section">
      <h2 className="sidebar-title">KATEGORIJE PROIZVODA</h2>
      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-item">
            <div className="category-img-wrapper">
              <img src={cat.image} alt={cat.name} />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
