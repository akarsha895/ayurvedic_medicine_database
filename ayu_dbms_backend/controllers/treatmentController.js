const db = require('../config/db');

// Get all Ayurvedic treatments with associated diseases
exports.getAllTreatments = (req, res) => {
    db.query(`
        SELECT 
            at.treatment_id,
            at.name AS treatment_name,
            at.duration,
            GROUP_CONCAT(d.name SEPARATOR ', ') AS associated_diseases
        FROM 
            Ayurvedic_treatment at
        LEFT JOIN 
            Ayurvedic_treatment_disease atd ON at.treatment_id = atd.treatment_id
        LEFT JOIN 
            Disease d ON atd.disease_id = d.disease_id
        GROUP BY 
            at.treatment_id;
    `, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add a new Ayurvedic treatment (admin only)
exports.addTreatment = (req, res) => {
    const { name, duration } = req.body;

    db.query('INSERT INTO Ayurvedic_treatment (name, duration) VALUES (?, ?)', [name, duration], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Ayurvedic treatment added successfully' });
    });
};

// Update an existing Ayurvedic treatment (admin only)
exports.updateTreatment = (req, res) => {
    const { id } = req.params;
    const { name, duration } = req.body;

    db.query('UPDATE Ayurvedic_treatment SET name=?, duration=? WHERE treatment_id=?', [name, duration, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ayurvedic treatment updated successfully' });
    });
};

// Delete an Ayurvedic treatment (admin only)
exports.deleteTreatment = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Ayurvedic_treatment WHERE treatment_id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ayurvedic treatment deleted successfully' });
    });
};
