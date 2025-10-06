// server.js
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/products', productRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Hello World from Express API');
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));