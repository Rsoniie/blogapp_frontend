import React, { useEffect, useState } from 'react';
import { FaEdit, FaArrowLeft } from 'react-icons/fa'; // For Edit Profile and Back Arrow icons
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null); // Store the user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigation hook

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true); // Start loading
        const token = localStorage.getItem('token'); // Assuming you're using a token for authentication
        // const response = await axios.get('http://localhost:8080/user/Profile', {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/Profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data); // Set the user data with the response
        setLoading(false); // Stop loading
      } catch (error) {
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Only run once on component mount

  const handleEditProfileClick = () => {
    alert('This feature is coming soon!');// Navigate to the edit profile page
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };

  const handleLikedBlogsClick = () => {
    alert('This feature is coming soon!');
  };

  const handleMyBlogsClick = () => {
    alert('This feature is coming soon!');// Navigate to the user's own blogs page
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
    <div style={{ backgroundColor: '#fff', height: '100vh', padding: '20px', textAlign: 'center', position: 'relative' }}>
      {/* Back Arrow */}
      <button
        onClick={handleBackClick}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
        }}
      >
        <FaArrowLeft style={{ color: '#007bff' }} />
      </button>

      {/* Main Container (moved downward with margin) */}
      <div
        style={{
          marginTop: '80px', // Move the container downward
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Profile title on the left */}
          <h1 style={{ color: '#007bff', textAlign: 'left' }}>Profile</h1>

          {/* Edit Profile button on the right */}
          <button
            onClick={handleEditProfileClick}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745', // Green color for Edit button
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaEdit style={{ marginRight: '5px' }} />
            Edit Profile
          </button>
        </div>

        {/* Profile Image and Information */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: '40px',
          }}
        >
          {/* Placeholder for Profile Image */}
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            {/* Cartoonish emoji as the profile image */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dhzb_cieqA8g8iGYdJ9cnq26poLlUZg3Iw&s" // Cartoon emoji generator
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* User Information */}
          <h2 style={{ marginTop: '20px', color: '#007bff' }}>{userData.curr_user.username}</h2>

          {/* Display description without header */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
              {userData.curr_user.description || 'No description available.'}
            </p>
          </div>
        </div>

        {/* Buttons for Liked Blogs and My Blogs */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {/* Liked Blogs Button */}
          <button
            onClick={handleLikedBlogsClick}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff', // Blue color for Liked Blogs button
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Liked Blogs
          </button>

          {/* My Blogs Button */}
          <button
            onClick={handleMyBlogsClick}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d', // Gray color for My Blogs button
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            My Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
