import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart } from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = "64ffbc12a8c45e56bcd12345"; // ✅ static for now, later from auth

  // Fetch cart count
  const fetchCartCount = async () => {
    setLoading(true);
    setError(null);
    try {
      const cartData = await getCart(userId);
      console.log("Fetched cart data:", cartData);
      const count =
        cartData?.products?.reduce(
          (acc, item) => acc + (item.quantity || 0),
          0
        ) || 0;
      setTotalCount(count);
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
      setError(err.message || "Failed to load cart data");
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{ totalCount, loading, error, fetchCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
