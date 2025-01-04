import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ManageHerbalPreparations() {
  const [preparations, setPreparations] = useState([]);
  const [newPreparation, setNewPreparation] = useState({
    name: '',
    method_of_preparation: ''
  });
  const [editPreparationId, setEditPreparationId] = useState(null); // Track which preparation is being edited

  useEffect(() => {
    fetchPreparations();
  }, []);

  const fetchPreparations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/herbal-preparations'); // Ensure this endpoint exists in your backend
      setPreparations(response.data);
    } catch (error) {
      console.error('Error fetching herbal preparations:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPreparation({
      ...newPreparation,
      [name]: value,
    });
  };

  const handleAddPreparation = async () => {
    try {
      if (editPreparationId) {
        await axios.put(`http://localhost:5000/api/herbal-preparations/${editPreparationId}`, newPreparation);
        setEditPreparationId(null); // Reset edit state
      } else {
        await axios.post('http://localhost:5000/api/herbal-preparations', newPreparation);
      }
      fetchPreparations(); // Refresh the list after adding/updating
      setNewPreparation({ name: '', method_of_preparation: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding/updating preparation:', error);
    }
  };

  const handleEditPreparation = (preparation) => {
    setNewPreparation({
      name: preparation.name,
      method_of_preparation: preparation.method_of_preparation,
    });
    setEditPreparationId(preparation.preparation_id); // Set the ID of the preparation being edited
  };

  const handleDeletePreparation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/herbal-preparations/${id}`);
      fetchPreparations(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting preparation:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-black my-20 flex-grow w-full px-4">
        <h1 className="text-center text-2xl font-bold mb-6">Manage Herbal Preparations</h1>
        
        <div className="mb-6">
          <h2 className="text-xl mb-2">Add or Edit Herbal Preparation</h2>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={newPreparation.name} 
            onChange={handleChange} 
            className="border rounded p-2 mr-2"
          />
          <input 
            type="text" 
            name="method_of_preparation" 
            placeholder="Method of Preparation" 
            value={newPreparation.method_of_preparation} 
            onChange={handleChange} 
            className="border rounded p-2 mr-2"
          />
          <button 
            onClick={handleAddPreparation} 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editPreparationId ? 'Update Preparation' : 'Add Preparation'}
          </button>
        </div>

        {/* List of existing herbal preparations */}
        <h2 className="text-xl mt-6">Existing Herbal Preparations</h2>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Method of Preparation</th>
                {localStorage.getItem('adminToken') && (
                  <th scope="col" className="px-6 py-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {preparations.map((preparation) => (
                <tr key={preparation.preparation_id} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4">{preparation.name}</td>
                  <td className="px-6 py-4">{preparation.method_of_preparation}</td>
                  {localStorage.getItem('adminToken') && (
                    <td className="px-6 py-4 flex space-x-2">
                      <button onClick={() => handleEditPreparation(preparation)} className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => handleDeletePreparation(preparation.preparation_id)} className="text-red-600 hover:text-red-800">Delete</button>
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

export default ManageHerbalPreparations;
