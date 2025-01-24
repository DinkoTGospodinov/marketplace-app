import axios from "axios";
import { useState } from "react";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    
    try { 
      const response = await axios("http://localhost:5000/login", formData);

   setMessage(response.data.message);
   localStorage.setItem("token", response.data.token);
    }catch (error) {
      setError(error.response?.data?.error || 'something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;