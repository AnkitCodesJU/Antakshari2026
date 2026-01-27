const express = require('express');
const router = express.Router();
const { getSelectedSongs, shuffleSongs, getAllSongs, addSong, deleteSong, lockShuffle, unlockShuffle, getShuffleStatus } = require('../controllers/song.controller');
const { upload } = require('../middleware/upload.middleware');
const { protect } = require('../middleware/auth.middleware');

router.get('/selected', getSelectedSongs);
router.post('/shuffle', protect, shuffleSongs); // Protected to identify Admin
router.post('/lock', protect, lockShuffle);
router.post('/unlock', protect, unlockShuffle);
router.get('/lock-status', protect, getShuffleStatus);
router.get('/', getAllSongs);
router.post('/', protect, upload.single('songFile'), addSong);
router.delete('/:id', protect, deleteSong);

module.exports = router;
