import express from "express";
import { getCart, updateCart, removeFromCart, addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.put("/:userId", updateCart);
router.delete("/:userId/:productId", removeFromCart);
router.post("/add", addToCart);

export default router;
