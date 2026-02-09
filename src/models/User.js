const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;