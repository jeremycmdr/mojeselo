import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductsList from '../../components/Products/ProductsList';
import AddProductModal from '../../components/Products/AddProductModal';
import DeleteConfirmationModal from '../../components/Products/DeleteConfirmationModal';
import './ProfilePage.css';

const getInitials = (name) => {
  if (!name) return 'M';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchUserProducts(userData.id);
    } else {
      window.location.href = '/';
    }
  }, []);

  const fetchUserProducts = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/user/${userId}`);
      const data = await response.json();
      if (data.success) {
        setUserProducts(data.data);
      }
    } catch (error) {
      console.error("Greška pri učitavanju proizvoda korisnika:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = () => {
    if (user) {
      fetchUserProducts(user.id);
    }
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/products/${selectedProduct.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
        return;
      }

      const data = await response.json();
      if (data.success) {
        fetchUserProducts(user.id);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Greška pri brisanju:", error);
    }
  };

  return (
    <div className="profile-page site-wrapper">
      <Header />
      
      <main className="profile-content main-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info-card">
              <div className="profile-avatar-large">
                {getInitials(user?.name)}
              </div>
              <div className="profile-details">
                <h1>{user?.name}</h1>
                <p className="profile-location">📍 {user?.town || 'Lokacija nije navedena'}</p>
                <p className="profile-email">✉️ {user?.email}</p>
              </div>
            </div>
            
            <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
              <span className="plus-icon">+</span> Dodaj novi proizvod
            </button>
          </div>

          <div className="profile-products-section">
            <div className="section-header">
              <h2>Moji Proizvodi</h2>
              <span className="product-count">{userProducts.length} proizvoda</span>
            </div>

            {loading ? (
              <div className="loading-spinner">Učitavanje tvojih proizvoda...</div>
            ) : userProducts.length > 0 ? (
              <ProductsList 
                products={userProducts} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ) : (
              <div className="empty-products">
                <p>Još uvek niste dodali nijedan proizvod.</p>
                <button className="create-first-btn" onClick={() => {
                  setSelectedProduct(null);
                  setIsModalOpen(true);
                }}>Započni prodaju</button>
              </div>
            )}
          </div>
        </div>

        <AddProductModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }} 
          onProductAdded={handleProductAdded}
          product={selectedProduct}
        />

        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          productName={selectedProduct?.name}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
