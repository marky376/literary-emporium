import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Catalog from './pages/Catalog'
import BookDetail from './pages/BookDetail'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Recommendations from './pages/Recommendations'
import Hero from './components/Hero'
import Toast from './components/Toast'
import Featured from './components/Featured'

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="brand"><Link to="/">Literary Emporium</Link></div>
        <nav className="main-nav">
          <Link to="/">Catalog</Link>
          <Link to="/recommendations">Recommended</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main className="content">
        <Hero />
        <Featured />
        <Toast />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/:id" element={<Order />} />
        </Routes>
      </main>

      <footer className="site-footer">© {new Date().getFullYear()} Literary Emporium</footer>
    </div>
  )
}
