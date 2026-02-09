const Content = require('../models/Content');

/**
 * @desc Search for movies or shows based on title, genre, or actor
 * @route GET /api/search
 * @access Public
 */
exports.searchContent = async (req, res) => {
    const { title, genre, actor } = req.query;
    try {
        const query = {};
        if (title) query.title = { $regex: title, $options: 'i' };
        if (genre) query.genre = genre;
        if (actor) query.actors = { $regex: actor, $options: 'i' };

        const results = await Content.find(query);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No results found' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};