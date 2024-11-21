const Admin = require("../models/Admin");

exports.getAdmins = async (req, res) => {
  try {
    const query = req.query;
    const admins = await Admin.find(query || {}, { password: 0 });
    res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      res.status(400).json({ message: "Admin already exists" });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id, { password: 0 });
    res.status(200).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    admin.createdAt = new Date();
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    admin.updatedAt = new Date();
    await admin.save();
    res.status(200).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (req.email !== admin.email)
      return res
        .status(401)
        .json({ message: "Unauthorized to delete another admin" });
    await admin.deleteOne();
    res.status(200).json({ message: "Admin deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
