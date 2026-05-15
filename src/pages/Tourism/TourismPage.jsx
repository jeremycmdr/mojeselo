import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import './TourismPage.css';

const baseTourism = [
  {
    id: 1,
    name: "Eko-selo Rajska Dolina",
    location: "Kanton Sarajevo",
    description: "Uživajte u miru netaknute prirode. Nudimo autentičan smještaj u drvenim brvnarama sa domaćom hranom i jahanjem konja.",
    categories: ["Smeštaj", "Aktivnosti", "Priroda"],
    price: "Od 60 KM / noć",
    rating: 5,
    reviews: 124,
    amenities: ["WiFi", "Parking", "Doručak uključen"],
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    isRecommended: true
  },
  {
    id: 2,
    name: "Apartmani Rijeka",
    location: "Regija Banja Luka",
    description: "Moderan smještaj uz samu rijeku Vrbas. Idealno za ribolovce i ljubitelje vodenih sportova.",
    categories: ["Smeštaj", "Voda"],
    price: "Od 45 KM / noć",
    rating: 4,
    reviews: 56,
    amenities: ["Klima", "Roštilj", "Terasa"],
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    isRecommended: false
  },
  {
    id: 3,
    name: "Planinska Koliba Javor",
    location: "Regija Istočno Sarajevo",
    description: "Tradicionalna koliba na 1200m nadmorske visine. Domaći specijaliteti, staze za šetnju i potpuna izolacija.",
    categories: ["Planina", "Hrana i piće"],
    price: "Od 80 KM / noć",
    rating: 5,
    reviews: 89,
    amenities: ["Kamin", "Sauna", "Domaći proizvodi"],
    coverImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    isRecommended: true
  },
  {
    id: 4,
    name: "Etno Selo Herceg",
    location: "Hercegovačko-neretvanski kanton",
    description: "Doživite Hercegovinu u malom. Kamene kućice, bazen, vrhunska vina i bogata gastronomska ponuda.",
    categories: ["Eko-selo", "Vino", "Bazen"],
    price: "Od 120 KM / noć",
    rating: 5,
    reviews: 210,
    amenities: ["Bazen", "Restoran", "Klimatizovano"],
    coverImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    isRecommended: true
  },
  {
    id: 5,
    name: "Ribarska Kuća Una",
    location: "Unsko-sanski kanton",
    description: "Direktan pristup rijeci Uni. Savršeno mjesto za odmor uz zvuk rijeke i domaće pastrmke.",
    categories: ["Voda", "Ribolov"],
    price: "Od 50 KM / noć",
    rating: 4,
    reviews: 42,
    amenities: ["Čamac", "Roštilj", "WiFi"],
    coverImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    isRecommended: false
  },
  {
    id: 6,
    name: "Ranč Zelena Trava",
    location: "Tuzlanski kanton",
    description: "Veliko imanje sa životinjama, igralištem za djecu i mogućnošću kampovanja.",
    categories: ["Ranč", "Za porodice"],
    price: "Od 30 KM / noć",
    rating: 5,
    reviews: 75,
    amenities: ["Dječije igralište", "Životinje", "Parking"],
    coverImage: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
    isRecommended: false
  }
];

// Generišemo 60 turističkih ponuda za demo
const tourismData = Array.from({ length: 60 }, (_, i) => ({
  ...baseTourism[i % baseTourism.length],
  id: i + 1,
  name: `${baseTourism[i % baseTourism.length].name} ${i + 1}`
}));

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

const categoryOptions = [
  'Sve kategorije',
  'Planina',
  'Voda (Rijeka/Jezero)',
  'Eko-selo',
  'Ranč i Farma',
  'Smeštaj',
  'Hrana i Aktivnosti'
];

const sortOptions = [
  { label: 'Najpopularnije', value: 'popularno' },
  { label: 'Cena: Niža ka višoj', value: 'cena-niza' },
  { label: 'Cena: Viša ka nižoj', value: 'cena-visa' },
  { label: 'Najbolje ocijenjeno', value: 'ocjena' }
];

const StarRating = ({ rating }) => (
  <div className="tourism-stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i >= rating ? 'empty' : ''}`}>★</span>
    ))}
  </div>
);

const TourismPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Sve lokacije');
  const [category, setCategory] = useState('Sve kategorije');
  const [sortBy, setSortBy] = useState('popularno');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (location !== 'Sve lokacije' && item.location !== location) return false;
    if (category !== 'Sve kategorije' && !item.categories.includes(category)) return false;
    return true;
  });

  const currentItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="tourism-page">
      <Header onOpenAuth={handleOpenAuth} />

      <main className="tourism-main">
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
                  <img src={item.coverImage} alt={item.name} />
                  {item.isRecommended && <span className="recommended-badge">Preporuka</span>}
                  <span className="price-tag">{item.price}</span>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <span className="card-location">📍 {item.location}</span>
                    <div className="card-rating">
                      <StarRating rating={item.rating} />
                      <span className="reviews">({item.reviews})</span>
                    </div>
                  </div>

                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-description">{item.description}</p>

                  <div className="card-amenities">
                    {item.amenities.slice(0, 3).map(amenity => (
                      <span key={amenity} className="amenity">
                        <span className="dot">•</span> {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <div className="card-tags">
                      {item.categories.map(cat => (
                        <span key={cat} className="card-tag">{cat}</span>
                      ))}
                    </div>
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
