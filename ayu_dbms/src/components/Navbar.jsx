import React from 'react';

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between fixed top-0 w-full p-4 opacity-90 bg-color-1">
      <div className="text-white text-2xl font-bold">Ayurvedic Logo</div>

      <div className="flex space-x-4">
        <Link to="/" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">Home</Link>
        <Link to="/objectives" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">Objectives</Link>
        <Link to="/aboutus" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">About Us</Link>
        <Link to="/contactus" className="text-white text-lg font-semibold border-2 p-2 rounded-lg border-color-2 hover:text-color-4 hover:border-color-5">Contact Us</Link>
        
        {/* Removed Admin Login Button */}
      </div>
    </nav>
  );
}

export default Navbar;
