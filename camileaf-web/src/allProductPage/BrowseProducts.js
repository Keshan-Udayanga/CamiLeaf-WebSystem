import React, { useState } from "react";
import "./BrowseProducts.css";

function BrowseProducts({ addToCart }) {
  const [products] = useState([
    { id: 1, name: "Broken Pekoe One (BP1)", category: "CTC", price: 1200, image: "bp-1.png" },
    { id: 2, name: "Pekoe Fannings One (PF1)", category: "CTC", price: 950, image: "pf-1.png" },
    { id: 3, name: "Pekoe Dust (PD)", category: "CTC", price: 2500, image: "pd.png" },
    { id: 13, name: "PEK", category: "Orthodox", price: 2800, image: "pek.png" },
    { id: 4, name: "Flowery Broken Orange Pekoe Fannings (FBOPF)", category: "Orthodox", price: 1500, image: "fbopf.png" },
    { id: 5, name: "Flowery Broken Orange Pekoe Fannings One (FBOPF1)", category: "Orthodox", price: 1800, image: "fbopf-1.png" },
    { id: 6, name: "Flowery Broken Orange Pekoe Fannings Extra Special (FBOPF Ex.Sp)", category: "Orthodox", price: 700, image: "fbopf-ex-sp.png" },
    { id: 7, name: "Broken Orange Pekoe (BOP)", category: "Orthodox", price: 2200, image: "bop.png" },
    { id: 8, name: "Broken Orange Pekoe One (BOP1)", category: "Orthodox", price: 3200, image: "bop-1.png" },
    { id: 9, name: "Flowery Broken Orange Pekoe (FBOP)", category: "Orthodox", price: 2800, image: "fbop.png" },
    { id: 10, name: "Flowery Broken Orange Pekoe One (FBOP1)", category: "Orthodox", price: 2800, image: "fbopf-1.png" },
    { id: 11, name: "Orange Pekoe (OP)", category: "Orthodox", price: 2800, image: "op.png" },
    { id: 12, name: "Orange Pekoe One (OP1)", category: "Orthodox", price: 2800, image: "op1.png" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.price.toString().includes(search);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowQuantityPopup(true);
  };

  const handleQuantityConfirm = () => {
    if (selectedProduct && addToCart) {
      addToCart({ ...selectedProduct, qty: quantity });
      setShowQuantityPopup(false);
      setSelectedProduct(null);
    } else {
      console.error("addToCart function is not available");
      setShowQuantityPopup(false);
      setSelectedProduct(null);
    }
  };

  const closePopup = () => {
    setShowQuantityPopup(false);
    setSelectedProduct(null);
  };

  return (

    
    <div className="browse-container">
      {/* Quantity Selection Popup */}
      {showQuantityPopup && (
        <div className="popup-overlay">
          <div className="quantity-popup">
            <h3>Select Quantity</h3>
            <p>{selectedProduct?.name}</p>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={closePopup}>Cancel</button>
              <button className="confirm-btn" onClick={handleQuantityConfirm}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      <div className="header-section">
        <h1 className="browse-title">Browse Your Favourite Tea Products Here!</h1>
        <p className="browse-subtitle">
          Discover our premium selection of teas
        </p>
      </div>

      {/* 🔍 Search & Filter */}
      <div className="filters-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <span className="filter-icon">📂</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            <option value="CTC">CTC</option>
            <option value="Orthodox">Orthodox Products</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* 🛒 Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <span className="product-category">{product.category}</span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">
                  Rs. {product.price.toLocaleString()}
                </p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCartClick(product)}
                >
                  <span className="cart-icon">🛒</span> Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">😞</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseProducts;