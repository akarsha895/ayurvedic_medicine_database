const express = require('express');
const router = express.Router();
const herbalPreparationController = require('../controllers/herbalPreparationController');

// Routes for managing herbal preparations
router.get('/', herbalPreparationController.getAllHerbalPreparations);
router.post('/', herbalPreparationController.createHerbalPreparation); // Update for create method
router.put('/:id', herbalPreparationController.updateHerbalPreparation);
router.delete('/:id', herbalPreparationController.deleteHerbalPreparation);

module.exports = router;