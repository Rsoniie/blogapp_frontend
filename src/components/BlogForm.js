import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import blogService from '../services/blogService';
import './BlogForm.css'; // Assuming you'll style the card in a separate CSS file

const BlogForm = () => {
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      heading,
      body,
      description,
      keywords: keywords.split(',').map(kw => kw.trim()), // Convert comma-separated string to array
    };

    console.log("This is blogData from BlogForm", blogData);
    
    try {
      await blogService.postBlog(blogData); // Post blog data using the blogService
      // Navigate to the home page after successful blog post
      navigate('/'); 
    } catch (error) {
      console.error("Error posting the blog:", error); // Handle error accordingly
    }
  };

  // Function to handle back navigation
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="blog-form-card">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
        &#x2190; {/* This is the arrow symbol (←) */}
        <span>Back</span>
      </div>

      <h2 className="form-title">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        {/* Blog Heading */}
        <div className="form-group">
          <label htmlFor="heading">Blog Heading:</label>
          <input 
            type="text" 
            id="heading" 
            placeholder="Enter blog heading" 
            value={heading} 
            onChange={(e) => setHeading(e.target.value)} 
            required 
          />
        </div>

        {/* Blog Body */}
        <div className="form-group">
          <label htmlFor="body">Blog Body:</label>
          <textarea 
            id="body" 
            placeholder="Enter the main content of your blog" 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            required 
            rows="5"
          />
        </div>

        {/* Blog Description */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input 
            type="text" 
            id="description" 
            placeholder="Short description of the blog" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>

        {/* Keywords */}
        <div className="form-group">
          <label htmlFor="keywords">Keywords (comma separated):</label>
          <input 
            type="text" 
            id="keywords" 
            placeholder="Enter keywords (e.g., React, JavaScript, Web Development)" 
            value={keywords} 
            onChange={(e) => setKeywords(e.target.value)} 
            required 
          />
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-btn">Post Blog</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
