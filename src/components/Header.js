import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';  
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../components/media/Dora-Logo2.png';  
import '../components/styles/Header.css';  

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(8);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>
        
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add-product" className="nav-link">Add Product</Link>
          <Link to="/cart" className="nav-link cart-icon">
            <FaShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
