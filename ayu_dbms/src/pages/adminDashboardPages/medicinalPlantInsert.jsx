import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../admin/AdminNavbar";
import Footer from "../../components/Footer";
import axios from "../../services/api"; // Make sure this is set up to handle axios requests properly
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MedicinalPlantInsert() {
  const [newPlant, setNewPlant] = useState({
    name: "",
    scientific_name: "",
    family: "",
  });

  const handleAddPlant = async () => {
    try {
      // Make the API request
      const token = localStorage.getItem('authToken'); // or cookies
console.log('Token:', token); // Check if token is available

      console.log('Data to be sent:', newPlant);
      await axios.post("/medicinal-plants", newPlant);

      // Clear the form fields after success
      setNewPlant({ name: "", scientific_name: "", family: "" });

      // Show success toast
      toast.success("Plant added successfully!", {
        position: 'top-center',
      });
    } catch (error) {
      console.error("Error adding plant:", error);
      // Show error toast
      toast.error("Failed to add plant. Please try again.", {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="text-black w-full h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-color-4 mt-20 w-1/4 p-8">
          <h2 className="text-2xl text-white font-serif mb-4">Admin Dashboard</h2>
          <nav className="space-y-4">
            {/* Manage Medicinal Plants Section */}
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

            {/* Manage Diseases Section */}
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Diseases
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link to="/admin-diseases/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                <Link to="/admin-diseases/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                <Link to="/admin-diseases/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                <Link to="/admin-diseases/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
              </div>
            </div>

            {/* Manage Herbal Preparations Section */}
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Herbal Preparations
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link to="/admin-herbalPreparations/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                <Link to="/admin-herbalPreparations/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                <Link to="/admin-herbalPreparations/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                <Link to="/admin-herbalPreparations/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
              </div>
            </div>

            {/* Manage Resources Section */}
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Resources
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link to="/admin-resources/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                <Link to="/admin-resources/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                <Link to="/admin-resources/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                <Link to="/admin-resources/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content (form) */}
        <div className="flex-grow bg-gray-100 p-8">
          <div className="bg-color-4 text-lg text-white p-6 w-1/2 m-auto my-24 rounded-lg shadow-lg">
            <h1 className="text-3xl text-center font-serif mb-6">
              Add Medicinal Plant
            </h1>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Name"
                value={newPlant.name}
                onChange={(e) =>
                  setNewPlant({ ...newPlant, name: e.target.value })
                }
                className="p-2 m-2 border text-black border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Scientific Name"
                value={newPlant.scientific_name}
                onChange={(e) =>
                  setNewPlant({ ...newPlant, scientific_name: e.target.value })
                }
                className="p-2 m-2 border text-black border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Family"
                value={newPlant.family}
                onChange={(e) =>
                  setNewPlant({ ...newPlant, family: e.target.value })
                }
                className="p-2 m-2 border text-black border-gray-300 rounded-md"
              />
              <button
                onClick={handleAddPlant}
                className="bg-color-1 p-2 m-2 rounded-lg text-white"
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
