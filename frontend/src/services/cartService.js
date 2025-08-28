import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://freshbasket-2tqi.onrender.com/api/cart";

export const getCart = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
};

export const updateCart = async (userId, productId, quantity) => {
  const res = await axios.put(`${API_URL}/${userId}`, { productId, quantity });
  return res.data;
};

export const removeFromCart = async (userId, productId) => {
  const res = await axios.delete(`${API_URL}/${userId}/${productId}`);
  return res.data;
};

export const addToCart = async (userId, productId, quantity) => {
  const res = await axios.post(`${API_URL}/add`, { userId, productId, quantity });
  return res.data;
};