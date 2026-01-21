const express = require("express");
const router = express.Router();

// Controllers
const { adminLogin } = require("../controllers/adminController");
const { getContacts } = require("../controllers/contactController");
const { getOrders } = require("../controllers/orderController");

// Middleware
const adminAuth = require("../middlewares/adminAuth");

// ================= AUTH =================
router.post("/login", adminLogin);

// ================= PROTECTED ADMIN ROUTES =================
router.get("/contacts", adminAuth, getContacts);
router.get("/orders", adminAuth, getOrders);

module.exports = router;
