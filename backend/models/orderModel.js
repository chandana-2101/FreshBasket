// backend/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
