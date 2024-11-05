import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/add-product" className="nav-link">Add Product</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
