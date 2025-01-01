// routes/plantRoutes.js

const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const authMiddleware = require('../middleware/authMiddleware'); // To protect admin routes

router.get('/', plantController.getAllPlants);
router.post('/', authMiddleware.verifyToken, plantController.addPlant); // Admin only route to add plants.
router.put('/:id', authMiddleware.verifyToken, plantController.updatePlant); // Admin only route to update plants.
router.delete('/:id', authMiddleware.verifyToken, plantController.deletePlant); // Admin only route to delete plants.

module.exports = router;
