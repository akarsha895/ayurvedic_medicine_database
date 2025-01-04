import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ManageAyurvedicTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [newTreatment, setNewTreatment] = useState({
    name: '',
    duration: ''
  });
  const [editTreatmentId, setEditTreatmentId] = useState(null); // Track which treatment is being edited

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/treatments');
      setTreatments(response.data);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTreatment({
      ...newTreatment,
      [name]: value,
    });
  };

  const handleAddTreatment = async () => {
    try {
      if (editTreatmentId) {
        await axios.put(`http://localhost:5000/api/treatments/${editTreatmentId}`, newTreatment);
        setEditTreatmentId(null); // Reset edit state
      } else {
        await axios.post('http://localhost:5000/api/treatments', newTreatment);
      }
      fetchTreatments(); // Refresh the list after adding/updating
      setNewTreatment({ name: '', duration: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding/updating treatment:', error);
    }
  };

  const handleEditTreatment = (treatment) => {
    setNewTreatment({
      name: treatment.name,
      duration: treatment.duration,
    });
    setEditTreatmentId(treatment.treatment_id); // Set the ID of the treatment being edited
  };

  const handleDeleteTreatment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/treatments/${id}`);
      fetchTreatments(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting treatment:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-black my-20 flex-grow w-full px-4">
        <h1 className="text-center text-2xl font-bold mb-6">Manage Ayurvedic Treatments</h1>
        
        <div className="mb-6">
          <h2 className="text-xl mb-2">Add or Edit Ayurvedic Treatment</h2>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={newTreatment.name} 
            onChange={handleChange} 
            className="border rounded p-2 mr-2"
          />
          <input 
            type="text" 
            name="duration" 
            placeholder="Duration" 
            value={newTreatment.duration} 
            onChange={handleChange} 
            className="border rounded p-2 mr-2"
          />
          <button 
            onClick={handleAddTreatment} 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editTreatmentId ? 'Update Treatment' : 'Add Treatment'}
          </button>
        </div>

        {/* List of existing treatments */}
        <h2 className="text-xl mt-6">Existing Ayurvedic Treatments</h2>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Duration</th>
                {localStorage.getItem('adminToken') && (
                  <th scope="col" className="px-6 py-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment) => (
                <tr key={treatment.treatment_id} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4">{treatment.name}</td>
                  <td className="px-6 py-4">{treatment.duration}</td>
                  {localStorage.getItem('adminToken') && (
                    <td className="px-6 py-4 flex space-x-2">
                      <button onClick={() => handleEditTreatment(treatment)} className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => handleDeleteTreatment(treatment.treatment_id)} className="text-red-600 hover:text-red-800">Delete</button>
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

export default ManageAyurvedicTreatments;
