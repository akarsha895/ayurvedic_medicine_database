const express = require('express');
const router = express.Router();
const herbalPreparationController = require('../controllers/herbalPreparationController');

// Routes for managing herbal preparations
router.get('/', herbalPreparationController.getAllHerbalPreparations); // Get all herbal preparations
// Add other routes for adding, updating, and deleting if needed...

module.exports = router;
