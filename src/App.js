import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Payment from './components/Payment';
import Login from './components/Login';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
