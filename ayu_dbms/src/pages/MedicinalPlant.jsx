import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MedicinalPlant() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medicinal-plants');
      setPlants(response.data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow mt-20 w-full px-4 py-10">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Medicinal Plants</h1>
        <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scientific Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plants.map((plant) => (
                <tr key={plant.Plant_id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{plant.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plant.scientific_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.family}</td>
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

export default MedicinalPlant;
