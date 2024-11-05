import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleProceedToPayment = () => {
    
    navigate('/payment');
  };

  const handleRemoveFromCart = (productId) => {

    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product._id} className="cart-item">
                <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
                <h4>{product.name}</h4>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => handleRemoveFromCart(product._id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
