const db = require('../config/db');

// Get all diseases with their attributes
exports.getAllDiseases = (req, res) => {
    db.query('SELECT * FROM Disease', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get all disease symptoms
exports.getAllDiseaseSymptoms = (req, res) => {
    db.query('SELECT * FROM Disease_symptoms', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add a new disease (admin only)
exports.addDisease = (req, res) => {
    const { name, effected_doshas } = req.body;

    db.query('INSERT INTO Disease (name, effected_doshas) VALUES (?, ?)', [name, effected_doshas], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Disease added successfully' });
    });
};

// Update an existing disease (admin only)
exports.updateDisease = (req, res) => {
    const { id } = req.params;
    const { name, effected_doshas } = req.body;

    db.query('UPDATE Disease SET name=?, effected_doshas=? WHERE disease_id=?', [name, effected_doshas, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Disease updated successfully' });
    });
};

// Delete a disease (admin only)
exports.deleteDisease = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Disease WHERE disease_id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Disease deleted successfully' });
    });
};
