import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';
import blogService from '../services/blogService';

const BlogCard = ({ blogId, blogUser, blogHeading, blogBody, initialLikes, userId, isSelected, isFullScreen, onClick, onBackClick }) => {
  const [likes, setLikes] = useState(initialLikes); 
  const [isLiked, setIsLiked] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleLike = async () => {
    if (isLiked) return; 
    setLikes(likes + 1);
    setIsLiked(true);

    try {
      await blogService.likeBlog(blogId);
    } catch (err) {
      setLikes(likes); 
      setIsLiked(false); 
      setError('Failed to like the blog');
    }
  };

  const handleComments = () => {
    navigate(`/comments/${blogId}`);
  };

  return (
    <div
      className={`blog-card ${isSelected ? 'selected' : ''} ${isFullScreen ? 'fullscreen' : ''}`} 
      onClick={!isFullScreen ? onClick : undefined} 
    >
      {isFullScreen && (
        <button className="back-arrow" onClick={onBackClick}>
          &#x2190;
        </button>
      )}
      <small className="blog-user">{blogUser}</small>
      <h2 className="blog-card-title">{blogHeading}</h2>

      {/* Conditionally render full content in fullscreen mode or truncated content in normal mode */}
      <p className="blog-card-body">
        {isFullScreen ? blogBody : `${blogBody.substring(0, 100)}...`}
      </p>

      <div className="blog-card-buttons">
        <button className="like-btn" onClick={handleLike} disabled={isLiked}>
          {isLiked ? `Liked (${likes})` : `Like (${likes})`}
        </button>
        <button className="comment-btn" onClick={handleComments}>
          Comment
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BlogCard;
