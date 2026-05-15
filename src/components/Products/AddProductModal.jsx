import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomSelect from '../Common/CustomSelect/CustomSelect';
import API_URL from '../../config';
import '../Auth/AuthModal.css'; // Ponovo koristimo iste stilove za konzistentnost
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onProductAdded, product }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = React.useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    isOrganic: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        if (data.success) {
          // Mapiramo kategorije u format koji CustomSelect razume (ID kao vrednost, Ime kao labela)
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

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Popunjavamo formu ako je prosleđen proizvod (Edit mode)
  React.useEffect(() => {
    if (product) {
      // Ako imamo ime kategorije umesto ID-a (stari podaci), pokušavamo da nađemo ID
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
      setFormData({
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
        isOrganic: false
      });
    }
  }, [product, isOpen, categories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const savedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    try {
      const url = product 
        ? `${API_URL}/products/${product.id}` 
        : `${API_URL}/products`;
      
      const method = product ? 'PUT' : 'POST';

      const body = {
        ...formData,
        user_id: savedUser.id
      };

      console.log('📦 Šaljem podatke serveru:', body);

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
        
        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{product ? 'Izmjeni proizvod' : 'Dodaj novi proizvod'}</h2>
            <p>{product ? 'Ažurirajte detalje vašeg proizvoda' : 'Unesite detalje vašeg domaćeg proizvoda'}</p>

            {error && <div className="auth-error-alert">{error}</div>}

            <div className="form-group">
              <label>Naziv proizvoda</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="npr. Domaći Ajvar 720g" 
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cijena (KM)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  placeholder="0.00" 
                  step="0.01" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Kategorija</label>
                <CustomSelect 
                  options={categories} 
                  value={formData.category} 
                  onChange={(val) => setFormData(prev => ({ ...prev, category: val }))} 
                  placeholder="Izaberi..."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Link do slike (URL)</label>
              <input 
                type="text" 
                name="image" 
                value={formData.image} 
                onChange={handleInputChange} 
                placeholder="https://images.unsplash.com/..." 
              />
            </div>

            <div className="form-group">
              <label>Opis proizvoda</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Kratak opis vašeg proizvoda..."
                rows="3"
              ></textarea>
            </div>

            <div className="organic-toggle-container">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="isOrganic" 
                  checked={formData.isOrganic} 
                  onChange={handleInputChange} 
                />
                <span className="slider round"></span>
              </label>
              <span className="toggle-label">Ovo je organski proizvod</span>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Slanje...' : (product ? 'Sačuvaj izmjene' : 'Objavi proizvod')}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddProductModal;
