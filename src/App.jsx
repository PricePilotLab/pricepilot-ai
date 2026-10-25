
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    store: "SoundMax",
    price: 1499,
    originalPrice: 2499,
    rating: 4.5,
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    store: "AudioHub",
    price: 999,
    originalPrice: 1799,
    rating: 4.3,
    emoji: "🔊",
  },
  {
    id: 3,
    name: "Smart Watch",
    store: "TechZone",
    price: 1899,
    originalPrice: 2999,
    rating: 4.4,
    emoji: "⌚",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    store: "GamePro",
    price: 799,
    originalPrice: 1299,
    rating: 4.6,
    emoji: "🖱️",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState(2000);

  const filteredProducts = products.filter((product) => {
  const searchWords = search
    .toLowerCase()
    .replace(/under\s*₹?\s*\d+/g, "")
    .trim();

  const matchesName = product.name
    .toLowerCase()
    .includes(searchWords);

  const budgetMatch = search.match(/under\s*₹?\s*(\d+)/i);

  const searchBudget = budgetMatch
    ? Number(budgetMatch[1])
    : budget;

  return matchesName && product.price <= searchBudget;
});

  return (
    <div className="app">
      <header className="navbar">
        <h2>⚡ PricePilot AI</h2>
        <span>Smart Shopping Assistant</span>
      </header>

      <main>
        <section className="hero">
          <p className="tagline">YOUR AI SHOPPING COMPANION</p>
          <h1>Find the best deals.<br />Shop smarter.</h1>
          <p className="subtitle">
            Compare products and discover deals that fit your budget.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search headphones, speakers, watches..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button onClick={() => setSearch(search.trim())}>
              Search
            </button>
          </div>
        </section>

        <section className="filters">
          <div>
            <h3>Set your budget</h3>
            <p>Maximum price: ₹{budget}</p>
          </div>

          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
          />
        </section>

        <section className="products-section">
          <div className="section-heading">
            <h2>Recommended deals</h2>
            <span>{filteredProducts.length} products</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">{product.emoji}</div>

                <div className="product-info">
                  <p className="store">{product.store}</p>
                  <h3>{product.name}</h3>
                  <p className="rating">⭐ {product.rating}</p>

                  <div className="price-row">
                    <strong>₹{product.price}</strong>
                    <del>₹{product.originalPrice}</del>
                  </div>

                  <button
                    className="deal-button"
                    onClick={() =>
                      alert(
                        `${product.name} is a sample deal from ${product.store}!`
                      )
                    }
                  >
                    View Deal
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="no-results">
              No products found. Try another search or increase your budget.
            </p>
          )}
        </section>
      </main>

      <footer>
        PricePilot AI · Hackathon Demo · Sample product data
      </footer>
    </div>
  );
}

export default App;
