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
// exports.addTreatment = (req, res) => {
//     const { name, duration } = req.body;

//     db.query('INSERT INTO Ayurvedic_treatment (name, duration) VALUES (?, ?)', [name, duration], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({ message: 'Ayurvedic treatment added successfully' });
//     });
// };
exports.addTreatment = (req, res) => {
    const { treatmentName, duration, diseases } = req.body;
  
    if (!treatmentName || !duration || !Array.isArray(diseases) || diseases.length === 0) {
        return res.status(400).json({ success: false, error: 'Invalid input fields' });
    }
  
    db.beginTransaction((transactionErr) => {
      if (transactionErr) return res.status(500).json({ error: transactionErr.message });
  
      db.query(
        'INSERT INTO Ayurvedic_treatment (name, duration) VALUES (?, ?)',
        [treatmentName, duration],
        (insertErr, result) => {
          if (insertErr) {
            return db.rollback(() => res.status(500).json({ error: insertErr.message }));
          }
  
          const treatmentId = result.insertId;
  
          const diseaseQueries = diseases.map((disease) =>
            new Promise((resolve, reject) => {
              db.query(
                'SELECT disease_id FROM Disease WHERE name = ?',
                [disease],
                (findErr, diseaseResult) => {
                  if (findErr) return reject(findErr);
                  if (diseaseResult.length === 0) return reject(new Error(`Disease not found: ${disease}`));
  
                  const diseaseId = diseaseResult[0].disease_id;
                  db.query(
                    'INSERT INTO Ayurvedic_treatment_disease (treatment_id, disease_id) VALUES (?, ?)',
                    [treatmentId, diseaseId],
                    (insertErr) => {
                      if (insertErr) return reject(insertErr);
                      resolve();
                    }
                  );
                }
              );
            })
          );
  
          Promise.all(diseaseQueries)
            .then(() => {
              db.commit((commitErr) => {
                if (commitErr) {
                  return db.rollback(() => res.status(500).json({ error: commitErr.message }));
                }
                res.status(201).json({ message: 'Ayurvedic treatment added successfully' });
              });
            })
            .catch((queryErr) => {
              db.rollback(() => res.status(500).json({ error: queryErr.message }));
            });
        }
      );
    });
  };


// Update an existing Ayurvedic treatment (admin only)
// exports.updateTreatment = (req, res) => {
//     const { id } = req.params;
//     const { name, duration } = req.body;

//     db.query('UPDATE Ayurvedic_treatment SET name=?, duration=? WHERE treatment_id=?', [name, duration, id], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: 'Ayurvedic treatment updated successfully' });
//     });
// };
exports.updateTreatment = (req, res) => {
    const { id } = req.params; // Treatment ID
    const { name, duration, disease } = req.body;
    
    // Validation: Check all required fields
    if (!id || !name || !duration || !disease) {
      return res.status(400).json({ error: 'Treatment ID, name, duration, and disease are required.' });
    }
    
    // ... (update treatment and associate diseases)
    
    // Step 1: Update Ayurvedic treatment details
    db.query(
      'UPDATE Ayurvedic_treatment SET name = ?, duration = ? WHERE treatment_id = ?',
      [name, duration, id],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update treatment details.' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Treatment not found.' });
        }
  
        // Step 2: Remove existing disease associations
        db.query(
          'DELETE FROM Ayurvedic_treatment_disease WHERE treatment_id = ?',
          [id],
          (deleteErr) => {
            if (deleteErr) {
              return res.status(500).json({ error: 'Failed to remove existing disease associations.' });
            }
  
            // Step 3: Insert new disease associations
            if (Array.isArray(disease) && disease.length > 0) {
              const insertQuery = `
                INSERT INTO Ayurvedic_treatment_disease (treatment_id, disease_id) VALUES (?, ?)
              `;
  
              const insertPromises = disease.map((diseaseId) =>
                new Promise((resolve, reject) => {
                  db.query(insertQuery, [id, diseaseId], (insertErr) => {
                    if (insertErr) reject(insertErr);
                    else resolve();
                  });
                })
              );
  
              Promise.all(insertPromises)
                .then(() => {
                  res.json({ message: 'Treatment updated successfully, including diseases.' });
                })
                .catch((insertErr) => {
                  res.status(500).json({ error: 'Failed to associate diseases with treatment.', details: insertErr });
                });
            } else {
              // If no diseases provided, skip insertion
              res.json({ message: 'Treatment updated successfully (no diseases provided).' });
            }
          }
        );
      }
    );
  };
  
// Delete an Ayurvedic treatment (admin only)
exports.deleteTreatment = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Ayurvedic_treatment WHERE treatment_id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ayurvedic treatment deleted successfully' });
    });
};
