import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const SingleBlogPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blogs/${id}`);
        setBlog(data.blog);
      } catch {
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog?')) return;
    await API.delete(`/blogs/${id}`);
    navigate('/blogs');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!blog) return null;

  const isAuthor = user && blog.author?._id === user.id;

  return (
    <div className="single-blog-container">
      <div className="tags">
        {blog.tags?.map((t) => <span key={t} className="tag">#{t}</span>)}
      </div>
      <h1>{blog.title}</h1>
      <div className="blog-meta">
        <div className="author-info">
          {blog.author?.profilePicture && (
            <img
              src={`https://syntecxhub-premium-mern-blog-platform.onrender.com${blog.author.profilePicture}`}
              alt="author"
              className="avatar-sm"
            />
          )}
          <span>{blog.author?.name}</span>
        </div>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="blog-content">{blog.content}</div>
      {isAuthor && (
        <div className="author-actions">
          <Link to={`/edit/${blog._id}`} className="btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      )}
      <Link to="/blogs" className="back-link">← Back to Blogs</Link>
    </div>
  );
};

export default SingleBlogPage;
