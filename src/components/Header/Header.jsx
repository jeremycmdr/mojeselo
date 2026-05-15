import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onOpenAuth }) => {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-area" style={{ textDecoration: 'none' }}>
          <span className="logo-icon">🌿</span>
          <span className="logo-text">SeloMoje.ba</span>
        </Link>
        
        <nav className="main-nav">
          <ul>
            <li><Link to="/domaci-proizvodi">Domaći Proizvodi</Link></li>
            <li><Link to="/domacinstva">Domaćinstva</Link></li>
            <li><a href="#">Seoski Turizam</a></li>
            <li><a href="#">Sve Organsko</a></li>
            <li><a href="#">O Nama</a></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <button className="login-btn" onClick={() => onOpenAuth('login')}>
            <span className="full-text">Prijavi Domaćinstvo / Prijava</span>
            <span className="short-text">Prijava</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
