const User = require('../models/User');
exports.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
};
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted' });
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    res.status(200).json(user);
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find(req.query || {});
    res.status(200).json(users);
};

