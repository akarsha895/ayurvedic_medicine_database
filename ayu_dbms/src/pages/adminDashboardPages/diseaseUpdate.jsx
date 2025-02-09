import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function DiseaseUpdate() {
  const [formData, setFormData] = useState({
    diseaseid: '',
    diseaseName: '',
    affectedDoshas: '',
    symptoms: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async() => {
  //   // Simulate API call for updating disease
  //   try {
  //     if (formData.diseaseid) {
  //       // alert(identifier)
  //       // Make the delete API call
  //       // await fetch(`http://localhost:5000/api/diseases/${formData.diseaseid}`,{method: "PUT",body: JSON.stringify({
  //       //   name: formData.diseaseName,
  //       //   effected_doshas: formData.affectedDoshas,
  //       //   symptoms: formData.symptoms
  //       // })});
  //       await fetch(`http://localhost:5000/api/diseases/${formData.diseaseid}`, {
  //         method: "PUT",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //             name: formData.diseaseName,
  //             effected_doshas: formData.affectedDoshas,
  //             symptoms: formData.symptoms,
  //         }),
  //     });
      
  //       toast.success("Disease updated successfully!", {
  //         position: 'top-center',
  //       });
  //   setFormData({ diseaseid:'',diseaseName: '', affectedDoshas: '', symptoms: '' });

  //     } else {
  //       toast.error("Please provide a valid Disease ID.", {
  //         position: 'top-center',
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating disease:", error);
  //     toast.error("Failed to update disease. Please try again.", {
  //       position: 'top-center',
  //     });
  //   }
  // };
  const handleSubmit = async () => {
    try {
        if (formData.diseaseid) {
            const response = await fetch(`http://localhost:5000/api/diseases/${formData.diseaseid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.diseaseName,
                    effected_doshas: formData.affectedDoshas,
                    symptoms: formData.symptoms.split(',').map(s => s.trim()), // Convert symptoms to an array
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            toast.success("Disease updated successfully!", { position: "top-center" });
            setFormData({ diseaseid: '', diseaseName: '', affectedDoshas: '', symptoms: '' });
        } else {
            toast.error("Please provide a valid Disease ID.", { position: "top-center" });
        }
    } catch (error) {
        console.error("Error updating disease:", error);
        toast.error("Failed to update disease. Please try again.", { position: "top-center" });
    }
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
          <div className="bg-color-4 text-lg text-white p-6 w-full max-w-lg rounded-lg shadow-lg">
            <h1 className="text-3xl text-center font-serif mb-6">Update Disease</h1>
            <div className="flex flex-col text-black">
            <input
                type="text"
                name="diseaseid"
                required
                placeholder="Disease Id (required)"
                value={formData.diseaseid}
                onChange={handleInputChange}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="diseaseName"
                placeholder="Disease Name (optional)"
                value={formData.diseaseName}
                onChange={handleInputChange}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="affectedDoshas"
                placeholder="Affected Doshas (optional)"
                value={formData.affectedDoshas}
                onChange={handleInputChange}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <textarea
                name="symptoms"
                placeholder="Symptoms (optional)"
                value={formData.symptoms}
                onChange={handleInputChange}
                className="p-2 m-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSubmit}
                className="bg-color-2 p-2 m-2 rounded-lg text-white"
              >
                Update Disease
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

export default DiseaseUpdate;
