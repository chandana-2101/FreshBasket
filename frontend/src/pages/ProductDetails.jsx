import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";

const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch product");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading product...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
        {error}
      </p>
    );
  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/cart/add`, {
        userId: "64ffbc12a8c45e56bcd12345", // replace with real user ID if available
        productId: product._id,
        quantity,
      });

      if (res.status === 201 || res.status === 200) {
        alert(`${product.name} added to cart!`);
        navigate("/cart");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <img
          src={
            product.image.startsWith("http")
              ? product.image
              : `${API_BASE}${product.image}`
          }
          alt={product.name}
          className="product-details-image"
        />

        <div className="product-details-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="product-price">₹{product.price} / kg</p>

          {/* ✅ Quantity Input */}
          <label htmlFor="quantity" className="quantity-label">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value)))
            }
            className="quantity-input"
          />

          {/* ✅ Total Price */}
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Total: ₹{totalPrice}
          </p>

          <div className="product-details-buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className="back-to-products"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
