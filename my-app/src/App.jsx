import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./home";
import CartPage from "./Cart";
import { db } from "./firebase"; // Import Firestore
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";

function App() {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product, onCloseModal) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  
    // Call the callback function if provided
    if (onCloseModal) {
      onCloseModal();
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId)); // Remove item with matching id
  };

  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Function to place an order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to place an order.");
      return;
    }

    try {
      // Update the count for each product in the cart
      for (const item of cart) {
        const productRef = doc(db, "products", item.id.toString()); // Reference the product document
        await updateDoc(productRef, {
          count: increment(1), // Increment the count by 1
        });
      }

      alert(`Order placed successfully! Total: $${calculateTotalPrice()}`);
      setCart([]); // Clear the cart after placing the order
    } catch (error) {
      console.error("Error updating product counts:", error);
      alert("An error occurred while placing the order.");
    }
  };
  
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/main"
          element={
            <MainPage
              cart={cart}
              calculateTotalPrice={calculateTotalPrice}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;