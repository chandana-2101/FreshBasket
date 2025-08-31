import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

// ✅ Base API URL: remove trailing slash if exists
const API_BASE =
  (process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "")) || "http://localhost:5000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${API_BASE}api/products`;
        console.log("📦 Fetching products from:", url);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading products...</p>;
  if (error)
    return <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>{error}</p>;

  return (
    <div className="products-container">
      {products.map((product) => (
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
                : `${API_BASE}${product.image}`
            }
            alt={product.name}
            className="product-image"
          />

          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-bottom">
            <p className="product-price">₹{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
