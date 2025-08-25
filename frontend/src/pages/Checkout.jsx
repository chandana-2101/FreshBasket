import React, { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await placeOrder();
    } catch (error) {
      console.error("Fetch error details:", error); // Detailed error logging
      setErrors({ submit: "Failed to place order. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: formData,
          items: [], // Replace with cart data if available
          totalPrice: 0, // Calculate if available
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Server response error:", errorText); // Log server response
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order placed successfully:", result);
      setOrderPlaced(true);
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2 className="checkout-title">Checkout</h2>
        {orderPlaced ? (
          <div className="success-message">
            <p>Order placed successfully!</p>
            <p>Thank you for your purchase!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name <span className="required">*</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </label>

            <label>
              Address <span className="required">*</span>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
              {errors.address && <p className="error">{errors.address}</p>}
            </label>

            <label>
              Phone <span className="required">*</span>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </label>

            {errors.submit && <p className="error">{errors.submit}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;