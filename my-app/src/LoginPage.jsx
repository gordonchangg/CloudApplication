import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      // Simulate successful login
      alert(`Welcome, ${username}!`);
      navigate("/main");
    } else {
      alert("Please enter a username.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Or{" "}
        <Link to="/main" className="guest-link">
          Continue as Guest
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;