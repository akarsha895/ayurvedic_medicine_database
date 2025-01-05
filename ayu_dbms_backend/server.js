const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const plantRoutes = require('./routes/plantRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes'); // Import disease routes
const treatmentRoutes = require('./routes/treatmentRoutes');
const herbalPreparationRoutes = require('./routes/herbalPreparationRoutes'); // Import Ayurvedic treatment routes

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/medicinal-plants', plantRoutes);
app.use('/api/diseases', diseaseRoutes); // Use disease routes
app.use('/api/treatments', treatmentRoutes); // Use Ayurvedic treatment routes
app.use('/api/herbal-preparations', herbalPreparationRoutes);

// Start server
const PORT = process.env.PORT || 5000 ||5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
