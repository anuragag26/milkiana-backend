const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require("../controllers/contactController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");


router.post("/", createContact);
router.get("/",protect, adminOnly, getContacts);
router.put("/:id/read",protect, adminOnly, markAsRead);
router.delete("/:id",protect, adminOnly, deleteContact);

module.exports = router;
