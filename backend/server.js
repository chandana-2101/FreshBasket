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

// ✅ Allow both local dev + deployed frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL, // https://fresh-basket-blue.vercel.app
  "https://freshbasket-mf9e.onrender.com", // Add Render frontend URL
  /\.vercel\.app$/ // Keep regex for Vercel subdomains
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server calls
    if (
      allowedOrigins.some((o) =>
        o instanceof RegExp ? o.test(origin) : o === origin
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Database
connectDB();

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;