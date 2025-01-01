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
import AyuTreatInsert from './pages/adminDashboardPages/ayuTreatInsert';
import AyuTreatUpdate from './pages/adminDashboardPages/ayuTreatUpdate';
import AyuTreatDelete from './pages/adminDashboardPages/ayuTreatDelete';
import AyuTreatView from './pages/adminDashboardPages/ayuTreatView';
import MedicinalPlantInsert from './pages/adminDashboardPages/medicinalPlantInsert';
import MedPlantUpdate from './pages/adminDashboardPages/medPlantUpdate';
import MedPlantDelete from './pages/adminDashboardPages/medPlantDelete';
import MedPlantView from './pages/adminDashboardPages/medPlantView';
import DiseaseInsert from './pages/adminDashboardPages/diseaseInsert';
import DiseaseUpdate from './pages/adminDashboardPages/diseaseUpdate';
import DiseaseDelete from './pages/adminDashboardPages/diseaseDelete';
import DiseaseView from './pages/adminDashboardPages/diseaseView';
import HerbPrepInsert from './pages/adminDashboardPages/herbPrepInsert';
import HerbPrepUpdate from './pages/adminDashboardPages/herbPrepUpdate';
import HerbPrepDelete from './pages/adminDashboardPages/herbPrepDelete';
import HerbPrepView from './pages/adminDashboardPages/herbPrepView';

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
        <Route path="/register" element={<RegisterPage />} /> {/* Admin registration route */}
        <Route path="/admin-medicinalPlant/insert" element={<MedicinalPlantInsert/>} />
        <Route path="/admin-medicinalPlant/update" element={<MedPlantUpdate/>} />
        <Route path="/admin-medicinalPlant/delete" element={<MedPlantDelete/>} />
        <Route path="/admin-medicinalPlant/view" element={<MedPlantView/>} />
        <Route path="/admin-disease/insert" element={<DiseaseInsert/>} />
        <Route path="/admin-disease/update" element={<DiseaseUpdate/>} />
        <Route path="/admin-disease/delete" element={<DiseaseDelete/>} />
        <Route path="/admin-disease/view" element={<DiseaseView/>} />
        <Route path="/admin-herbalprep/insert" element={<HerbPrepInsert/>} />
        <Route path="/admin-herbalprep/update" element={<HerbPrepUpdate/>} />
        <Route path="/admin-herbalprep/delete" element={<HerbPrepDelete/>} />
        <Route path="/admin-herbalprep/view" element={<HerbPrepView/>} />
        <Route path="/admin-ayumed/insert" element={<AyuTreatInsert/>} />
        <Route path="/admin-ayumed/update" element={<AyuTreatUpdate/>} />
        <Route path="/admin-ayumed/delete" element={<AyuTreatDelete/>} />
        <Route path="/admin-ayumed/view" element={<AyuTreatView/>} />





      </Routes>
    </Router>
  );
}

export default App;
