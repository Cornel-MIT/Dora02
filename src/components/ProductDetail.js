import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product details');
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="product-detail-container">
      {error && <p className="error-message">{error}</p>}
      {product ? (
        <div className="product-detail-content">
          <div className="product-images">
            {product.imageUrls?.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`${product.name} ${index + 1}`}
                className="product-image"
              />
            ))}
          </div>

          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">R{product.price}</p>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>

            <div className="product-actions">
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="proceed-to-payment-button"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
