import React from 'react';
import './Categories.css';

const categories = [
  { id: 1, name: "Voće i povrće", image: "voce_i_povrce.png" },
  { id: 2, name: "Žitarice i brašno", image: "zitarice_i_brasno.png" },
  { id: 3, name: "Mliječni proizvodi", image: "mlijecni_proizvodi.png" },
  { id: 4, name: "Meso i mesni proizvodi", image: "meso_i_mesni_proizvodi.png" },
  { id: 5, name: "Jaja", image: "jaja.png" },
  { id: 6, name: "Alkoholna pića", image: "alkoholna_pica.png" },
  { id: 7, name: "Med i pčelinji proizvodi", image: "med.png" },
  { id: 8, name: "Bilje i čajevi", image: "bilje_i_cajevi.png" },
  { id: 9, name: "Orašasti plodovi i sjemenke", image: "orasasti_plodovi.png" },
  { id: 10, name: "Bezalkoholna pića", image: "bezalkoholna_pica.png" },
  { id: 11, name: "Prerađeni proizvodi", image: "preradjeni_proizvodi.png" },
  { id: 12, name: "Sadnice i rasad", image: "sadnice_i_rasad.png" },
  { id: 13, name: "Zanatstvo i rukotvorine", image: "rukotvorine.png" }
];

const CategoryList = () => {
  return (
    <section className="categories-section">
      <h2 className="sidebar-title"><span>KATEGORIJE PROIZVODA</span></h2>
      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-item">
            <div className="category-img-wrapper">
              <img src={cat.image} alt={cat.name} />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
