import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginbg from '../assets/download.png';

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

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
        localStorage.setItem('adminToken', response.data.token);
        toast.success('Login successful!', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed! Please check your credentials.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow flex justify-center items-center">
        <div className='bg-gray-100 p-8 rounded   w-full max-w-md'>
            <img src={loginbg} alt="Contact Us" className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div className="bg-color-2 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-color-1 text-white py-2 px-4 rounded-lg hover:border-2 hover:border-color-5 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
