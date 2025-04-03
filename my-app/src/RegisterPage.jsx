// src/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth methods
import "./RegisterPage.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      // Create a new user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login here
        </Link>
      </p>
    </div>
    </div>
  );
}

export default RegisterPage;