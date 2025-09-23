import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(location.state?.cart || []);

  const increaseQty = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleProceed = () => {
    navigate("/payment", { state: { cartItems, total } });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title"> Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-card" key={item.id}>
                <img src={item.productImg} alt={item.productName} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.productName}</h3>
                  <p className="cart-price">Rs. {item.price.toLocaleString()}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>
                <div className="cart-actions">
                  <p className="item-total">Rs. {(item.price * item.qty).toLocaleString()}</p>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>❌ Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total Items: {cartItems.reduce((sum, i) => sum + i.qty, 0)}</p>
            <h3>Grand Total: Rs. {total.toLocaleString()}</h3>
            <button className="checkout-btn" onClick={handleProceed}>Proceed</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>😞 Your cart is empty</h2>
          <p>Browse products and add them to your cart.</p>
        </div>
      )}
    </div>
  );
}

export default CartPage
