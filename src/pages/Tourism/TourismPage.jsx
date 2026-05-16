import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import API_URL from '../../config';
import './TourismPage.css';

const sortOptions = [
  { label: 'Najpopularnije', value: 'popularno' },
  { label: 'Cena: Niža ka višoj', value: 'cena-niza' },
  { label: 'Cena: Viša ka nižoj', value: 'cena-visa' }
];

const TourismPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Sve lokacije');
  const [locationOptions, setLocationOptions] = useState(['Sve lokacije']);
  const [category, setCategory] = useState('Sve kategorije');
  const [categoryOptions, setCategoryOptions] = useState(['Sve kategorije']);
  const [sortBy, setSortBy] = useState('popularno');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [tourismData, setTourismData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch locations, categories and tourism in parallel
        const [tourismRes, locationsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/tourism`),
          fetch(`${API_URL}/locations`),
          fetch(`${API_URL}/tourism-categories`)
        ]);

        const tourismResult = await tourismRes.json();
        const locationsResult = await locationsRes.json();
        const categoriesResult = await categoriesRes.json();

        if (tourismResult.success) {
          setTourismData(tourismResult.data);
        }
        if (locationsResult.success) {
          setLocationOptions(['Sve lokacije', ...locationsResult.data]);
        }
        if (categoriesResult.success) {
          const names = categoriesResult.data.map(cat => cat.name);
          setCategoryOptions(['Sve kategorije', ...names]);
        }
      } catch (error) {
        console.error("Greška pri učitavanju podataka:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 800);
  };

  const activeSortLabel = sortOptions.find(o => o.value === sortBy)?.label || 'Najpopularnije';

  const filtered = tourismData.filter(item => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (location !== 'Sve lokacije' && item.location_id !== location) return false;
    if (category !== 'Sve kategorije' && item.category !== category) return false;
    return true;
  });

  const currentItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="tourism-page site-wrapper">
      <Header onOpenAuth={handleOpenAuth} />

      <main className="tourism-main main-content">
        <div className="tourism-hero">
          <div className="tourism-container">
            <div className="hero-content">
              <h1>Seoski Turizam</h1>
              <p>Otkrijte mir i tradiciju bosanskohercegovačkih sela</p>
            </div>
          </div>
        </div>

        <div className="tourism-container">
          {/* Toolbar */}
          <div className="tourism-toolbar">
            <div className="toolbar-top">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Pretraži destinacije, brvnare, aktivnosti..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(12);
                  }}
                />
              </div>
            </div>

            <div className="toolbar-bottom">
              <div className="filter-group">
                <label>Lokacija:</label>
                <div style={{ width: '220px' }}>
                  <CustomSelect
                    value={location}
                    onChange={val => {
                      setLocation(val);
                      setVisibleCount(12);
                    }}
                    options={locationOptions}
                    placeholder="Sve lokacije"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Kategorija:</label>
                <div style={{ width: '200px' }}>
                  <CustomSelect
                    value={category}
                    onChange={val => {
                      setCategory(val);
                      setVisibleCount(12);
                    }}
                    options={categoryOptions}
                    placeholder="Sve kategorije"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Sortiraj:</label>
                <div style={{ width: '190px' }}>
                  <CustomSelect
                    value={activeSortLabel}
                    onChange={val => {
                      const s = sortOptions.find(o => o.label === val);
                      if (s) {
                        setSortBy(s.value);
                        setVisibleCount(12);
                      }
                    }}
                    options={sortOptions}
                    placeholder="Najpopularnije"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="results-header">
            <p className="results-count">Pronađeno <strong>{filtered.length}</strong> destinacija</p>
            <div className="active-filters">
              {searchQuery && <span className="filter-chip">{searchQuery} <button onClick={() => setSearchQuery('')}>×</button></span>}
              {location !== 'Sve lokacije' && <span className="filter-chip">{location} <button onClick={() => setLocation('Sve lokacije')}>×</button></span>}
              {category !== 'Sve kategorije' && <span className="filter-chip">{category} <button onClick={() => setCategory('Sve kategorije')}>×</button></span>}
            </div>
          </div>

          {/* Grid */}
          <div className="tourism-grid">
            {currentItems.map(item => (
              <div key={item.id} className="tourism-card">
                <div className="card-media">
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <div className="tourism-placeholder">
                      <span className="placeholder-icon">🏡</span>
                    </div>
                  )}
                  <span className="price-tag">
                    {item.price ? `${item.price} KM` : 'Po dogovoru'}
                  </span>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <span className="card-location">📍 {item.location_name}</span>
                    {item.category && <span className="card-category">🏷️ {item.category}</span>}
                  </div>

                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>

                  <div className="card-footer">
                    <button className="book-btn">Detalji i Rezervacija</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="load-more-container">
              <button
                className={`load-more-btn ${isLoadingMore ? 'loading' : ''}`}
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <span className="spinner"></span>
                    Učitavanje...
                  </>
                ) : (
                  'Učitaj još destinacija'
                )}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default TourismPage;
