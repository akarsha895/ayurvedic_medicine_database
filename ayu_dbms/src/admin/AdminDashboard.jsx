import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./AdminNavbar";

const sampleData = [
  {
    month: "January",
    plant: "Tulsi",
    treatment: "Herbal Tea",
    disease: "Cold",
    usage: 30,
  },
  {
    month: "January",
    plant: "Ginger",
    treatment: "Ginger Tea",
    disease: "Flu",
    usage: 20,
  },
  {
    month: "February",
    plant: "Turmeric",
    treatment: "Turmeric Milk",
    disease: "Inflammation",
    usage: 25,
  },
  {
    month: "February",
    plant: "Tulsi",
    treatment: "Herbal Tea",
    disease: "Cold",
    usage: 15,
  },
  {
    month: "March",
    plant: "Ginger",
    treatment: "Ginger Paste",
    disease: "Nausea",
    usage: 35,
  },
  // Add more sample data as needed
];

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("January");

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Simulated API call
        // const response = await fetch('/api/plants'); // Replace with your API endpoint
        // if (!response.ok) throw new Error('Data not found');
        // const data = await response.json();

        // For demonstration, using sample data
        setData(sampleData);
      } catch (error) {
        toast.error("Failed to fetch data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredData = data.filter((item) => item.month === selectedMonth);

  // Sort by usage in descending order
  const sortedData = filteredData.sort((a, b) => b.usage - a.usage);

  return (
    <div className="text-black w-full h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-grow mt-20">
        <div className="bg-color-4  w-1/4 p-8">
          <h2 className="text-2xl text-white font-serif mb-4">
            Admin Dashboard
          </h2>
          <nav className="space-y-4">
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Medicinal Plants
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-medicinalPlant/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-medicinalPlant/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-medicinalPlant/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-medicinalPlant/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>

            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Diseases
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-disease/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-disease/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-disease/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-disease/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>
            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Herbal Preparations
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-herbalprep/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-herbalprep/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-herbalprep/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-herbalprep/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>

            <div className="group">
              <button className="bg-color-2 text-white p-2 rounded-lg w-full text-left group-hover:bg-color-3">
                Manage Ayurvedic Treatments
              </button>
              <div className="hidden group-hover:block bg-color-3 rounded-lg mt-2 space-y-2">
                <Link
                  to="/admin-ayumed/insert"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Insert
                </Link>
                <Link
                  to="/admin-ayumed/update"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Update
                </Link>
                <Link
                  to="/admin-ayumed/view"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  View
                </Link>
                <Link
                  to="/admin-ayumed/delete"
                  className="block text-white px-4 py-2 hover:bg-color-2"
                >
                  Delete
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 my-12 p-8">
          <h1 className="text-center font-serif mb-6 text-xl">
            Monthly Plant Usage Analysis
          </h1>

          {/* Month Selection Dropdown */}
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mb-6 p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Month</option>
            {Array.from(new Set(data.map((item) => item.month))).map(
              (month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              )
            )}
          </select>

          {/* Chart for displaying analysis */}
          {filteredData.length > 0 && (
            <>
              <BarChart width={600} height={300} data={sortedData}>
                <XAxis dataKey="plant" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Bar dataKey="usage" fill="#8884d8" name="Usage Count" />
              </BarChart>

              {/* Table for displaying sorted plant usage */}
              <h3 className="text-center font-serif mb-4 mt-8">
                Usage Details
              </h3>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b bg-gray-200">
                      Plant Name
                    </th>
                    <th className="py-3 px-4 border-b bg-gray-200">
                      Usage Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item) => (
                    <tr key={item.plant}>
                      <td className="py-3 px-4 border-b">{item.plant}</td>
                      <td className="py-3 px-4 border-b">{item.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />

      <Footer />
    </div>
  );
}

export default AdminDashboard;
