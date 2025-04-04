// src/LoginPage.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import "./LoginPage.css";
import Header from "./Header";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  //🔁 If user is already logged in, redirect to previous page or home
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate(from, { replace: true });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [navigate, from]);

  useEffect(() => {
    // Create listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdTokenResult();
          if (token.claims.admin) {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        } catch (error) {
          console.error("Token error:", error);
        }
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdTokenResult();

      if (token.claims.admin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
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
    </>
  );
}

export default LoginPage;
