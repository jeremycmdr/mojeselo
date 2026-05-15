import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductModal from '../Products/AddProductModal';
import AuthModal from '../Auth/AuthModal';
import './MobileToolbar.css';

const getInitials = (name) => {
  if (!name) return 'M';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

const MobileToolbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAddClick = () => {
    if (user) {
      setIsAddModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profil');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleProductAdded = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="mobile-bottom-toolbar">
        <button className="toolbar-item" onClick={() => navigate('/')} title="Početna">
          <span className="icon">🏠</span>
        </button>
        <button className="toolbar-item" title="Pretraga">
          <span className="icon">🔍</span>
        </button>
        
        <div className="toolbar-add-container">
          <button 
            className="toolbar-add-button" 
            onClick={handleAddClick}
            title="Dodaj proizvod"
          >
            <span className="plus">+</span>
          </button>
        </div>

        <button className="toolbar-item" title="Omiljeno">
          <span className="icon">❤️</span>
        </button>
        <button className="toolbar-item" onClick={handleProfileClick} title="Profil">
          {user ? (
            <div className="toolbar-avatar">
              {getInitials(user.name)}
            </div>
          ) : (
            <span className="icon">👤</span>
          )}
        </button>
      </div>

      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
};

export default MobileToolbar;
