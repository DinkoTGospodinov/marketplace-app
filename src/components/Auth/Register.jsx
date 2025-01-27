import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Предотвратяваме повторно изпращане
    if (isSubmitting) return;

    setIsSubmitting(true);
  };

  useEffect(() => {
    // Изпълняваме само ако е стартиран процесът на изпращане
    if (!isSubmitting) return;

    const registerUser = async () => {
      console.log("Register Data:", formData);

      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      };

      try {
        const response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Registration response:", data);

        if (response.ok) {
          setMessage("Registration successful");
          navigate("/login");
        } else {
          setError(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false); // Позволяваме нови изпращания
      }
    };

    registerUser();
  }, [isSubmitting, formData, navigate]); // useEffect се стартира, когато `isSubmitting` стане true

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
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
