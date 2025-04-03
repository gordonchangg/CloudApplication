// src/LoginPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth methods
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/home"); // Redirect to the main page
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the Register Page
  };

  return (
    <div className="login-container">
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      {/* Add a button to navigate to the Register Page */}
      <button onClick={handleRegisterClick} className="register-button">
        Register
      </button>
      <p>
        Or{" "}
        <Link to="/main" className="guest-link">
          Continue as Guest
        </Link>
      </p>
    </div>
    </div>
  );
}

export default LoginPage;