import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HerbalPreparations() {
  const [preparations, setPreparations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPreparations();
  }, []);

  const fetchPreparations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/herbal-preparations'); // Ensure this matches your route
      setPreparations(response.data);
    } catch (error) {
      console.error('Error fetching herbal preparations:', error);
      setError('Failed to load herbal preparations.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>; // Show loading state
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>; // Show error message

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow w-full px-4 py-10">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Herbal Preparations</h1>
        <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preparation Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method of Preparation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredients</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {preparations.map((preparation) => (
                <tr key={preparation.preparation_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{preparation.preparation_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{preparation.method_of_preparation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{preparation.ingredients ? preparation.ingredients : 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HerbalPreparations;
