import React from "react";
import "./CartPage.css";

function CartPage({ cartItems, setCartItems, removeFromCart }) {
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title"> Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart-layout">
          {/* Left Side - Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="cart-price">Rs. {item.price.toLocaleString()}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>
                <div className="cart-actions">
                  <p className="item-total">
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total Items: {cartItems.reduce((sum, i) => sum + i.qty, 0)}</p>
            <h3>Grand Total: Rs. {total.toLocaleString()}</h3>
            <button className="checkout-btn">Proceed</button>
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

export default CartPage;
