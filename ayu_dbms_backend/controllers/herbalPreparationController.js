const db = require('../config/db');
const mysql = require('mysql2');

// Get all herbal preparations with ingredients
exports.getAllHerbalPreparations = (req, res) => {
  const query = `
    SELECT hp.preparation_id, hp.name AS preparation_name, hp.method_of_preparation, 
           GROUP_CONCAT(mp.name) AS ingredients
    FROM Herbal_preparation hp
    LEFT JOIN Herbal_prep_ingredients hpi ON hp.preparation_id = hpi.preparation_id
    LEFT JOIN Medicinal_plant mp ON hpi.plant_id = mp.plant_id
    GROUP BY hp.preparation_id;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createHerbalPreparation = async (req, res) => {
    const { name, method_of_preparation, plant_ids } = req.body;
  
    try {
      // Insert herbal preparation into Herbal_preparation table
      const [result] = await pool.query( 
        'INSERT INTO Herbal_preparation (name, method_of_preparation) VALUES (?, ?)',
        [name, method_of_preparation]
      );
  
      const preparation_id = result.insertId;
  
      // Insert plant associations into Herbal_prep_ingredients table
      const insertPlantAssociations = plant_ids.map((plant_id) => [
        preparation_id,
        plant_id,
      ]);
  
      await pool.query(
        'INSERT INTO Herbal_prep_ingredients (preparation_id, plant_id) VALUES ?',
        [insertPlantAssociations]
      );
  
      res.status(201).json({ message: 'Herbal preparation created successfully' });
    } catch (error) {
      console.error('Error creating herbal preparation:', error); 
      res.status(500).json({ error: 'Failed to create herbal preparation: ' + error.message }); 
    }
  };
// Update an existing herbal preparation
exports.updateHerbalPreparation = async (req, res) => {
  const { preparation_id } = req.params;
  const { name, method_of_preparation, plant_ids } = req.body;

  try {
    // Update herbal preparation in Herbal_preparation table
    await db.query(
      'UPDATE Herbal_preparation SET name = ?, method_of_preparation = ? WHERE preparation_id = ?',
      [name, method_of_preparation, preparation_id]
    );

    // Delete existing plant associations for this preparation
    await db.query(
      'DELETE FROM Herbal_prep_ingredients WHERE preparation_id = ?',
      [preparation_id]
    );

    // Insert new plant associations (if provided)
    if (plant_ids && plant_ids.length) {
      const insertPlantAssociations = plant_ids.map((plant_id) => [
        preparation_id,
        plant_id,
      ]);

      await db.query(
        'INSERT INTO Herbal_prep_ingredients (preparation_id, plant_id) VALUES ?',
        [insertPlantAssociations]
      );
    }

    res.status(200).json({ message: 'Herbal preparation updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update herbal preparation' });
  }
};

// Delete an existing herbal preparation
exports.deleteHerbalPreparation = async (req, res) => {
  const { preparation_id } = req.params;

  try {
    // Delete herbal preparation from Herbal_preparation table
    await db.query(
      'DELETE FROM Herbal_preparation WHERE preparation_id = ?',
      [preparation_id]
    );

    // Delete associated plant entries from Herbal_prep_ingredients table
    await db.query(
      'DELETE FROM Herbal_prep_ingredients WHERE preparation_id = ?',
      [preparation_id]
    );

    res.status(200).json({ message: 'Herbal preparation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete herbal preparation' });
  }
};