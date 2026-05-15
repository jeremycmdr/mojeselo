import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import './HouseholdsPage.css';

const baseHouseholds = [
  {
    id: 1,
    name: "Domaćinstvo Petrović",
    location: "Tuzlanski kanton",
    description: "Porodično domaćinstvo sa tradicijom pčelarstva i uzgoja povrća. Svaki proizvod radi se s ljubavlju i pažnjom.",
    categories: ["Med", "Povrće", "Jaja"],
    rating: 5,
    reviews: 34,
    products: 12,
    isOrganic: true,
    coverImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
  },
  {
    id: 2,
    name: "Sirana Mešić",
    location: "Zeničko-dobojski kanton",
    description: "Specijalizovani smo za tradicionalne mliječne proizvode – sir, kajmak i maslo od svježeg mlijeka.",
    categories: ["Mliječni proizvodi"],
    rating: 4,
    reviews: 21,
    products: 8,
    isOrganic: false,
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
  },
  {
    id: 3,
    name: "Farma Zeleni Gaj",
    location: "Kanton Sarajevo",
    description: "Uzgajamo slobodne kokoši i prodajemo svježa jaja, peradi i domaće prerađevine od povrtnjaka.",
    categories: ["Jaja", "Meso", "Povrće"],
    rating: 5,
    reviews: 47,
    products: 15,
    isOrganic: true,
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
  },
  {
    id: 4,
    name: "Vinarija Vukoje",
    location: "Hercegovačko-neretvanski kanton",
    description: "Vinarija sa dugom tradicijom u srcu Hercegovine. Proizvodi Vranac, Žilavka i specijalne sorte.",
    categories: ["Alkoholna pića"],
    rating: 5,
    reviews: 62,
    products: 7,
    isOrganic: false,
    coverImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80"
  },
  {
    id: 5,
    name: "Bakina Kuhinja",
    location: "Posavski kanton",
    description: "Recepti stari generacijama – džemovi, pekmezi, kiseli kupus i ajvar rađeni po bakinim receptima.",
    categories: ["Prerađeni proizvodi", "Povrće"],
    rating: 5,
    reviews: 28,
    products: 11,
    isOrganic: true,
    coverImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
  },
  {
    id: 6,
    name: "Mlin Semberija",
    location: "Regija Bijeljina",
    description: "Tradicionalni mlin na rijeci Savi. Mljevenje žitarica starom tehnologijom za pravi, prirodni okus.",
    categories: ["Žitarice i brašno"],
    rating: 4,
    reviews: 15,
    products: 5,
    isOrganic: false,
    coverImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80"
  },
  {
    id: 7,
    name: "Hercegovina Krš",
    location: "Zapadnohercegovački kanton",
    description: "Kozarstvo i ovčarstvo na kamenitim pašnjacima Hercegovine. Kozji sir u maslinovom ulju – specijalitet.",
    categories: ["Mliječni proizvodi", "Meso"],
    rating: 5,
    reviews: 39,
    products: 9,
    isOrganic: true,
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
  },
  {
    id: 8,
    name: "Plantaža Voće",
    location: "Srednjobosanski kanton",
    description: "Višegodišnji voćnjaci s jabukom, kruškom, jagodama i šumskim voćem u srcu Bosne.",
    categories: ["Voće i povrće"],
    rating: 4,
    reviews: 18,
    products: 10,
    isOrganic: true,
    coverImage: "https://images.unsplash.com/photo-1467453678174-768ec283a940?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&q=80"
  }
];

// Generišemo 100 domaćinstava za demo
const domacinstva = Array.from({ length: 100 }, (_, i) => ({
  ...baseHouseholds[i % baseHouseholds.length],
  id: i + 1,
  name: `${baseHouseholds[i % baseHouseholds.length].name} ${i + 1}`
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

const sortOptions = [
  { label: 'Najnovije', value: 'najnovije' },
  { label: 'Najbolje ocijenjeno', value: 'ocjena' },
  { label: 'Najviše recenzija', value: 'recenzije' },
  { label: 'Najviše proizvoda', value: 'proizvodi' }
];

const StarRating = ({ rating }) => (
  <div className="farm-stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i >= rating ? 'empty' : ''}`}>★</span>
    ))}
  </div>
);

const HouseholdsPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Sve lokacije');
  const [sortBy, setSortBy] = useState('najnovije');
  const [isOrganicOnly, setIsOrganicOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(25);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    if (isOrganicOnly && !d.isOrganic) return false;
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (location !== 'Sve lokacije' && d.location !== location) return false;
    return true;
  });

  const currentHouseholds = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="domacinstva-page">
      <Header onOpenAuth={handleOpenAuth} />

      <main className="domacinstva-main">
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

              <div className="organic-toggle">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isOrganicOnly}
                    onChange={e => {
                      setIsOrganicOnly(e.target.checked);
                      setVisibleCount(25);
                    }}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label">Samo Organsko</span>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          <div className="active-filters">
            {searchQuery && <span className="filter-chip">Pretraga: {searchQuery} <button onClick={() => setSearchQuery('')}>×</button></span>}
            {location !== 'Sve lokacije' && <span className="filter-chip">{location} <button onClick={() => setLocation('Sve lokacije')}>×</button></span>}
            {isOrganicOnly && <span className="filter-chip">Organsko <button onClick={() => setIsOrganicOnly(false)}>×</button></span>}
          </div>

          {/* Results count */}
          <p className="results-count">{filtered.length} domaćinstava pronađeno</p>

          {/* Grid */}
          <div className="farms-grid">
            {currentHouseholds.map(farm => (
              <div key={farm.id} className={`farm-card ${farm.isOrganic ? 'organic' : ''}`}>
                {/* Cover image */}
                <div className="farm-cover">
                  <img src={farm.coverImage} alt={farm.name} />
                  {farm.isOrganic && (
                    <div className="organic-badge">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                      </svg>
                      Organsko
                    </div>
                  )}
                  {/* Avatar */}
                  <div className="farm-avatar-wrap">
                    <img src={farm.avatar} alt={farm.name} className="farm-avatar" />
                  </div>
                </div>

                {/* Info */}
                <div className="farm-info">
                  <h3 className="farm-name">{farm.name}</h3>
                  <p className="farm-location">
                    <span>📍</span> {farm.location}
                  </p>
                  <p className="farm-description">{farm.description}</p>

                  {/* Category tags */}
                  <div className="farm-tags">
                    {farm.categories.map(cat => (
                      <span key={cat} className="farm-tag">{cat}</span>
                    ))}
                  </div>

                  {/* Rating & meta */}
                  <div className="farm-meta">
                    <div className="farm-rating">
                      <StarRating rating={farm.rating} />
                      <span className="review-count">({farm.reviews})</span>
                    </div>
                    <span className="farm-products-count">{farm.products} proizvoda</span>
                  </div>

                  <button className="farm-btn">Pogledaj domaćinstvo</button>
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
