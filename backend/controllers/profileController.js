const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// @desc  Get profile
// @route GET /api/profile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc  Update profile (name, bio)
// @route PUT /api/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;

    await user.save();
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Upload profile picture
// @route POST /api/profile/upload
const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      return next(new Error('No file uploaded'));
    }

    const user = await User.findById(req.user._id);

    // Delete old picture if exists
    if (user.profilePicture) {
      const oldPath = path.join(__dirname, '..', user.profilePicture);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      success: true,
      profilePicture: user.profilePicture,
      message: 'Profile picture updated',
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete profile picture
// @route DELETE /api/profile/picture
const deleteProfilePicture = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.profilePicture) {
      res.status(400);
      return next(new Error('No profile picture to delete'));
    }

    const filePath = path.join(__dirname, '..', user.profilePicture);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    user.profilePicture = '';
    await user.save();

    res.json({ success: true, message: 'Profile picture deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, uploadProfilePicture, deleteProfilePicture };
