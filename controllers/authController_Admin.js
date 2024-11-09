const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await tryLoginAdmin(email, password);
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  generateResponse(admin, res);
};

const tryLoginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin || admin.password !== password) {
    return null;
  }
  return admin;
};
exports.tryLoginAdmin = tryLoginAdmin;

const generateResponse = (admin, res) => {
  const token = jwt.sign(
    {
      email: admin.email,
      role: "admin",
      password: admin.password,
      expiresIn: JWT_EXPIRATION_TIME,
    },
    process.env.JWT_SECRET
  );
  res.status(200).json({ admin, token });
};
exports.loginAdminByJWT = async (req, res) => {
  const token = req.token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await tryLoginAdmin(decoded.email, decoded.password);
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  admin.lastLogin = new Date();
  await admin.save();
  generateResponse(admin, res);
};

exports.logoutAdmin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.user.email });
  admin.lastLogout = new Date();
  await admin.save();
  res.status(200).json({ message: "Logged out" });
};
