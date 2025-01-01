import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import MedicinalPlant from './pages/MedicinalPlant';
import HerbalPreparation from './pages/HerbalPreparations';
import AyurvedicTreatments from './pages/AyurvedicTreatments';
import Disease from './pages/Disease';
import ObjectivePage from './pages/ObjectivePage'; 
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './admin/AdminDashboard'; 
import ManageMedicinalPlants from './pages/ManageMedicinalPlants'; 
import ManageDiseases from './pages/ManageDiseases'; 
import ManageHerbalPreparations from './pages/ManageHerbalPreparations'; 
import ManageAyurvedicTreatments from './pages/ManageAyurvedicTreatments'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/objectives" element={<ObjectivePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Admin login route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path="/medicinalPlant" element={<MedicinalPlant />} />
        <Route path="/disease" element={<Disease />} /> {/* Route for Diseases */}
        <Route path="/herbalprep" element={<HerbalPreparation />} />
        <Route path="/ayumed" element={<AyurvedicTreatments />} />
        <Route path="/admin-ayumed" element={<ManageAyurvedicTreatments />} />
        <Route path="/admin-herbalprep" element={<ManageHerbalPreparations />} />
        <Route path="/admin-disease" element={<ManageDiseases/>} /> 
        <Route path="/admin-medicinalPlant" element={<ManageMedicinalPlants />} />
      </Routes>
    </Router>
  );
}

export default App;
