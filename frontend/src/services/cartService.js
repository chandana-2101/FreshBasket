import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

// Get user cart
export const getCart = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data; // return only the cart object
};

// Update quantity
export const updateCart = async (userId, productId, quantity) => {
  const res = await axios.put(`${API_URL}/${userId}`, { productId, quantity });
  return res.data; // return updated cart
};

// Remove product
export const removeFromCart = async (userId, productId) => {
  const res = await axios.delete(`${API_URL}/${userId}/${productId}`);
  return res.data; // return updated cart
};

// Add this new function to your existing cartService.js file

export const addToCart = async (userId, productId, quantity) => {
  const res = await axios.post(`${API_URL}/add`, {
    userId,
    productId,
    quantity,
  });
  return res.data;
};
