import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <ul className="navList">
     

     
          <div className="left-nav">
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/add-product" className="link">
                Add Product
              </Link>
            </li>
          </div>

          <div className="right-nav">
            <li>
              <Link to="/login" className="link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="link">
                Register
              </Link>
            </li>
          </div>
         
        </ul>
    </div>
    </nav>
  );
};

export default NavBar;
