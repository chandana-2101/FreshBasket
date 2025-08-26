import Order from "../models/orderModel.js";

const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, totalPrice } = req.body;

    if (!customerInfo) {
      return res.status(400).json({ message: "Please include customer info" });
    }

    const newOrder = new Order({
      customerInfo,
      items: items || [],
      totalPrice: totalPrice || 0,
    });
    const savedOrder = await newOrder.save();
    console.log("Order saved:", savedOrder); // Log success
    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error); // Log error details
    res.status(500).json({ message: "Server error" });
  }
};

export { createOrder };