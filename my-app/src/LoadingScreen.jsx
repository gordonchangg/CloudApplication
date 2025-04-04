// src/Loading.jsx
import React from "react";

const LoadingScreen = () => {
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFCBCB",
      color: "#D04C65",
      fontSize: "1.5rem",
      fontWeight: "bold"
    }
  };

  return (
   

    <div style={styles.container}>
      Loading your Cake Bliss experience...
    </div>
    
  );
};

export default LoadingScreen;
