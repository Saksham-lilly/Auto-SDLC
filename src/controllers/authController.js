const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Handle user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate user credentials
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Respond with tokens
        res.status(200).json({ token, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handle user logout
exports.logout = (req, res) => {
    // Invalidate the refresh token (implementation depends on the strategy)
    res.status(204).send();
};

// Handle token refresh
exports.refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token: newToken });
    });
};