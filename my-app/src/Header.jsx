import React from "react";

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
      cursor: "pointer"
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>Cake Bliss</div>
      <nav style={styles.nav}>
        <a href="/home" style={styles.link}>Home</a>
        <a href="/menu" style={styles.link}>Menu</a>
        <a href="#" style={styles.link}>Contact</a>
      </nav>
      <button style={styles.button}>Cart</button>
    </header>
  );
}

export default Header;
