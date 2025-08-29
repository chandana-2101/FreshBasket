import React, { useEffect, useState } from "react";
import { getCart, updateCart, removeFromCart, API_BASE } from "../services/cartService";
import "./Cart.css";

const Cart = () => {
  const userId = "64ffbc12a8c45e56bcd12345"; // ✅ Ideally from auth context
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = (products) => {
    return products.reduce((acc, item) => {
      if (item.productId) {
        return acc + item.productId.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCart(userId);
        setCart(data);
        setTotalAmount(calculateTotal(data.products));
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [userId]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const updated = await updateCart(userId, productId, quantity);
      setCart(updated);
      setTotalAmount(calculateTotal(updated.products));
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const updated = await removeFromCart(userId, productId);
      setCart(updated);
      setTotalAmount(calculateTotal(updated.products));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.products.map((item) => {
          if (!item.productId) return null;

          // ✅ Use API_BASE for images
          const imageUrl = item.productId.image?.startsWith("http")
            ? item.productId.image
            : `${API_BASE}${item.productId.image || "/uploads/default.jpg"}`;

          return (
            <div className="cart-item" key={item.productId._id}>
              <img
                src={imageUrl}
                alt={item.productId.name}
                className="cart-item-image"
                onError={(e) => { e.target.src = "/uploads/default.jpg"; }}
              />
              <div className="cart-item-details">
                <h3>{item.productId.name}</h3>
                <p>₹{item.productId.price} × {item.quantity}</p>
                <p className="total">= ₹{item.productId.price * item.quantity}</p>
                <div className="cart-actions">
                  <button
                    onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="total-amount-container">
        <h2 className="total-amount-text">Total Amount: ₹{totalAmount}</h2>
      </div>

      <div className="checkout-btn-container" style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          className="proceed-btn"
          onClick={() => (window.location.href = "/checkout")}
        >
          Proceed next to Buy
        </button>
        <button
          className="back-to-products-btn"
          onClick={() => (window.location.href = "/products")}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default Cart;
