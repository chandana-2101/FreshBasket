import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalCount, setTotalCount] = useState(0);
  const userId = "64ffbc12a8c45e56bcd12345";

  const fetchCartCount = async () => {
    try {
      const cartData = await getCart(userId);
      if (cartData && cartData.products) {
        const count = cartData.products.reduce((acc, item) => acc + item.quantity, 0);
        setTotalCount(count);
      } else {
        setTotalCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
      setTotalCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ totalCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);