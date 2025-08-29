import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// Handle both /api/products and /api/products/
router.get(["/", "/"], getAllProducts); // Duplicate route to handle trailing slash
router.get("/:id", getProductById);

export default router;