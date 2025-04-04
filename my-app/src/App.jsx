// App.jsx
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
import OrderHistoryPage from "./OrderHistory";
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
  
  useEffect(() => {
    if (!user) return;
  
    let timeout;
  
    const logoutUser = () => {
      auth.signOut().then(() => {
        alert("You were logged out due to inactivity.");
        window.location.reload();
      });
    };
  
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logoutUser, 30000); // 30 seconds
    };
  
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
  
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Start the timer
  
    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user]);    
  
  const addToCart = (product, onCloseModal) => {
    setCart((prevCart) => {
      // check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Increment quantity if exists
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    if (onCloseModal) onCloseModal();
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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

        // Create a transaction object
        const transaction = {
          timestamp: new Date().toISOString(),
          order: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: totalPrice
        };

        // Append the new transaction to the orderHistory array
        await updateDoc(userRef, {
          orderHistory: arrayUnion(transaction), // Store the entire transaction
          totalSpent: increment(totalPrice),
        });
      }

      alert(`Order placed successfully! Total: $${totalPrice}`);
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  const getUserOrderHistories = async () => {
    if (!user) return [];

    try {
      const userRef = doc(db, "UserData", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) return [];

      const userData = userDoc.data();
      return Object.values(userData.orderHistory || {});
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
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
        <Route
          path="/orders"
          element={<OrderHistoryPage getUserOrderHistories={getUserOrderHistories} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
