import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "../../services/api";
import { Link } from "react-router-dom";

function MedPlantView() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get("/medicinal-plants");
        setPlants(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plant data:", error);
        toast.error("Failed to load plant data. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-color-4 mt-20 w-1/4 p-8">
          <h2 className="text-2xl text-white font-serif mb-4">
            Admin Dashboard
          </h2>
          <nav className="space-y-4">
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Medicinal Plants
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-medicinalPlant/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-medicinalPlant/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-medicinalPlant/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-medicinalPlant/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>

            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Diseases
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-disease/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-disease/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-disease/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-disease/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Herbal Preparations
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-herbalprep/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-herbalprep/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-herbalprep/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-herbalprep/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>

            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Ayurvedic Treatments
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-ayumed/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-ayumed/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-ayumed/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-ayumed/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 p-8 flex flex-col items-center justify-start">
          <h1 className="text-4xl text-center font-serif mb-6">
            View Medicinal Plants
          </h1>

          {/* Table Display */}
          <div className="overflow-x-auto w-full">
            <div className="bg-white shadow-lg rounded-lg p-6">
              {loading ? (
                <p>Loading plants...</p>
              ) : plants.length === 0 ? (
                <p>No plants available.</p>
              ) : (
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-color-2 text-white">
                      <th className="p-3 border-b">Plant ID</th>
                      <th className="p-3 border-b">Plant Name</th>
                      <th className="p-3 border-b">Scientific Name</th>
                      <th className="p-3 border-b">Family</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plants.map((plant) => (
                      <tr key={plant.id} className="hover:bg-gray-100">
                        <td className="p-3 border-b">{plant.id}</td>
                        <td className="p-3 border-b">{plant.name}</td>
                        <td className="p-3 border-b">{plant.scientificName}</td>
                        <td className="p-3 border-b">{plant.family}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
}

export default MedPlantView;
