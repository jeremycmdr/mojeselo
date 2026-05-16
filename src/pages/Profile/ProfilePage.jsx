import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';
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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [userProducts, setUserProducts] = useState([]);
  const [userTourism, setUserTourism] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState('product'); // 'product' ili 'tourism'

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchUserData(userData.id);
    } else {
      navigate('/');
    }
  }, []);

  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const [prodRes, tourRes] = await Promise.all([
        fetch(`${API_URL}/products/user/${userId}`),
        fetch(`${API_URL}/tourism/user/${userId}`)
      ]);
      
      const prodData = await prodRes.json();
      const tourData = await tourRes.json();

      if (prodData.success) setUserProducts(prodData.data);
      if (tourData.success) setUserTourism(tourData.data);
    } catch (error) {
      console.error("Greška pri učitavanju podataka korisnika:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdated = () => {
    if (user) {
      fetchUserData(user.id);
    }
    setSelectedItem(null);
  };

  const handleEdit = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    const endpoint = itemType === 'product' ? 'products' : 'tourism';
    
    try {
      const response = await fetch(`${API_URL}/${endpoint}/${selectedItem.id}`, {
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
        fetchUserData(user.id);
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
            
            <button className="add-product-btn" onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}>
              <span className="plus-icon">+</span> Dodaj objavu
            </button>
          </div>

          <div className="profile-tabs-container">
            <div className="profile-tabs">
              <button 
                className={`profile-tab ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Moji Proizvodi <span>({userProducts.length})</span>
              </button>
              <button 
                className={`profile-tab ${activeTab === 'tourism' ? 'active' : ''}`}
                onClick={() => setActiveTab('tourism')}
              >
                Seoski Turizam <span>({userTourism.length})</span>
              </button>
            </div>
          </div>

          <div className="profile-sections-content">
            {loading ? (
              <div className="loading-spinner">Učitavanje podataka...</div>
            ) : activeTab === 'products' ? (
              <div className="profile-products-section">
                {userProducts.length > 0 ? (
                  <ProductsList 
                    products={userProducts} 
                    onEdit={(p) => handleEdit(p, 'product')} 
                    onDelete={(p) => handleDeleteClick(p, 'product')} 
                  />
                ) : (
                  <div className="empty-profile-state">
                    <p>Još uvek niste dodali nijedan proizvod.</p>
                    <button className="create-first-btn" onClick={() => {
                      setSelectedItem(null);
                      setIsModalOpen(true);
                    }}>Dodaj prvi proizvod</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="profile-tourism-section">
                {userTourism.length > 0 ? (
                  <div className="profile-tourism-grid">
                    {userTourism.map(item => (
                      <div key={item.id} className="profile-item-card">
                        <div className="item-img">
                          <img src={item.image || '/placeholder.png'} alt={item.title} />
                        </div>
                        <div className="item-info">
                          <h3>{item.title}</h3>
                          <p className="item-meta">🏷️ {item.category || 'Nema kategorije'} | 📍 {item.location_name}</p>
                          <p className="item-price">{item.price ? `${item.price} KM` : 'Po dogovoru'}</p>
                        </div>
                        <div className="item-actions">
                          <button className="edit-btn" onClick={() => handleEdit(item, 'tourism')}>Izmjeni</button>
                          <button className="delete-btn" onClick={() => handleDeleteClick(item, 'tourism')}>Obriši</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-profile-state">
                    <p>Još uvek niste dodali nijednu turističku ponudu.</p>
                    <button className="create-first-btn" onClick={() => {
                      setSelectedItem(null);
                      setIsModalOpen(true);
                    }}>Objavi turističku ponudu</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <AddProductModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }} 
          onProductAdded={handleDataUpdated}
          product={itemType === 'product' ? selectedItem : null}
          tourismItem={itemType === 'tourism' ? selectedItem : null}
        />

        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          productName={selectedItem?.name || selectedItem?.title}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
