import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomSelect from '../Common/CustomSelect/CustomSelect';
import API_URL from '../../config';
import '../Auth/AuthModal.css'; // Ponovo koristimo iste stilove za konzistentnost
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onProductAdded, product, tourismItem }) => {
  const [activeTab, setActiveTab] = useState('product');
  const [categories, setCategories] = useState([]);
  const [tourismCategories, setTourismCategories] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
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
    location_id: '',
    category_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tourCatRes, locRes] = await Promise.all([
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/tourism-categories`),
          fetch(`${API_URL}/locations`)
        ]);

        const catData = await catRes.json();
        const tourCatData = await tourCatRes.json();
        const locData = await locRes.json();

        if (catData.success) {
          setCategories(catData.data.map(cat => ({
            value: cat.id,
            label: cat.name
          })));
        }
        if (tourCatData.success) {
          setTourismCategories(tourCatData.data.map(cat => ({
            value: cat.id,
            label: cat.name
          })));
        }
        if (locData.success) {
          setLocationOptions(locData.data);
        }
      } catch (error) {
        console.error("Greška pri preuzimanju podataka:", error);
      }
    };
    fetchData();
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
      } else if (tourismItem) {
        setActiveTab('tourism');
        setTourismData({
          title: tourismItem.title || '',
          description: tourismItem.description || '',
          image: tourismItem.image || '',
          price: tourismItem.price || '',
          location_id: tourismItem.location_id || '',
          category_id: tourismItem.category_id || ''
        });
      } else {
        setFormData({ name: '', price: '', category: '', image: '', description: '', isOrganic: false });
        setTourismData({ title: '', description: '', image: '', price: '', location_id: '', category_id: '' });
      }
    }
  }, [isOpen, product, tourismItem, categories, tourismCategories, locationOptions]);

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
      const editingItem = isProduct ? product : tourismItem;
      const endpoint = isProduct ? 'products' : 'tourism';

      const url = editingItem
        ? `${API_URL}/${endpoint}/${editingItem.id}`
        : `${API_URL}/${endpoint}`;

      const method = editingItem ? 'PUT' : 'POST';

      const body = isProduct
        ? { ...formData, user_id: savedUser.id }
        : { 
            ...tourismData, 
            household_id: savedUser.id,
            price: tourismData.price === '' ? null : tourismData.price 
          };

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
                <h2>{tourismItem ? 'Izmjeni oglas' : 'Novi oglas za turizam'}</h2>
                <p>Ponudite smještaj ili iskustvo na vašem imanju</p>
                {error && <div className="auth-error-alert">{error}</div>}

                <div className="form-group">
                  <label>Naziv oglasa</label>
                  <input type="text" name="title" value={tourismData.title} onChange={handleInputChange} placeholder="npr. Planinska brvnara sa pogledom" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Cijena noćenja (KM)</label>
                    <input type="number" name="price" value={tourismData.price} onChange={handleInputChange} placeholder="0.00" />
                  </div>
                  <div className="form-group">
                    <label>Kategorija</label>
                    <CustomSelect
                      options={tourismCategories}
                      value={tourismData.category_id}
                      onChange={(val) => setTourismData(prev => ({ ...prev, category_id: val }))}
                      placeholder="Izaberi..."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Lokacija</label>
                  <CustomSelect
                    options={locationOptions}
                    value={tourismData.location_id}
                    onChange={(val) => setTourismData(prev => ({ ...prev, location_id: val }))}
                    placeholder="Izaberi lokaciju..."
                  />
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
