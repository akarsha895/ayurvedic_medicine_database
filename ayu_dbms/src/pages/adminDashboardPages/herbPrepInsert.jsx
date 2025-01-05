import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function HerbPrepInsert() {
  const [formData, setFormData] = useState({
    herbalPreparationName: "",
    methodOfPreparation: "",
    plantNames: [], // Array to store selected plant names
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlantNameChange = (index, event) => {
    const newPlantNames = [...formData.plantNames];
    newPlantNames[index] = event.target.value;
    setFormData({ ...formData, plantNames: newPlantNames });
  };

  const handleAddPlant = () => {
    setFormData({ ...formData, plantNames: [...formData.plantNames, ""] });
  };

  const handleRemovePlant = (index) => {
    if (formData.plantNames.length === 1) return; // Prevent removing the last plant

    const newPlantNames = [...formData.plantNames];
    newPlantNames.splice(index, 1);
    setFormData({ ...formData, plantNames: newPlantNames });
  };

  const handleSubmit = async () => {
    // Validate form data
    if (
      !formData.herbalPreparationName ||
      !formData.methodOfPreparation ||
      !formData.plantNames.length
    ) {
      toast.error("Please fill in all fields and add at least one plant.", {
        position: 'top-center',
      });
      return;
    }

    // Prepare data for backend API call
    const data = {
      name: formData.herbalPreparationName,
      method_of_preparation: formData.methodOfPreparation,
      plant_ids: [], // Array to store plant IDs
    };

    // Loop through selected plant names and fetch their IDs (assuming separate API endpoint)
    for (const plantName of formData.plantNames) {
      const plantResponse = await fetch(`/api/medicinal-plants?name=${plantName}`);
      if (!plantResponse.ok) {
        console.error("Error fetching plant ID:", plantResponse.statusText);
        toast.error("Failed to add herbal preparation. See console for details.");
        return;
      }
      const plantData = await plantResponse.json();
      if (!plantData.length) {
        toast.error(`Plant not found: ${plantName}`);
        return;
      }
      data.plant_ids.push(plantData[0].id); // Assuming plant ID is in the "id" property
    }

    // Send POST request to backend API to create the herbal preparation
    const response = await fetch("/api/herbal-preparations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error creating herbal preparation:", errorText);
      toast.error("Failed to add herbal preparation. See console for details.");
      return;
    }

    // Display success toast notification on successful creation
    toast.success("Herbal preparation added successfully!", {
      position: 'top-center',
    });

    // Clear the form
    setFormData({
      herbalPreparationName: "",
      methodOfPreparation: "",
      plantNames: [],
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
        <main className="flex-grow bg-gray-100 p-8 flex items-center justify-center">
  <div className="bg-color-4 text-lg text-black p-6 w-full max-w-lg rounded-lg shadow-lg">
    <h1 className="text-3xl text-center font-serif mb-6">
      Add Herbal Preparation
    </h1>
    <div className="flex flex-col">
      <input
        type="text"
        name="herbalPreparationName"
        placeholder="Herbal Preparation Name"
        value={formData.herbalPreparationName}
        onChange={handleInputChange}
        className="p-2 m-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="methodOfPreparation"
        placeholder="Method of Preparation"
        value={formData.methodOfPreparation}
        onChange={handleInputChange}
        className="p-2 m-2 border border-gray-300 rounded-md"
      />

      {/* Plant Names Input Fields */}
      {formData.plantNames.map((plantName, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Plant Name"
            value={plantName}
            onChange={(e) => handlePlantNameChange(index, e)}
            className="p-2 m-2 border border-gray-300 rounded-md flex-grow"
          />
          <button
            onClick={() => handleRemovePlant(index)}
            className="ml-2 bg-red-500 text-white p-1 rounded-md"
            disabled={formData.plantNames.length === 1} // Disable remove button for the first plant
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add Plant Button */}
      <button
        onClick={handleAddPlant}
        className="bg-green-500 text-white p-2 m-2 rounded-md"
      >
        Add Plant
      </button>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-color-1 p-2 m-2 rounded-lg text-white"
      >
        Add Herbal Preparation
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

export default HerbPrepInsert;
