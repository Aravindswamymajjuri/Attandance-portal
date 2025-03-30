require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const User = require('./routes/roles');
const cors = require('cors');

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/attandence';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api', studentRoutes);
app.use('/api/auth', User);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});