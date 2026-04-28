import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';
import BlogCard from '../components/BlogCard';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState('newest');
  const [tagInput, setTagInput] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 6, sort });
      if (tag) params.append('tag', tag);
      const { data } = await API.get(`/blogs?${params}`);
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, [page, tag, sort]);

  const handleDelete = (id) => setBlogs((prev) => prev.filter((b) => b._id !== id));

  const handleTagSearch = (e) => {
    e.preventDefault();
    setTag(tagInput);
    setPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="page-container">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="header-section"
        style={{ marginBottom: '3rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Explore Stories</h1>
        <p style={{ color: 'var(--text-muted)' }}>Discover the latest thoughts and ideas from our community</p>
      </motion.div>

      {/* Filters */}
      <div className="filters">
        <form onSubmit={handleTagSearch} className="tag-search">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Search tags..."
            style={{ minWidth: '250px' }}
          />
          <button type="submit" className="btn-secondary">Search</button>
          {tag && <button type="button" onClick={() => { setTag(''); setTagInput(''); }} className="btn-delete">Clear</button>}
        </form>
        <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{ width: '40px', height: '40px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto' }}
          />
        </div>
      ) : blogs.length === 0 ? (
        <div className="empty-state">No blogs found matching your criteria.</div>
      ) : (
        <motion.div 
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage(p)}
              className={page === p ? 'active' : ''}
            >
              {p}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
