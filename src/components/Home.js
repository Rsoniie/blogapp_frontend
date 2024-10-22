import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import blogService from '../services/blogService'; 
import BlogCard from './BlogCard'; 
import './Home.css'; 

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [userId, setUserId] = useState(null); 
  const [selectedBlogId, setSelectedBlogId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId) {
      setUserId(loggedInUserId); 
    }

    const fetchBlogs = async () => {
      try {
        const res = await blogService.getAllBlogs();
        setBlogs(res.data.allblogs || []); 
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false); 
      }
    };
    fetchBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    localStorage.removeItem('username'); 
    alert('Logged out successfully!');
    navigate('/login');
  };

  const handleBlogClick = (blogId) => {
    setSelectedBlogId(blogId); 
  };

  const handleBackClick = () => {
    setSelectedBlogId(null); 
  };

  const navigateToPostBlog = () => {
    navigate('/post-blog');  // Navigate to the blog posting page
  };

  return (
    <div className={`home-container ${selectedBlogId ? 'blurred' : ''}`}>
      <header className="sticky-header">
        <div className="header-content">
          <h2 className="header-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            Your Blog
          </h2>
          <nav className="header-nav">
            <button onClick={() => navigate('/')} className="header-link">Home</button>
            <button onClick={() => navigate('/profile')} className="header-link">Profile</button>
            {/* <button onClick={() => navigate('/settings')} className="header-link">Settings</button> */}
            <button onClick={navigateToPostBlog} className="header-link">Post Blog</button> {/* New "Post Blog" button */}
            <button className="logout-button" onClick={handleLogout}>
              &#x2190; Logout
            </button>
          </nav>
        </div>
      </header>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>All Blogs</h1>

        {loading ? (
          <p style={{ fontSize: '18px', color: '#999' }}>Loading blogs...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : blogs.length > 0 ? (
          <div className={`blog-cards-container ${selectedBlogId ? 'blurred' : ''}`}>
            {blogs.map((blog) => (
              <BlogCard 
                key={blog._id}
                blogId={blog._id} 
                blogUser={blog.user}       
                blogHeading={blog.blog_heading}  
                blogBody={blog.blog_body} 
                initialLikes={blog.likes}   
                userId={userId}             
                isSelected={selectedBlogId === blog._id} 
                isFullScreen={selectedBlogId === blog._id}
                onClick={() => handleBlogClick(blog._id)} 
                onBackClick={handleBackClick} 
              />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '18px', color: '#555' }}>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
