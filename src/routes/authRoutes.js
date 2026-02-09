const express = require('express');
const { login, logout, refreshToken } = require('../controllers/authController');

const router = express.Router();

// Route for user login
router.post('/login', login);
// Route for user logout
router.post('/logout', logout);
// Route for refreshing token
router.post('/refresh-token', refreshToken);

module.exports = router;