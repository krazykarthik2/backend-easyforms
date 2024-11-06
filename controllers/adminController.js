const Admin = require('../models/Admin');

exports.getAdmins = async (req, res) => {
    const admins = await Admin.find();
    res.status(200).json(admins);
};

exports.getAdminById = async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
};

exports.createAdmin = async (req, res) => {
    const admin = new Admin(req.body);
    admin.createdAt = new Date();
    await admin.save();
    res.status(201).json(admin);
};

exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    admin.updatedAt = new Date();
    await admin.save();
    res.status(200).json(admin);
};

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (req.email !== admin.email) return res.status(401).json({ message: 'Unauthorized to delete another admin' });
    await admin.deleteOne();
    res.status(200).json({ message: 'Admin deleted' });
};


