import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import contactbg from '../assets/contactbg.jpg';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log('Form submitted:', formData);
    toast.success('Thank you for your message! We will get back to you soon.'); // Show success toast
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="text-white w-full h-screen">
      <Navbar />
      <div className="bg-color-2 text-lg text-white p-6 max-w-5xl m-auto my-24 flex flex-row">
      <div className="bg-color-2 text-lg text-white p-6  mx-auto my-16">
        
      <img src={contactbg} alt="Contact Us" className="w-full h-96 object-cover rounded-lg" />
      </div>

      <div className='w-1/2 m-4'>
        <h1 className="text-4xl text-center font-serif">Get in Touch</h1>
        <p className="mt-4 text-center">
          We would love to hear from you! Please fill out the form below to provide feedback or ask any questions.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-6 ">
          <div className="mb-4">
            <label className="block text-lg" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg" htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="flex justify-center">
          <button type="submit" className="bg-color-1 text-white px-6 py-2 text-lg justify-center  rounded-xl hover:border-color-5 hover:border-2">
            Submit
          </button>
          </div>
        </form>
      </div>
      </div>
      <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          closeOnClick 
          pauseOnHover 
          draggable 
          pauseOnFocusLoss 
        />
      <Footer />
    </div>
  );
}

export default ContactUsPage;