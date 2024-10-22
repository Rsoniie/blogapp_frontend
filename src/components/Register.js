// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import authService from '../services/authService';
// import './Login.css'; // Import your custom CSS file

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await authService.register({ username, email, password });
//       navigate('/');  // Redirect to Home after successful signup
//     } catch (err) {
//       console.error('Signup failed', err);
//       // Display error message to the user
//     }
//   };

//   const navigateToLogin = () => {
//     navigate('/login');  // Redirect to Login page
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-header">Signup</h2>
//       <form onSubmit={handleSignup} className="login-form">
//         <input
//           className="login-input"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           className="login-input"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="login-input"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="login-button">Signup</button>
//       </form>
//       <p className="new-user-text">Already Registered?</p>
//       <button onClick={navigateToLogin} className="signup-button">Login</button>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Login.css'; // Import your custom CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState(''); // New state for description
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Pass the description along with other details
      await authService.register({ username, email, password, description });
      navigate('/');  // Redirect to Home after successful signup
    } catch (err) {
      console.error('Signup failed', err);
      // Display error message to the user
    }
  };

  const navigateToLogin = () => {
    navigate('/login');  // Redirect to Login page
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Signup</h2>
      <form onSubmit={handleSignup} className="login-form">
        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* New input field for description */}
        <textarea
          className="login-input"
          placeholder="Describe yourself"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />
        <button type="submit" className="login-button">Signup</button>
      </form>
      <p className="new-user-text">Already Registered?</p>
      <button onClick={navigateToLogin} className="signup-button">Login</button>
    </div>
  );
};

export default Register;
