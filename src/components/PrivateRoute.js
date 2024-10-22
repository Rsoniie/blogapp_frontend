import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// Utility to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      // Check if the token is expired (you can modify this based on your token's structure)
      if (decoded.exp * 1000 > Date.now()) {
        return true;
      } else {
        localStorage.removeItem('token');  // Token expired, remove it
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  return false;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
