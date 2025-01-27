import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './ProductList.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products"

       
        );
        console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products" , error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {products.map((product) => (
              <div key={product._id} className="product-card">
          <img src={product.images[0]} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <Link to={`/products/${product._id}`}>View Details</Link>
        </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList; 