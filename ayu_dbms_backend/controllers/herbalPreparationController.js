// controllers/herbalPreparationController.js

const db = require('../config/db');

// Get all herbal preparations with ingredients
exports.getAllHerbalPreparations = (req, res) => {
    const query = `
        SELECT hp.preparation_id, hp.name AS preparation_name, hp.method_of_preparation, 
               GROUP_CONCAT(mp.name) AS ingredients
        FROM Herbal_preparation hp
        LEFT JOIN Herbal_prep_ingredients hpi ON hp.preparation_id = hpi.preparation_id
        LEFT JOIN Medicinal_plant mp ON hpi.plant_id = mp.Plant_id
        GROUP BY hp.preparation_id;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
