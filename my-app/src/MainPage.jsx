import { useState, useEffect } from "react";
import "./MainPage.css";
import { fetchProducts } from "./data/products"; // Import the fetchProducts function
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";

import { db } from "./firebase"; // Import Firestore
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";



function MainPage({ cart, addToCart, removeFromCart, placeOrder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
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

  if (loading) return <LoadingScreen />;

  return (
    <div className="app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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

        <main className="cake-section">
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
                onClick={() => setSelectedProduct(product)}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="cake-description">{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </main>

        {selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setSelectedProduct(null)}>
                &times;
              </span>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <p className="price">${selectedProduct.price.toFixed(2)}</p>
              <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
