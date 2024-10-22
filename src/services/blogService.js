import axios from 'axios';
import BlogCard from '../components/BlogCard';

// Define the base URL for the API. Update it to match your backend server.
// const API_URL = 'http://localhost:8080/blog';

// Function to get all blogs
const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/blogs`);
    return response;
  } catch (error) {
    console.error('Error fetching blogs', error);
    throw error; // Re-throw the error to handle it properly where called
  }
};

// Function to post a new blog (requires user to be logged in)
const postBlog = async (blogData) => {
  try {
    // Destructure the blogData to extract specific fields
    const { heading, body, description, keywords } = blogData;

    // Create a new object to send as JSON
    const postData = {
      blog_heading: heading,
      blog_body: body,
      blog_description: description,
      blog_keywords: keywords,
    };

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Make the POST request with the blog data and the token for authorization
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/PostBlog`,
      postData,  // Send extracted blog data as JSON
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token for authorization
        },
      }
    );

    console.log(response);
    return response; // Return the response to handle it where the function is called
  } catch (error) {
    console.error('Error posting blog', error);
    throw error; // Re-throw the error to handle it properly where called
  }
};

// // Function to like a blog (requires userId and blogId)
// const likeBlog = async (blogId, userId, token) => {

//   console.log("get into likeBlog");
//   console.log(userId);
//   try {
//     // const token = localStorage.getItem('token');
//     console.log(token);
//     const response = await axios.get(`${API_URL}/like/${blogId}?`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
    
//       params: { userId }  // You can pass userId as a query parameter here
//     });
//     return response;
//   } catch (error) {
//     console.error('Error liking the blog', error);
//     throw error; // Re-throw the error to handle it properly where called
//   }
// };

const likeBlog = async (blogId) => {
  try {
    // Send the request with the token and get the response
    console.log('blogid from blogseervice', blogId);
    const token = localStorage.getItem('token')
    console.log(token);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/blog/like/${blogId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle the response based on success or error
    console.log(response.status);
    if (response.status === 200) {
      console.log("Liked the blog successfully:", response.data);
      return response.data.updatedLikes; // Return the updated likes count
    }
     if(response.status === 410)
    {
      console.log("Already liked");
      alert("You have already liked this blog.");
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Already liked this blog:", error.response.data.message);
    } else {
      console.error("Error liking the blog:", error);
    }
    throw error; // Rethrow the error for further handling
  }
};



export default {
  getAllBlogs,
  postBlog,
  likeBlog,
};
