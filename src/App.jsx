import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductsPage from './pages/Products/ProductsPage'
import HouseholdsPage from './pages/Households/HouseholdsPage'
import TourismPage from './pages/Tourism/TourismPage'
import OrganicPage from './pages/Organic/OrganicPage'
import AboutPage from './pages/About/AboutPage'
import ProfilePage from './pages/Profile/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/domaci-proizvodi" element={<ProductsPage />} />
      <Route path="/domacinstva" element={<HouseholdsPage />} />
      <Route path="/seoski-turizam" element={<TourismPage />} />
      <Route path="/sve-organsko" element={<OrganicPage />} />
      <Route path="/o-nama" element={<AboutPage />} />
      <Route path="/profil" element={<ProfilePage />} />
    </Routes>
  )
}

export default App
