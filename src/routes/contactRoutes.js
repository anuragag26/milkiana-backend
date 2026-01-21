const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", getContacts);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteContact);

module.exports = router;
