import axios from "axios";

// Base API URL from env, fallback to your Render backend
const API_BASE = process.env.REACT_APP_BACKEND_URL || "https://freshbasket-mf9e.onrender.com";

export const getCart = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/cart/${userId}`);
  return res.data;
};

export const updateCart = async (userId, productId, quantity) => {
  const res = await axios.put(`${API_BASE}/api/cart/${userId}`, { productId, quantity });
  return res.data;
};

export const removeFromCart = async (userId, productId) => {
  const res = await axios.delete(`${API_BASE}/api/cart/${userId}/${productId}`);
  return res.data;
};

export const addToCart = async (userId, productId, quantity) => {
  const res = await axios.post(`${API_BASE}/api/cart/add`, { userId, productId, quantity });
  return res.data;
};
