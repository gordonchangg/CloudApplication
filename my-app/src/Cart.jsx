import React from "react";
import "./Cart.css";
import Header from "./Header";


function Cart({ cart, removeFromCart, placeOrder }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <Header cart={cart} />
      <div className="cart-page">
        <h2 className="cart-heading">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty 🧁</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={item.id || index} className="cart-item">
                <span className="item-name">{item.name} ×{item.quantity}</span>
                <div className="item-actions">
                  <span className="item-price">
                    ${(item.price * item.quantity).toFixed(2)} {/* Show line total */}
                  </span>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <>
            <h3 className="cart-total">Total: ${total}</h3>
            <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
