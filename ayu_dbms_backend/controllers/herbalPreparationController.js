// const db = require('../config/db');
// const mysql = require('mysql2');

// // Get all herbal preparations with ingredients
// exports.getAllHerbalPreparations = (req, res) => {
//   const query = `
//     SELECT hp.preparation_id, hp.name AS preparation_name, hp.method_of_preparation, 
//            GROUP_CONCAT(mp.name) AS ingredients
//     FROM Herbal_preparation hp
//     LEFT JOIN Herbal_prep_ingredients hpi ON hp.preparation_id = hpi.preparation_id
//     LEFT JOIN Medicinal_plant mp ON hpi.plant_id = mp.plant_id
//     GROUP BY hp.preparation_id;
//   `;

//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// };

// exports.createHerbalPreparation = async (req, res) => {
//     const { name, method_of_preparation, plant_ids } = req.body;
  
//     try {
//       // Insert herbal preparation into Herbal_preparation table
//       const [result] = await pool.query( 
//         'INSERT INTO Herbal_preparation (name, method_of_preparation) VALUES (?, ?)',
//         [name, method_of_preparation]
//       );
  
//       const preparation_id = result.insertId;
  
//       // Insert plant associations into Herbal_prep_ingredients table
//       const insertPlantAssociations = plant_ids.map((plant_id) => [
//         preparation_id,
//         plant_id,
//       ]);
  
//       await pool.query(
//         'INSERT INTO Herbal_prep_ingredients (preparation_id, plant_id) VALUES ?',
//         [insertPlantAssociations]
//       );
  
//       res.status(201).json({ message: 'Herbal preparation created successfully' });
//     } catch (error) {
//       console.error('Error creating herbal preparation:', error); 
//       res.status(500).json({ error: 'Failed to create herbal preparation: ' + error.message }); 
//     }
//   };
// // Update an existing herbal preparation
// exports.updateHerbalPreparation = async (req, res) => {
//   const { preparation_id } = req.params;
//   const { name, method_of_preparation, plant_ids } = req.body;

//   try {
//     // Update herbal preparation in Herbal_preparation table
//     await db.query(
//       'UPDATE Herbal_preparation SET name = ?, method_of_preparation = ? WHERE preparation_id = ?',
//       [name, method_of_preparation, preparation_id]
//     );

//     // Delete existing plant associations for this preparation
//     await db.query(
//       'DELETE FROM Herbal_prep_ingredients WHERE preparation_id = ?',
//       [preparation_id]
//     );

//     // Insert new plant associations (if provided)
//     if (plant_ids && plant_ids.length) {
//       const insertPlantAssociations = plant_ids.map((plant_id) => [
//         preparation_id,
//         plant_id,
//       ]);

//       await db.query(
//         'INSERT INTO Herbal_prep_ingredients (preparation_id, plant_id) VALUES ?',
//         [insertPlantAssociations]
//       );
//     }

//     res.status(200).json({ message: 'Herbal preparation updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update herbal preparation' });
//   }
// };

// // Delete an existing herbal preparation
// exports.deleteHerbalPreparation = async (req, res) => {
//   const { preparation_id } = req.params;

//   try {
//     // Delete herbal preparation from Herbal_preparation table
//     await db.query(
//       'DELETE FROM Herbal_preparation WHERE preparation_id = ?',
//       [preparation_id]
//     );

//     // Delete associated plant entries from Herbal_prep_ingredients table
//     await db.query(
//       'DELETE FROM Herbal_prep_ingredients WHERE preparation_id = ?',
//       [preparation_id]
//     );

//     res.status(200).json({ message: 'Herbal preparation deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete herbal preparation' });
//   }
// };

const db = require('../config/db');

// Get all herbal preparations with ingredients
exports.getAllHerbalPreparations = (req, res) => {
  const query = `
    SELECT 
      hp.preparation_id, 
      hp.name AS preparation_name, 
      hp.method_of_preparation, 
      GROUP_CONCAT(mp.name) AS ingredients
    FROM 
      Herbal_preparation hp
    LEFT JOIN 
      Herbal_prep_ingredients hpi ON hp.preparation_id = hpi.preparation_id
    LEFT JOIN 
      Medicinal_plant mp ON hpi.plant_id = mp.plant_id
    GROUP BY 
      hp.preparation_id;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a new herbal preparation
exports.createHerbalPreparation = (req, res) => {
  const { name, method_of_preparation, plant_ids } = req.body;

  if (!name || !method_of_preparation || !Array.isArray(plant_ids) || plant_ids.length === 0) {
    return res.status(400).json({ error: 'Invalid input fields' });
  }

  db.beginTransaction((transactionErr) => {
    if (transactionErr) return res.status(500).json({ error: transactionErr.message });

    db.query(
      'INSERT INTO Herbal_preparation (name, method_of_preparation) VALUES (?, ?)',
      [name, method_of_preparation],
      (insertErr, result) => {
        if (insertErr) {
          return db.rollback(() => res.status(500).json({ error: insertErr.message }));
        }

        const preparation_id = result.insertId;

        const plantAssociations = plant_ids.map((plant_id) => [preparation_id, plant_id]);

        db.query(
          'INSERT INTO Herbal_prep_ingredients (preparation_id, plant_id) VALUES ?',
          [plantAssociations],
          (assocErr) => {
            if (assocErr) {
              return db.rollback(() => res.status(500).json({ error: assocErr.message }));
            }

            db.commit((commitErr) => {
              if (commitErr) {
                return db.rollback(() => res.status(500).json({ error: commitErr.message }));
              }
              res.status(201).json({ message: 'Herbal preparation created successfully' });
            });
          }
        );
      }
    );
  });
};


exports.updateHerbalPreparation = (req, res) => {
    const { preparation_id } = req.params; // Herbal preparation ID
    const { name, method_of_preparation, plant_ids } = req.body; // Input fields

    console.log('Updating preparation with ID:', preparation_id); // Log the ID
    console.log('Payload received:', req.body); // Log the payload

    // Validate input
    if (!name || !method_of_preparation || !Array.isArray(plant_ids)) {
        return res.status(400).json({ error: "Invalid input fields. Ensure all fields are provided and plant_ids is an array." });
    }

    // Start a transaction to ensure atomicity
    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        return res.status(500).json({ error: "Transaction start failed: " + transactionErr.message });
      }

      // Update the Herbal_preparation table
      db.query(
        'UPDATE Herbal_preparation SET name = ?, method_of_preparation = ? WHERE preparation_id = ?',
        [name, method_of_preparation, preparation_id],
        (updateErr, updateResult) => {
          console.log('Update result:', updateResult); // Log the update result
          if (updateErr || updateResult.affectedRows === 0) {
            console.error('Update failed:', updateErr || 'No rows affected');
            return db.rollback(() =>
              res.status(500).json({ error: updateErr ? updateErr.message : "Preparation not found" })
            );
          }

          // Continue with deletion and insertion of ingredients
          db.query(
            'DELETE FROM Herbal_prep_ingredients WHERE preparation_id = ?',
            [preparation_id],
            (deleteErr) => {
              if (deleteErr) {
                return db.rollback(() =>
                  res.status(500).json({ error: "Failed to delete ingredients: " + deleteErr.message })
                );
              }

              // Insert new plant associations if plant_ids exist
              const plantAssociations = plant_ids.map((plant_id) => [preparation_id, plant_id]);
              db.query(
                'INSERT INTO Herbal_prep_ingredients (preparation_id, plant_id) VALUES ?',
                [plantAssociations],
                (insertErr) => {
                  if (insertErr) {
                    return db.rollback(() =>
                      res.status(500).json({ error: "Failed to insert ingredients: " + insertErr.message })
                    );
                  }

                  // Commit the transaction after successful insert
                  db.commit((commitErr) => {
                    if (commitErr) {
                      return db.rollback(() =>
                        res.status(500).json({ error: "Commit failed: " + commitErr.message })
                      );
                    }
                    res.json({ message: "Preparation and ingredients updated successfully." });
                  });
                }
              );
            }
          );
        }
      );
    });
};


exports.deleteHerbalPreparation = (req, res) => {
    const { preparation_id } = req.params;
    console.log('Received preparation_id:', preparation_id); // Debugging line
    
    if (!preparation_id || isNaN(preparation_id)) {
      return res.status(400).json({ error: 'Invalid preparation ID' });
    }
  
    db.query('DELETE FROM Herbal_preparation WHERE preparation_id = ?', [preparation_id], (err, result) => {
      if (err) {
        console.error('Error deleting herbal preparation:', err);
        return res.status(500).json({ error: 'Failed to delete herbal preparation. Please try again.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Herbal preparation not found' });
      }
  
      res.json({ message: 'Herbal preparation deleted successfully' });
    });
  };
  