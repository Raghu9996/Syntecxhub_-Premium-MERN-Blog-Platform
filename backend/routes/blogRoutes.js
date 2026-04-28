const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllBlogs).post(protect, createBlog);
router.route('/:id').get(getBlogById).put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;
