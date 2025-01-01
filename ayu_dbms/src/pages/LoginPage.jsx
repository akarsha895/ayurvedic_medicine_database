import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token); // Store token for future requests
        navigate('/admin-dashboard'); // Redirect to admin dashboard after login
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="text-black w-full h-screen">
      <Navbar />
      {/* Rest of the login form */}
    </div>
  );
}

export default LoginPage;
