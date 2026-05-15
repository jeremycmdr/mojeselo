import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import './OrganicPage.css';

const organicProducers = [
  {
    id: 1,
    name: "Porodica Jović",
    specialty: "Sertifikovano jagodičasto voće",
    location: "Srednja Bosna",
    image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=400&q=80"
  },
  {
    id: 2,
    name: "Eko-Farma Sušić",
    specialty: "Žitarice i brašno bez glutena",
    location: "Hercegovina",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80"
  },
  {
    id: 3,
    name: "Pčelarstvo Omerović",
    specialty: "Organski med od kadulje",
    location: "Kanton 10",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80"
  }
];

const organicBundles = [
  {
    id: 1,
    name: "Zelena Detoks Korpa",
    price: "45 KM",
    items: ["Mladi spanać", "Organske jabuke", "Sok od aronije", "Blitva"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80"
  },
  {
    id: 2,
    name: "Porodični Organic Mix",
    price: "75 KM",
    items: ["Domaća jaja", "Integralno brašno", "Med", "Sezonsko povrće"],
    image: "https://images.unsplash.com/photo-1488459711635-de048b8d9f77?w=500&q=80"
  }
];

const OrganicPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="organic-page site-wrapper">
      <Header onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="organic-main main-content">
        {/* Hero Section */}
        <section className="organic-hero">
          <div className="organic-container">
            <div className="hero-badge">100% SERTIFIKOVANO</div>
            <h1>Čista Priroda na Vašem Stolu</h1>
            <p>Otkrijte selekciju najkvalitetnijih organskih proizvoda direktno sa proverenih BiH domaćinstava.</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">50+</span>
                <span className="stat-text">Proizvođača</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-text">Bez pesticida</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">OK</span>
                <span className="stat-text">Kontrola kvaliteta</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="organic-info-section">
          <div className="organic-container">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">🧪</div>
                <h3>Bez hemije</h3>
                <p>Zemljište i plodovi su tretirani isključivo prirodnim preparatima bez veštačkih đubriva.</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🐝</div>
                <h3>Biodiverzitet</h3>
                <p>Naše organske farme čuvaju prirodni eko-sistem, pčele i autohtone sorte biljaka.</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🛡️</div>
                <h3>Sigurno i zdravo</h3>
                <p>Svi proizvodi na ovoj stranici poseduju važeće sertifikate o organskoj proizvodnji.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Producers */}
        <section className="featured-producers">
          <div className="organic-container">
            <h2 className="section-title">Izdvojeni Organski Proizvođači</h2>
            <div className="producers-grid">
              {organicProducers.map(producer => (
                <div key={producer.id} className="producer-card">
                  <div className="producer-image">
                    <img src={producer.image} alt={producer.name} />
                  </div>
                  <div className="producer-info">
                    <h3>{producer.name}</h3>
                    <p className="specialty">{producer.specialty}</p>
                    <p className="location">📍 {producer.location}</p>
                    <button className="view-btn">Pogledaj farmu</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Organic Bundles */}
        <section className="organic-bundles">
          <div className="organic-container">
            <div className="bundles-header">
              <h2>Ekskluzivni Organski Paketi</h2>
              <p>Najbolje od sezone pažljivo spakovano za vašu porodicu</p>
            </div>
            <div className="bundles-grid">
              {organicBundles.map(bundle => (
                <div key={bundle.id} className="bundle-card">
                  <div className="bundle-image">
                    <img src={bundle.image} alt={bundle.name} />
                    <span className="bundle-price">{bundle.price}</span>
                  </div>
                  <div className="bundle-content">
                    <h3>{bundle.name}</h3>
                    <ul>
                      {bundle.items.map((item, idx) => (
                        <li key={idx}><span className="check">✓</span> {item}</li>
                      ))}
                    </ul>
                    <button className="order-btn">Naruči paket</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badge Section */}
        <section className="trust-section">
          <div className="organic-container">
            <div className="trust-content">
              <div className="trust-text">
                <h2>Garancija Poverenja</h2>
                <p>Svi proizvodi sa oznakom "Sve Organsko" prolaze kroz rigoroznu kontrolu. Sarađujemo samo sa domaćinstvima koja poseduju validne sertifikate priznate u Bosni i Hercegovini i EU.</p>
                <div className="cert-logos">
                  <span className="logo-placeholder">OK Sertifikat</span>
                  <span className="logo-placeholder">Eco cert</span>
                  <span className="logo-placeholder">EU Organic</span>
                </div>
              </div>
              <div className="trust-image">
                <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" alt="Organska kontrola" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default OrganicPage;
