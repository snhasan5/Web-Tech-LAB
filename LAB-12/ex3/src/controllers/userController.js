const User = require('../models/User');

async function createUser(req, res) {
  try {
    const { name, email, age } = req.body;
    const newUser = await User.create({ name, email, age });
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, data: updatedUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
