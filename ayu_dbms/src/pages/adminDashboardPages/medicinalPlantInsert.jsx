import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function MedicinalPlantInsert() {
  const [newPlant, setNewPlant] = useState({ name: '', scientific_name: '', family: '' });

  const handleAddPlant = async () => {
    try {
      await axios.post('/medicinal-plants', newPlant);
      setNewPlant({ name: '', scientific_name: '', family: '' });
      toast.success('Plant added successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error('Error adding plant:', error);
      toast.error('Failed to add plant. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="text-black w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-color-4 w-1/4 p-8 fixed h-full mt-20">
          <h2 className="text-2xl text-white font-serif mb-4">Admin Dashboard</h2>
          <nav className="space-y-4">
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Medicinal Plants
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link to="/admin-medicinalPlant/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                <Link to="/admin-medicinalPlant/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                <Link to="/admin-medicinalPlant/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                <Link to="/admin-medicinalPlant/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
              </div>
            </div>
                
                            <div className="group">
                              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                                Manage Diseases
                              </button>
                              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                                <Link to="/admin-disease/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                                <Link to="/admin-disease/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                                <Link to="/admin-disease/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                                <Link to="/admin-disease/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
                              </div>
                            </div>
                
                            <div className="group">
                              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                                Manage Herbal Preparations
                              </button>
                              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                                <Link to="/admin-herbalprep/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                                <Link to="/admin-herbalprep/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                                <Link to="/admin-herbalprep/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                                <Link to="/admin-herbalprep/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
                              </div>
                            </div>
                
                            <div className="group">
                              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                                Manage Ayurvedic Treatments
                              </button>
                              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                                <Link to="/admin-ayumed/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                                <Link to="/admin-ayumed/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                                <Link to="/admin-ayumed/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                                <Link to="/admin-ayumed/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
                              </div>
                            </div>
                          
            {/* Other sections (Diseases, Herbal Preparations, etc.) */}
            {/* Repeat the above group structure for other categories like Diseases, Herbal Preparations, etc. */}
          </nav>
        </div>

        {/* Main Content (form) */}
        <div className="flex-grow ml-72  bg-gray-100 p-8">
          <div className="bg-color-4 text-lg text-white p-6 w-1/2 m-auto my-24 rounded-lg shadow-lg">
            <h1 className="text-3xl text-center font-serif mb-6">Add Medicinal Plant</h1>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Name"
                value={newPlant.name}
                onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Scientific Name"
                value={newPlant.scientific_name}
                onChange={(e) => setNewPlant({ ...newPlant, scientific_name: e.target.value })}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Family"
                value={newPlant.family}
                onChange={(e) => setNewPlant({ ...newPlant, family: e.target.value })}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAddPlant}
                className="bg-color-2 p-2 m-2 rounded-lg text-white"
              >
                Add Plant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
      
      <Footer />
    </div>
  );
}

export default MedicinalPlantInsert;
