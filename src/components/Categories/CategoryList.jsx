import React from 'react';
import './Categories.css';

const categories = [
  { id: 1, name: "Stočarstvo", image: "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 4, name: "Povrtarstvo", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 3, name: "Voćarstvo", image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 6, name: "Pčelarstvo", image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 5, name: "Vinogradarstvo", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 2, name: "Ratarstvo", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 9, name: "Ljekovito bilje", image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
  { id: 10, name: "Zanatstvo", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" }
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
