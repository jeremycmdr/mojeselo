import React from 'react';
import './FarmItems.css';

const farmItems = [
  { id: 1, name: "Motorni trimer 5.2ks", price: "27,90 Tr", action: "KUPI" },
  { id: 2, name: "Motorni trimer 5.2ks", price: "2,90 Tr", action: "KUPI" },
  { id: 3, name: "Plastenik 3x6m", price: "3,00 Tr", action: "KUPI" },
  { id: 4, name: "Sjemenski materijal", price: "250 Tr", action: "POGLEDAJ" }
];

const FarmItemsList = () => {
  return (
    <section className="farm-items-section">
      <h2 className="sidebar-title" style={{textAlign: 'left'}}>ZA VAŠE IMANJE</h2>
      <div className="farm-items-grid">
        {farmItems.map(item => (
          <div key={item.id} className="farm-item-card">
            <h4 className="farm-item-name">{item.name}</h4>
            <div className="farm-item-price">{item.price}</div>
            <button className={`btn-primary farm-item-btn ${item.action === 'POGLEDAJ' ? 'btn-outline' : ''}`}>
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FarmItemsList;
