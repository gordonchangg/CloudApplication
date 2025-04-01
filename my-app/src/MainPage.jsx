import { useState, useEffect } from "react";
import "./MainPage.css";
import { fetchProducts } from "./data/products"; // Import the fetchProducts function

function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]); // Cart state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for the modal
  const [products, setProducts] = useState([]); // State to hold fetched products

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]); // Add the product to the cart
    alert(`${product.name} added to cart!`); // Optional: Notify the user
    setSelectedProduct(null); // Close the modal after adding
  };

  return (
    <div className="app">
      {/* Header with Title and Search Bar */}
      <header>
        <h1>Food Ordering App</h1>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {/* Cart Sidebar */}
      <aside className="cart-sidebar">
        <h3>Cart ({cart.length})</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main>
        <h2>Menu</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)} // Open modal on card click
              style={{ cursor: "pointer" }} // Indicate clickable area
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
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
  );
}

export default MainPage;