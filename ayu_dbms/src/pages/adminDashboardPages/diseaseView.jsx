import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const DiseaseView = () => {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Simulated API call
        const response = await fetch('/api/diseases'); // Replace with your API endpoint
        if (!response.ok) throw new Error('Data not found');
        const data = await response.json();
        setDiseases(data);
      } catch (error) {
        toast.error('Failed to fetch disease data. Please try again later.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <aside className="bg-color-4 w-1/4 p-4 h-[calc(100vh-64px)] sticky top-0">
          <h2 className="text-2xl text-white font-serif mb-4">Admin Dashboard</h2>
          <nav className="space-y-4">
            {/* Sidebar content */}
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
            {/* Additional sidebar sections can be added here */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-8 flex items-center justify-center">
          <div className="bg-color-4 text-lg text-white p=6 w-full max-w-lg rounded-lg shadow-lg">
            <h1 className="text-center font-serif mb=6">Disease List</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b bg-gray-200">Disease Name</th>
                  <th className="py-3 px-4 border-b bg-gray-200">Affected Doshas</th>
                  <th className="py-3 px-4 border-b bg-gray-200">Symptoms</th>
                </tr>
              </thead>
              <tbody>
                {diseases.length > 0 ? (
                  diseases.map((disease) => (
                    <tr key={disease.id} className="hover:bg-gray-100">
                      <td className="py-3 px-4 border-b">{disease.diseaseName}</td>
                      <td className="py-3 px-4 border-b">{disease.affectedDoshas}</td>
                      <td className="py-3 px-4 border-b">{disease.symptoms}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-3 px-4 text-center">No diseases found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer />

      <Footer />
    </div>
  );
}

export default DiseaseView;
