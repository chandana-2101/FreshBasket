import axios from "axios";

// ✅ Base API URL: uses env variable in production, falls back to localhost in dev
const API_BASE =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// 🛒 Get cart for a user
export const getCart = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/cart/${userId}`);
  return res.data;
};

// 🛒 Update quantity of a product in cart
export const updateCart = async (userId, productId, quantity) => {
  const res = await axios.put(`${API_BASE}/api/cart/${userId}`, {
    productId,
    quantity,
  });
  return res.data;
};

// 🗑 Remove product from cart
export const removeFromCart = async (userId, productId) => {
  const res = await axios.delete(`${API_BASE}/api/cart/${userId}/${productId}`);
  return res.data;
};

export { API_BASE };