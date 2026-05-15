import React, { useState, useEffect } from 'react';
import API_URL from '../../config';
import './Tourism.css';

const TourismList = () => {
  const [tourismItems, setTourismItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourism = async () => {
      try {
        const response = await fetch(`${API_URL}/tourism`);
        const result = await response.json();
        if (result.success) {
          // Uzimamo samo prvih 6 za prikaz na početnoj
          setTourismItems(result.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Greška pri učitavanju turizma:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTourism();
  }, []);

  if (loading) return <div className="tourism-loading">Učitavanje...</div>;
  if (tourismItems.length === 0) return null;

  return (
    <section className="tourism-section">
      <h2 className="sidebar-title"><span>SEOSKI TURIZAM</span></h2>
      <div className="tourism-grid">
        {tourismItems.map(item => (
          <div key={item.id} className="tourism-card">
            <div className="tourism-img">
              {item.image ? (
                <img src={item.image} alt={item.title} />
              ) : (
                <div className="tourism-placeholder">
                  <span className="placeholder-icon">🏡</span>
                </div>
              )}
            </div>
            <div className="tourism-info">
              <h4>{item.title}</h4>
              <div className="tourism-rating">
                {[...Array(Math.round(item.rating || 5))].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="tourism-location">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourismList;
