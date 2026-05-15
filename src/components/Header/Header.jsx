import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AddProductModal from '../Products/AddProductModal';
import './Header.css';

const getInitials = (name) => {
  if (!name) return 'M';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

const Header = ({ onOpenAuth }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Proveravamo da li postoji korisnik u localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Zatvaranje dropdown-a klikom van njega
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    window.location.reload();
  };

  const handleProductAdded = () => {
    // Ako smo na stranici profila, ona će već osvežiti listu
    // Ovde možemo dodati neku notifikaciju ili samo osvežiti stranu ako želimo
    if (window.location.pathname === '/profil') {
      window.location.reload();
    }
  };

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
            <li><Link to="/seoski-turizam">Seoski Turizam</Link></li>
            <li><Link to="/sve-organsko">Sve Organsko</Link></li>
            <li><Link to="/o-nama">O Nama</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          {user ? (
            <>
              {/* Brzi taster za dodavanje proizvoda */}
              <button 
                className="header-add-btn" 
                onClick={() => setIsAddModalOpen(true)}
                title="Dodaj novi proizvod"
              >
                <span className="plus">+</span>
              </button>

              <div className="user-profile-menu" ref={dropdownRef}>
                <div 
                  className="user-avatar-trigger" 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  title={user.name}
                >
                  <div className="avatar-placeholder">
                    {getInitials(user.name)}
                  </div>
                  <span className="user-name-text">{user.name.split(' ')[0]}</span>
                  <span className={`chevron-icon ${isDropdownOpen ? 'up' : 'down'}`}>▼</span>
                </div>

                {isDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <p className="user-full-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/profil" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <span className="icon">👤</span> Moj Profil
                    </Link>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <span className="icon">🚪</span> Odjavi se
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button className="login-btn" onClick={() => onOpenAuth('login')}>
              <span className="full-text">Prijavi Domaćinstvo / Prijava</span>
              <span className="short-text">Prijava</span>
            </button>
          )}
        </div>
      </div>

      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </header>
  );
};

export default Header;
