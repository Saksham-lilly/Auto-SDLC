const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/streaming-platform', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});