import React from "react";

function LoadingScreen() {
  const styles = {
    screen: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#FFCBCB", // var(--pink)
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      fontFamily: "Arial, sans-serif"
    },
    text: {
      marginTop: "20px",
      fontSize: "1.2rem",
      color: "#D04C65", // var(--deep-pink)
      fontWeight: "bold"
    },
    loader: {
      border: "6px solid #fff",
      borderTop: "6px solid #D04C65", // var(--deep-pink)
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite"
    },
    keyframes: `
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `
  };

  return (
    <>
      <style>{styles.keyframes}</style>
      <div style={styles.screen}>
        <div style={styles.loader}></div>
        <p style={styles.text}>Loading delicious treats...</p>
      </div>
    </>
  );
}

export default LoadingScreen;
