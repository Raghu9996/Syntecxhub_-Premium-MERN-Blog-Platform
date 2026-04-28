const Blog = require('../models/Blog');

// @desc  Create blog
// @route POST /api/blogs
const createBlog = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      res.status(400);
      return next(new Error('Title and content are required'));
    }

    const blog = await Blog.create({
      title,
      content,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      author: req.user._id,
    });

    const populated = await blog.populate('author', 'name email profilePicture');
    res.status(201).json({ success: true, blog: populated });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all blogs (with pagination, filter, sort)
// @route GET /api/blogs?page=1&limit=6&tag=js&author=id&sort=newest
const getAllBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 6, tag, author, sort = 'newest' } = req.query;

    const filter = {};
    if (tag) filter.tags = { $in: [tag] };
    if (author) filter.author = author;

    const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
      .populate('author', 'name email profilePicture')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      blogs,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single blog
// @route GET /api/blogs/:id
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      'author',
      'name email profilePicture bio'
    );
    if (!blog) {
      res.status(404);
      return next(new Error('Blog not found'));
    }
    res.json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

// @desc  Update blog
// @route PUT /api/blogs/:id
const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      return next(new Error('Blog not found'));
    }

    // Only author can update
    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to update this blog'));
    }

    const { title, content, tags } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags ? tags.split(',').map((t) => t.trim()) : blog.tags;

    const updated = await blog.save();
    await updated.populate('author', 'name email profilePicture');
    res.json({ success: true, blog: updated });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete blog
// @route DELETE /api/blogs/:id
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      return next(new Error('Blog not found'));
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to delete this blog'));
    }

    await blog.deleteOne();
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
