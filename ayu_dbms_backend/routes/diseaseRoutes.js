const express = require('express');
const router = express.Router();
const diseaseController = require('../controllers/diseaseController');
const authMiddleware = require('../middleware/authMiddleware'); // To protect admin routes

// Routes for managing diseases
router.get('/', diseaseController.getAllDiseases); // Get all diseases
router.post('/',  diseaseController.addDisease); // Admin only route to add diseases
router.put('/:id',  diseaseController.updateDisease); // Admin only route to update diseases
router.delete('/:id',  diseaseController.deleteDisease); // Admin only route to delete diseases

// Additional routes for fetching symptoms
router.get('/symptoms', diseaseController.getAllDiseaseSymptoms); // Get all disease symptoms

module.exports = router;
