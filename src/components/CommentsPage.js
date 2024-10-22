import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate to handle blogId and navigation
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa'; // For back arrow
import userEvent from '@testing-library/user-event';

const CommentsPage = () => {
  const { blogId } = useParams(); // Get blogId from the URL
  const navigate = useNavigate(); // Use navigate for the back button
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newCommenterName, setNewCommenterName] = useState(''); // For commenter's name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false); // To toggle comment input form visibility
  const [visibleComments, setVisibleComments] = useState(5); // Limit the number of visible comments at a time

  // const API_URL = "http://localhost:8080/blog/";

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/all_comments/${blogId}`);
        if (response.data && response.data.net_comments) {
          setComments(response.data.net_comments);
        } else {
          setComments([]); // Handle case where net_comments is missing
        }
      } catch (error) {
        setError('Error fetching comments');
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Ensure comment and name are not empty

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      // const user = localStorage.getItem('user');
      // console.log(user);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/blog/comment/${blogId}`,
        { comment: newComment,  }, // Send the new comment and name in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.comment) {
        const newCommentObject = {
          _id: response.data._id,
          comment: response.data.comment,
          name: newCommenterName, // Store commenter's name
        };
        setComments([newCommentObject, ...comments]); // Add new comment on top
      } else {
        setError('Error: Invalid response from server');
      }

      setNewComment(''); // Clear the input fields
      setNewCommenterName('');
      setShowCommentForm(false); // Hide the comment form after submitting
    } catch (error) {
      setError('Error adding comment');
    } finally {
      setSubmitting(false);
    }
  };

  // Load more comments (increments of 5 or 10)
  const handleLoadMore = () => {
    setVisibleComments((prevVisible) => prevVisible + 5); // Increment by 5 each time
  };

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#fff' }}> {/* Background white */}
      {/* Back Arrow */}
      <div
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          cursor: 'pointer',
          color: '#007bff', // Blue color for the back arrow
        }}
      >
        <FaArrowLeft size={24} />
      </div>

      <div
        style={{
          margin: '80px auto',
          width: '90%',
          maxWidth: '600px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          border: '1px solid #007bff', // Blue border
        }}
      >
        <h2 style={{ color: '#007bff', textAlign: 'center' }}>Comments</h2>

        {/* Comments Section */}
        {loading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : comments.length > 0 ? (
          <>
            {comments.slice(0, visibleComments).map((commentObj, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Display Commenter's Name */}
                <strong style={{ color: '#007bff' }}>{commentObj.name}</strong> {/* Name on top */}
                <p style={{ color: '#000', marginTop: '5px' }}>{commentObj.comment}</p>
              </div>
            ))}

            {/* Show Load More button if there are more comments to load */}
            {visibleComments < comments.length && (
              <button
                onClick={handleLoadMore}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff', // Blue color for Load More button
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '10px',
                  fontSize: '16px',
                }}
              >
                Read More
              </button>
            )}
          </>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Comment Form Appears in the Center of Screen */}
      {showCommentForm && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1000, // Make sure it's above everything else
            border: '1px solid #28a745', // Green border around the form
          }}
        >
          {/* <input
            type="text"
            value={newCommenterName}
            onChange={(e) => setNewCommenterName(e.target.value)}
            placeholder="Your name"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              fontSize: '16px',
            }}
          /> */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              fontSize: '16px',
            }}
            placeholder="Write your comment..."
          />
          <button
            onClick={handleAddComment}
            disabled={submitting}
            style={{
              padding: '10px 20px',
              backgroundColor: submitting ? '#ccc' : '#28a745', // Green color for submit button
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: '16px',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      )}

      {/* Sticky Add Comment Button in bottom-right */}
      {!showCommentForm && (
        <button
          onClick={() => setShowCommentForm(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 25px',
            backgroundColor: '#007bff', // Blue color for Add Comment button
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          Add Comment
        </button>
      )}
    </div>
  );
};

export default CommentsPage;
