require("../models/Admin");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const Admin =mongoose.model("Admin")
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const admin = await tryLoginAdmin(email, password);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateResponse(admin, res);
  } catch (err) {
    console.log("error:", err);
    res.status(500).json({ message: err.message });
  }
};

const tryLoginAdmin = async (email, password) => {
  try {
    const admin = await Admin.findOne({email,password})    
    console.log(admin)
    return admin; 
  } catch (err) {
    throw err;
  }
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
  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logoutAdmin = async (req, res) => {
  try{
  console.log("logoutAdmin", req.email, req.password);
  const admin = await Admin.findOne({
    email: req.email,
    password: req.password,
  });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  console.log("logoutAdmin", admin);
  admin.lastLogout = new Date();
  await admin.save();
  res.status(200).json({ message: "Logged out" });
  }catch(err){
      res.status(500).json({message:err.message});
  }
};
