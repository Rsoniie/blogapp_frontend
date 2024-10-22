import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const LikedBlogs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the liked blogs data passed from the ProfileScreen
  const likedBlogs = location.state?.likedBlogs || [];

  const handleBackClick = () => {
    navigate('/profile'); // Navigate back to profile
  };

  if (likedBlogs.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button onClick={handleBackClick} style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          <FaArrowLeft style={{ color: '#007bff' }} />
        </button>
        <p>No liked blogs to display.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Back Button */}
      <button onClick={handleBackClick} style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
        <FaArrowLeft style={{ color: '#007bff' }} />
      </button>

      <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Liked Blogs</h2>

      {/* Display the liked blogs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {likedBlogs.map((blog) => (
          <div key={blog._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', width: '300px', textAlign: 'left' }}>
            <h3 style={{ marginBottom: '10px' }}>{blog.blog_heading}</h3>
            <p>{blog.blog_body.substring(0, 100)}...</p>
            <p style={{ color: '#007bff', fontStyle: 'italic' }}>By {blog.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedBlogs;
