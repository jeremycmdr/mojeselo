import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-area">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">SeloMoje.ba</span>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="#">Domaći Proizvodi</a></li>
            <li><a href="#">Domaćinstva</a></li>
            <li><a href="#">Seoski Turizam</a></li>
            <li><a href="#">Sve Organsko</a></li>
            <li><a href="#">Alati i Oprema</a></li>
            <li><a href="#">O Nama</a></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <button className="icon-btn search-btn">🔍</button>
          <button className="icon-btn cart-btn">🛒</button>
          <button className="login-btn">Prijavi Domaćinstvo / Prijava</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
