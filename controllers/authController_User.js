const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config();
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1h";

const tryLogin = async (email, password) => {
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return null;
    }
    return user;
};
exports.tryLoginUser = tryLogin;

const generateResponse = (user,res) => {
    const token = jwt.sign({ email: user.email, role: 'user', password: user.password,expiresIn:JWT_EXPIRATION_TIME}, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
}
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await tryLogin(email, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    generateResponse(user,res);
};

exports.loginUserByJWT = async (req, res) => {
    const token = req.token;
    if(!token) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await tryLogin(decoded.email, decoded.password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    generateResponse(user,res);
};


exports.logoutUser = async (req, res) => {
    res.status(200).json({ message: 'Logged out' });
};

