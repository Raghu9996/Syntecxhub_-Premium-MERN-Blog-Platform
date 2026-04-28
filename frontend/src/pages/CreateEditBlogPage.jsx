import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

const CreateEditBlogPage = () => {
  const { id } = useParams(); // if id exists → edit mode
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      API.get(`/blogs/${id}`).then(({ data }) => {
        const { title, content, tags } = data.blog;
        setForm({ title, content, tags: tags.join(', ') });
      });
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (id) {
        await API.put(`/blogs/${id}`, form);
      } else {
        await API.post('/blogs', form);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>{id ? 'Edit Blog' : 'Create New Blog'}</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Blog title..." required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="10"
              placeholder="Write your blog content here..."
              required
            />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="javascript, react, nodejs" />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update Blog' : 'Publish Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditBlogPage;
