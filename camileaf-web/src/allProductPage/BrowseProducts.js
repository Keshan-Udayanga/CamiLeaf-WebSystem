import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   // 🟢 import navigate
import "./BrowseProducts.css";

function BrowseProducts({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate(); // 🟢 create navigate function

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/v1/product/getAll");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🔎 Filter
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      product.productName.toLowerCase().includes(search) ||
      product.price.toString().includes(search) ||
      product.discount.toString().includes(search);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 🛒 Add to cart
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
    }
  };

  const closePopup = () => {
    setShowQuantityPopup(false);
    setSelectedProduct(null);
  };

  return (
    <div className="browse-container">
      {/* 🟢 Cart Button */}
      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <button
          onClick={() => navigate("/cart")}
          style={{
            background: "#2e7d32",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🛒 Go to Cart
        </button>
      </div>

      {/* Quantity Selection Popup */}
      {showQuantityPopup && (
        <div className="popup-overlay">
          <div className="quantity-popup">
            <h3>Select Quantity</h3>
            <p>{selectedProduct?.productName}</p>
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
        <p className="browse-subtitle">Discover our premium selection of teas</p>
      </div>

      {/* 🔍 Search & Filter */}
      <div className="filters-container">
        <div className="search-box" style={{ border: "none" }}>
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
            <option value="Orthodox">Orthodox</option>
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
                <img src={product.productImg} alt={product.productName} />
                {product.category && (
                  <span className="product-category">{product.category}</span>
                )}
              </div>
              <div className="product-info">
                <h3>{product.productName}</h3>
                <p className="product-price">Rs. {product.price.toLocaleString()}</p>
                <p className="product-stock">Stock: {product.stock}</p>
                <p className="product-discount">Discount: {product.discount}%</p>
                <p className="product-date">
                  Added: {new Date(product.addedDate).toLocaleDateString()}
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
