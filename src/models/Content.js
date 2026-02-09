const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    actors: [{ type: String }],
    description: { type: String },
    releaseDate: { type: Date },
    // Additional fields can be added as necessary
});

module.exports = mongoose.model('Content', ContentSchema);