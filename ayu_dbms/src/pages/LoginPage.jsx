import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify'; // Ensure proper import
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported
import loginbg from '../assets/download.png';

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const validUsername = 'admin'; // Replace with your desired username
  const validPassword = 'password123'; // Replace with your desired password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.username === validUsername && credentials.password === validPassword) {
      localStorage.setItem('adminToken', 'sample_token'); // Store a sample token
      toast.success('Login successful!', {
        position:'top-center',
      });
      navigate('/adminHome'); // Navigate to admin home on successful login
    } else {
      toast.error('Login failed! Please check your credentials.', {
         position:'top-center',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow flex justify-center items-center">
        <div className='bg-gray-100 p-8 rounded w-full max-w-md'>
            <img src={loginbg} alt="Contact Us" className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div className="bg-color-2 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h2>
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
            <button type="submit" className="w-full bg-color-1 text-white py-2 px-4 rounded-lg hover:border-2 hover:border-color-5 transition duration-200">
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <ToastContainer /> {/* Ensure this is included */}
    </div>
  );
}

export default LoginPage;
