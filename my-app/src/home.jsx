import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./home.css"; // Your original CSS
import Header from "./Header"; // Assuming you've separated the header
import { fetchProducts } from "./data/products"; // Import the fetchProducts function

function Home({ cart }) {
  const [products, setProducts] = useState([]); // State to hold fetched products

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => b.count - a.count);

  const topProducts = sortedProducts.slice(0, 3);

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/main"); // Navigate to the Register Page
  };
  
return (
    <>
      <Header cart={cart} />

      <section className="hero">
        <div className="hero-text">
          <h1>NEW! Japan Season Bakes</h1>
          <p>sakura season bakes</p>
          <button onClick={handleMenuClick}>View Menu</button>
        </div>
        <img
          src="https://source.unsplash.com/500x400/?cake,raspberry"
          alt="Cake with raspberries"
        />
      </section>

      <section className="features">
        <div className="feature">
          <img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" alt="Balanced Diet Icon" />
          <p>Perfect for balanced diets</p>
        </div>
        <div className="feature">
          <img src="https://cdn-icons-png.flaticon.com/512/4221/4221725.png" alt="Low Sugar Icon" />
          <p>Low in sugar</p>
        </div>
        <div className="feature">
          <img src="https://cdn-icons-png.flaticon.com/512/3794/3794508.png" alt="Dairy Free Icon" />
          <p>Dairy-free options</p>
        </div>
      </section>

      <section className="cakes">
        <h2>Just Look at These Cakes!</h2>
        <div className="cake-grid">
          {topProducts.map((product) => (
            <div key={product.id} className="cake-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>${product.price.toFixed(2)}</span>
              <button>Buy</button>
            </div>
          ))}
        </div>
      </section>

      <section className="ingredients">
        <h2>The Secret is in Natural Ingredients</h2>
        <img
          src="https://source.unsplash.com/500x400/?cake,layered,berries"
          alt="Layered cake with fruits"
        />
        <p>
          We only use natural ingredients: honey, almond flour, and fresh
          seasonal fruits. No preservatives, just pure bliss.
        </p>
        <button>Learn More</button>
      </section>

      <footer>
        <p>&copy; 2025 Cake Bliss. Sweet and healthy, just for you.</p>
      </footer>
    </>
  );
}

export default Home;
