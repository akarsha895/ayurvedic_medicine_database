import { useState } from "react";
import AdminNavbar from "../../admin/AdminNavbar";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

// const AyuTreatUpdate = () => {
//   const [formData, setFormData] = useState({
//     treatmentId: "",
//     treatmentName: "",
//     duration: "",
//     diseases: [], // Array to store multiple diseases
//   });
  
//   const [diseaseInput, setDiseaseInput] = useState("");

//   // Handle form field changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle adding a new disease
//   const handleAddDisease = () => {
//     if (diseaseInput.trim()) {
//       setFormData((prevState) => ({
//         ...prevState,
//         diseases: [...prevState.diseases, diseaseInput],
//       }));
//       setDiseaseInput(""); // Reset input after adding
//     }
//   };

//   // Handle removing a disease
//   const handleRemoveDisease = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       diseases: prev.diseases.filter((_, i) => i !== index),
//     }));
//   };

//   // Handle updating an existing disease
//   const handleUpdateDisease = (index, updatedDisease) => {
//     const updatedDiseases = [...formData.diseases];
//     updatedDiseases[index] = updatedDisease;
//     setFormData({ ...formData, diseases: updatedDiseases });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Convert disease names to disease IDs
//     const diseaseIds = await Promise.all(formData.diseases.map(async (disease) => {
//       const response = await fetch(`/api/diseases?name=${disease}`);
//       const result = await response.json();
//       return result.disease_id; // Assuming the API returns a disease_id field
//     }));

//     const treatmentData = {
//       name: formData.treatmentName, // Ensure you're passing the correct name
//       duration: formData.duration,
//       disease: diseaseIds, // Now sending disease IDs instead of names
//     };

//     // Make the PUT request to update the treatment
//     const response = await fetch(`/api/treatments/${formData.treatmentId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(treatmentData),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error updating treatment:", errorText);
    
//       if (errorText.includes('disease_not_found')) {
//         toast.error("One or more diseases not found. Please check disease names.");
//       } else if (errorText.includes('missing_field')) {
//         toast.error("Missing required field in treatment data.");
//       } else {
//         toast.error("Failed to update treatment. See console for details.");
//       }
//       return;
//     }
    
//   };
const AyuTreatUpdate = () => {
  const [formData, setFormData] = useState({
    treatmentId: "",
    treatmentName: "",
    duration: "",
    diseases: [], // Array to store multiple diseases
  });
  const [diseaseInput, setDiseaseInput] = useState("");

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding a new disease
  const handleAddDisease = () => {
    if (diseaseInput.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        diseases: [...prevState.diseases, diseaseInput],
      }));
      setDiseaseInput(""); // Reset input after adding
    }
  };

  // Handle removing a disease
  const handleRemoveDisease = (index) => {
    setFormData((prev) => ({
      ...prev,
      diseases: prev.diseases.filter((_, i) => i !== index),
    }));
  };

  // Handle updating an existing disease
  const handleUpdateDisease = (index, updatedDisease) => {
    const updatedDiseases = [...formData.diseases];
    updatedDiseases[index] = updatedDisease;
    setFormData({ ...formData, diseases: updatedDiseases });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Convert disease names to disease IDs
    const diseaseIds = await Promise.all(
      formData.diseases.map(async (disease) => {
        const response = await fetch(`/api/diseases?name=${disease}`);
        const result = await response.json();
        return result.disease_id; // Assuming the API returns a disease_id field
      })
    );

    // Handle potential errors during disease ID fetching
    if (diseaseIds.includes(null)) {
      toast.error("One or more diseases not found. Please check disease names.");
      return; // Exit early if any disease ID is null
    }

    const treatmentData = {
      name: formData.treatmentName, // Ensure you're passing the correct name
      duration: formData.duration,
      disease: diseaseIds, // Now sending disease IDs instead of names
    };

    // Make the PUT request to update the treatment
    const response = await fetch(`/api/treatments/${formData.treatmentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(treatmentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error updating treatment:", errorText);

      if (errorText.includes("disease_not_found")) {
        toast.error("One or more diseases not found. Please check disease names.");
      } else if (errorText.includes("missing_field")) {
        toast.error("Missing required field in treatment data.");
      } else {
        toast.error("Failed to update treatment. See console for details.");
      }
      return;
    }

    // Display success toast notification on successful update
    toast.success("Ayurvedic treatment updated successfully!");

    // Optionally, redirect to a confirmation or view page after success
    // window.location.href = "/admin-ayumed/view"; // Replace with appropriate URL
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex flex-grow mt-0">
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
        <main className="flex-grow bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-color-4 text-lg text-white p-6 w-full max-w-lg rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-serif mb-6">
          Update Ayurvedic Treatment
        </h1>

        {/* Form for Updating Details */}
        <div className="flex flex-col">
          <input
            name="treatmentId"
            value={formData.treatmentId}
            onChange={handleInputChange}
            placeholder="Treatment ID"
            className="p-3 m-3 border text-black border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="treatmentName"
            placeholder="Ayurvedic Treatment Name"
            value={formData.treatmentName}
            onChange={handleInputChange}
            className="p-3 m-3 border text-black border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 10 days)"
            value={formData.duration}
            onChange={handleInputChange}
            className="p-3 m-3 text-black border border-gray-300 rounded-md"
          />
          <div className="m-2">
            <input
              type="text"
              value={diseaseInput}
              onChange={(e) => setDiseaseInput(e.target.value)} // Handle input change
              className="border text-black p-2 rounded-lg"
            />
            <button
              onClick={handleAddDisease}
              className="ml-2 bg-color-1 p-2 rounded-lg text-white hover:border-2 hover:border-color-5"
            >
              Add Disease
            </button>
          </div>
          
         {/* Disease List with Update and Remove Options */}
         <div className="m-2 text-black">
  <ul>
    {formData.diseases.map((disease, index) => (
      <li key={index}> {/* Use index as a unique key */}
        {/* Displaying disease name */}
        <input
          type="text" 
          value={disease.name}  // Assuming disease object has a 'name' property
          onChange={(e) => handleUpdateDisease(index, e.target.value)}
          className="border text-black p-2 rounded-lg"
        />
        <button onClick={() => handleRemoveDisease(index)}>Remove</button>
      </li>
    ))}
  </ul>
</div>
          {/* Update Button */}
          <button
            onClick={handleSubmit}
            className="bg-color-1 text-black p-3 m-3 rounded-lg text-white"
          >
            Update Ayurvedic Treatment
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

export default AyuTreatUpdate;
