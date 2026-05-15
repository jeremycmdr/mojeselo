import React from 'react';
import './Tourism.css';

const tourismItems = [
  {
    id: 1,
    title: "Planinska brvnara - Bjelašnica",
    rating: 5,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "Vikendica pored rijeke - Una",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "Kamena kuća - Blagaj",
    rating: 5,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    title: "Brvnara na jezeru - Rama",
    rating: 5,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 5,
    title: "Apartman u prirodi - Jahorina",
    rating: 5,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 6,
    title: "Seosko imanje - Trebinje",
    rating: 5,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  }
];

const TourismList = () => {
  return (
    <section className="tourism-section">
      <h2 className="sidebar-title"><span>SEOSKI TURIZAM</span></h2>
      <div className="tourism-grid">
        {tourismItems.map(item => (
          <div key={item.id} className="tourism-card">
            <div className="tourism-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="tourism-info">
              <h4>{item.title}</h4>
              <div className="tourism-rating">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourismList;
