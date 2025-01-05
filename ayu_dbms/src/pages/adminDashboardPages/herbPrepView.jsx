import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function HerbPrepView() {
  const [herbalPreparations, setHerbalPreparations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from the backend
    const fetchData = async () => {
      try {
        // Replace this URL with your backend API endpoint for herbal preparations
        const response = await fetch('/api/herbal-preparations');
        if (!response.ok) {
          throw new Error('Data not found');
        }
        const data = await response.json();
        setHerbalPreparations(data);
        setLoading(false);
      } catch (error) {
        toast.error(
          "Failed to fetch herbal preparations. Please try again later.",
          {
            position: 'top-center',
          }
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <div className="bg-color-4 w-1/4 p-8">
          <h2 className="text-2xl font-serif mb-4">Admin Dashboard</h2>
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
        <div className="flex-grow bg-gray-100 p-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl text-center font-serif mb-6">
            View Herbal Preparations
          </h1>

          {/* Table Display */}
          <div className="overflow-x-auto w-full">
            <div className="bg-white shadow-lg rounded-lg p-6">
              {loading ? (
                <p>Loading herbal preparations...</p>
              ) : herbalPreparations.length === 0 ? (
                <p>No herbal preparations available.</p>
              ) : (
                <table className="min-w-full  table-auto border-collapse text-center">
                  <thead>
                    <tr className="bg-gray-200 ">
                    <th className="py-3 px-4 text-white bg-color-2">Herbal Preparation ID</th>
                      <th className="py-3 px-4 text-white bg-color-2">Herbal Preparation Name</th>
                      <th className="py-3 px-4 text-white bg-color-2">Method of Preparation</th>
                      <th className="py-3 px-4 text-white bg-color-2">Plant Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {herbalPreparations.map((prep) => (
                      <tr key={prep.preparation_id}>
                        <td className="py-3 px-4">{prep.preparation_id}</td>
                        <td className="py-3 px-4">{prep.preparation_name}</td>
                        <td className="py-3 px-4">{prep.method_of_preparation}</td>
                        <td className="py-3 px-4">{prep.ingredients}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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

export default HerbPrepView;
