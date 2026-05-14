import React from 'react';
import './Tourism.css';

const tourismItems = [
  {
    id: 1,
    title: "Vikend u Brvnari - Tara",
    rating: 5,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "Škola kuhanja tradicionalnih jela",
    rating: 5,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "Škola kuhanja tradicionalnih jela",
    rating: 5,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    title: "Škola kuhanja tradicionalnih jela",
    rating: 5,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  }
];

const TourismList = () => {
  return (
    <section className="tourism-section">
      <h2 className="sidebar-title" style={{textAlign: 'left'}}>SEOSKI TURIZAM & DOŽIVLJAJI</h2>
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
