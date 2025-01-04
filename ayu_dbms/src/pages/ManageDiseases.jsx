import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ManageDiseases() {
  const [diseases, setDiseases] = useState([]);
  const [newDisease, setNewDisease] = useState({
    name: '',
    effected_doshas: ''
  });
  const [editDiseaseId, setEditDiseaseId] = useState(null); // Track which disease is being edited

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diseases');
      setDiseases(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDisease({
      ...newDisease,
      [name]: value,
    });
  };

  const handleAddDisease = async () => {
    try {
      if (editDiseaseId) {
        await axios.put(`http://localhost:5000/api/diseases/${editDiseaseId}`, newDisease);
        setEditDiseaseId(null); // Reset edit state
      } else {
        await axios.post('http://localhost:5000/api/diseases', newDisease);
      }
      fetchDiseases(); // Refresh the list after adding/updating
      setNewDisease({ name: '', effected_doshas: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding/updating disease:', error);
    }
  };

  const handleEditDisease = (disease) => {
    setNewDisease({
      name: disease.name,
      effected_doshas: disease.effected_doshas,
    });
    setEditDiseaseId(disease.disease_id); // Set the ID of the disease being edited
  };

  const handleDeleteDisease = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/diseases/${id}`);
      fetchDiseases(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting disease:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-black my-20 flex-grow w-full px-4">
        <h1 className="text-center text-2xl font-bold mb-6">Manage Diseases</h1>
        
        <div className="mb-6">
          <h2 className="text-xl mb-2">Add or Edit Disease</h2>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={newDisease.name} 
            onChange={handleChange} 
            className="border rounded p-2 mr-2"
          />
          <input 
            type="text" 
            name="effected_doshas" 
            placeholder="Effected Doshas" 
            value={newDisease.effected_doshas} 
            onChange={handleChange} 
            className="border rounded p-2 mr-2"
          />
          <button 
            onClick={handleAddDisease} 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editDiseaseId ? 'Update Disease' : 'Add Disease'}
          </button>
        </div>

        {/* List of existing diseases */}
        <h2 className="text-xl mt-6">Existing Diseases</h2>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Disease Name</th>
                <th scope="col" className="px-6 py-3">Effected Doshas</th>
                {localStorage.getItem('adminToken') && (
                  <th scope="col" className="px-6 py-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {diseases.map((disease) => (
                <tr key={disease.disease_id} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4">{disease.name}</td>
                  <td className="px-6 py-4">{disease.effected_doshas}</td>
                  {localStorage.getItem('adminToken') && (
                    <td className="px-6 py-4 flex space-x-2">
                      <button onClick={() => handleEditDisease(disease)} className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => handleDeleteDisease(disease.disease_id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageDiseases;
