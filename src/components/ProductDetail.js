// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';  // UseParams for fetching the product ID
// import axios from 'axios';

// const ProductDetail = () => {
//   const { id } = useParams();  // Retrieve the product ID from the URL
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);  // Loading state to handle asynchronous data fetching
//   const navigate = useNavigate();  // Hook to navigate programmatically

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching product details');
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleProceedToPayment = () => {
//     console.log('Proceeding to payment...');
//     navigate('/payment');  // Navigate to the payment page
//   };

//   return (
//     <div className="product-detail">
//       {loading ? (
//         <p>Loading product details...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <div className="product-detail-card">
//           <h2>{product.name}</h2>
//           <img src={product.imageUrl} alt={product.name} style={{ width: '300px', height: '300px' }} />
//           <p>{product.description}</p>
//           <p><strong>Price: </strong>${product.price}</p>
//           <p><strong>Category: </strong>{product.category}</p>

//           <button onClick={handleProceedToPayment} style={styles.paymentButton}>
//             Proceed to Payment
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   paymentButton: {
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '16px',
//     borderRadius: '5px',
//     marginTop: '20px',
//   },
// };

// export default ProductDetail;


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
          <p>Price: ${product.price}</p>
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
