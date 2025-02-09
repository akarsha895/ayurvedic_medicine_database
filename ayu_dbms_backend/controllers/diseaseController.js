const db = require('../config/db');

// Get all diseases with their attributes and symptoms
exports.getAllDiseases = (req, res) => {
    const query = `
        SELECT D.disease_id, D.name, D.effected_doshas, DS.symptom
        FROM Disease D
        LEFT JOIN Disease_symptoms DS ON D.disease_id = DS.disease_id
    `;
    db.query(query, (err, results) => {
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

// Add a new disease with symptoms (admin only)
exports.addDisease = (req, res) => {
    const { name, effected_doshas, symptoms } = req.body;

    // Input validation
    if (!name || !effected_doshas) {
        return res.status(400).json({ error: 'Name and effected_doshas are required' });
    }

    if (symptoms && !Array.isArray(symptoms)) {
        return res.status(400).json({ error: 'Symptoms must be an array' });
    }

    // Begin a transaction to ensure data consistency
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: 'Transaction error: ' + err.message });

        // Step 1: Insert disease into the Disease table
        const diseaseQuery = 'INSERT INTO Disease (name, effected_doshas) VALUES (?, ?)';
        db.query(diseaseQuery, [name, effected_doshas], (err, result) => {
            if (err) {
                return db.rollback(() =>
                    res.status(500).json({ error: 'Error adding disease: ' + err.message })
                );
            }

            const disease_id = result.insertId;

            // Step 2: Insert symptoms into Temp_symptoms table
            if (symptoms && symptoms.length > 0) {
                const symptomPromises = symptoms.map((symptom) => {
                    return new Promise((resolve, reject) => {
                        const symptomQuery = 'INSERT INTO Temp_symptoms (disease_id, symptom) VALUES (?, ?)';
                        db.query(symptomQuery, [disease_id, symptom], (err) => {
                            if (err) reject('Error adding symptom: ' + err.message);
                            else resolve();
                        });
                    });
                });

                // Step 3: Commit after inserting symptoms
                Promise.all(symptomPromises)
                    .then(() => {
                        db.commit((commitErr) => {
                            if (commitErr) {
                                return db.rollback(() =>
                                    res.status(500).json({ error: 'Commit error: ' + commitErr.message })
                                );
                            }
                            res.status(201).json({ message: 'Disease and symptoms added successfully!' });
                        });
                    })
                    .catch((error) => {
                        db.rollback(() => res.status(500).json({ error: error }));
                    });
            } else {
                // If no symptoms, commit only the disease
                db.commit((commitErr) => {
                    if (commitErr) {
                        return db.rollback(() =>
                            res.status(500).json({ error: 'Commit error: ' + commitErr.message })
                        );
                    }
                    res.status(201).json({ message: 'Disease added without symptoms.' });
                });
            }
        });
    });
};


exports.addDisease = (req, res) => {
    const { name, effected_doshas, symptoms } = req.body;

    if (!name || !effected_doshas || !Array.isArray(symptoms)) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    const diseaseQuery = 'INSERT INTO Disease (name, effected_doshas) VALUES (?, ?)';
    db.query(diseaseQuery, [name, effected_doshas], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const diseaseId = result.insertId;

        // Filter unique, non-null symptoms
        const uniqueSymptoms = [...new Set(symptoms.filter(symptom => symptom))];

        const symptomQuery = 'INSERT INTO Disease_symptoms (disease_id, symptom) VALUES (?, ?)';
        uniqueSymptoms.forEach(symptom => {
            db.query(symptomQuery, [diseaseId, symptom], (err) => {
                if (err) console.error('Symptom insert error:', err.message);
            });
        });

        res.status(201).json({ message: 'Disease added successfully' });
    });
};


exports.updateDisease = (req, res) => {
    const { id } = req.params; // Disease ID
    const { name, effected_doshas, symptoms } = req.body;

    // Validate input
    if (!name || !effected_doshas || !symptoms) {
        return res.status(400).json({ error: "All fields (name, effected_doshas, symptoms) are required." });
    }

    // Update Disease table
    db.query(
        'UPDATE Disease SET name = ?, effected_doshas = ? WHERE disease_id = ?',
        [name, effected_doshas, id],
        (err, results) => {
            if (err) {
                console.error("Error updating Disease:", err.message);
                return res.status(500).json({ error: "Error updating Disease: " + err.message });
            }

            // If no rows were affected, return a 404 error
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No disease found with the provided ID." });
            }

            // Delete existing symptoms for the disease
            db.query(
                'DELETE FROM Disease_symptoms WHERE disease_id = ?',
                [id],
                (deleteErr) => {
                    if (deleteErr) {
                        console.error("Error deleting symptoms:", deleteErr.message);
                        return res.status(500).json({ error: "Error deleting symptoms: " + deleteErr.message });
                    }

                    // Insert new symptoms
                    const symptomInserts = symptoms.map((symptom) => [id, symptom]);
                    db.query(
                        'INSERT INTO Disease_symptoms (disease_id, symptom) VALUES ?',
                        [symptomInserts],
                        (insertErr) => {
                            if (insertErr) {
                                console.error("Error inserting symptoms:", insertErr.message);
                                return res.status(500).json({ error: "Error inserting symptoms: " + insertErr.message });
                            }

                            res.json({ message: "Disease and symptoms updated successfully." });
                        }
                    );
                }
            );
        }
    );
};




// Delete a disease (admin only)
exports.deleteDisease = (req, res) => {
    const { id } = req.params;
    console.log("DEL with id: "+id)
    db.query('DELETE FROM Disease WHERE disease_id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Disease deleted successfully' });
    });
};

