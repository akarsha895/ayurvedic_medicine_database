const db = require('../config/db');

// Get all medicinal plants
exports.getAllPlants = (req, res) => {
    db.query('SELECT * FROM Medicinal_plant', (err, results) => {
        if (err) {
            console.error("Error fetching plants:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Add a new medicinal plant (admin only)
exports.addPlant = (req, res) => {
    const { name, scientific_name, family } = req.body;

    // Validate input
    if (!name || !scientific_name || !family) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    db.query('INSERT INTO Medicinal_plant (name, scientific_name, family) VALUES (?, ?, ?)', [name, scientific_name, family], (err, results) => {
        if (err) {
            console.error("Error adding plant:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Plant added successfully' });
    });
};

// Update an existing plant (admin only)
exports.updatePlant = (req, res) => {
    const { id } = req.params;
    const { name, scientific_name, family } = req.body;

    // Validate input
    if (!name || !scientific_name || !family) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    db.query('UPDATE Medicinal_plant SET name=?, scientific_name=?, family=? WHERE Plant_id=?', [name, scientific_name, family, id], (err, results) => {
        if (err) {
            console.error("Error updating plant:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.json({ message: 'Plant updated successfully' });
    });
};

// Delete a plant (admin only)
exports.deletePlant = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Medicinal_plant WHERE Plant_id=?', [id], (err, results) => {
        if (err) {
            console.error("Error deleting plant:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.json({ message: 'Plant deleted successfully' });
    });
};
