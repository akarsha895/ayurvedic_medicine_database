import  { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after registration
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., save user data)
    console.log("Registration submitted:", formData);
    // Redirect to login page after successful registration
    navigate("/login");
  };

  return (
    <div className="text-black w-full h-screen">
      <Navbar />
      <div className="bg-color-4 text-lg text-white p-6 w-1/3 m-auto my-4">
        <h1 className="text-4xl text-center font-serif">Register</h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-lg" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-color-1 text-white p-2 rounded-lg hover:border-white hover:border-2 px-2 py-1 m-4"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
