const mongoose = require('mongoose');

const medicinalPlantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientific_name: { type: String, required: true },
  family: { type: String, required: true },
});

module.exports = mongoose.model('MedicinalPlant', medicinalPlantSchema);
