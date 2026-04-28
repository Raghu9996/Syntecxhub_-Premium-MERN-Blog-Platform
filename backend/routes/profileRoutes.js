const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  deleteProfilePicture,
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(protect, getProfile).put(protect, updateProfile);
router.post('/upload', protect, upload.single('profilePicture'), uploadProfilePicture);
router.delete('/picture', protect, deleteProfilePicture);

module.exports = router;
