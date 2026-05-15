import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import './HouseholdsPage.css';

const locationOptions = [
  'Sve lokacije',
  {
    label: 'Federacija BiH', options: [
      'Unsko-sanski kanton', 'Posavski kanton', 'Tuzlanski kanton',
      'Zeničko-dobojski kanton', 'Bosansko-podrinjski kanton',
      'Srednjobosanski kanton', 'Hercegovačko-neretvanski kanton',
      'Zapadnohercegovački kanton', 'Kanton Sarajevo', 'Kanton 10'
    ]
  },
  {
    label: 'Republika Srpska', options: [
      'Regija Prijedor', 'Regija Bijeljina', 'Regija Trebinje',
      'Regija Doboj', 'Regija Banja Luka', 'Regija Istočno Sarajevo'
    ]
  },
  { label: 'Ostalo', options: ['Brčko Distrikt'] }
];

const sortOptions = [
  { label: 'Najnovije', value: 'najnovije' },
  { label: 'Najbolje ocijenjeno', value: 'ocjena' },
  { label: 'Najviše recenzija', value: 'recenzije' },
  { label: 'Najviše proizvoda', value: 'proizvodi' }
];

const StarRating = ({ rating }) => (
  <div className="farm-stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i >= Math.round(rating) ? 'empty' : ''}`}>★</span>
    ))}
  </div>
);

const getInitials = (name) => {
  if (!name) return 'M';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

const HouseholdsPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Sve lokacije');
  const [sortBy, setSortBy] = useState('najnovije');
  const [visibleCount, setVisibleCount] = useState(25);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [domacinstva, setDomacinstva] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/households');
        const data = await response.json();
        if (data.success) {
          setDomacinstva(data.data);
        }
      } catch (error) {
        console.error("Greška pri učitavanju domaćinstava:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouseholds();
  }, []);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 25);
      setIsLoadingMore(false);
    }, 800);
  };

  const activeSortLabel = sortOptions.find(o => o.value === sortBy)?.label || 'Najnovije';

  const filtered = domacinstva.filter(d => {
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(d.description || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (location !== 'Sve lokacije' && d.town !== location) return false;
    return true;
  });

  const currentHouseholds = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="domacinstva-page site-wrapper">
      <Header onOpenAuth={handleOpenAuth} />

      <main className="domacinstva-main main-content">
        <div className="domacinstva-hero">
          <div className="domacinstva-container">
            <div className="hero-content">
              <h1>Domaćinstva</h1>
              <p>Upoznajte porodice iza svakog proizvoda – direktno s BiH sela</p>
            </div>
          </div>
        </div>

        <div className="domacinstva-container">
          <div className="domacinstva-toolbar">
            <div className="toolbar-left">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Pretraži domaćinstva..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(25); // Reset to first page on search
                  }}
                />
              </div>
            </div>

            <div className="toolbar-right">
              <div className="filter-group">
                <label>Lokacija:</label>
                <div style={{ width: '230px' }}>
                  <CustomSelect
                    value={location}
                    onChange={val => {
                      setLocation(val);
                      setVisibleCount(25);
                    }}
                    options={locationOptions}
                    placeholder="Sve lokacije"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Sortiraj:</label>
                <div style={{ width: '195px' }}>
                  <CustomSelect
                    value={activeSortLabel}
                    onChange={val => {
                      const s = sortOptions.find(o => o.label === val);
                      if (s) {
                        setSortBy(s.value);
                        setVisibleCount(25);
                      }
                    }}
                    options={sortOptions}
                    placeholder="Najnovije"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          <div className="active-filters">
            {searchQuery && <span className="filter-chip">Pretraga: {searchQuery} <button onClick={() => setSearchQuery('')}>×</button></span>}
            {location !== 'Sve lokacije' && <span className="filter-chip">{location} <button onClick={() => setLocation('Sve lokacije')}>×</button></span>}
          </div>

          {/* Results count */}
          <p className="results-count">{filtered.length} domaćinstava pronađeno</p>

          {/* Grid */}
          <div className="farms-grid">
            {loading ? (
              <div className="loading-spinner">Učitavanje domaćinstava...</div>
            ) : currentHouseholds.length > 0 ? (
              currentHouseholds.map(farm => (
                <div key={farm.id} className="farm-card">
                  {/* Cover Section */}
                  <div className="farm-cover">
                    {farm.image ? (
                      <img src={farm.image} alt={farm.name} />
                    ) : (
                      <div className="farm-cover-placeholder">
                        <div className="placeholder-pattern"></div>
                        <span className="placeholder-icon">🏡</span>
                      </div>
                    )}
                    {/* Avatar */}
                    <div className="farm-avatar-wrap">
                      <div className="farm-avatar-placeholder">
                        {getInitials(farm.name)}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="farm-info">
                    <h3 className="farm-name">{farm.name}</h3>
                    <p className="farm-location">
                      <span>📍</span> {farm.town || 'Nepoznata lokacija'}
                    </p>
                    <p className="farm-description">{farm.description || 'Ovo domaćinstvo još uvek nema opis.'}</p>

                    {/* Category tags (Privremeno prazno) */}
                    <div className="farm-tags">
                      <span className="farm-tag">Domaćinstvo</span>
                    </div>

                    {/* Rating & meta */}
                    <div className="farm-meta">
                      <div className="farm-rating">
                        <StarRating rating={farm.rating || 5} />
                        <span className="review-count">(0)</span>
                      </div>
                      <span className="farm-products-count">Svi proizvodi</span>
                    </div>

                    <button className="farm-btn">Pogledaj domaćinstvo</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>Trenutno nema registrovanih domaćinstava koja odgovaraju pretrazi.</p>
              </div>
            )}
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
                  'Učitaj još'
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

export default HouseholdsPage;
