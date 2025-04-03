import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./home";
import CartPage from "./Cart";
import { db, auth } from "./firebase"; // Import Firestore
import { collection, getDocs, doc, updateDoc, increment, arrayUnion, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user object if logged in
      } else {
        setUser(null); // Clear the user object if logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

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
        const productRef = doc(db, "products", item.id.toString());
        await updateDoc(productRef, {
          count: increment(1),
        });
      }
  
      const totalPrice = parseFloat(calculateTotalPrice());
  
      if (user) {
        const userRef = doc(db, "UserData", user.uid);
  
        // Check if the user document exists
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          // If the user doesn't exist, create a new document
          await setDoc(userRef, {
            email: user.email,
            orderHistory: [], // Initialize as an empty array
            totalSpent: 0,
          });
        }
  
        // Create an order object for each item in the cart
        const orderSummary = cart.map((item) => ({
          name: item.name,
          price: item.price.toFixed(2),
          timestamp: new Date().toISOString(), // Add a timestamp
        }));
  
        // Append the new orders to the orderHistory array
        await updateDoc(userRef, {
          orderHistory: arrayUnion(...orderSummary), // Append the new order objects
          totalSpent: increment(totalPrice), // Increment totalSpent
        });
      }
  
      alert(`Order placed successfully! Total: $${totalPrice}`);
      setCart([]); // Clear the cart after placing the order
    } catch (error) {
      console.error("Error placing order:", error);
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
        <Route path="/menu" element={<MainPage />} />
        <Route
          path="/main"
          element={
            <MainPage
              user={user}
              addToCart={addToCart}
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