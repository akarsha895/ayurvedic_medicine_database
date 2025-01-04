import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const DiseaseView = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Simulated API call
        const response = await fetch('/api/diseases'); // Replace with your API endpoint
        if (!response.ok) throw new Error('Data not found');
        const data = await response.json();
        setDiseases(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch disease data. Please try again later.', {
          position: 'top-center',
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group diseases by disease_id
  const groupedDiseases = diseases.reduce((acc, disease) => {
    if (!acc[disease.disease_id]) {
      acc[disease.disease_id] = { ...disease, symptoms: [] };
    }
    acc[disease.disease_id].symptoms.push(disease.symptom);
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <div className="bg-color-4 w-1/4 p-8">
          <h2 className="text-2xl font-serif mb-4">Admin Dashboard</h2>
          <nav className="space-y-4">
            {/* Manage Medicinal Plants */}
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

            {/* Manage Diseases */}
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

            {/* Manage Herbal Preparations */}
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

            {/* Manage Ayurvedic Treatments */}
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
          <h1 className="text-4xl text-center font-serif mb-6">
            View Diseases
          </h1>

          {/* Table Display */}
          <div className="overflow-x-auto w-full">
            <div className="bg-white shadow-lg rounded-lg p-6">
              {loading ? (
                <p>Loading diseases...</p>
              ) : diseases.length === 0 ? (
                <p>No diseases available.</p>
              ) : (
                <table className="min-w-full table-auto border-collapse text-center">
                  <thead>
                    <tr className="bg-color-2 text-white">
                      <th className="p-3 border-b">Disease ID</th>
                      <th className="p-3 border-b">Disease Name</th>
                      <th className="p-3 border-b">Affected Doshas</th>
                      <th className="p-3 border-b">Symptoms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(groupedDiseases).map((disease) => (
                      <tr key={disease.disease_id} className="hover:bg-gray-100 text">
                        <td className="p-3 border-b">{disease.disease_id}</td>
                        <td className="p-3 border-b">{disease.name}</td>
                        <td className="p-3 border-b">{disease.effected_doshas}</td>
                        <td className="p-3 border-b">{disease.symptoms.join(', ')}</td>
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
};

export default DiseaseView;



