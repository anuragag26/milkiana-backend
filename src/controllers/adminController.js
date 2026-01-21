const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials
  if (
    email !== "anuragagrawal2026@gmail.com" ||
    password !== "anuragag26"
  ) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  // Create JWT
  const token = jwt.sign(
    {
      email,
      role: "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      name: "Anurag Agrawal",
      role: "admin",
    },
  });
};
