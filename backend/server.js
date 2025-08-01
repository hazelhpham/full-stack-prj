/*
Starts the HTTP server
Sets up middleware (CORS, JSON parsing)
Connects to routes
Listens on port 5000
*/
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5050;

// Add this middleware early
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // or 'http://localhost:3000'
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/restaurants', require('./routes/restaurants'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 