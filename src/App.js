import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import BlogForm from './components/BlogForm.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Header from './components/Header.js';
import PrivateRoute from './components/PrivateRoute.js';
import CommentsPage from './components/CommentsPage.js';
import EditProfile from './components/EditProfile.js';
import LikedBlogs from './components/LikedBlogs.js';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/post-blog" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
        <Route path="/comments/:blogId" element={<CommentsPage />} />
        <Route path= "/edit-profile" element = {<EditProfile />}/>
        <Route path="/liked-blogs" element={<LikedBlogs />} />
      </Routes>
    </Router>
  );
}

export default App;
