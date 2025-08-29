import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = "64ffbc12a8c45e56bcd12345";

  const fetchCartCount = async () => {
    setLoading(true);
    setError(null);
    try {
      const cartData = await getCart(userId);
      if (cartData && cartData.products) {
        const count = cartData.products.reduce((acc, item) => acc + item.quantity, 0);
        setTotalCount(count);
      } else {
        setTotalCount(0); // Handle empty cart or invalid response
      }
    } catch (err) {
      console.error("Failed to fetch cart count:", err.message);
      setError(err.message || 'Failed to load cart data');
      setTotalCount(0); // Fallback to 0 on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartCount();
    // Add dependencies here if you want to re-fetch (e.g., userId changes)
  }, []); // Empty dependency array for one-time fetch

  return (
    <CartContext.Provider value={{ totalCount, loading, error, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);