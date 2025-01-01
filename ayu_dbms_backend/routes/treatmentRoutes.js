const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');
const authMiddleware = require('../middleware/authMiddleware'); // To protect admin routes

// Routes for managing Ayurvedic treatments
router.get('/', treatmentController.getAllTreatments); // Get all treatments
router.post('/', authMiddleware.verifyToken, treatmentController.addTreatment); // Admin only route to add treatments
router.put('/:id', authMiddleware.verifyToken, treatmentController.updateTreatment); // Admin only route to update treatments
router.delete('/:id', authMiddleware.verifyToken, treatmentController.deleteTreatment); // Admin only route to delete treatments

module.exports = router;
