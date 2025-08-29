import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Remove trailing slash to avoid double slashes
const cleanApiBase = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${cleanApiBase}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "https://fresh-basket-blue.vercel.app",
          },
        });
        console.log("Response Status:", res.status);
        console.log("Response Headers:", Object.fromEntries(res.headers));
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("Fetched Data:", data);
        setProducts(data);
      } catch (err) {
        console.error("Fetch Error:", err.message, err);
        setError(`Failed to fetch products. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading products...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
        {error}
      </p>
    );

  return (
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => navigate(`/products/${product._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                product.image?.startsWith("http")
                  ? product.image
                  : `${cleanApiBase}${product.image || "/uploads/default.jpg"}`
              }
              alt={product.name || "Product"}
              className="product-image"
              onError={(e) => { e.target.src = "/uploads/default.jpg"; }}
            />

            <div className="product-info">
              <h2>{product.name || "Unnamed Product"}</h2>
              <p>{product.description || "No description available"}</p>
            </div>

            <div className="product-bottom">
              <p className="product-price">₹{product.price || 0}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No products available.
        </p>
      )}
    </div>
  );
};

export default Products;