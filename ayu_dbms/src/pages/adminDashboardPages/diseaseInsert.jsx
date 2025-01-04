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
      symptoms: [],
      currentSymptom: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSymptom = () => {
      if (formData.currentSymptom.trim()) {
          setFormData(prev => ({
              ...prev,
              symptoms: [...prev.symptoms, prev.currentSymptom.trim()],
              currentSymptom: ""
          }));
      } else {
          toast.warning("Please enter a symptom before adding.");
      }
  };

  const removeSymptom = (index) => {
      setFormData(prev => ({
          ...prev,
          symptoms: prev.symptoms.filter((_, i) => i !== index)
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validation
      if (!formData.diseaseName.trim()) {
          toast.error("Please enter disease name");
          return;
      }
      if (!formData.affectedDoshas.trim()) {
          toast.error("Please enter affected doshas");
          return;
      }
      if (formData.symptoms.length === 0) {
          toast.error("Please add at least one symptom");
          return;
      }

      setIsSubmitting(true);

      try {
          const response = await fetch('http://localhost:5000/api/diseases', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: formData.diseaseName.trim(),
                  effected_doshas: formData.affectedDoshas.trim(),
                  symptoms: formData.symptoms
              })
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.error || 'Failed to add disease');
          }

          toast.success("Disease added successfully!");
          // Reset form
          setFormData({
              diseaseName: "",
              affectedDoshas: "",
              symptoms: [],
              currentSymptom: ""
          });
      } catch (error) {
          console.error('Error details:', error);
          toast.error(error.message || 'Error adding disease');
      } finally {
          setIsSubmitting(false);
      }
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
                  onChange={(e) => setFormData(prev => ({ ...prev, currentSymptom: e.target.value }))}
                  placeholder="Add Symptom"
                  className="p-2 m-2 border border-gray-300 rounded-md text-black"
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault();
                          addSymptom();
                      }
                  }}
                />
                <button
                  onClick={addSymptom}
                  className="bg-color-2 p-2 m-2 rounded-lg text-white"
                  disabled={isSubmitting}
                >
                  Add Symptom
                </button>
              </div>
              <div className="m-2">
                <h4>Symptoms List:</h4>
                <ul>
                  {formData.symptoms.map((symptom, index) => (
                    <li key={index} className="flex justify-between items-center mb-1">{symptom}
                     <button
                                    type="button"
                                    onClick={() => removeSymptom(index)}
                                    className="text-red-500 ml-2"
                                >
                                    ×
                                </button>
                    </li> // Changed to use index as key
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
