import React, { useState, useEffect } from 'react';
import './Categories.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Greška pri učitavanju kategorija:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="categories-loading">Učitavanje...</div>;

  return (
    <section className="categories-section">
      <h2 className="sidebar-title"><span>KATEGORIJE PROIZVODA</span></h2>
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
