import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CustomSelect from '../Common/CustomSelect/CustomSelect';
import API_URL from '../../config';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    location: ''
  });
  const [errors, setErrors] = useState({});

  const locations = [
    {
      label: 'Federacija BiH',
      options: [
        'Unsko-sanski kanton', 'Posavski kanton', 'Tuzlanski kanton', 
        'Zeničko-dobojski kanton', 'Bosansko-podrinjski kanton', 
        'Srednjobosanski kanton', 'Hercegovačko-neretvanski kanton', 
        'Zapadnohercegovački kanton', 'Kanton Sarajevo', 'Kanton 10'
      ]
    },
    {
      label: 'Republika Srpska',
      options: [
        'Regija Prijedor', 'Regija Bijeljina', 'Regija Trebinje', 
        'Regija Doboj', 'Regija Banja Luka', 'Regija Istočno Sarajevo'
      ]
    },
    {
      label: 'Ostalo',
      options: ['Brčko Distrikt']
    }
  ];

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) return 'Lozinka mora imati najmanje 8 karaktera.';
    if (!hasUpperCase) return 'Lozinka mora sadržati barem jedno veliko slovo.';
    if (!hasNumber) return 'Lozinka mora sadržati barem jedan broj.';
    if (!hasSpecialChar) return 'Lozinka mora sadržati barem jedan specijalni karakter (npr. ! @ # $).';
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'login' || mode === 'register' || mode === 'forgot-password') {
      if (!formData.email) {
        newErrors.email = 'Molimo unesite email adresu.';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Molimo unesite ispravnu email adresu.';
      }
    }

    if (mode === 'login' || mode === 'register') {
      if (!formData.password) {
        newErrors.password = 'Molimo unesite lozinku.';
      }
    }

    if (mode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Molimo unesite vaše ime ili naziv domaćinstva.';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Naziv mora imati najmanje 2 karaktera.';
      }
      
      if (!formData.location) {
        newErrors.location = 'Molimo unesite vašu lokaciju.';
      }

      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Lozinke se ne podudaraju.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setErrors({});
      
      if (mode === 'register') {
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
              town: formData.location // Mapiramo lokaciju na town polje u bazi
            }),
          });

          const data = await response.json();

          if (data.success) {
            setSuccessMessage('Uspešna registracija! Molimo proverite vaš email kako biste verifikovali nalog.');
            // Čuvamo token u localStorage (opciono, za login)
            localStorage.setItem('token', data.token);
            
            // Zatvaramo modal nakon 4 sekunde (da korisnik stigne da pročita poruku)
            setTimeout(() => {
              onClose();
              setSuccessMessage('');
            }, 4000);
          } else {
            setErrors({ server: data.message || 'Greška pri registraciji.' });
          }
        } catch (error) {
          setErrors({ server: 'Server nije dostupan. Proverite da li je backend pokrenut.' });
        } finally {
          setLoading(false);
        }
      } else if (mode === 'login') {
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            }),
          });

          const data = await response.json();

          if (data.success) {
            setSuccessMessage('Uspešna prijava! Preusmeravanje...');
            localStorage.setItem('token', data.token);
            
            // Ovde bi mogao sačuvati i podatke o korisniku
            localStorage.setItem('user', JSON.stringify(data.user));

            setTimeout(() => {
              onClose();
              setSuccessMessage('');
              window.location.reload(); // Osvežavamo stranicu da se vidi da je korisnik ulogovan
            }, 1500);
          } else {
            setErrors({ server: data.message || 'Neispravan email ili lozinka.' });
          }
        } catch (error) {
          setErrors({ server: 'Server nije dostupan.' });
        } finally {
          setLoading(false);
        }
      } else {
        // Ovde će ići zaboravljena lozinka
        setLoading(false);
      }
    }
  };

  // Reset form and handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
      // Reset form data and errors when opening
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        location: ''
      });
      setErrors({});
      setMode(initialMode);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, initialMode, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        
        {mode !== 'forgot-password' && (
          <div className="auth-tabs">
            <button 
              className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setErrors({});
              }}
            >
              Prijava
            </button>
            <button 
              className={`tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => {
                setMode('register');
                setErrors({});
              }}
            >
              Registracija
            </button>
          </div>
        )}

        <div className="auth-form-container">
          {successMessage && <div className="auth-success-alert">{successMessage}</div>}
          {errors.server && <div className="auth-error-alert">{errors.server}</div>}

          {mode === 'login' && (
            <form className="auth-form" key="login" onSubmit={handleSubmit} noValidate>
              <h2>Dobrodošli nazad</h2>
              <p>Prijavite se na svoj nalog</p>
              
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label>Email adresa</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="npr. petar@email.com" 
                  maxLength="64"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <label>Lozinka</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Vaša lozinka" 
                  maxLength="64"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Prijava...' : 'Prijavi se'}
              </button>
              
              <div className="auth-footer">
                <button type="button" className="link-btn" onClick={() => {
                  setMode('forgot-password');
                  setErrors({});
                }}>
                  Zaboravili ste lozinku?
                </button>
              </div>
            </form>
          )}

          {mode === 'forgot-password' && (
            <form className="auth-form" key="forgot" onSubmit={handleSubmit} noValidate>
              <h2>Reset lozinke</h2>
              <p>Unesite svoj email kako bismo vam poslali link za reset lozinke.</p>
              
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label>Email adresa</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="npr. petar@email.com" 
                  maxLength="64"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <button type="submit" className="submit-btn">Pošalji link</button>
              
              <div className="auth-footer">
                <button type="button" className="link-btn" onClick={() => {
                  setMode('login');
                  setErrors({});
                }}>
                  Nazad na prijavu
                </button>
              </div>
            </form>
          )}

          {mode === 'register' && (
            <form className="auth-form" key="register" onSubmit={handleSubmit} noValidate>
              <h2>Postanite dio sela</h2>
              <p>Registrujte svoje domaćinstvo</p>
              
              <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                <label>Ime i Prezime / Naziv domaćinstva</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="npr. Domaćinstvo Petrović" 
                  maxLength="64"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label>Email adresa</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="npr. petar@email.com" 
                  maxLength="64"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <label>Lozinka</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Unesite lozinku" 
                  maxLength="64"
                />
                <div className="password-requirements">
                  {[
                    { id: 1, label: 'Najmanje 8 karaktera', met: formData.password.length >= 8 },
                    { id: 2, label: 'Jedno veliko slovo', met: /[A-Z]/.test(formData.password) },
                    { id: 3, label: 'Jedan broj', met: /[0-9]/.test(formData.password) },
                    { id: 4, label: 'Specijalni karakter (!@#$)', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
                  ].map(req => (
                    <div key={req.id} className={`requirement ${req.met ? 'met' : 'unmet'}`}>
                      <span className="req-icon">{req.met ? '✓' : '○'}</span>
                      {req.label}
                    </div>
                  ))}
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
                <label>Potvrdi lozinku</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Ponovite lozinku" 
                  maxLength="64"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className={`form-group ${errors.location ? 'has-error' : ''}`}>
                <label>Grad / Lokacija</label>
                <CustomSelect 
                  value={formData.location}
                  onChange={(val) => handleInputChange({ target: { name: 'location', value: val } })}
                  options={locations}
                  placeholder="Izaberite lokaciju..."
                  hasError={!!errors.location}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Registracija...' : 'Započni registraciju'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
