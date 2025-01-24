import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            <li key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Price:</strong>{product.price}</p>
                <p><strong>Location:</strong>{product.location}</p>
                <Link to={`/products/${product._id}`}>View Details</Link>
                 </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList; 