import axios from "axios";

const API_BASE =
  (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000").replace(/\/+$/, ""); 

export const getCart = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/cart/${userId}`);
  return res.data;
};

export const updateCart = async (userId, productId, quantity) => {
  const res = await axios.put(`${API_BASE}/api/cart/${userId}`, {
    productId,
    quantity,
  });
  return res.data;
};

export const removeFromCart = async (userId, productId) => {
  const res = await axios.delete(`${API_BASE}/api/cart/${userId}/${productId}`);
  return res.data;
};

export const addToCart = async (userId, productId, quantity) => {
  const res = await axios.post(`${API_BASE}/api/cart/add`, {
    userId,
    productId,
    quantity,
  });
  return res.data;
};

export { API_BASE }; // export so Cart.jsx can use for images
