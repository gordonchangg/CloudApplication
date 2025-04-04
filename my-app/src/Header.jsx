import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Header({ cart = [] }) {

  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.email.split("@")[0];
        setUsername(name);
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setShowDropdown(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  const styles = {
    header: {
      background: "#D04C65",
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "white"
    },
    nav: {
      display: "flex",
      gap: "40px"
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontWeight: "bold"
    },
    buttons: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      position: "relative"
    },
    userText: {
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      padding: "10px 10px",
      borderRadius: "8px",
      userSelect: "none"
    },
    dropdown: {
      position: "absolute",
      top: "100%",
      right: 0,
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginTop: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      zIndex: 1000
    },
    dropdownItem: {
      padding: "10px 20px",
      cursor: "pointer",
      color: "#D04C65",
      fontWeight: "bold",
      textAlign: "left",
      width: "100%",
      backgroundColor: "white",
      border: "none",
      textDecoration: "none",
      display: "block"
    },
    dropdownItemHover: {
      backgroundColor: "#f5f5f5", // hover color
    },
    button: {
      backgroundColor: "white",
      color: "#D04C65",
      border: "none",
      padding: "10px 20px",
      borderRadius: "25px",
      cursor: "pointer",
      fontWeight: "bold",
      textDecoration: "none",
      display: "inline-block"
    },
    badge: {
      position: "absolute",
      top: "-6px",
      right: "-6px",
      backgroundColor: "red",
      color: "white",
      borderRadius: "50%",
      padding: "4px 8px",
      fontSize: "12px",
      fontWeight: "bold"
    },
    cartWrapper: {
      position: "relative",
      display: "inline-block"
    }

  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>Cake Bliss</div>
      <nav style={styles.nav}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/main" style={styles.link}>Menu</Link>
        <a href="#" style={styles.link}>Contact</a>
      </nav>
      <div style={styles.buttons}>
        <div style={styles.cartWrapper}>
          <Link to="/cart" style={styles.button}>Cart</Link>
          {cart.length > 0 && <span style={styles.badge}>{totalQuantity}</span>}
        </div>

        {/* Existing user dropdown */}
        {username ? (
          <div>
            <span onClick={() => setShowDropdown(!showDropdown)} style={styles.userText}>
              Hi, {username} ▼
            </span>
            {showDropdown && (
              <div style={styles.dropdown}>
                <Link to="/orders" style={{...styles.dropdownItem, borderRadius: "8px", fontSize: "0.95"}}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}>
                  View Orders
                </Link> 
                <button onClick={handleLogout} style={styles.dropdownItem}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <span
            style={styles.button}
            onClick={() => {
              if (!auth.currentUser) {
                navigate("/login", { state: { from: location } });
              }
            }}
          >
            Login
          </span>
        )}
      </div>

    </header>
  );
}

export default Header;
