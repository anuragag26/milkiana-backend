const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    // Basic validation
    if (!name || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name,
      phone,
      message,
    });

    try {
      //Send email notification (Step 7)
      await sendEmail({
        subject: "📩 New Contact Form Submission - Milkiana",
        text: `
New contact message received:

Name: ${name}
Phone: ${phone}

Message:
${message}
      `,
      });
    } catch (err) {
      console.error("Email failed, but message saved");
    }

    // Response to frontend
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/contact (Admin)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Fetch Contacts Error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// MARK AS READ
exports.markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(contact);
  } catch {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// DELETE MESSAGE
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

