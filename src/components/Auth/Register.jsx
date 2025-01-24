import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(res.data.message);
      console.log(res.data);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.error || "something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input"
          required
        />
        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
