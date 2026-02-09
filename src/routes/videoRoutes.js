const express = require('express');
const VideoController = require('../controllers/videoController');

const router = express.Router();

/**
 * Video routes for playback controls.
 */
router.post('/play', VideoController.play);
router.post('/pause', VideoController.pause);
router.post('/resume', VideoController.resume);

module.exports = router;
