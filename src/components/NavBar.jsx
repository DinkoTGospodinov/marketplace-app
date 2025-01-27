import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {token && <Link to="/add-product">Add Product</Link>}
      </div>
      <div className="right-nav">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
