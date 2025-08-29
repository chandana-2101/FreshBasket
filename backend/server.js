import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ CORS setup for both local dev and deployed frontend
const allowedOrigins = [
  "http://localhost:3000",                // local development
  "https://fresh-basket-blue.vercel.app" // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

// Simple root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
connectDB();

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
