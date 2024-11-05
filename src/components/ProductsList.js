import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductsList.css';


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data); 
      } catch (err) {
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); 
    }
  };


  const handleBuyClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className="product-list-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '8px', marginBottom: '20px', width: '300px' }}
        />
      </div>

      {error && <p>{error}</p>}

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '200px', height: '200px' }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button onClick={() => handleBuyClick(product._id)}>Buy</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsList;
