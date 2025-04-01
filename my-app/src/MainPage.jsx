import { useState, useEffect } from "react";
import "./MainPage.css";
import { fetchProducts } from "./data/products"; // Import the fetchProducts function
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";

import { db } from "./firebase"; // Import Firestore
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";



function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]); // Cart state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for the modal
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]); // Add the product to the cart
    // alert(`${product.name} added to cart!`); // Optional: Notify the user
    setSelectedProduct(null); // Close the modal after adding
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

      // alert(`Order placed successfully! Total: $${calculateTotalPrice()}`);
      setCart([]); // Clear the cart after placing the order
    } catch (error) {
      console.error("Error updating productproduct counts:", error);
      alert("An error occurred while placing the order.");
    }
    
  };
  if (loading) return <LoadingScreen />;
  return (
    <div className="app">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Header with Title and Search Bar */}
      
      {/* Cart Sidebar */}
      {/* <aside className="cart-sidebar">
        <h3>Cart ({cart.length})</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}{" "}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <h4>Total: ${calculateTotalPrice()}</h4>
        <button onClick={placeOrder}>Place Order</button>
      </aside> */}

      {/* Main Content */}
      <div class="menu-container">
      <aside class="category-sidebar">
      <h2>Categoriess</h2>
      <ul>
        <li><a hre  f="#">Fruit Cakes</a></li>
        <li><a href="#">Chocolate Cakes</a></li>
        <li><a href="#">Specialty Cakes</a></li>
        <li><a href="#">Cupcakes</a></li>
        <li><a href="#">Vegan & Sugar-Free</a></li>
      </ul>
    </aside>

      <main  class="cake-section">
        <h2> Our Menu</h2>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div class="cake-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)} // Open modal on card click
              style={{ cursor: "pointer" }} // Indicate clickable area
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="cake-description">{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setSelectedProduct(null)} // Close modal
            >
              &times;
            </span>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p className="price">${selectedProduct.price.toFixed(2)}</p>
            <button onClick={() => addToCart(selectedProduct)}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default MainPage;