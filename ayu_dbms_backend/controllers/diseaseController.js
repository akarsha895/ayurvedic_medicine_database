// const db = require('../config/db');

// // Get all diseases with their attributes and symptoms
// exports.getAllDiseases = (req, res) => {
//     const query = `
//         SELECT D.disease_id, D.name, D.effected_doshas, DS.symptom
//         FROM Disease D
//         LEFT JOIN Disease_symptoms DS ON D.disease_id = DS.disease_id
//     `;
//     db.query(query, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// };

// // Get all disease symptoms
// exports.getAllDiseaseSymptoms = (req, res) => {
//     db.query('SELECT * FROM Disease_symptoms', (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// };

// // Add a new disease with symptoms (admin only)
// exports.addDisease = (req, res) => {
//     const { name, effected_doshas, symptoms } = req.body;

//     // Input validation
//     if (!name || !effected_doshas) {
//         return res.status(400).json({ error: 'Name and effected_doshas are required' });
//     }

//     if (symptoms && !Array.isArray(symptoms)) {
//         return res.status(400).json({ error: 'Symptoms must be an array' });
//     }

//     db.beginTransaction((err) => {
//         if (err) return res.status(500).json({ error: 'Transaction error: ' + err.message });

//         const diseaseQuery = 'INSERT INTO Disease (name, effected_doshas) VALUES (?, ?)';
//         db.query(diseaseQuery, [name, effected_doshas], (err, result) => {
//             if (err) {
//                 return db.rollback(() =>
//                     res.status(500).json({ error: 'Error adding disease: ' + err.message })
//                 );
//             }

//             const disease_id = result.insertId;

//             if (symptoms && symptoms.length > 0) {
//                 const symptomPromises = symptoms.map((symptom) => {
//                     return new Promise((resolve, reject) => {
//                         const symptomQuery = 'INSERT INTO Disease_symptoms (disease_id, symptom) VALUES (?, ?)';
//                         db.query(symptomQuery, [disease_id, symptom], (err) => {
//                             if (err) reject('Error adding symptom: ' + err.message);
//                             else resolve();
//                         });
//                     });
//                 });

//                 Promise.all(symptomPromises)
//                     .then(() => {
//                         db.commit((commitErr) => {
//                             if (commitErr) {
//                                 return db.rollback(() =>
//                                     res.status(500).json({ error: 'Commit error: ' + commitErr.message })
//                                 );
//                             }
//                             res.status(201).json({ message: 'Disease and symptoms added successfully!' });
//                         });
//                     })
//                     .catch((error) => {
//                         db.rollback(() => res.status(500).json({ error: error }));
//                     });
//             } else {
//                 db.commit((commitErr) => {
//                     if (commitErr) {
//                         return db.rollback(() =>
//                             res.status(500).json({ error: 'Commit error: ' + commitErr.message })
//                         );
//                     }
//                     res.status(201).json({ message: 'Disease added without symptoms.' });
//                 });
//             }
//         });
//     });
// };

// // Update an existing disease (admin only)
// exports.updateDisease = (req, res) => {
//     const { id } = req.params;
//     const { name, effected_doshas } = req.body;

//     db.query('UPDATE Disease SET name=?, effected_doshas=? WHERE disease_id=?', [name, effected_doshas, id], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: 'Disease updated successfully' });
//     });     
// };

// // Delete a disease (admin only)
// exports.deleteDisease = (req, res) => {
//     const { id } = req.params;

//     db.query('DELETE FROM Disease WHERE disease_id=?', [id], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: 'Disease deleted successfully' });
//     });
// };


const db = require('../config/db');

// Get all diseases with their attributes and symptoms
exports.getAllDiseases = (req, res) => {
    const query = `
        SELECT D.disease_id, D.name, D.effected_doshas, DS.symptom
        FROM Disease D
        LEFT JOIN Disease_symptoms DS ON D.disease_id = DS.disease_id
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching diseases:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get all disease symptoms
exports.getAllDiseaseSymptoms = (req, res) => {
    db.query('SELECT * FROM Disease_symptoms', (err, results) => {
        if (err) {
            console.error("Error fetching disease symptoms:", err);
            return res.status(500).json({ error: err.message });
        }
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

    db.beginTransaction((err) => {
        if (err) {
            console.error("Transaction error:", err);
            return res.status(500).json({ error: 'Transaction error: ' + err.message });
        }

        const diseaseQuery = 'INSERT INTO Disease (name, effected_doshas) VALUES (?, ?)';
        db.query(diseaseQuery, [name, effected_doshas], (err, result) => {
            if (err) {
                console.error("Error adding disease:", err);
                return db.rollback(() =>
                    res.status(500).json({ error: 'Error adding disease: ' + err.message })
                );
            }

            const disease_id = result.insertId;

            if (symptoms && symptoms.length > 0) {
                const symptomPromises = symptoms.map((symptom) => {
                    return new Promise((resolve, reject) => {
                        const symptomQuery = 'INSERT INTO Disease_symptoms (disease_id, symptom) VALUES (?, ?)';
                        db.query(symptomQuery, [disease_id, symptom], (err) => {
                            if (err) reject('Error adding symptom: ' + err.message);
                            else resolve();
                        });
                    });
                });

                Promise.all(symptomPromises)
                    .then(() => {
                        db.commit((commitErr) => {
                            if (commitErr) {
                                console.error("Commit error:", commitErr);
                                return db.rollback(() =>
                                    res.status(500).json({ error: 'Commit error: ' + commitErr.message })
                                );
                            }
                            res.status(201).json({ message: 'Disease and symptoms added successfully!' });
                        });
                    })
                    .catch((error) => {
                        console.error("Error during promise execution:", error);
                        db.rollback(() => res.status(500).json({ error: error }));
                    });
            } else {
                db.commit((commitErr) => {
                    if (commitErr) {
                        console.error("Commit error:", commitErr);
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

// Update an existing disease (admin only)
exports.updateDisease = (req, res) => {
    const { id } = req.params;
    const { name, effected_doshas } = req.body;

    // Validate input
    if (!name || !effected_doshas) {
        return res.status(400).json({ error: 'Name and effected_doshas are required.' });
    }

    db.query('UPDATE Disease SET name=?, effected_doshas=? WHERE disease_id=?', [name, effected_doshas, id], (err, results) => {
        if (err) {
            console.error("Error updating plant:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Disease not found' });
        }
        res.json({ message: 'Disease updated successfully' });
    });
};

// Delete a disease (admin only)
exports.deleteDisease = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Disease WHERE disease_id=?', [id], (err, results) => {
        if (err) {
            console.error("Error deleting plant:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Disease not found' });
        }
        res.json({ message: 'Disease deleted successfully' });
    });
};
