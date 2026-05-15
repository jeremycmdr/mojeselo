import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>OKUSI PRAVU BOSNU I HERCEGOVINU</h1>
        <p>Vaša prečica do domaće hrane i skrivenih prirodnih lepota.</p>

        <div className="search-widget">
          <div className="search-field">
            <label>Šta tražite?</label>
            <input type="text" placeholder="e.g. sir, med, smještaj" />
          </div>
          <div className="search-divider"></div>
          <div className="search-field">
            <label>Lokacija?</label>
            <input type="text" placeholder="e.g. Semberija, Hercegovina" />
          </div>
          <button className="btn-primary search-btn">PRETRAŽI</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
