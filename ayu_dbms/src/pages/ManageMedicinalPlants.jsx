import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../services/api";

function ManageMedicinalPlants() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({
    name: "",
    scientific_name: "",
    family: "",
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("/medicinal-plants");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const handleAddPlant = async () => {
    try {
      await axios.post("/medicinal-plants", newPlant);
      setNewPlant({ name: "", scientific_name: "", family: "" });
      fetchPlants();
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const handleDeletePlant = async (id) => {
    try {
      await axios.delete(`/medicinal-plants/${id}`);
      fetchPlants();
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <div className="text-black w-full h-screen">
      <Navbar />
      <div className="bg-color-4 text-lg text-white p-6 w-2/3 m-auto my-24">
        <h1 className="text-3xl text-center font-serif">
          Manage Medicinal Plants
        </h1>
        <div className="mt-4">
          <h2>Add a New Plant</h2>
          <input
            type="text"
            placeholder="Name"
            value={newPlant.name}
            onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
            className="p-2 m-2"
          />
          <input
            type="text"
            placeholder="Scientific Name"
            value={newPlant.scientific_name}
            onChange={(e) =>
              setNewPlant({ ...newPlant, scientific_name: e.target.value })
            }
            className="p-2 m-2"
          />
          <input
            type="text"
            placeholder="Family"
            value={newPlant.family}
            onChange={(e) =>
              setNewPlant({ ...newPlant, family: e.target.value })
            }
            className="p-2 m-2"
          />
          <button
            onClick={handleAddPlant}
            className="bg-color-2 p-2 rounded-lg text-white"
          >
            Add Plant
          </button>
        </div>
        <div className="mt-6">
          <h2>Existing Plants</h2>
          <ul>
            {plants.map((plant) => (
              <li key={plant.plant_id} className="flex justify-between">
                <span>
                  {plant.name} - {plant.scientific_name} ({plant.family})
                </span>
                <button
                  onClick={() => handleDeletePlant(plant.plant_id)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageMedicinalPlants;
