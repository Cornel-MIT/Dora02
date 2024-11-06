import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleProceedToPayment = () => {
    console.log('Proceeding to payment...');
    navigate('/payment');  
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} style={{ width: '300px', height: '300px' }} />
          <p>{product.description}</p>
          <p>Price: R{product.price}</p>
          <p>Category: {product.category}</p>

          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
