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
      color: "white" // deep-pink
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
    button: {
        backgroundColor: "white",
        color: "#D04C65",
        border: "none",
        padding: "10px 20px",
        borderRadius: "25px",
        cursor: "pointer",
        fontWeight: "bold",
        textAlign: "center",
        textDecoration: "none", // removes underline
        display: "inline-block" // ensures it behaves like a button
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
      <Link to="/cart" style={styles.button}>Cart</Link>
    </header>
  );
}

export default Header;
