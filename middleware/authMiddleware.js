const jwt = require("jsonwebtoken");
const { tryLoginAdmin } = require("../controllers/authController_Admin");
const { tryLoginUser } = require("../controllers/authController_User");

exports.loadToken = (req, res, next) => {
  const headerauth = req.headers.authorization;
  console.log(req.headers);
  let token;
  if (headerauth) {
    token = headerauth.split(" ")[1];
    if (!token) {
      console.log("no token provided");
      return res.status(401).json({ message: "No token provided" });
    }
  } else {
    console.log("no authorization header");
    return res.status(401).json({ message: "No authorization header" });
  }
  req.token = token;
  next();
};
exports.getUserFromToken = (req, res, next) => {
  const token = req.token;
  if (!token) return res.status(401).json({ message: "No token provided" });
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
    console.log("unauthorized user:","role is",req.role);
    return res.status(401).json({ message: "Unauthorized" });
  }
  tryLoginUser(req.email, req.password)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      return res.status(401).json({ message: "Invalid credentials" });
    });
};

exports.verifyAdminToken = (req, res, next) => {
  const token = req.token;
  if (req.role !== "admin") {
    console.log("unauthorized", req.role);
    return res.status(401).json({ message: "Unauthorized" });
  }
  tryLoginAdmin(req.email, req.password)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      return res.status(401).json({ message: "Invalid credentials" });
    });
};
