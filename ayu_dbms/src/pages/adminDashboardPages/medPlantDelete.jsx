import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "../../services/api";
import { Link } from "react-router-dom";
import AdminNavbar from "../../admin/AdminNavbar";

function MedPlantDelete() {
  const [plantId, setPlantId] = useState("");

  const handleDeletePlant = async () => {
    try {
      if (plantId) {
        // Make the delete API call
        await axios.delete(`/medicinal-plants/${plantId}`);
        setPlantId("");
        toast.success("Plant deleted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Please provide a valid Plant ID.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error deleting plant:", error);
      toast.error("Failed to delete plant. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-color-4 mt-20 w-1/4 p-8">
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
          <h1 className="text-4xl text-center font-serif">
            Delete Medicinal Plant
          </h1>
          <p className="mt-4 text-center text-lg mb-6">
            Enter the Plant ID to delete a medicinal plant from the database.
          </p>

          {/* Form */}
          <div className="bg-color-4 text-lg text-white p-6 w-1/2 rounded-lg shadow-lg">
            <h1 className="text-3xl text-center font-serif mb-6">
              Delete Medicinal Plant
            </h1>
            <div className="flex flex-col">
              <label htmlFor="plantId" className="text-white mb-2">
                Plant ID:
              </label>
              <input
                id="plantId"
                type="text"
                placeholder="Enter Plant ID"
                value={plantId}
                onChange={(e) => setPlantId(e.target.value)}
                className="p-2 m-2 border text-black border-gray-300 rounded-md"
              />

              <button
                onClick={handleDeletePlant}
                className="bg-color-2 p-2 m-2 rounded-lg text-white"
              >
                Delete Plant
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

export default MedPlantDelete;
