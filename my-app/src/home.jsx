import React from "react";
import "./home.css"; // Your original CSS
import Header from "./Header"; // Assuming you've separated the header

function Home() {
  return (
    <div className="app">
      <Header />

      <section className="hero">
        <div className="hero-text">
          <h1>NEW! Japan Season Bakes</h1>
          <p>sakura season bakes</p>
          <button>View Menu</button>
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
          <div className="cake-card">
            <img src="https://source.unsplash.com/300x200/?cake,strawberry" alt="Strawberry Cake" />
            <h3>Strawberry Delight</h3>
            <p>Fresh strawberry layers with whipped cream.</p>
            <span>$25.00</span>
            <button>Buy</button>
          </div>
          <div className="cake-card">
            <img src="https://source.unsplash.com/300x200/?cake,blueberry" alt="Blueberry Cake" />
            <h3>Blueberry Bliss</h3>
            <p>Light vanilla base with fresh blueberries.</p>
            <span>$25.00</span>
            <button>Buy</button>
          </div>
          <div className="cake-card">
            <img src="https://source.unsplash.com/300x200/?cake,raspberry" alt="Raspberry Cake" />
            <h3>Raspberry Cream</h3>
            <p>Creamy raspberry layers with zero guilt.</p>
            <span>$25.00</span>
            <button>Buy</button>
          </div>
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
    </div>
  );
}

export default Home;
