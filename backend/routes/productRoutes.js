import express from "express";
import Product from "../models/productModel.js";


const router = express.Router();

//Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product
      ? res.json(product)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;  