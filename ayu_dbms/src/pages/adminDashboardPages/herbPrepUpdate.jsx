import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function HerbPrepUpdate() {
  const [formData, setFormData] = useState({
    preparationId: '',
    herbalPreparationName: '',
    methodOfPreparation: '',
    plantName: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (!formData.preparationId || !formData.herbalPreparationName || !formData.methodOfPreparation || !formData.plantName) {
        toast.error("All fields are required!", { position: "top-center" });
        return;
      }
  
      const payload = {
        name: formData.herbalPreparationName,
        method_of_preparation: formData.methodOfPreparation,
        plant_ids: [formData.plantName],
      };
  
      console.log("Payload sent to server:", payload);
  
      const response = await fetch(`http://localhost:5000/api/herbal-preparations/${formData.preparationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Error updating herbal preparation");
      }
  
      toast.success("Herbal preparation updated successfully!", { position: "top-center" });
      setFormData({ preparationId: '', herbalPreparationName: '', methodOfPreparation: '', plantName: '' });
    } catch (error) {
      console.error("Error updating herbal preparation:", error);
      toast.error("Failed to update herbal preparation. Please try again.", { position: "top-center" });
    }
  };
  

  


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-0">
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

                <main className="flex-grow bg-gray-100 p-8 flex items-center justify-center">
  <div className="bg-color-4 text-lg text-white p-6 w-full max-w-lg rounded-lg shadow-lg">
    <h2 className="text-center text-3xl font-serif mb-6">Update Herbal Preparation</h2>
    {/* Form for Updating Details */}
    <div className="flex flex-col text-black">
      <input
        type="text"
        name="preparationId"
        required
        placeholder="Enter Preparation ID (required)"
        value={formData.preparationId}
        onChange={handleInputChange}
        className="p-2 m-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="herbalPreparationName"
        placeholder="Enter Herbal Preparation Name (optional)"
        value={formData.herbalPreparationName}
        onChange={handleInputChange}
        className="p-2 m-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="methodOfPreparation"
        placeholder="Enter Method of Preparation (optional)"
        value={formData.methodOfPreparation}
        onChange={handleInputChange}
        className="p-2 m-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="plantName"
        placeholder="Enter Plant Name (optional)"
        value={formData.plantName}
        onChange={handleInputChange}
        className="p-2 m-2 border border-gray-300 rounded-md"
      />
      {/* Update Button */}
      <button
        onClick={handleSubmit}
        className="bg-color-1 p-2 m-2 rounded-lg text-white"
      >
        Update Herbal Preparation
      </button>
    </div>
  </div>
</main>


      </div>

      {/* Toast Container */}
      <ToastContainer />

      <Footer />
    </div>
  );
}

export default HerbPrepUpdate;
