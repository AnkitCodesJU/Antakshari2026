const express = require('express');
const router = express.Router();
const { getSelectedSongs, shuffleSongs, getAllSongs, addSong } = require('../controllers/song.controller');
const { upload } = require('../middleware/upload.middleware');

router.get('/selected', getSelectedSongs);
router.post('/shuffle', shuffleSongs);
router.get('/', getAllSongs);
router.post('/', upload.single('songFile'), addSong);

module.exports = router;
