import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductsPage from './pages/Products/ProductsPage'
import DomacinstvaTPage from './pages/Domacinstva/DomacinstvaTPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/domaci-proizvodi" element={<ProductsPage />} />
      <Route path="/domacinstva" element={<DomacinstvaTPage />} />
    </Routes>
  )
}

export default App
