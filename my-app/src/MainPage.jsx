import { useState, useEffect } from "react";
import "./MainPage.css";
import { fetchProducts } from "./data/products"; // Import the fetchProducts function

import Header from "./Header"; // Assuming you've separated the header



function MainPage({user, addToCart}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for the modal
  const [products, setProducts] = useState([]); // State to hold fetched products

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();

    // Log the user's email or UID for debugging
    if (user) {
      console.log("Logged in as:", user.email || user.uid);
    }
  }, [user]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="app">
      {/* Header with Title and Search Bar */}
      <Header />

      <header>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

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
              onClick={() => setSelectedProduct(null)} // Close modal manually
            >
              &times;
            </span>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p className="price">${selectedProduct.price.toFixed(2)}</p>
            <button
              onClick={() =>
                addToCart(selectedProduct, () => setSelectedProduct(null))
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;