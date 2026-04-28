import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const BlogCard = ({ blog, onDelete }) => {
  const { user } = useAuth();
  const isAuthor = user && blog.author?._id === user.id;

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await API.delete(`/blogs/${blog._id}`);
      onDelete(blog._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <motion.div 
      className="blog-card"
      whileHover={{ y: -10 }}
      layout
    >
      <div className="tags">
        {blog.tags?.map((tag) => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>
      <h3>{blog.title}</h3>
      <p>{blog.content.substring(0, 120)}...</p>
      <div className="card-footer">
        <div className="author-info">
          {blog.author?.profilePicture && (
            <img 
              src={`http://localhost:5009${blog.author.profilePicture}`} 
              className="avatar-sm" 
              alt=""
              style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px' }}
            />
          )}
          <span>By {blog.author?.name}</span>
        </div>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="card-actions">
        <Link to={`/blogs/${blog._id}`} className="btn-read">Read More</Link>
        {isAuthor && (
          <>
            <Link to={`/edit/${blog._id}`} className="btn-edit">Edit</Link>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BlogCard;
