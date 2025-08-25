import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.json({ userId, products: [] });
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("products.productId");
    res.json(cart);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate("products.productId");
    res.json(cart);
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
     
      cart = new Cart({
        userId,
        products: [{ productId, quantity: quantity || 1 }],
      });
    } else {
    
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
      
        cart.products[productIndex].quantity += quantity || 1;
      } else {
      
        cart.products.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    await cart.populate("products.productId");
    res.status(201).json(cart); 
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};