const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, password: hash });

    res.status(201).json({ msg: "User registered" });
  } catch (err) {
    res.status(500).json({ msg: "Register error", error: err.message });
  }
};

// Login user and set cookie
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Invalid Credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", 
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ msg: "Login error", error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", // Or "None" if using cross-site
    secure: process.env.NODE_ENV === "production", // Secure in prod
  });
  res.json({ msg: "Logged out successfully" });
};
