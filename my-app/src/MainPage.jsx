import { useState, useEffect } from "react";
import "./MainPage.css";
import { fetchProducts } from "./data/products";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import strawberryCake from './assets/images/strawberrycake.png';
import raspberry from './assets/images/raspberry.png';
import blueberry from './assets/images/blueberry.png';

function MainPage({ user, addToCart, cart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getCakeImage = (productName) => {
    switch (productName) {
      case 'Strawberry Cake':
        return strawberryCake;
      case 'Blueberry Bliss':
        return blueberry;
      case 'Raspberry Cream':
        return raspberry;
      default:
        return strawberryCake; // fallback image
    }
  };
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };


  
    loadProducts();

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
      <Header cart={cart} />
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
              <div key={product.id} className="product-card">
                <img src={getCakeImage(product.name)} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => {
                    if (user) {
                      addToCart(product);
                    } else {
                      navigate("/login", { state: { from: "/main" } });
                    }
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
