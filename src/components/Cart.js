import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../store/cartActions';
import '../components/styles/Cart.css';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(updateCart(storedCart));
  }, [dispatch]);

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

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
                <p>Price: R{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => handleRemoveFromCart(product._id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: R{totalPrice.toFixed(2)}</p>
            <button onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;