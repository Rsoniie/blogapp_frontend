import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  // Fetch user data to pre-fill the form fields
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        // const response = await axios.get('http://ulr:8080/user/Profile', {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/Profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.curr_user.username); // Pre-fill username
        setDescription(response.data.curr_user.description || ""); // Pre-fill description
        setLoading(false);
      } catch (error) {
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // Make the request to update profile information
      await axios.put(
        // 'http://localhost:8080/user/editProfile', // Your API endpoint
        `${process.env.REACT_APP_BACKEND_URL}/user/editProfile`,
        {
          username: username, // Send the updated username
          description: description, // Send the updated description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      navigate('/profile'); // Navigate back to profile page after saving
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <p>Loading profile data...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ backgroundColor: '#fff', height: '100vh', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#007bff', marginBottom: '20px' }}>Edit Profile</h1>

      <form onSubmit={handleSaveProfile} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '10px' }}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '10px' }}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
