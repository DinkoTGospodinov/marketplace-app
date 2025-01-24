import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Details = ( ) => {
  const { productId } = useParams();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        console.log(response.data);
        
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Location:</strong> {product.location}</p>
      <p><strong>Seller:</strong> {product.ownerId}</p>
    </div>
  );
};

export default Details;
