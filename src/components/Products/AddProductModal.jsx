import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomSelect from '../Common/CustomSelect/CustomSelect';
import API_URL from '../../config';
import '../Auth/AuthModal.css'; // Ponovo koristimo iste stilove za konzistentnost
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onProductAdded, product }) => {
  const [activeTab, setActiveTab] = useState('product');
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    isOrganic: false
  });
  const [tourismData, setTourismData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        if (data.success) {
          setCategories(data.data.map(cat => ({
            value: cat.id,
            label: cat.name
          })));
        }
      } catch (error) {
        console.error("Greška pri preuzimanju kategorija:", error);
      }
    };
    fetchCategories();
  }, []);

  // Reset/Populate form
  useEffect(() => {
    if (isOpen) {
      setError('');
      if (product) {
        setActiveTab('product');
        let categoryVal = product.category;
        if (isNaN(categoryVal) && categories.length > 0) {
          const found = categories.find(c => c.label === categoryVal);
          if (found) categoryVal = found.value;
        }
        setFormData({
          name: product.name || '',
          price: product.price || '',
          category: categoryVal || '',
          image: product.image || '',
          description: product.description || '',
          isOrganic: !!product.isOrganic
        });
      } else {
        setFormData({ name: '', price: '', category: '', image: '', description: '', isOrganic: false });
        setTourismData({ title: '', description: '', image: '', price: '', location: '' });
      }
    }
  }, [isOpen, product, categories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (activeTab === 'product') {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    } else {
      setTourismData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const savedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    try {
      const isProduct = activeTab === 'product';
      const endpoint = isProduct ? 'products' : 'tourism';
      
      const url = product && isProduct
        ? `${API_URL}/${endpoint}/${product.id}` 
        : `${API_URL}/${endpoint}`;
      
      const method = product && isProduct ? 'PUT' : 'POST';

      const body = isProduct 
        ? { ...formData, user_id: savedUser.id }
        : { ...tourismData, household_id: savedUser.id };

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
        return;
      }

      const data = await response.json();
      if (data.success) {
        onProductAdded();
        onClose();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Greška pri povezivanju sa serverom.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        
        {/* TABS */}
        <div className="auth-tabs">
          <button 
            className={`tab-btn ${activeTab === 'product' ? 'active' : ''}`}
            onClick={() => setActiveTab('product')}
          >
            Dodaj Proizvod
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tourism' ? 'active' : ''}`}
            onClick={() => setActiveTab('tourism')}
          >
            Seoski Turizam
          </button>
        </div>

        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            {activeTab === 'product' ? (
              <>
                <h2>{product ? 'Izmjeni proizvod' : 'Novi proizvod'}</h2>
                <p>Unesite detalje vašeg domaćeg proizvoda</p>
                {error && <div className="auth-error-alert">{error}</div>}
                
                <div className="form-group">
                  <label>Naziv proizvoda</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="npr. Domaći Ajvar 720g" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Cijena (KM)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" step="0.01" required />
                  </div>
                  <div className="form-group">
                    <label>Kategorija</label>
                    <CustomSelect options={categories} value={formData.category} onChange={(val) => setFormData(prev => ({ ...prev, category: val }))} placeholder="Izaberi..." />
                  </div>
                </div>
                <div className="form-group">
                  <label>Link do slike (URL)</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="form-group">
                  <label>Opis proizvoda</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Kratak opis..." rows="3"></textarea>
                </div>
                <div className="organic-toggle-container">
                  <label className="switch">
                    <input type="checkbox" name="isOrganic" checked={formData.isOrganic} onChange={handleInputChange} />
                    <span className="slider round"></span>
                  </label>
                  <span className="toggle-label">Organski proizvod</span>
                </div>
              </>
            ) : (
              <>
                <h2>Novi oglas za turizam</h2>
                <p>Ponudite smještaj ili iskustvo na vašem imanju</p>
                {error && <div className="auth-error-alert">{error}</div>}

                <div className="form-group">
                  <label>Naziv oglasa</label>
                  <input type="text" name="title" value={tourismData.title} onChange={handleInputChange} placeholder="npr. Planinska brvnara sa pogledom" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Cijena noćenja (KM)</label>
                    <input type="number" name="price" value={tourismData.price} onChange={handleInputChange} placeholder="0.00" step="0.01" required />
                  </div>
                  <div className="form-group">
                    <label>Lokacija</label>
                    <input type="text" name="location" value={tourismData.location} onChange={handleInputChange} placeholder="npr. Bjelašnica, Babin Do" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Link do slike (URL)</label>
                  <input type="text" name="image" value={tourismData.image} onChange={handleInputChange} placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="form-group">
                  <label>Opis smještaja / ponude</label>
                  <textarea name="description" value={tourismData.description} onChange={handleInputChange} placeholder="Opišite šta nudite gostima..." rows="4"></textarea>
                </div>
              </>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Slanje...' : 'Objavi oglas'}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddProductModal;
