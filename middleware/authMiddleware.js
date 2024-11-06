const jwt = require("jsonwebtoken");
const { tryLoginAdmin } = require("../controllers/authController_Admin");
const { tryLoginUser } = require("../controllers/authController_User");

exports.loadToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });
  req.token = token;
  next();
};
exports.getUserFromToken = (req, res, next) => {
  const token = req.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.email = decoded.email;
    req.role = decoded.role;
    req.password = decoded.password;
    next();
  });
};

exports.verifyUserToken = (req, res, next) => {
  const token = req.token;
  if (req.role !== "user") {
    console.log("unauthorized", req.role);
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (tryLoginUser(req.email, req.password)) {
    next();
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

exports.verifyAdminToken = (req, res, next) => {
  const token = req.token;
  if (req.role !== "admin") {
    console.log("unauthorized", req.role);
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (tryLoginAdmin(req.email, req.password)) {
    next();
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
