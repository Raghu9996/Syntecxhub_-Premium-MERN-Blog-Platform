import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import API from '../api/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await API.get(`/blogs?author=${user.id}&limit=100`);
        setBlogs(data.blogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, [user.id]);

  const handleDelete = (id) => setBlogs((prev) => prev.filter((b) => b._id !== id));

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.name} 👋</h1>
          <p>You have {blogs.length} blog{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/create" className="btn-primary">+ New Blog</Link>
      </div>

      {loading ? (
        <div className="loading">Loading your blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blogs yet. Create your first one!</p>
          <Link to="/create" className="btn-primary">Create Blog</Link>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
