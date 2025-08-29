import axios from "axios";

// ✅ Base API URL: remove trailing slash (avoid //api issue)
const API_BASE =
  (process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "")) || "http://localhost:5000";

// 🛒 Get cart for a user
export const getCart = async (userId) => {
  const url = `${API_BASE}/api/cart/${userId}`;
  console.log("📦 Fetching cart from:", url); // Debug log
  const res = await axios.get(url);
  return res.data;
};

// 🛒 Update quantity of a product in cart
export const updateCart = async (userId, productId, quantity) => {
  const url = `${API_BASE}/api/cart/${userId}`;
  console.log("✏️ Updating cart at:", url, { productId, quantity });
  const res = await axios.put(url, { productId, quantity });
  return res.data;
};

// 🗑 Remove product from cart
export const removeFromCart = async (userId, productId) => {
  const url = `${API_BASE}/api/cart/${userId}/${productId}`;
  console.log("🗑 Removing from cart at:", url);
  const res = await axios.delete(url);
  return res.data;
};

export { API_BASE };
