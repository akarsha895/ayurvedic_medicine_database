import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Disease() {
  const [diseasesWithSymptoms, setDiseasesWithSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDiseasesWithSymptoms();
  }, []);

  const fetchDiseasesWithSymptoms = async () => {
    try {
      const [diseasesResponse, symptomsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/diseases'),
        axios.get('http://localhost:5000/api/diseases/symptoms')
      ]);
      
      const diseases = diseasesResponse.data;
      const symptoms = symptomsResponse.data;

      // Combine diseases with their symptoms
      const diseasesWithSymptoms = diseases.map(disease => ({
        ...disease,
        symptoms: symptoms.filter(symptom => symptom.disease_id === disease.disease_id)
      }));
      
      setDiseasesWithSymptoms(diseasesWithSymptoms);
    } catch (error) {
      console.error('Error fetching diseases:', error);
      setError('Failed to load diseases.');
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
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Diseases</h1>
        <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effected Doshas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {diseasesWithSymptoms.map((disease) => (
                <tr key={disease.disease_id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{disease.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{disease.effected_doshas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {disease.symptoms.map(symptom => (
                      <div key={symptom.disease_symptom_id}>{symptom.symptom}</div>
                    ))}
                  </td>
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

export default Disease;
