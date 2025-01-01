import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AyurvedicTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/treatments'); // Ensure this matches your route
      setTreatments(response.data);
    } catch (error) {
      console.error('Error fetching treatments:', error);
      setError('Failed to load treatments.');
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
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Ayurvedic Treatments</h1>
        <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Associated Diseases</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {treatments.map((treatment) => (
                <tr key={treatment.treatment_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{treatment.treatment_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{treatment.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{treatment.associated_diseases ? treatment.associated_diseases : 'None'}</td>
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

export default AyurvedicTreatments;
