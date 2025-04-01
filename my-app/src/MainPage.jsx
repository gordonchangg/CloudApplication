import { useState } from "react";
import "./MainPage.css";
import { products as allProducts } from "./data/products";

function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Food Ordering App</h1>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main>
        <h2>Menu</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MainPage;