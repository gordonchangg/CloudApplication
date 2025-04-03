// ✅ App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./home";
import CartPage from "./Cart";
import LoadingScreen from "./LoadingScreen"; // optional splash
import { db, auth } from "./firebase";
import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  getDoc,
  setDoc
} from "firebase/firestore";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (product, onCloseModal) => {
    setCart((prevCart) => [...prevCart, product]);
    // alert(`${product.name} added to cart!`);
    if (onCloseModal) onCloseModal();
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to place an order.");
      return;
    }

    try {
      for (const item of cart) {
        const productRef = doc(db, "products", item.id.toString());
        await updateDoc(productRef, {
          count: increment(1)
        });
      }

      const totalPrice = parseFloat(calculateTotalPrice());

      if (user) {
        const userRef = doc(db, "UserData", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          await setDoc(userRef, {
            email: user.email,
            orderHistory: [],
            totalSpent: 0
          });
        }

        const orderSummary = cart.map((item) => ({
          name: item.name,
          price: item.price.toFixed(2),
          timestamp: new Date().toISOString()
        }));

        await updateDoc(userRef, {
          orderHistory: arrayUnion(...orderSummary),
          totalSpent: increment(totalPrice)
        });
      }

      alert(`Order placed successfully! Total: $${totalPrice}`);
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  if (authLoading) return <LoadingScreen />;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/home" replace /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<MainPage />} />
        <Route
  path="/main"
  element={
    <MainPage
      user={user}
      addToCart={addToCart}
      cart={cart} // ✅ Add this line
    />
  }
/>
        <Route path="/home" element={<HomePage cart={cart} />} />
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
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
