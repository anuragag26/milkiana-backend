const Order = require("../models/Order");

// CREATE NEW ORDER
exports.createOrder = async (req, res) => {
  try {
    const {
      productId,
      productName,
      customerName,
      phone,
      address,
      sacks,
    } = req.body;

    // 🔴 BASIC REQUIRED CHECK
    if (
      !productId ||
      !productName ||
      !customerName ||
      !phone ||
      !address ||
      sacks === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔴 NAME VALIDATION (only letters + space, min 3 chars)
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(customerName)) {
      return res.status(400).json({
        message: "Customer name must contain only letters and be at least 3 characters long",
      });
    }

    // 🔴 PHONE VALIDATION (Indian mobile numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit Indian mobile number",
      });
    }

    // 🔴 ADDRESS VALIDATION (minimum length)
    if (address.length < 10) {
      return res.status(400).json({
        message: "Address must be at least 10 characters long",
      });
    }

    // 🔴 ORDER VALUE / SACKS VALIDATION
    if (!Number.isInteger(sacks) || sacks <= 0) {
      return res.status(400).json({
        message: "Order quantity (sacks) must be a positive number",
      });
    }

    // ✅ CREATE ORDER
    const order = await Order.create({
      productId,
      productName,
      customerName,
      phone,
      address,
      sacks,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error.message);

    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

// GET ALL ORDERS (ADMIN)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Fetch orders error:", error.message);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatus = ["ACCEPTED", "COMPLETED", "CANCELED"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// DELETE ORDER (CANCEL)
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order canceled and deleted successfully",
      id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
