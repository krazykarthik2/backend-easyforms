const User = require("../models/User");
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    //duplicate email error may occur
    console.error('createUser',err);
    if (err.code === 11000)
      return res.status(400).json({ message: "Email already exists" });
    res.status(500).json({ message: err.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('updateUser',req.body);
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User id is required" });
    console.log("trying to delete", id);
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("trying to get", id);
    const user = await User.findById(id, { password: 0 });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    
    const users = await User.find(req.query || {}, { password: 0 });
    res.status(200).json(users);
  } catch (err) {
    console.error('getAllUsers',err);
    res.status(500).json({ message: err.message });
  }
};
