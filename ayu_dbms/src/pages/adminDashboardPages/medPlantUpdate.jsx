import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../admin/AdminNavbar';

function MedPlantUpdate() {
  const [plantId, setPlantId] = useState('');
  const [updatedPlant, setUpdatedPlant] = useState({
    name: '',
    scientific_name: '',
    family: ''
  });

  const handleUpdatePlant = async () => {
    try {
      const plantData = {};

      if (updatedPlant.name) plantData.name = updatedPlant.name;
      if (updatedPlant.scientific_name) plantData.scientific_name = updatedPlant.scientific_name;
      if (updatedPlant.family) plantData.family = updatedPlant.family;

      if (Object.keys(plantData).length > 0) {
        await axios.put(`/medicinal-plants/${plantId}`, plantData);
        setUpdatedPlant({ name: '', scientific_name: '', family: '' });
        setPlantId('');
        toast.success('Plant table updated successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error('Please provide at least one field to update.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error('Error updating plant:', error);
      toast.error('Failed to update plant. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <div className="bg-color-4  w-1/4 p-8">
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
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 p-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl text-center font-serif">Update Medicinal Plant</h1>
          <p className="mt-4 text-center text-lg mb-6">
            You can update the name, scientific name, or family of the medicinal plant.
          </p>

          {/* Form */}
          <div className="bg-color-4 text-lg text-white p-6 w-1/2 rounded-lg shadow-lg">
            <h1 className="text-3xl text-center font-serif mb-6">Update Medicinal Plant</h1>
            <div className="flex flex-col">
              <label htmlFor="plantId" className="text-white mb-2">Plant ID:</label>
              <input
                id="plantId"
                type="text"
                placeholder="Enter Plant ID"
                value={plantId}
                onChange={(e) => setPlantId(e.target.value)}
                className="p-2 m-2 text-black border border-gray-300 rounded-md"
              />

              <label htmlFor="name" className="text-white mb-2">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="New Name (optional)"
                value={updatedPlant.name}
                onChange={(e) => setUpdatedPlant({ ...updatedPlant, name: e.target.value })}
                className="p-2 m-2 text-black border border-gray-300 rounded-md"
              />

              <label htmlFor="scientific_name" className="text-white mb-2">Scientific Name:</label>
              <input
                id="scientific_name"
                type="text"
                placeholder="New Scientific Name (optional)"
                value={updatedPlant.scientific_name}
                onChange={(e) => setUpdatedPlant({ ...updatedPlant, scientific_name: e.target.value })}
                className="p-2 m-2 text-black border border-gray-300 rounded-md"
              />

              <label htmlFor="family" className="text-white mb-2">Family:</label>
              <input
                id="family"
                type="text"
                placeholder="New Family (optional)"
                value={updatedPlant.family}
                onChange={(e) => setUpdatedPlant({ ...updatedPlant, family: e.target.value })}
                className="p-2 m-2 text-black border border-gray-300 rounded-md"
              />

              <button
                onClick={handleUpdatePlant}
                className="bg-color-2 p-2 m-2 rounded-lg text-white"
              >
                Update Plant
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
}

export default MedPlantUpdate;
