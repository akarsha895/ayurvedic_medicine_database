import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (  
    <nav className="flex justify-between fixed top-0 w-full p-4 opacity-90 bg-color-1">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex space-x-4">
        <div className="text-white text-2xl h-12 rounded-full   font-bold">
          <img src={logo} className="w-full h-full" alt='ayurvedic logo'/>
        </div>
        <Link to="/" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">Home</Link>
        <Link to="/objectives" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">Objectives</Link>
        <Link to="/aboutus" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">About Us</Link>
        <Link to="/contactus" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">Contact Us</Link>
      </div>

      {/* Right Section: Admin Login Button */}
      <div className='mt-3'>
        <Link to="/login" className="text-white  text-lg font-semibold border-2 mb-1  p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">Admin Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
