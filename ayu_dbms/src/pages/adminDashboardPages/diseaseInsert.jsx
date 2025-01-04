import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function DiseaseInsert() {
  const [formData, setFormData] = useState({
    diseaseName: "",
    affectedDoshas: "",
    symptoms: [], // To store an array of symptoms
    currentSymptom: "", // For current symptom input
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSymptomChange = (e) => {
    setFormData({ ...formData, currentSymptom: e.target.value });
  };

  const addSymptom = () => {
    if (formData.currentSymptom) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, formData.currentSymptom],
        currentSymptom: "", // Clear current symptom input
      });
    } else {
      toast.error("Please enter a symptom before adding.", {
        position: "top-center",
      });
    }
  };

  const handleSubmit = () => {
    if (!formData.diseaseName || !formData.affectedDoshas || formData.symptoms.length === 0) {
      toast.error("Please fill in all required fields and add at least one symptom.", {
        position: "top-center",
      });
      return;
    }

    // Prepare data for submission
    const diseaseData = {
      name: formData.diseaseName,
      effected_doshas: formData.affectedDoshas,
      symptoms: formData.symptoms, // Send the list of symptoms
    };

    // Simulate an API call to insert disease and symptoms
    fetch('/api/diseases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diseaseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add disease.");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Disease added successfully with symptoms!", {
          position: "top-center",
        });

        // Reset the form
        setFormData({ diseaseName: "", affectedDoshas: "", symptoms: [], currentSymptom: "" });
      })
      .catch((error) => {
        toast.error(`Error adding disease: ${error.message}`, {
          position: "top-center",
        });
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <div className="bg-color-4 w-1/4 p-8">
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
                <Link to="/admin-disease/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                <Link to="/admin-disease/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                <Link to="/admin-disease/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                <Link to="/admin-disease/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
              </div>
            </div>

            {/* Manage Ayurvedic Treatments Section */}
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Ayurvedic Treatments
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link to="/admin-ayurvedicTreatment/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                <Link to="/admin-ayurvedicTreatment/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                <Link to="/admin-ayurvedicTreatment/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                <Link to="/admin-ayurvedicTreatment/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
              </div>
            </div>

            {/* Manage Herbal Preparations Section */}
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Herbal Preparations
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link to="/admin-herbalPreparation/insert" className="block text-white px-4 py-2 hover:bg-color-2">Insert</Link>
                <Link to="/admin-herbalPreparation/update" className="block text-white px-4 py-2 hover:bg-color-2">Update</Link>
                <Link to="/admin-herbalPreparation/view" className="block text-white px-4 py-2 hover:bg-color-2">View</Link>
                <Link to="/admin-herbalPreparation/delete" className="block text-white px-4 py-2 hover:bg-color-2">Delete</Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-8 flex items-center justify-center">
          <div className="bg-color-4 text-lg text-white p-6 w-full max-w-lg rounded-lg shadow-lg">
            <h1 className="text-3xl text-center font-serif mb-6">Add Disease</h1>
            <div className="flex flex-col">
              <input
                type="text"
                name="diseaseName"
                placeholder="Disease Name"
                value={formData.diseaseName}
                onChange={handleInputChange}
                className="p-2 m-2 border border-gray-300 rounded-md text-black"
              />
              <input
                type="text"
                name="affectedDoshas"
                placeholder="Affected Doshas"
                value={formData.affectedDoshas}
                onChange={handleInputChange}
                className="p-2 m-2 border border-gray-300 rounded-md text-black"
              />
              <div>
                <input  
                  type="text"
                  value={formData.currentSymptom}
                  onChange={handleSymptomChange}
                  placeholder="Add Symptom"
                  className="p-2 m-2 border border-gray-300 rounded-md text-black"
                />
                <button
                  onClick={addSymptom}
                  className="bg-color-2 p-2 m-2 rounded-lg text-white"
                >
                  Add Symptom
                </button>
              </div>
              <div className="m-2">
                <h4>Symptoms List:</h4>
                <ul>
                  {formData.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li> // Changed to use index as key
                  ))}
                </ul>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-color-2 p-2 m-2 rounded-lg text-white"
              >
                Add Disease
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

export default DiseaseInsert;
