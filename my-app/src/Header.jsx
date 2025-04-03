import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
      gap: "10px"
    },
    button: {
      backgroundColor: "white",
      color: "#D04C65",
      border: "none",
      padding: "10px 20px",
      borderRadius: "25px",
      cursor: "pointer",
      fontWeight: "bold",
      textAlign: "center",
      textDecoration: "none",
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
        <Link to="/cart" style={styles.button}>Cart</Link>
        <Link to="/login" style={styles.button}>Login</Link>
      </div>
    </header>
  );
}

export default Header;
