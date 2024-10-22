import axios from 'axios';

// const API_URL = 'http://localhost:8080/user';

// Function to register a new user
const register = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/CreateUser`, userData);
    return response;
  } catch (error) {
    console.error('Error during registration', error);
    throw error;
  }
};

// Function to login a user
// const login = async (credentials) => {
//   try {
//     console.log(credentials);
//     const response = await axios.post(`${API_URL}/LoginUser`, credentials);
//     console.log(response);
//     console.log(response.data.token);
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);  // Store the JWT token
//     }
//     return response;
//   } catch (error) {
//     console.error('Error during login', error);
//     throw error;
//   }
// };

const login = async (credentials) => {
  try {
    console.log(credentials);
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/LoginUser`, credentials);
    console.log(response);

    // Assuming the response contains the token and user information
    const { token, user } = response.data; // Extract token and user details from the response

    if (token && user && user._id) {  // Ensure both token and userId are present
      // Save token and userId in localStorage
      localStorage.setItem('token', token);         // Store the JWT token
      localStorage.setItem('userId', user._id);  
      // localStorage.setItem('username', username);
      console.log("This is user from authService",user);
         // Store the userId
    }

    return response;
  } catch (error) {
    console.error('Error during login', error);
    throw error;
  }
};


// Function to get the current user based on the token
const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      return token; // Return the token or decode it as per your need
    }
    return null;
  } catch (error) {
    console.error('Error getting current user', error);
    return null;
  }
};

// Function to logout a user
const logout = () => {
  localStorage.removeItem('token'); // Clear the JWT token from localStorage
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
};
