const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes"); // ✅ ONE admin file
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: 'https://milkiana-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);       // User auth
app.use("/api/admin", adminRoutes);     // Admin auth + admin protected routes
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/contact", contactRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Milkiana API is running");
});

module.exports = app;
