const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require("../controllers/contactController");
const adminAuth = require("../middlewares/adminAuth");

router.post("/", createContact);
router.get("/", adminAuth, getContacts);
router.put("/:id/read", adminAuth, markAsRead);
router.delete("/:id", adminAuth, deleteContact);

module.exports = router;
