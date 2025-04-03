import { useState, useEffect } from "react";
import "./MainPage.css";
import { fetchProducts } from "./data/products"; // Import the fetchProducts function
import LoadingScreen from "./LoadingScreen";

import Header from "./Header"; // Assuming you've separated the header



function MainPage({user, addToCart}) {
  const [searchTerm, setSearchTerm] = useState("");
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

    // Log the user's email or UID for debugging
    if (user) {
      console.log("Logged in as:", user.email || user.uid);
    }
  }, [user]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return <LoadingScreen />;

  return (
    
    <div className="app">
      {/* Header with Title and Search Bar */}
      <Header />
      <div className="menu-container">
        <aside className="category-sidebar">
          <h2>Categories</h2>
          <ul>
            <li><a href="#">Fruit Cakes</a></li>
            <li><a href="#">Chocolate Cakes</a></li>
            <li><a href="#">Specialty Cakes</a></li>
            <li><a href="#">Cupcakes</a></li>
            <li><a href="#">Vegan & Sugar-Free</a></li>
          </ul>
        </aside>

      {/* Main Content */}
      <main className="main-content">
      <h2>Our Menu</h2>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        <div className="cake-grid">
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
    </div>
  );
  
}

export default MainPage;