import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, updateUserContext } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [preview, setPreview] = useState(
    user?.profilePicture ? `http://localhost:5009${user.profilePicture}` : null
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef();

  // Clear messages after 3 seconds
  useEffect(() => {
    if (msg || error) {
      const timer = setTimeout(() => {
        setMsg('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg, error]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Preview before upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    try {
      const { data } = await API.post('/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUserContext({ ...user, profilePicture: data.profilePicture });
      setMsg('Profile picture updated!');
      setSelectedFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  const handleDeletePicture = async () => {
    if (!window.confirm('Delete profile picture?')) return;
    try {
      await API.delete('/profile/picture');
      setPreview(null);
      updateUserContext({ ...user, profilePicture: '' });
      setMsg('Profile picture deleted');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put('/profile', form);
      updateUserContext(data.user);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="page-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Profile Picture Section */}
        <div className="profile-pic-section">
          <div className="avatar-container">
            {preview ? (
              <img src={preview} alt="profile" className="avatar-lg" />
            ) : (
              <div className="avatar-placeholder">{user?.name?.[0]?.toUpperCase()}</div>
            )}
          </div>
          <div className="pic-actions">
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button onClick={() => fileRef.current.click()} className="btn-secondary">
              Choose Image
            </button>
            {selectedFile && (
              <button onClick={handleUpload} className="btn-primary">Upload</button>
            )}
            {user?.profilePicture && !selectedFile && (
              <button onClick={handleDeletePicture} className="btn-delete">Remove</button>
            )}
          </div>
        </div>

        {/* Profile Info Form */}
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={user?.email} disabled className="input-disabled" />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="3" placeholder="Tell us about yourself..." />
          </div>
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
